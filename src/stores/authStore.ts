// src/stores/authStore.ts - Fixed with direct userId property
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { User, Session } from '@supabase/supabase-js'
import type { UserPreferences } from '@/types'

interface AuthStore {
  // State
  user: User | null
  session: Session | null
  userId: string | null // ✅ Direct property instead of getter
  preferences: UserPreferences | null
  isLoading: boolean

  // Computed
  get isAuthenticated(): boolean

  // Actions
  setSession: (session: Session | null) => void
  setPreferences: (preferences: UserPreferences | null) => void
  setLoading: (loading: boolean) => void
  clear: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      session: null,
      userId: null, // ✅ Direct property
      preferences: null,
      isLoading: false,

      // Computed
      get isAuthenticated() {
        return !!get().session?.user
      },

      // Actions
      setSession: (session) => {
        console.log('setSession called:', {
          hasSession: !!session,
          sessionId: session?.user?.id,
        })

        set({
          session,
          user: session?.user || null,
          userId: session?.user?.id || null, // ✅ Set userId directly
        })
      },

      setPreferences: (preferences) => set({ preferences }),

      setLoading: (loading) => set({ isLoading: loading }),

      clear: () =>
        set({
          user: null,
          session: null,
          userId: null, // ✅ Clear userId too
          preferences: null,
          isLoading: false,
        }),
    }),
    {
      name: 'bigpan-auth',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        session: state.session,
        userId: state.userId, // ✅ Persist userId
        preferences: state.preferences,
      }),
    }
  )
)
