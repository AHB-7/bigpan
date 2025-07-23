// src/services/auth.ts - Fixed version to prevent logout on hot reload
import { authService } from './supabase/auth'
import { supabase } from './supabase/client'
import { useAuthStore } from '@/stores/authStore'
import type { User } from '@/types'

export const authOperations = {
  async signIn(email: string, password: string) {
    const { setLoading, setSession } = useAuthStore.getState()

    try {
      setLoading(true)
      const { data, error } = await authService.signIn(email, password)

      if (error) {
        return { success: false, error: error.message }
      }

      if (data.session) {
        setSession(data.session)
      }

      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  },

  async signUp(
    email: string,
    password: string,
    username: string,
    additionalData?: {
      termsAccepted?: boolean
      privacyAccepted?: boolean
      cookingLevel?: string
    }
  ): Promise<{ success: boolean; error?: string }> {
    try {
      if (!additionalData?.termsAccepted || !additionalData?.privacyAccepted) {
        return {
          success: false,
          error: 'Du må akseptere bruksvilkårene og personvernserklæringen',
        }
      }

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            display_name: username,
            cooking_level: additionalData.cookingLevel || 'beginner',
            terms_accepted: true,
            privacy_accepted: true,
          },
        },
      })

      if (authError) {
        return { success: false, error: authError.message }
      }

      if (!authData.user) {
        return { success: false, error: 'Ingen bruker opprettet' }
      }

      const profileUpdates = {
        username,
        display_name: username,
        cooking_level: additionalData.cookingLevel || 'beginner',
        terms_accepted: true,
        terms_version: '1.0',
        terms_accepted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .update(profileUpdates)
        .eq('user_id', authData.user.id)

      if (profileError) {
        return {
          success: false,
          error: 'Kunne ikke oppdatere profil med vilkårsaksept. Prøv igjen.',
        }
      }

      const preferencesData = {
        user_id: authData.user.id,
        difficulty_preference: additionalData.cookingLevel || 'beginner',
        serving_size_preference: 2,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      await supabase.from('user_preferences').insert(preferencesData)

      useAuthStore.getState().setSession(authData.session)

      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  async signOut() {
    const { setLoading, clearAuth } = useAuthStore.getState()

    try {
      setLoading(true)
      const { error } = await authService.signOut()

      if (error) {
        return { success: false, error: error.message }
      }

      clearAuth()
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  },

  async initializeAuth() {
    const {
      setLoading,
      setSession,
      setInitialized,
      session,
      isInitialized,
      setUser,
    } = useAuthStore.getState()

    // If already initialized and we have a session, don't reinitialize
    if (isInitialized && session) {
      console.log('Auth already initialized, skipping...')
      return { success: true, subscription: null }
    }

    try {
      // Only set loading if we're not already initialized
      if (!isInitialized) {
        setLoading(true)
      }

      const { session: currentSession } = await authService.getSession()
      if (currentSession) {
        setSession(currentSession)
        const { data: profile } = await authOperations.getCurrentUserProfile()
        if (profile) {
          useAuthStore.getState().setUser(profile)
        }
        console.log('Session found:', currentSession.user.id)
        console.log('Profile found:', profile)
      }

      // Set up auth state listener
      const {
        data: { subscription },
      } = authService.onAuthStateChange((event, session) => {
        console.log('Auth state changed:', event, session?.user?.id)
        setSession(session)
      })

      // Mark as initialized
      setInitialized(true)

      return { success: true, subscription }
    } catch (error) {
      console.error('Failed to initialize auth:', error)
      return { success: false, error: 'Failed to initialize authentication' }
    } finally {
      if (!isInitialized) {
        setLoading(false)
      }
    }
  },

  async getCurrentUserProfile() {
    const { session } = useAuthStore.getState()

    if (!session?.user) {
      return { data: null, error: 'No authenticated user' }
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .single()

      if (error) {
        return { data: null, error: error.message }
      }

      return { data: data as User, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  },

  async updateProfile(updates: Partial<User>) {
    const { session } = useAuthStore.getState()

    if (!session?.user) {
      return { success: false, error: 'No authenticated user' }
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', session.user.id)
        .select()
        .single()

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true, data: data as User }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  async updatePreferences(
    selectedTags: Record<string, string[]>,
    additionalPrefs?: any
  ) {
    const { session } = useAuthStore.getState()

    if (!session?.user) {
      return { success: false, error: 'No authenticated user' }
    }

    try {
      const allTagIds = Object.values(selectedTags).flat()
      let cookingLevelString = 'beginner'

      if (selectedTags.difficulty && selectedTags.difficulty.length > 0) {
        const difficultyTagId = selectedTags.difficulty[0]

        try {
          const { data: difficultyTag, error: tagError } = await supabase
            .from('filter_tags')
            .select('slug, name')
            .eq('id', difficultyTagId)
            .eq('category', 'difficulty')
            .single()

          if (!tagError && difficultyTag) {
            const slugToCookingLevel: Record<string, string> = {
              beginner: 'beginner',
              intermediate: 'intermediate',
              advanced: 'advanced',
              nybegynner: 'beginner',
              øvet: 'intermediate',
              ekspert: 'advanced',
            }

            cookingLevelString =
              slugToCookingLevel[difficultyTag.slug] || 'beginner'
          }
        } catch (error) {
          cookingLevelString = 'beginner'
        }
      }

      const dietaryTags = selectedTags.dietary || []
      const allergenTags = selectedTags.allergens || []
      const cuisineTags = selectedTags.cuisine || []

      const profileUpdates = {
        cooking_level: cookingLevelString,
        dietary_restrictions: dietaryTags,
        allergens: allergenTags,
        favorite_cuisines: cuisineTags,
        updated_at: new Date().toISOString(),
        ...additionalPrefs?.profile,
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .update(profileUpdates)
        .eq('user_id', session.user.id)

      if (profileError) {
        return {
          success: false,
          error: `Profile update failed: ${profileError.message}`,
        }
      }

      const preferencesData = {
        user_id: session.user.id,
        preferred_filter_tags: allTagIds,
        blocked_filter_tags: allergenTags,
        difficulty_preference: cookingLevelString,
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        ...additionalPrefs?.preferences,
      }

      const { error: preferencesError } = await supabase
        .from('user_preferences')
        .upsert(preferencesData, {
          onConflict: 'user_id',
        })

      if (preferencesError) {
        return {
          success: false,
          error: `Preferences update failed: ${preferencesError.message}`,
        }
      }

      return { success: true, data: { profileUpdates, preferencesData } }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },
}
