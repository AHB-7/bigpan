// src/types/index.ts - Application types using Supabase generated types
import type { Database } from './supabase'

export type User = Database['public']['Tables']['profiles']['Row']
export type Recipe = Database['public']['Tables']['recipes']['Row']
export type RecipeIngredient =
  Database['public']['Tables']['recipe_ingredients']['Row']
export type RecipeStep = Database['public']['Tables']['recipe_steps']['Row']
export type FilterTag = Database['public']['Tables']['filter_tags']['Row']
export type RecipeCollection =
  Database['public']['Tables']['recipe_collections']['Row']
export type UserGroup = Database['public']['Tables']['user_groups']['Row']
export type GroupMembership =
  Database['public']['Tables']['group_memberships']['Row']
export type Notification = Database['public']['Tables']['notifications']['Row']
export type RecipeInteraction =
  Database['public']['Tables']['recipe_interactions']['Row']
export type UserPreferences =
  Database['public']['Tables']['user_preferences']['Row']

// ===== INSERT TYPES FOR FORMS =====
export type CreateUserData = Database['public']['Tables']['profiles']['Insert']
export type CreateRecipeData = Database['public']['Tables']['recipes']['Insert']
export type CreateUserPreferencesData =
  Database['public']['Tables']['user_preferences']['Insert']
export type CreateRecipeIngredientData =
  Database['public']['Tables']['recipe_ingredients']['Insert']
export type CreateRecipeStepData =
  Database['public']['Tables']['recipe_steps']['Insert']

export type UpdateUserData = Database['public']['Tables']['profiles']['Update']
export type UpdateRecipeData = Database['public']['Tables']['recipes']['Update']
export type UpdateUserPreferencesData =
  Database['public']['Tables']['user_preferences']['Update']

export type RecipeWithDetails = Recipe & {
  author?: User
  ingredients?: RecipeIngredient[]
  steps?: RecipeStep[]
  interactions?: RecipeInteraction[]
  tags?: FilterTag[]

  is_liked?: boolean
  is_saved?: boolean
  user_rating?: number
}

export type UserWithStats = User & {
  is_following?: boolean
  is_friend?: boolean
}

export type GroupWithMembers = UserGroup & {
  members?: GroupMembership[]
  // Frontend-only relationship status (safe names)
  is_member?: boolean
  user_role?: GroupMembership['role']
}

export type CollectionWithRecipes = RecipeCollection & {
  recipes?: RecipeWithDetails[]
}

export interface NotificationPreferences {
  recipe_interactions?: boolean
  friend_activities?: boolean
  group_updates?: boolean
  meal_reminders?: boolean
  email_notifications?: boolean
  push_notifications?: boolean
  daily_digest?: boolean
  weekly_summary?: boolean
}

export interface MealPlanningPreferences {
  default_servings?: number
  auto_generate_shopping_list?: boolean
  include_pantry_staples?: boolean
  preferred_shopping_day?:
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday'
    | 'sunday'
  dietary_goals?: string[]
  budget_target?: number
  preferred_meal_types?: string[]
}

export interface UserPreferencesTyped
  extends Omit<
    UserPreferences,
    'notification_preferences' | 'meal_planning_preferences'
  > {
  notification_preferences?: NotificationPreferences
  meal_planning_preferences?: MealPlanningPreferences
}

export interface LoginFormData {
  email: string
  password: string
}

export interface RegisterFormData {
  email: string
  password: string
  confirmPassword: string
  full_name: string
  cooking_level?: User['cooking_level']
}

export interface CreateRecipeFormData {
  title: string
  description?: string
  prep_time_minutes?: number
  cook_time_minutes?: number
  servings?: number
  difficulty_level?: Recipe['difficulty_level']
  visibility?: Recipe['visibility']
  image?: {
    uri: string
    type: string
    name: string
  }
  ingredients: {
    ingredient_name: string
    amount?: string
    unit?: string
    notes?: string
    alternatives?: string[]
  }[]
  steps: {
    instruction: string
    duration_minutes?: number
    temperature?: number
    tips?: string
    image?: {
      uri: string
      type: string
      name: string
    }
  }[]
  tag_ids?: string[]
}

export interface UserPreferencesFormData {
  preferred_filter_tags?: string[]
  blocked_filter_tags?: string[]
  difficulty_preference?: string
  cooking_time_preference?: number
  serving_size_preference?: number
  budget_preference?: string
  equipment_owned?: string[]
  pantry_staples?: string[]
  notification_preferences?: NotificationPreferences
  meal_planning_preferences?: MealPlanningPreferences
}

export interface ApiResponse<T> {
  data: T
  error?: string
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  page: number
  per_page: number
  total_pages: number
  has_more: boolean
}

export interface AuthState {
  user: User | null
  session: any | null
  preferences: UserPreferencesTyped | null
  isLoading: boolean
  isAuthenticated: boolean
}

export interface RecipeState {
  recipes: RecipeWithDetails[]
  currentRecipe: RecipeWithDetails | null
  collections: CollectionWithRecipes[]
  filterTags: FilterTag[]
  searchResults: RecipeWithDetails[]
  trending: RecipeWithDetails[]
  isLoading: boolean
  error: string | null
  filters: {
    tags: string[]
    difficulty: Recipe['difficulty_level'][]
    prep_time_max?: number
    cook_time_max?: number
    search_query?: string
  }
}

export interface SocialState {
  friends: UserWithStats[]
  groups: GroupWithMembers[]
  notifications: Notification[]
  activities: any[] // Will be defined based on your activity feed structure
  unreadCount: number
  isLoading: boolean
  selectedGroup: GroupWithMembers | null
}

export interface RecipeParams {
  id: string
  servings?: string
  mode?: 'view' | 'cook' | 'edit'
}

export interface UserParams {
  id: string
  tab?: 'recipes' | 'collections' | 'activity'
}

export interface GroupParams {
  id: string
  tab?: 'feed' | 'members' | 'challenges'
}

// ===== UTILITY TYPES =====
// Extract specific field types for better type safety

export type RecipeStatus = Recipe['status']
export type RecipeVisibility = Recipe['visibility']
export type UserRole = GroupMembership['role']
export type NotificationType = Notification['notification_type'] // Fixed: use actual field name
export type CookingLevel = User['cooking_level']
export type DifficultyLevel = Recipe['difficulty_level']

// ===== CONSTANTS =====
// Type-safe constants derived from your database schema

export const RECIPE_STATUSES: RecipeStatus[] = [
  'draft',
  'published',
  'archived',
]
export const RECIPE_VISIBILITIES: RecipeVisibility[] = [
  'public',
  'friends',
  'private',
]
export const COOKING_LEVELS: NonNullable<CookingLevel>[] = [
  'beginner',
  'intermediate',
  'advanced',
]
export const DIFFICULTY_LEVELS: NonNullable<DifficultyLevel>[] = [
  'beginner',
  'intermediate',
  'advanced',
]
export const GROUP_ROLES: UserRole[] = [
  'creator',
  'admin',
  'moderator',
  'member',
]

// ===== HELPER TYPES =====
// Useful utility types for the app

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type Required<T, K extends keyof T> = T & { [P in K]-?: T[P] }

// Example usage: Make certain fields required for forms
export type RequiredRecipeData = Required<
  CreateRecipeData,
  'title' | 'author_id'
>

export type { Database } from './supabase'
