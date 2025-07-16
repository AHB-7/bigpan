import { UserPreferences } from '@/types'
import { User } from '@supabase/supabase-js'

export interface AuthState {
  user: User | null
  session: any | null
  isLoading: boolean
  isAuthenticated: boolean
  preferences: UserPreferences | null
}
