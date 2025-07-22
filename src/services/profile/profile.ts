// src/services/profile.ts
import { supabase } from '../supabase/client'
import type {
  UserWithStats,
  EnhancedUserProfile,
  ProfileStats,
  RecentRecipe,
  PopularRecipe,
  RecentCollection,
  UserRecipeCount,
  UserBasicStats,
  UserRecipeStats,
  UserSocialStats,
  UserCollectionStats,
} from '@/types'

export const profileService = {
  /**
   * Get enhanced profile using single database function call
   * Uses the get_user_profile_with_stats_safe function from your Supabase schema
   */
  async getEnhancedProfile(userId: string): Promise<{
    data: EnhancedUserProfile | null
    error: string | null
  }> {
    try {
      const { data, error } = await supabase.rpc(
        'get_user_profile_with_stats_safe',
        {
          user_id_param: userId,
        }
      )

      if (error) {
        return { data: null, error: error.message }
      }

      if (
        !data ||
        (typeof data === 'object' && data !== null && 'error' in data)
      ) {
        const errorMsg =
          typeof data === 'object' && data !== null && 'error' in data
            ? ((data as { error?: string }).error ?? 'Profile not found')
            : 'Profile not found'
        return { data: null, error: errorMsg }
      }

      // Transform the database response to match our EnhancedUserProfile interface
      const result = data as any // The function returns JSON, so we need to cast it

      const enhancedProfile: EnhancedUserProfile = {
        // Profile data (from profiles table)
        ...result.profile,

        // UserWithStats properties
        is_following: false, // Will be set based on viewer relationship
        is_friend: false, // Will be set based on viewer relationship

        // Enhanced statistics - safely extract nested data
        stats: {
          // Recipe stats
          recipes_total: result.stats?.recipes?.recipes_total || 0,
          recipes_published: result.stats?.recipes?.recipes_published || 0,
          recipes_draft: result.stats?.recipes?.recipes_draft || 0,
          recipes_archived: result.stats?.recipes?.recipes_archived || 0,
          total_views: result.stats?.recipes?.total_views || 0,
          total_likes: result.stats?.recipes?.total_likes || 0,
          total_saves: result.stats?.recipes?.total_saves || 0,
          avg_rating: result.stats?.recipes?.avg_rating || 0,
          total_prep_time: result.stats?.recipes?.total_prep_time || 0,
          total_cook_time: result.stats?.recipes?.total_cook_time || 0,

          // Social stats
          followers_count: result.stats?.social?.followers_count || 0,
          following_count: result.stats?.social?.following_count || 0,
          friends_count: result.stats?.social?.friends_count || 0,
          cooking_attempts_count:
            result.stats?.social?.cooking_attempts_count || 0,
          groups_joined: result.stats?.social?.groups_joined || 0,
          challenges_completed: result.stats?.social?.challenges_completed || 0,

          // Collection stats
          collections_total: result.stats?.collections?.collections_total || 0,
          collections_personal:
            result.stats?.collections?.collections_personal || 0,
          collections_collaborative:
            result.stats?.collections?.collections_collaborative || 0,
          collections_meal_plans:
            result.stats?.collections?.collections_meal_plans || 0,
          total_recipes_in_collections:
            result.stats?.collections?.total_recipes_in_collections || 0,
          avg_collection_rating:
            result.stats?.collections?.avg_collection_rating || 0,
        },

        // Recent content
        recent_recipes: result.recent_recipes || [],
        popular_recipes: result.popular_recipes || [],
        recent_collections: result.recent_collections || [],
        generated_at: result.generated_at || new Date().toISOString(),
      }

      return { data: enhancedProfile, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  },

  /**
   * Get current user's profile (convenience method)
   */
  async getCurrentUserEnhancedProfile(): Promise<{
    data: EnhancedUserProfile | null
    error: string | null
  }> {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { data: null, error: 'Not authenticated' }
    }

    return this.getEnhancedProfile(user.id)
  },

  /**
   * Get basic profile only (fast for when you don't need stats)
   */
  async getBasicProfile(userId: string): Promise<{
    data: UserWithStats | null
    error: string | null
  }> {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error) {
        return { data: null, error: error.message }
      }

      return {
        data: {
          ...profile,
          is_following: false,
          is_friend: false,
        },
        error: null,
      }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  },

  /**
   * Get just the recipe count (lightest possible call)
   * Uses the get_user_recipe_count function from your schema
   */
  async getRecipeCount(userId: string): Promise<{
    data: number | null
    error: string | null
  }> {
    try {
      const { data, error } = await supabase.rpc('get_user_recipe_count', {
        user_id_param: userId,
      })

      if (error) {
        return { data: null, error: error.message }
      }

      return { data: data as UserRecipeCount, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  },

  /**
   * Get basic stats only
   * Uses the get_user_basic_stats_v2 function from your schema
   */
  async getBasicStats(userId: string): Promise<{
    data: any | null
    error: string | null
  }> {
    try {
      const { data, error } = await supabase.rpc('get_user_basic_stats_v2', {
        user_id_param: userId,
      })

      if (error) {
        return { data: null, error: error.message }
      }

      return { data: data as UserBasicStats, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  },

  /**
   * Get recipe statistics only
   * Uses the get_user_recipe_stats function from your schema
   */
  async getRecipeStats(userId: string): Promise<{
    data: any | null
    error: string | null
  }> {
    try {
      const { data, error } = await supabase.rpc('get_user_recipe_stats', {
        user_id_param: userId,
      })

      if (error) {
        return { data: null, error: error.message }
      }

      return { data: data as UserRecipeStats, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  },

  /**
   * Get social statistics only
   * Uses the get_user_social_stats_safe function from your schema
   */
  async getSocialStats(userId: string): Promise<{
    data: any | null
    error: string | null
  }> {
    try {
      const { data, error } = await supabase.rpc('get_user_social_stats_safe', {
        user_id_param: userId,
      })

      if (error) {
        return { data: null, error: error.message }
      }

      return { data: data as UserSocialStats, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  },

  /**
   * Get collection statistics only
   * Uses the get_user_collection_stats function from your schema
   */
  async getCollectionStats(userId: string): Promise<{
    data: any | null
    error: string | null
  }> {
    try {
      const { data, error } = await supabase.rpc('get_user_collection_stats', {
        user_id_param: userId,
      })

      if (error) {
        return { data: null, error: error.message }
      }

      return { data: data as UserCollectionStats, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  },

  /**
   * Update relationship status for social features
   */
  async updateRelationshipStatus(
    profile: EnhancedUserProfile,
    viewerId: string
  ): Promise<EnhancedUserProfile> {
    if (profile.user_id === viewerId) {
      return profile // Own profile, no relationship status needed
    }

    try {
      const { data: connection } = await supabase
        .from('user_connections')
        .select('status, connection_type')
        .or(`requester_id.eq.${viewerId},addressee_id.eq.${viewerId}`)
        .or(
          `requester_id.eq.${profile.user_id},addressee_id.eq.${profile.user_id}`
        )
        .eq('status', 'accepted')
        .single()

      return {
        ...profile,
        is_following: !!connection && connection.connection_type !== 'friend',
        is_friend: !!connection && connection.connection_type === 'friend',
      }
    } catch {
      return profile // If query fails, return profile without relationship status
    }
  },

  /**
   * Test if the database functions are working properly
   * Useful for debugging and ensuring all functions exist
   */
  async testDatabaseFunctions(userId: string): Promise<{
    success: boolean
    results: any
    errors: string[]
  }> {
    const errors: string[] = []
    const results: any = {}

    try {
      // Test each function individually
      const tests = [
        {
          name: 'recipe_count',
          fn: () =>
            supabase.rpc('get_user_recipe_count', { user_id_param: userId }),
        },
        {
          name: 'basic_stats',
          fn: () =>
            supabase.rpc('get_user_basic_stats_v2', { user_id_param: userId }),
        },
        {
          name: 'recipe_stats',
          fn: () =>
            supabase.rpc('get_user_recipe_stats', { user_id_param: userId }),
        },
        {
          name: 'social_stats',
          fn: () =>
            supabase.rpc('get_user_social_stats_safe', {
              user_id_param: userId,
            }),
        },
        {
          name: 'collection_stats',
          fn: () =>
            supabase.rpc('get_user_collection_stats', {
              user_id_param: userId,
            }),
        },
        {
          name: 'full_profile',
          fn: () =>
            supabase.rpc('get_user_profile_with_stats_safe', {
              user_id_param: userId,
            }),
        },
      ]

      for (const test of tests) {
        try {
          const result = await test.fn()
          if (result.error) {
            errors.push(`${test.name}: ${result.error.message}`)
          } else {
            results[test.name] = result.data
          }
        } catch (error: any) {
          errors.push(`${test.name}: ${error.message}`)
        }
      }

      return {
        success: errors.length === 0,
        results,
        errors,
      }
    } catch (error: any) {
      return {
        success: false,
        results: {},
        errors: [error.message],
      }
    }
  },

  /**
   * Check if database functions exist in your Supabase instance
   */
  async checkFunctionExistence(): Promise<{
    exists: boolean
    missing: string[]
    error: string | null
  }> {
    try {
      const requiredFunctions = [
        'get_user_recipe_count',
        'get_user_basic_stats_v2',
        'get_user_recipe_stats',
        'get_user_social_stats_safe',
        'get_user_collection_stats',
        'get_user_profile_with_stats_safe',
      ]

      const missing: string[] = []

      // Test each function with a dummy UUID to see if it exists
      const testUserId = '00000000-0000-0000-0000-000000000000'

      for (const functionName of requiredFunctions) {
        try {
          await supabase.rpc(functionName as any, { user_id_param: testUserId })
          // If we get here, function exists (even if it returns an error for dummy UUID)
        } catch (error: any) {
          if (
            error.message.includes('function') &&
            error.message.includes('does not exist')
          ) {
            missing.push(functionName)
          }
          // Other errors (like invalid UUID) mean the function exists
        }
      }

      return {
        exists: missing.length === 0,
        missing,
        error: null,
      }
    } catch (error: any) {
      return {
        exists: false,
        missing: [],
        error: error.message,
      }
    }
  },
}

// Re-export types for convenience
export type {
  EnhancedUserProfile,
  ProfileStats,
  RecentRecipe,
  PopularRecipe,
  RecentCollection,
}
