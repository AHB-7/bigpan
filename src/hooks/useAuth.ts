import { useEffect, useCallback } from 'react'
import { useAuthStore } from '@/stores/authStore'
import { authService } from '@/services/auth'
import { useAsyncFunction } from './asyncFunction'

export const useAuth = () => {
  const store = useAuthStore()
  const { executeSupabase } = useAsyncFunction()

  // Initialize auth on first load
  useEffect(() => {
    const initAuth = async () => {
      store.setLoading(true)

      try {
        // Get current session
        const { session } = await authService.getSession()
        store.setSession(session)

        // Load preferences if user exists
        if (session?.user) {
          const { data: preferences } = await authService.getPreferences(
            session.user.id
          )
          store.setPreferences(preferences)
        }

        // Listen for auth changes
        const {
          data: { subscription },
        } = authService.onAuthStateChange((session) => {
          store.setSession(session)

          // Clear preferences when logging out
          if (!session) {
            store.setPreferences(null)
          }
        })

        return () => subscription.unsubscribe()
      } finally {
        store.setLoading(false)
      }
    }

    initAuth()
  }, [])

  // Auth operations
  const signIn = useCallback(
    async (email: string, password: string) => {
      return executeSupabase(() => authService.signIn(email, password), {
        successMessage: 'Welcome back!',
        onSuccess: async (data) => {
          if (data?.session) {
            store.setSession(data.session)
            // Load preferences
            const { data: preferences } = await authService.getPreferences(
              data.session.user.id
            )
            store.setPreferences(preferences)
          }
        },
      })
    },
    [executeSupabase, store]
  )

  const signUp = useCallback(
    async (email: string, password: string, username: string) => {
      return executeSupabase(
        () => authService.signUp(email, password, { username }),
        {
          successMessage: 'Account created! Please check your email.',
          onSuccess: (data) => {
            if (data?.session) {
              store.setSession(data.session)
            }
          },
        }
      )
    },
    [executeSupabase, store]
  )

  const signOut = useCallback(async () => {
    return executeSupabase(() => authService.signOut(), {
      onSuccess: () => {
        store.clear()
      },
    })
  }, [executeSupabase, store])

  const updateProfile = useCallback(
    async (updates: any) => {
      if (!store.user?.id) throw new Error('Not authenticated')

      return executeSupabase(
        () => authService.updateProfile(store.user!.id, updates),
        {
          successMessage: 'Profile updated!',
        }
      )
    },
    [executeSupabase, store.user]
  )

  const updatePreferences = useCallback(
    async (preferences: any) => {
      if (!store.user?.id) throw new Error('Not authenticated')

      return executeSupabase(
        () => authService.updatePreferences(store.user!.id, preferences),
        {
          successMessage: 'Preferences updated!',
          onSuccess: (data) => {
            store.setPreferences(data ?? null)
          },
        }
      )
    },
    [executeSupabase, store.user, store]
  )

  return {
    // State
    user: store.user,
    session: store.session,
    userId: store.userId,
    preferences: store.preferences,
    isLoading: store.isLoading,
    isAuthenticated: store.isAuthenticated,

    // Actions
    signIn,
    signUp,
    signOut,
    updateProfile,
    updatePreferences,
  }
}
