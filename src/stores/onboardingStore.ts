// Updated onboardingStore.ts with fixed getAllSelectedTags function

import { create } from 'zustand'

interface OnboardingState {
  dietaryRestrictions: string[]
  allergens: string[]
  cookingLevel: string
  favoriteCuisines: string[]
  cookingTimePreference: string

  servingSizePreference: number

  setDietaryRestrictions: (restrictions: string[]) => void
  setAllergens: (allergens: string[]) => void
  setCookingLevel: (level: string) => void
  setFavoriteCuisines: (cuisines: string[]) => void
  setCookingTimePreference: (time: string) => void
  setServingSizePreference: (size: number) => void

  getAllSelectedTags: () => Record<string, string[]>
  clearOnboarding: () => void
}

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  dietaryRestrictions: [],
  allergens: [],
  cookingLevel: '',
  favoriteCuisines: [],
  cookingTimePreference: '',
  servingSizePreference: 2,

  // Actions
  setDietaryRestrictions: (restrictions) =>
    set({ dietaryRestrictions: restrictions }),
  setAllergens: (allergens) => set({ allergens }),
  setCookingLevel: (level) => set({ cookingLevel: level }),
  setFavoriteCuisines: (cuisines) => set({ favoriteCuisines: cuisines }),
  setCookingTimePreference: (time) => set({ cookingTimePreference: time }),
  setServingSizePreference: (size) => set({ servingSizePreference: size }),

  getAllSelectedTags: (): Record<string, string[]> => {
    const state = get()
    const result: Record<string, string[]> = {}

    // ✅ Keep dietary restrictions separate from allergens
    if (state.dietaryRestrictions.length > 0) {
      result.dietary = state.dietaryRestrictions
    }

    // ✅ Keep allergens in their own category
    if (state.allergens.length > 0) {
      result.allergens = state.allergens
    }

    if (state.favoriteCuisines.length > 0) {
      result.cuisine = state.favoriteCuisines
    }

    if (state.cookingLevel) {
      result.difficulty = [state.cookingLevel]
    }

    if (state.cookingTimePreference) {
      result.time = [state.cookingTimePreference]
    }
    return result
  },

  clearOnboarding: () =>
    set({
      dietaryRestrictions: [],
      allergens: [],
      cookingLevel: '',
      favoriteCuisines: [],
      cookingTimePreference: '',
      servingSizePreference: 2,
    }),
}))
