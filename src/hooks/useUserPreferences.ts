// src/hooks/useUserPreferences.ts - Clean implementation using your existing types
import { useState, useEffect } from 'react'
import { useAuth } from './useAuth'
import { useAsyncFunction } from './asyncFunction'
import { supabase } from '@/services/supabase/client'
import type { UserPreferences, UserPreferencesTyped } from '@/types'

export const useUserPreferences = () => {
  const { user, preferences, setPreferences } = useAuth()
  const { executeSupabase } = useAsyncFunction()
  const [isLoading, setIsLoading] = useState(false)

  /**
   * Load user preferences from database
   */
  const loadPreferences = async () => {
    if (!user?.id) return

    setIsLoading(true)

    await executeSupabase(
      async () => {
        const { data, error } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (error && error.code !== 'PGRST116') {
          throw error
        }

        return { data, error: null }
      },
      {
        showErrorMethod: 'none',
        onSuccess: (data) => {
          if (data) {
            setPreferences(data as UserPreferencesTyped)
          }
        },
        onError: (error) => {
          console.log('No preferences found, will create on first save:', error)
        },
      }
    )

    setIsLoading(false)
  }

  /**
   * Save onboarding preferences from tag selection
   */
  const saveOnboardingPreferences = async (
    selectedTags: Record<string, string[]>
  ) => {
    if (!user?.id) return { success: false, error: 'User not authenticated' }

    // Flatten all selected tags
    const allTagIds = Object.values(selectedTags).flat()

    return executeSupabase(
      async () => {
        const { data, error } = await supabase
          .from('user_preferences')
          .upsert(
            {
              user_id: user.id,
              preferred_filter_tags: allTagIds,
              blocked_filter_tags: selectedTags.allergens || [],
              difficulty_preference: selectedTags.difficulty?.length
                ? 'intermediate'
                : 'beginner',
              cooking_time_preference: selectedTags.time?.length ? 45 : 60,
              serving_size_preference: 2,
              budget_preference: 'medium',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            {
              onConflict: 'user_id',
            }
          )
          .select()
          .single()

        if (error) throw error
        return { data, error: null }
      },
      {
        showErrorMethod: 'toast',
        successMessage: 'Preferanser lagret!',
        onSuccess: (data) => {
          if (data) {
            setPreferences(data as UserPreferencesTyped)
          }
        },
      }
    )
  }

  /**
   * Update specific preference fields
   */
  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    if (!user?.id) return { success: false, error: 'User not authenticated' }

    return executeSupabase(
      async () => {
        const { data, error } = await supabase
          .from('user_preferences')
          .upsert(
            {
              user_id: user.id,
              ...updates,
              updated_at: new Date().toISOString(),
            },
            {
              onConflict: 'user_id',
            }
          )
          .select()
          .single()

        if (error) throw error
        return { data, error: null }
      },
      {
        showErrorMethod: 'toast',
        successMessage: 'Preferanser oppdatert!',
        onSuccess: (data) => {
          if (data) {
            setPreferences(data as UserPreferencesTyped)
          }
        },
      }
    )
  }

  /**
   * Get personalized recipe recommendations based on preferences
   */
  const getRecommendations = async (limit: number = 10) => {
    if (!user?.id) {
      return { data: [], error: 'User not authenticated' }
    }

    return executeSupabase(
      async () => {
        // Build query based on user preferences
        let query = supabase
          .from('recipes')
          .select(
            `
            *,
            profiles!recipes_author_id_fkey(username, display_name, avatar_url)
          `
          )
          .eq('status', 'published')
          .eq('visibility', 'public')

        // Apply preference filters if available
        if (preferences?.preferred_filter_tags?.length) {
          query = query.overlaps(
            'filter_tag_ids',
            preferences.preferred_filter_tags
          )
        }

        // Exclude allergens/blocked tags
        if (preferences?.blocked_filter_tags?.length) {
          query = query.not(
            'filter_tag_ids',
            'ov',
            preferences.blocked_filter_tags
          )
        }

        // Filter by cooking time if set
        if (preferences?.cooking_time_preference) {
          query = query.lte(
            'total_time_minutes',
            preferences.cooking_time_preference
          )
        }

        const { data, error } = await query
          .order('average_rating', { ascending: false })
          .order('like_count', { ascending: false })
          .limit(limit)

        if (error) throw error
        return { data, error: null }
      },
      {
        showErrorMethod: 'none',
      }
    )
  }

  /**
   * Check if user has completed onboarding
   */
  const hasCompletedOnboarding = () => {
    return !!preferences?.preferred_filter_tags?.length
  }

  // Load preferences when user changes
  useEffect(() => {
    if (user?.id && !preferences) {
      loadPreferences()
    }
  }, [user?.id])

  return {
    preferences,
    isLoading,
    loadPreferences,
    saveOnboardingPreferences,
    updatePreferences,
    getRecommendations,
    hasCompletedOnboarding: hasCompletedOnboarding(),
  }
}
