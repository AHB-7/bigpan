// src/services/auth.ts - Clean business logic only
import { supabase } from './supabase/client'
import type { User, UserPreferences } from '@/types'

export const authService = {
  // Pure authentication operations
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  async signUp(
    email: string,
    password: string,
    userData: { username: string }
  ) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: userData.username,
          display_name: userData.username,
        },
      },
    })
    return { data, error }
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  async getSession() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()
    return { session, error }
  },

  // Profile operations
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single()

    return { data, error }
  },

  async updateProfile(userId: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .select()
      .single()

    return { data, error }
  },

  // Preferences operations
  async getPreferences(userId: string) {
    const { data, error } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .single()

    return { data, error }
  },

  async updatePreferences(userId: string, preferences: any) {
    return await supabase
      .from('user_preferences')
      .upsert(
        {
          user_id: userId,
          ...preferences,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: 'user_id', // This tells Supabase which field to check for conflicts
        }
      )
      .select()
      .single()
  },

  // Listen to auth changes
  onAuthStateChange(callback: (session: any) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(session)
    })
  },
}
