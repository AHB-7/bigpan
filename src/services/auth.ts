import { authService } from './supabase/auth'
import { supabase } from './supabase/client'
import { useAuthStore } from '@/stores/authStore'
import type { User   } from '@/types'

// Simplified auth operations
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

  async signUp(email: string, password: string, username: string) {
    const { setLoading } = useAuthStore.getState()

    try {
      setLoading(true)

      console.log('🚀 Starting signUp with:', { email, username })

      // Step 1: Create user account
      const { data, error } = await authService.signUp(email, password, {
        username: username,
        display_name: username,
      })

      console.log('📊 Supabase signUp result:', {
        hasData: !!data,
        hasUser: !!data?.user,
        hasSession: !!data?.session,
        error: error?.message,
      })

      if (error) {
        console.log('❌ SignUp error:', error.message)
        return { success: false, error: error.message }
      }

      if (!data?.user) {
        console.log('⚠️ No user created')
        return { success: false, error: 'Kunne ikke opprette konto' }
      }

      console.log('✅ User created successfully:', data.user.id)

      // Step 2: If no session, sign in the user
      if (!data.session) {
        console.log('🔐 No session from signup, attempting sign in...')

        const signInResult = await authOperations.signIn(email, password)
        if (!signInResult.success) {
          return {
            success: false,
            error:
              'Konto opprettet, men kunne ikke logge inn automatisk. Prøv å logge inn manuelt.',
          }
        }
        console.log('✅ Auto sign-in successful')
      } else {
        console.log('✅ Session created from signup')
      }

      return {
        success: true,
        data,
        message: 'Konto opprettet! Velkommen til BigPan!',
      }
    } catch (error: any) {
      console.log('💥 SignUp exception:', error.message)
      return {
        success: false,
        error: error.message || 'Kunne ikke opprette konto',
      }
    } finally {
      setLoading(false)
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
    const { setLoading, setSession } = useAuthStore.getState()

    try {
      setLoading(true)

      // Get current session
      const { session } = await authService.getSession()
      if (session) {
        console.log('🔐 Existing session found, setting auth state')
        setSession(session)
      }

      // Set up auth state change listener (only once)
      const {
        data: { subscription },
      } = authService.onAuthStateChange((event, session) => {
        console.log('🔄 Auth event:', event, session?.user?.id || 'no user')
        setSession(session)
      })

      // Return the subscription for cleanup if needed
      return { success: true, subscription }
    } catch (error) {
      console.error('Auth initialization error:', error)
      return { success: false, error: 'Failed to initialize authentication' }
    } finally {
      setLoading(false)
    }
  },

  // Helper to get current user profile (only if needed elsewhere)
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

  // Helper to update user profile
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

  // New function to update user preferences with filter tag mapping
  async updatePreferences(preferences: any) {
    const { session } = useAuthStore.getState()

    if (!session?.user) {
      return { success: false, error: 'No authenticated user' }
    }

    try {
      // Step 1: Map frontend strings to filter tag UUIDs
      const preferredTagUUIDs = await this.mapPreferencesToFilterTags(
        preferences.dietary_restrictions,
        preferences.favorite_cuisines,
        preferences.cooking_level
      )

      if (!preferredTagUUIDs.success) {
        return { success: false, error: preferredTagUUIDs.error }
      }

      // Step 2: Update profiles table (for display/search purposes)
      const profileUpdates = {
        cooking_level: preferences.cooking_level,
        dietary_restrictions: preferences.dietary_restrictions,
        allergens: preferences.allergens,
        favorite_cuisines: preferences.favorite_cuisines,
        updated_at: new Date().toISOString(),
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

      // Step 3: Update user_preferences table with proper format
      const preferencesUpdates = {
        preferred_filter_tags: preferredTagUUIDs.data,
        blocked_filter_tags: [], // Empty for now, can be set later
        cooking_time_preference: preferences.cooking_time_preference,
        difficulty_preference: preferences.cooking_level,
        serving_size_preference: preferences.serving_size_preference,
        equipment_owned: preferences.equipment_owned,
        updated_at: new Date().toISOString(),
      }

      const { error: preferencesError } = await supabase
        .from('user_preferences')
        .update(preferencesUpdates)
        .eq('user_id', session.user.id)

      if (preferencesError) {
        return {
          success: false,
          error: `Preferences update failed: ${preferencesError.message}`,
        }
      }

      return { success: true, data: { profileUpdates, preferencesUpdates } }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },

  // Helper function to map preference strings to filter tag UUIDs
  async mapPreferencesToFilterTags(
    dietaryRestrictions: string[],
    cuisines: string[],
    cookingLevel: string
  ) {
    try {
      const allPreferenceStrings = [
        ...(dietaryRestrictions || []),
        ...(cuisines || []),
        cookingLevel,
      ].filter(Boolean)

      if (allPreferenceStrings.length === 0) {
        return { success: true, data: [] }
      }

      // Query filter_tags table to get UUIDs for the preference strings
      const { data: filterTags, error } = await supabase
        .from('filter_tags')
        .select('id, slug')
        .in('slug', allPreferenceStrings)
        .eq('is_active', true)

      if (error) {
        return {
          success: false,
          error: `Failed to fetch filter tags: ${error.message}`,
        }
      }

      // Return array of UUIDs
      const tagUUIDs = filterTags?.map((tag) => tag.id) || []
      return { success: true, data: tagUUIDs }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  },
}
