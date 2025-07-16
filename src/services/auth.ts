import { authService } from './supabase/auth'
import { useAuthStore } from '@/stores/authStore'

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

      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  },

  async signUp(email: string, password: string, userData?: any) {
    const { setLoading } = useAuthStore.getState()

    try {
      setLoading(true)
      const { data, error } = await authService.signUp(
        email,
        password,
        userData
      )

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true, data }
    } catch (error: any) {
      return { success: false, error: error.message }
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
        setSession(session)
      }

      // Set up auth listener
      authService.onAuthStateChange((event, session) => {
        console.log('Auth event:', event)
        setSession(session)
      })
    } catch (error) {
      console.error('Auth initialization error:', error)
    } finally {
      setLoading(false)
    }
  },
}
