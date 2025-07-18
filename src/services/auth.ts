import { authService } from './supabase/auth'
import { supabase } from './supabase/client'
import { useAuthStore } from '@/stores/authStore'
import type { User } from '@/types'

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
  async updatePreferences(
    selectedTags: Record<string, string[]>,
    additionalPrefs?: any
  ) {
    const { session } = useAuthStore.getState()

    console.log('🚀 updatePreferences called with:', selectedTags)

    if (!session?.user) {
      console.log('❌ No authenticated user')
      return { success: false, error: 'No authenticated user' }
    }

    try {
      // Step 1: The UUIDs are already correct, so we can use them directly
      const allTagIds = Object.values(selectedTags).flat()
      console.log('✅ Using tag UUIDs directly:', allTagIds)

      // Step 2: Extract specific data for profiles table
      const difficultyTags = selectedTags.difficulty || []
      const dietaryTags = selectedTags.dietary || []
      const cuisineTags = selectedTags.cuisine || []

      const profileUpdates = {
        cooking_level: difficultyTags[0] || 'beginner', // Take first difficulty or default
        dietary_restrictions: dietaryTags,
        favorite_cuisines: cuisineTags,
        updated_at: new Date().toISOString(),
        ...additionalPrefs?.profile,
      }

      console.log('🔄 Updating profiles table with:', profileUpdates)

      const { error: profileError } = await supabase
        .from('profiles')
        .update(profileUpdates)
        .eq('user_id', session.user.id)

      if (profileError) {
        console.log('❌ Profile update failed:', profileError)
        return {
          success: false,
          error: `Profile update failed: ${profileError.message}`,
        }
      }

      console.log('✅ Profile updated successfully')

      // Step 3: Update user_preferences table with proper format
      const preferencesUpdates = {
        preferred_filter_tags: allTagIds,
        blocked_filter_tags: [], // Empty for now, can be set later
        difficulty_preference: difficultyTags[0] || 'beginner',
        updated_at: new Date().toISOString(),
        ...additionalPrefs?.preferences,
      }

      console.log(
        '🔄 Updating user_preferences table with:',
        preferencesUpdates
      )

      const { error: preferencesError } = await supabase
        .from('user_preferences')
        .update(preferencesUpdates)
        .eq('user_id', session.user.id)

      if (preferencesError) {
        console.log('❌ Preferences update failed:', preferencesError)
        return {
          success: false,
          error: `Preferences update failed: ${preferencesError.message}`,
        }
      }

      console.log('✅ All updates successful!')
      return { success: true, data: { profileUpdates, preferencesUpdates } }
    } catch (error: any) {
      console.log('💥 updatePreferences exception:', error)
      return { success: false, error: error.message }
    }
  },
}
