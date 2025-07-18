import { supabase } from './supabase/client'
import type { Database } from '@/types/supabase'

type FilterTag = Database['public']['Tables']['filter_tags']['Row']

// Define the category type based on your check constraint
export type FilterTagCategory =
  | 'dietary'
  | 'allergens'
  | 'cuisine'
  | 'meal_type'
  | 'cooking_method'
  | 'difficulty'
  | 'time'
  | 'equipment'
  | 'season'
  | 'occasion'

export interface FilterTagsGrouped {
  dietary: FilterTag[]
  cuisine: FilterTag[]
  meal_type: FilterTag[]
  cooking_method: FilterTag[]
  difficulty: FilterTag[]
  time: FilterTag[]
  equipment: FilterTag[]
  season: FilterTag[]
  occasion: FilterTag[]
}

export const filterTagsService = {
  /**
   * Get all active filter tags
   */
  async getAllTags(): Promise<{
    data: FilterTag[] | null
    error: string | null
  }> {
    try {
      const { data, error } = await supabase
        .from('filter_tags')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })

      if (error) {
        return { data: null, error: error.message }
      }

      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  },

  /**
   * Get filter tags by category
   */
  async getTagsByCategory(
    category: FilterTagCategory
  ): Promise<{ data: FilterTag[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('filter_tags')
        .select('*')
        .eq('category', category)
        .eq('is_active', true)
        .order('sort_order', { ascending: true })

      if (error) {
        return { data: null, error: error.message }
      }

      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  },

  /**
   * Get multiple categories at once - perfect for onboarding
   */
  async getTagsByCategories(
    categories: FilterTagCategory[]
  ): Promise<{ data: FilterTagsGrouped | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('filter_tags')
        .select('*')
        .in('category', categories)
        .eq('is_active', true)
        .order('sort_order', { ascending: true })

      if (error) {
        return { data: null, error: error.message }
      }

      // Group by category
      const grouped: any = {}
      categories.forEach((category) => {
        grouped[category] =
          data?.filter((tag) => tag.category === category) || []
      })

      return { data: grouped as FilterTagsGrouped, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  },

  /**
   * Get tags by their IDs - useful for displaying user's selected tags
   */
  async getTagsByIds(
    tagIds: string[]
  ): Promise<{ data: FilterTag[] | null; error: string | null }> {
    if (!tagIds.length) {
      return { data: [], error: null }
    }

    try {
      const { data, error } = await supabase
        .from('filter_tags')
        .select('*')
        .in('id', tagIds)
        .eq('is_active', true)

      if (error) {
        return { data: null, error: error.message }
      }

      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  },

  /**
   * Search filter tags - useful for recipe filtering
   */
  async searchTags(
    query: string,
    categories?: FilterTagCategory[]
  ): Promise<{ data: FilterTag[] | null; error: string | null }> {
    try {
      let queryBuilder = supabase
        .from('filter_tags')
        .select('*')
        .eq('is_active', true)

      if (categories && categories.length > 0) {
        queryBuilder = queryBuilder.in('category', categories)
      }

      queryBuilder = queryBuilder
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
        .order('sort_order', { ascending: true })

      const { data, error } = await queryBuilder

      if (error) {
        return { data: null, error: error.message }
      }

      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  },

  /**
   * Map tag slugs to UUIDs - for onboarding data conversion
   */
  async mapSlugsToIds(
    slugs: string[]
  ): Promise<{ data: string[] | null; error: string | null }> {
    if (!slugs.length) {
      return { data: [], error: null }
    }

    try {
      const { data, error } = await supabase
        .from('filter_tags')
        .select('id, slug')
        .in('slug', slugs)
        .eq('is_active', true)

      if (error) {
        return { data: null, error: error.message }
      }

      const tagIds = data?.map((tag) => tag.id) || []
      return { data: tagIds, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  },
}
