// File: src/stores/onboardingStore.ts
import { create } from 'zustand'

interface OnboardingState {
  // Step 1: Dietary preferences (now using UUIDs)
  dietaryRestrictions: string[] // Filter tag UUIDs
  allergens: string[] // Filter tag UUIDs

  // Step 2: Cooking style (now using UUIDs)
  cookingLevel: string // Filter tag UUID
  favoriteCuisines: string[] // Filter tag UUIDs
  cookingTimePreference: string // Filter tag UUID

  // Step 3: Kitchen setup
  equipmentOwned: string[]
  servingSizePreference: number

  // Actions
  setDietaryRestrictions: (restrictions: string[]) => void
  setAllergens: (allergens: string[]) => void
  setCookingLevel: (level: string) => void
  setFavoriteCuisines: (cuisines: string[]) => void
  setCookingTimePreference: (time: string) => void
  setEquipmentOwned: (equipment: string[]) => void
  setServingSizePreference: (size: number) => void

  // Utility functions
  getAllSelectedTags: () => Record<string, string[]>
  clearOnboarding: () => void
}

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  // Initial state - now storing UUIDs
  dietaryRestrictions: [],
  allergens: [],
  cookingLevel: '', // Will be a UUID
  favoriteCuisines: [],
  cookingTimePreference: '', // Will be a UUID
  equipmentOwned: [],
  servingSizePreference: 2,

  // Actions
  setDietaryRestrictions: (restrictions) =>
    set({ dietaryRestrictions: restrictions }),

  setAllergens: (allergens) => set({ allergens }),

  setCookingLevel: (level) => set({ cookingLevel: level }),

  setFavoriteCuisines: (cuisines) => set({ favoriteCuisines: cuisines }),

  setCookingTimePreference: (time) => set({ cookingTimePreference: time }),

  setEquipmentOwned: (equipment) => set({ equipmentOwned: equipment }),

  setServingSizePreference: (size) => set({ servingSizePreference: size }),

  // Utility functions
  getAllSelectedTags: (): Record<string, string[]> => {
    const state = get()
    return {
      dietary: [...state.dietaryRestrictions, ...state.allergens],
      cuisine: state.favoriteCuisines,
      difficulty: state.cookingLevel ? [state.cookingLevel] : [],
      time: state.cookingTimePreference ? [state.cookingTimePreference] : [],
      // equipment: state.equipmentOwned, // Handle separately if needed
    }
  },

  clearOnboarding: () =>
    set({
      dietaryRestrictions: [],
      allergens: [],
      cookingLevel: '',
      favoriteCuisines: [],
      cookingTimePreference: '',
      equipmentOwned: [],
      servingSizePreference: 2,
    }),
}))
