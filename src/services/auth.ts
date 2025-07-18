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
      // Step 1: Check if terms are accepted
      if (!additionalData?.termsAccepted || !additionalData?.privacyAccepted) {
        return {
          success: false,
          error: 'Du må akseptere bruksvilkårene og personvernserklæringen',
        }
      }

      // Step 2: Sign up with Supabase Auth
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
        console.log('❌ Auth signup failed:', authError)
        return { success: false, error: authError.message }
      }

      if (!authData.user) {
        return { success: false, error: 'Ingen bruker opprettet' }
      }

      // Step 3: Update existing profile with terms acceptance
      // Supabase Auth already created the profile, we just need to update it
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
        console.log('❌ Profile creation failed:', profileError)

        // If profile update fails, log the error but don't fail the signup
        return {
          success: false,
          error: 'Kunne ikke oppdatere profil med vilkårsaksept. Prøv igjen.',
        }
      }

      // Step 4: Create user preferences record
      const preferencesData = {
        user_id: authData.user.id,
        difficulty_preference: additionalData.cookingLevel || 'beginner',
        serving_size_preference: 2,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      const { error: preferencesError } = await supabase
        .from('user_preferences')
        .insert(preferencesData)

      if (preferencesError) {
        console.log('⚠️ User preferences creation failed:', preferencesError)
        // This is not critical, user can set preferences later
      }

      console.log('✅ User signup successful with terms acceptance')

      // Update the auth store
      useAuthStore.getState().setSession(authData.session)

      return { success: true }
    } catch (error: any) {
      console.log('💥 Signup exception:', error)
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

    console.log('🚀 updatePreferences called with:', selectedTags)

    if (!session?.user) {
      console.log('❌ No authenticated user')
      return { success: false, error: 'No authenticated user' }
    }

    try {
      // Step 1: Process tag UUIDs
      const allTagIds = Object.values(selectedTags).flat()
      console.log('✅ Using tag UUIDs directly:', allTagIds)

      // Step 2: Map difficulty UUID to cooking_level string
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
            console.log(
              `✅ Mapped difficulty UUID ${difficultyTagId} to cooking_level: ${cookingLevelString}`
            )
          }
        } catch (error) {
          console.log('⚠️ Could not map difficulty tag, using default:', error)
        }
      }

      // Step 3: Extract specific data for profiles table
      const dietaryTags = selectedTags.dietary || []
      const allergenTags = selectedTags.allergens || []
      const cuisineTags = selectedTags.cuisine || []

      // Step 4: Update profiles table
      const profileUpdates = {
        cooking_level: cookingLevelString,
        dietary_restrictions: dietaryTags,
        allergens: allergenTags,
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

      // Step 5: Handle user_preferences table with UPSERT
      const preferencesData = {
        user_id: session.user.id,
        preferred_filter_tags: allTagIds,
        blocked_filter_tags: allergenTags,
        difficulty_preference: cookingLevelString,
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString(), // In case it's a new record
        ...additionalPrefs?.preferences,
      }

      console.log('🔄 Upserting user_preferences table with:', preferencesData)

      // Use UPSERT to insert or update
      const { error: preferencesError } = await supabase
        .from('user_preferences')
        .upsert(preferencesData, {
          onConflict: 'user_id', // Use user_id as the conflict resolution column
        })

      if (preferencesError) {
        console.log('❌ Preferences upsert failed:', preferencesError)
        return {
          success: false,
          error: `Preferences update failed: ${preferencesError.message}`,
        }
      }

      console.log('✅ All updates successful!')
      return { success: true, data: { profileUpdates, preferencesData } }
    } catch (error: any) {
      console.log('💥 updatePreferences exception:', error)
      return { success: false, error: error.message }
    }
  },
}
