// src/stores/authStore.ts - Fixed version to prevent logout on hot reload
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { User, UserPreferencesTyped } from '@/types'
import type { Session, User as SupabaseUser } from '@supabase/supabase-js'

interface AuthStore {
  user: User | null
  session: Session | null
  preferences: UserPreferencesTyped | null
  isLoading: boolean
  isInitialized: boolean // Add this flag

  get isAuthenticated(): boolean

  setUser: (user: User | null) => void
  setSession: (session: Session | null) => void
  setPreferences: (preferences: UserPreferencesTyped) => void
  setLoading: (loading: boolean) => void
  setInitialized: (initialized: boolean) => void // Add this action
  updateUser: (updates: Partial<User>) => void
  clearAuth: () => void
}

const convertSupabaseUserToUser = (
  supabaseUser: SupabaseUser
): Partial<User> => {
  return {
    id: supabaseUser.id,
    user_id: supabaseUser.id,
    username:
      supabaseUser.user_metadata?.username ||
      supabaseUser.email?.split('@')[0] ||
      '',
    display_name:
      supabaseUser.user_metadata?.display_name ||
      supabaseUser.user_metadata?.username ||
      '',
    bio: supabaseUser.user_metadata?.bio || null,
    avatar_url: supabaseUser.user_metadata?.avatar_url || null,
    cooking_level: supabaseUser.user_metadata?.cooking_level || null,
    dietary_restrictions:
      supabaseUser.user_metadata?.dietary_restrictions || null,
    allergens: supabaseUser.user_metadata?.allergens || null,
    favorite_cuisines: supabaseUser.user_metadata?.favorite_cuisines || null,
    location: supabaseUser.user_metadata?.location || null,
    is_verified: supabaseUser.user_metadata?.is_verified || null,
    created_at: supabaseUser.created_at || null,
    updated_at: supabaseUser.updated_at || null,
    privacy_settings: null,
  }
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      preferences: null,
      isLoading: false,
      isInitialized: false,

      get isAuthenticated() {
        return !!get().session?.user
      },

      setUser: (user) => set({ user }),

      setSession: (session) => {
        let user: User | null = null

        if (session?.user) {
          const convertedUser = convertSupabaseUserToUser(session.user)
          user = convertedUser as User
        }

        set({ session, user })
      },

      setPreferences: (preferences) => set({ preferences }),

      setLoading: (loading) => {
        // Only set loading if we're not already initialized with a session
        // This prevents clearing auth state during hot reloads
        const currentState = get()
        if (!currentState.isInitialized || !currentState.session) {
          set({ isLoading: loading })
        }
      },

      setInitialized: (initialized) => set({ isInitialized: initialized }),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      clearAuth: () =>
        set({
          user: null,
          session: null,
          preferences: null,
          isLoading: false,
          isInitialized: false,
        }),
    }),
    {
      name: 'bigpan-auth',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        preferences: state.preferences,
        session: state.session, // Also persist session
        isInitialized: state.isInitialized, // Persist this flag
      }),
    }
  )
)
