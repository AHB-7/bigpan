// src/hooks/useProfileUpdate.ts - Simple profile updates using your existing structure
import { useAuth } from './useAuth'
import { useUserPreferences } from './useUserPreferences'
import { useAsyncFunction } from './asyncFunction'
import type { User, UserPreferences } from '@/types'

export const useProfileUpdate = () => {
  const { user, updateProfile } = useAuth()
  const { updatePreferences } = useUserPreferences()
  const { executeSupabase } = useAsyncFunction()

  /**
   * Update profile information (bio, display_name, cooking_level, etc.)
   */
  const updateUserProfile = async (updates: Partial<User>) => {
    if (!user?.id) {
      throw new Error('User not authenticated')
    }

    return executeSupabase(() => updateProfile(updates), {
      showErrorMethod: 'toast',
      successMessage: 'Profil oppdatert!',
      errorMessage: 'Kunne ikke oppdatere profil',
    })
  }

  /**
   * Update user preferences (dietary, time, etc.)
   */
  const updateUserPreferences = async (updates: Partial<UserPreferences>) => {
    return executeSupabase(() => updatePreferences(updates), {
      showErrorMethod: 'toast',
      successMessage: 'Preferanser oppdatert!',
      errorMessage: 'Kunne ikke oppdatere preferanser',
    })
  }

  /**
   * Update both profile and preferences in one go (useful for settings screen)
   */
  const updateProfileAndPreferences = async (
    profileUpdates: Partial<User>,
    preferenceUpdates?: Partial<UserPreferences>
  ) => {
    const results = await Promise.allSettled([
      updateUserProfile(profileUpdates),
      preferenceUpdates
        ? updateUserPreferences(preferenceUpdates)
        : Promise.resolve({ success: true }),
    ])

    const profileResult = results[0]
    const preferencesResult = results[1]

    const success =
      profileResult.status === 'fulfilled' &&
      preferencesResult.status === 'fulfilled'

    if (success) {
      return { success: true }
    } else {
      const errors = []
      if (profileResult.status === 'rejected')
        errors.push('Profil: ' + profileResult.reason)
      if (preferencesResult.status === 'rejected')
        errors.push('Preferanser: ' + preferencesResult.reason)

      return { success: false, error: errors.join(', ') }
    }
  }

  /**
   * Add filter tags to user preferences
   */
  const addFilterTags = async (tagIds: string[]) => {
    const { preferences } = useUserPreferences()
    const existingTags = preferences?.preferred_filter_tags || []
    const newTags = [...new Set([...existingTags, ...tagIds])]

    return updateUserPreferences({
      preferred_filter_tags: newTags,
    })
  }

  /**
   * Remove filter tags from user preferences
   */
  const removeFilterTags = async (tagIds: string[]) => {
    const { preferences } = useUserPreferences()
    const existingTags = preferences?.preferred_filter_tags || []
    const filteredTags = existingTags.filter((id) => !tagIds.includes(id))

    return updateUserPreferences({
      preferred_filter_tags: filteredTags,
    })
  }

  /**
   * Block specific filter tags (allergens, etc.)
   */
  const blockFilterTags = async (tagIds: string[]) => {
    const { preferences } = useUserPreferences()
    const existingBlocked = preferences?.blocked_filter_tags || []
    const newBlocked = [...new Set([...existingBlocked, ...tagIds])]

    return updateUserPreferences({
      blocked_filter_tags: newBlocked,
    })
  }

  return {
    updateUserProfile,
    updateUserPreferences,
    updateProfileAndPreferences,
    addFilterTags,
    removeFilterTags,
    blockFilterTags,
  }
}
