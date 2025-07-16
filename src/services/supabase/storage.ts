import { supabase } from './client'

export const storageService = {
  // Upload image to Supabase storage
  async uploadImage(file: File | Blob, bucket: string, path: string) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file)

    if (error) return { data: null, error }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(path)

    return { data: { ...data, publicUrl }, error: null }
  },

  // Delete image from storage
  async deleteImage(bucket: string, path: string) {
    const { data, error } = await supabase.storage.from(bucket).remove([path])
    return { data, error }
  },

  // Get public URL for image
  getPublicUrl(bucket: string, path: string) {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path)
    return data.publicUrl
  },
}
