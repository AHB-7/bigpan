// src/stores/languageStore.ts
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getLocales } from 'expo-localization'

export type Language = 'no' | 'en'

interface LanguageStore {
  currentLanguage: Language
  setLanguage: (language: Language) => void
  getDeviceLanguage: () => Language
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      // Default to device language or Norwegian
      currentLanguage: getDeviceLanguage(),

      setLanguage: (language: Language) => {
        set({ currentLanguage: language })
      },

      getDeviceLanguage: () => getDeviceLanguage(),
    }),
    {
      name: 'bigpan-language',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)

// Helper function to detect device language
function getDeviceLanguage(): Language {
  const deviceLocales = getLocales()
  const primaryLocale = deviceLocales[0]?.languageCode

  // Support Norwegian variants
  if (
    primaryLocale === 'no' ||
    primaryLocale === 'nb' ||
    primaryLocale === 'nn'
  ) {
    return 'no'
  }

  // Default to English for other languages
  return 'en'
}
