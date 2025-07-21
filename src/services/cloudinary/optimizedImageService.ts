import * as ImageManipulator from 'expo-image-manipulator'

interface CloudinaryConfig {
  cloudName: string
  uploadPreset: string
}

const CLOUDINARY_CONFIG: CloudinaryConfig = {
  cloudName: process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  uploadPreset: process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
}

export interface OptimizedUploadResult {
  publicId: string
  secureUrl: string
  optimizedUrl: string
  thumbnailUrl: string
  width: number
  height: number
  bytes: number
  format: string
  folder: string
}

// Recipe-specific image types
export type BigPanImageType =
  | 'recipe_main' // Main recipe photo
  | 'recipe_step' // Step-by-step photos
  | 'cooking_result' // User's cooking results
  | 'avatar' // Profile pictures
  | 'group_cover' // Cooking group covers
  | 'collection_cover' // Recipe collection covers

export class BigPanImageService {
  /**
   * Get optimization settings based on image type
   */
  private static getOptimizationSettings(imageType: BigPanImageType) {
    const settings = {
      recipe_main: { maxWidth: 1200, quality: 0.8, folder: 'recipes/main' },
      recipe_step: { maxWidth: 800, quality: 0.7, folder: 'recipes/steps' },
      cooking_result: {
        maxWidth: 1000,
        quality: 0.75,
        folder: 'cooking/results',
      },
      avatar: { maxWidth: 400, quality: 0.85, folder: 'users/avatars' },
      group_cover: { maxWidth: 1200, quality: 0.8, folder: 'groups/covers' },
      collection_cover: {
        maxWidth: 1000,
        quality: 0.8,
        folder: 'collections/covers',
      },
    }

    return settings[imageType]
  }

  /**
   * Compress image with recipe-optimized settings
   */
  private static async compressImage(
    imageUri: string,
    imageType: BigPanImageType
  ): Promise<string> {
    try {
      const { maxWidth, quality } = this.getOptimizationSettings(imageType)

      const manipulated = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: maxWidth } }],
        {
          compress: quality,
          format: ImageManipulator.SaveFormat.JPEG,
          base64: false, // Critical: avoid base64 for memory efficiency
        }
      )

      return manipulated.uri
    } catch (error) {
      console.warn(
        `Compression failed for ${imageType}, using original:`,
        error
      )
      return imageUri
    }
  }

  /**
   * Upload optimized image with BigPan-specific features
   */
  static async uploadImage(
    imageUri: string,
    userId: string,
    imageType: BigPanImageType,
    metadata?: {
      recipeId?: string
      stepNumber?: number
      groupId?: string
      collectionId?: string
    }
  ): Promise<OptimizedUploadResult> {
    try {
      const settings = this.getOptimizationSettings(imageType)

      // Compress first
      const compressedUri = await this.compressImage(imageUri, imageType)

      // Build folder path with user context
      const baseFolder = `bigpan/${userId}/${settings.folder}`
      const contextFolder = this.buildContextualFolder(
        baseFolder,
        imageType,
        metadata
      )

      // Create FormData for upload
      const formData = new FormData()
      formData.append('file', {
        uri: compressedUri,
        type: 'image/jpeg',
        name: this.generateFileName(imageType, metadata),
      } as any)

      formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset)
      formData.append('folder', contextFolder)
      formData.append('quality', 'auto:good')
      formData.append('fetch_format', 'auto')

      // Add tags for better organization
      const tags = this.generateTags(imageType, userId, metadata)
      formData.append('tags', tags.join(','))

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          `Upload failed: ${errorData.error?.message || 'Unknown error'}`
        )
      }

      const result = await response.json()

      return {
        publicId: result.public_id,
        secureUrl: result.secure_url,
        optimizedUrl: this.getOptimizedUrl(result.public_id),
        thumbnailUrl: this.getThumbnailUrl(result.public_id, imageType),
        width: result.width,
        height: result.height,
        bytes: result.bytes,
        format: result.format,
        folder: contextFolder,
      }
    } catch (error) {
      console.error(`Upload error for ${imageType}:`, error)
      throw error
    }
  }

  /**
   * Build contextual folder structure
   */
  private static buildContextualFolder(
    baseFolder: string,
    imageType: BigPanImageType,
    metadata?: any
  ): string {
    switch (imageType) {
      case 'recipe_step':
        return metadata?.recipeId
          ? `${baseFolder}/${metadata.recipeId}`
          : baseFolder
      case 'cooking_result':
        return metadata?.recipeId
          ? `${baseFolder}/${metadata.recipeId}`
          : baseFolder
      default:
        return baseFolder
    }
  }

  /**
   * Generate descriptive filename
   */
  private static generateFileName(
    imageType: BigPanImageType,
    metadata?: any
  ): string {
    const timestamp = Date.now()

    switch (imageType) {
      case 'recipe_step':
        const step = metadata?.stepNumber ? `_step${metadata.stepNumber}` : ''
        return `recipe${step}_${timestamp}.jpg`
      case 'cooking_result':
        return `cooking_result_${timestamp}.jpg`
      default:
        return `${imageType}_${timestamp}.jpg`
    }
  }

  /**
   * Generate tags for Cloudinary organization
   */
  private static generateTags(
    imageType: BigPanImageType,
    userId: string,
    metadata?: any
  ): string[] {
    const baseTags = ['bigpan', imageType, `user_${userId}`]

    if (metadata?.recipeId) baseTags.push(`recipe_${metadata.recipeId}`)
    if (metadata?.groupId) baseTags.push(`group_${metadata.groupId}`)
    if (metadata?.collectionId)
      baseTags.push(`collection_${metadata.collectionId}`)

    return baseTags
  }

  /**
   * Get recipe-optimized display URL
   */
  static getOptimizedUrl(publicId: string, transformations?: string): string {
    const baseUrl = `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/`
    const defaultTransforms = 'c_fill,w_400,h_300,f_auto,q_auto,dpr_auto'
    return `${baseUrl}${transformations || defaultTransforms}/${publicId}`
  }

  /**
   * Get thumbnail optimized for different image types
   */
  static getThumbnailUrl(publicId: string, imageType: BigPanImageType): string {
    const baseUrl = `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload`

    const thumbnailSettings = {
      recipe_main: 'c_fill,w_200,h_150,f_auto,q_auto',
      recipe_step: 'c_fill,w_120,h_120,f_auto,q_auto',
      cooking_result: 'c_fill,w_150,h_150,f_auto,q_auto',
      avatar: 'c_thumb,w_80,h_80,f_auto,q_auto',
      group_cover: 'c_fill,w_200,h_100,f_auto,q_auto',
      collection_cover: 'c_fill,w_180,h_120,f_auto,q_auto',
    }

    const transform =
      thumbnailSettings[imageType] || thumbnailSettings.recipe_main
    return `${baseUrl}/${transform}/${publicId}`
  }

  /**
   * Get responsive image URLs for recipe cards and lists
   */
  static getResponsiveUrls(
    publicId: string,
    imageType: BigPanImageType = 'recipe_main'
  ) {
    const baseUrl = `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload`

    if (imageType === 'recipe_main') {
      return {
        thumbnail: `${baseUrl}/c_fill,w_200,h_150,f_auto,q_auto/${publicId}`,
        small: `${baseUrl}/c_fill,w_400,h_300,f_auto,q_auto/${publicId}`,
        medium: `${baseUrl}/c_fill,w_800,h_600,f_auto,q_auto/${publicId}`,
        large: `${baseUrl}/c_fill,w_1200,h_900,f_auto,q_auto/${publicId}`,
        hero: `${baseUrl}/c_fill,w_1600,h_900,f_auto,q_auto/${publicId}`, // For recipe detail hero
      }
    }

    // For other types, return appropriate sizes
    return {
      thumbnail: this.getThumbnailUrl(publicId, imageType),
      medium: this.getOptimizedUrl(publicId),
      large: `${baseUrl}/c_fill,w_800,h_600,f_auto,q_auto/${publicId}`,
    }
  }

  /**
   * Bulk upload for recipe creation (multiple step photos)
   */
  static async uploadRecipeSteps(
    stepImages: { uri: string; stepNumber: number }[],
    userId: string,
    recipeId: string
  ): Promise<OptimizedUploadResult[]> {
    const uploadPromises = stepImages.map(({ uri, stepNumber }) =>
      this.uploadImage(uri, userId, 'recipe_step', { recipeId, stepNumber })
    )

    return Promise.all(uploadPromises)
  }

  /**
   * Delete image from Cloudinary (for cleanup)
   */
  static async deleteImage(publicId: string): Promise<boolean> {
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/destroy`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            public_id: publicId,
            api_key: process.env.EXPO_PUBLIC_CLOUDINARY_API_KEY,
            // Note: In production, signature should be generated server-side
          }),
        }
      )

      const result = await response.json()
      return result.result === 'ok'
    } catch (error) {
      console.error('Failed to delete image:', error)
      return false
    }
  }
}
