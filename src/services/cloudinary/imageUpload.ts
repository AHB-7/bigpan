import { Cloudinary } from 'cloudinary-core'

const cloudinary = new Cloudinary({
  cloud_name: process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  secure: true,
})

export const cloudinaryService = {
  // Upload image to Cloudinary
  async uploadImage(imageUri: string, folder = 'bigpan') {
    const formData = new FormData()
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'recipe-image.jpg',
    } as any)
    formData.append(
      'upload_preset',
      process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    )
    formData.append('folder', folder)

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      const data = await response.json()
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Generate optimized image URL
  getOptimizedUrl(publicId: string, options = {}) {
    return cloudinary.url(publicId, {
      quality: 'auto',
      fetch_format: 'auto',
      ...options,
    })
  },

  // Generate thumbnail URL
  getThumbnailUrl(publicId: string, width = 300, height = 300) {
    return cloudinary.url(publicId, {
      width,
      height,
      crop: 'fill',
      quality: 'auto',
      fetch_format: 'auto',
    })
  },
}
