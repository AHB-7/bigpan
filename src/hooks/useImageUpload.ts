import { useState } from 'react'
import {
  BigPanImageService,
  BigPanImageType,
  OptimizedUploadResult,
} from '@/services/cloudinary/optimizedImageService'
import { useAsyncFunction } from './asyncFunction'
import { useAuth } from './useAuth'

interface UseImageUploadOptions {
  onSuccess?: (result?: OptimizedUploadResult) => void
  onError?: (error: string) => void
  showSuccessMessage?: boolean
  maxRetries?: number
}

export const useImageUpload = (options: UseImageUploadOptions = {}) => {
  const { user } = useAuth()
  const { execute } = useAsyncFunction()
  const [uploadProgress, setUploadProgress] = useState<number>(0)

  const uploadImage = async (
    imageUri: string,
    imageType: BigPanImageType,
    metadata?: {
      recipeId?: string
      stepNumber?: number
      groupId?: string
      collectionId?: string
    }
  ): Promise<OptimizedUploadResult | null> => {
    if (!user?.id) {
      throw new Error('User must be authenticated to upload images')
    }

    setUploadProgress(0)

    const result = await execute(
      async () => {
        setUploadProgress(25) // Compression started

        const uploadResult = await BigPanImageService.uploadImage(
          imageUri,
          user.id,
          imageType,
          metadata
        )

        setUploadProgress(100) // Upload complete
        return uploadResult
      },
      {
        successMessage: options.showSuccessMessage
          ? 'Bilde lastet opp!'
          : undefined,
        errorMessage: 'Kunne ikke laste opp bilde. Prøv igjen.',
        onSuccess: (data) => options.onSuccess?.(data),
        onError: (error) => options.onError?.(error.message || 'Upload failed'),
        showErrorMethod: 'toast',
        showSuccessMethod: 'toast',
      }
    )

    if (result.success && result.data) {
      return result.data
    }

    return null
  }

  const uploadRecipeSteps = async (
    stepImages: { uri: string; stepNumber: number }[],
    recipeId: string
  ): Promise<OptimizedUploadResult[]> => {
    if (!user?.id) {
      throw new Error('User must be authenticated to upload images')
    }

    setUploadProgress(0)

    const result = await execute<OptimizedUploadResult[]>(
      async () => {
        const uploadResults = await BigPanImageService.uploadRecipeSteps(
          stepImages,
          user.id,
          recipeId
        )

        setUploadProgress(100)
        return uploadResults
      },
      {
        successMessage: `${stepImages.length} bilder lastet opp!`,
        errorMessage: 'Kunne ikke laste opp steg-bilder. Prøv igjen.',
        onSuccess: (data) => {
          // For multiple uploads, we call the success callback with the first result
          if (data && data.length > 0) {
            options.onSuccess?.(data[0])
          }
        },
        onError: (error) => options.onError?.(error.message || 'Upload failed'),
        showErrorMethod: 'toast',
        showSuccessMethod: 'toast',
      }
    )

    return result.success && result.data ? result.data : []
  }

  const deleteImage = async (publicId: string): Promise<boolean> => {
    const result = await execute<boolean>(
      () => BigPanImageService.deleteImage(publicId),
      {
        successMessage: 'Bilde slettet',
        errorMessage: 'Kunne ikke slette bilde',
        showErrorMethod: 'toast',
        showSuccessMethod: 'none',
      }
    )

    return result.success && result.data === true
  }

  return {
    uploadImage,
    uploadRecipeSteps,
    deleteImage,
    uploadProgress,
    isUploading: uploadProgress > 0 && uploadProgress < 100,
  }
}
