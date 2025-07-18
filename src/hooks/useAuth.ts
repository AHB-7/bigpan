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

    // Operations - expects (email, password, username)
    signIn: authOperations.signIn,
    signUp: authOperations.signUp, // This expects (email, password, username)
    signOut: authOperations.signOut,
    initializeAuth: authOperations.initializeAuth,

    // Profile functions
    getCurrentUserProfile: authOperations.getCurrentUserProfile,
    updateProfile: authOperations.updateProfile,
    updatePreferences: authOperations.updatePreferences,

    // Direct store actions
    setUser: store.setUser,
    updateUser: store.updateUser,
    setPreferences: store.setPreferences,
  }
}
