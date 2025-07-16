import { useAuthStore } from '@/stores/authStore'
import { authOperations } from '@/services/auth'

export const useAuth = () => {
  const store = useAuthStore()

  return {
    // State from store
    user: store.user,
    session: store.session,
    preferences: store.preferences,
    isLoading: store.isLoading,
    isAuthenticated: store.isAuthenticated,

    // Operations
    signIn: authOperations.signIn,
    signUp: authOperations.signUp,
    signOut: authOperations.signOut,
    initializeAuth: authOperations.initializeAuth,

    // Direct store actions (for advanced use)
    setUser: store.setUser,
    updateUser: store.updateUser,
    setPreferences: store.setPreferences,
  }
}
