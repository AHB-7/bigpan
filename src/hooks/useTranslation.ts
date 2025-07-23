// src/hooks/useTranslation.ts
import { useLanguageStore } from '@/stores/languageStore'

// Translation dictionary
const translations = {
  no: {
    // Authentication
    'auth.login': 'Logg Inn',
    'auth.register': 'Registrer deg',
    'auth.email': 'E-post',
    'auth.password': 'Passord',
    'auth.username': 'Brukernavn',
    'auth.login.button': 'Logg Inn',
    'auth.register.button': 'Opprett konto',
    'auth.forgot.password': 'Glemt passord?',
    'auth.email.placeholder': 'Skriv inn din e-post',
    'auth.password.placeholder': 'Skriv inn ditt passord',
    'auth.error.invalid':
      'Ugyldig e-post eller passord. Vennligst sjekk dine legitimasjonsopplysninger og prøv igjen.',
    'auth.no.account': 'Har du ikke en konto?',
    'auth.register.link': 'Registrer deg nå!',
    'auth.apple.accessibility': 'Logg inn med Apple',
    'auth.apple.hint': 'Logg inn med din Apple-konto',
    'auth.google.accessibility': 'Logg inn med Google',
    'auth.google.hint': 'Logg inn med din Google-konto',
    'auth.facebook.accessibility': 'Logg inn med Facebook',
    'auth.facebook.hint': 'Logg inn med din Facebook-konto',

    // Navigation
    'nav.home': 'Hjem',
    'nav.discover': 'Utforsk',
    'nav.create': 'Opprett',
    'nav.profile': 'Profil',
    'nav.settings': 'Innstillinger',

    // Recipe
    'recipe.title': 'Oppskrift',
    'recipe.ingredients': 'Ingredienser',
    'recipe.steps': 'Fremgangsmåte',
    'recipe.cooking.time': 'Koketid',
    'recipe.prep.time': 'Forberedelsestid',
    'recipe.servings': 'Porsjoner',
    'recipe.difficulty': 'Vanskelighetsgrad',

    // Difficulty levels
    'difficulty.beginner': 'Nybegynner',
    'difficulty.intermediate': 'Øvet',
    'difficulty.advanced': 'Ekspert',

    // Common
    'common.or': 'eller',
    'common.and': 'og',
    'common.yes': 'Ja',
    'common.no': 'Nei',
    'action.save': 'Lagre',
    'action.cancel': 'Avbryt',
    'action.delete': 'Slett',
    'action.edit': 'Rediger',
    'action.share': 'Del',
    'action.like': 'Lik',

    // Messages
    'message.loading': 'Laster...',
    'message.error': 'Noe gikk galt',
    'message.success': 'Suksess!',
    'message.no.recipes': 'Ingen oppskrifter funnet',
  },

  en: {
    // Authentication
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.username': 'Username',
    'auth.login.button': 'Log In',
    'auth.register.button': 'Create Account',
    'auth.forgot.password': 'Forgot Password?',
    'auth.email.placeholder': 'Enter your email',
    'auth.password.placeholder': 'Enter your password',
    'auth.error.invalid':
      'Invalid email or password. Please check your credentials and try again.',
    'auth.no.account': "Don't have an account?",
    'auth.register.link': 'Sign up now!',
    'auth.apple.accessibility': 'Login with Apple',
    'auth.apple.hint': 'Login with your Apple account',
    'auth.google.accessibility': 'Login with Google',
    'auth.google.hint': 'Login with your Google account',
    'auth.facebook.accessibility': 'Login with Facebook',
    'auth.facebook.hint': 'Login with your Facebook account',

    // Navigation
    'nav.home': 'Home',
    'nav.discover': 'Discover',
    'nav.create': 'Create',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',

    // Recipe
    'recipe.title': 'Recipe',
    'recipe.ingredients': 'Ingredients',
    'recipe.steps': 'Instructions',
    'recipe.cooking.time': 'Cooking Time',
    'recipe.prep.time': 'Prep Time',
    'recipe.servings': 'Servings',
    'recipe.difficulty': 'Difficulty',

    // Difficulty levels
    'difficulty.beginner': 'Beginner',
    'difficulty.intermediate': 'Intermediate',
    'difficulty.advanced': 'Advanced',

    // Common
    'common.or': 'or',
    'common.and': 'and',
    'common.yes': 'Yes',
    'common.no': 'No',
    'action.save': 'Save',
    'action.cancel': 'Cancel',
    'action.delete': 'Delete',
    'action.edit': 'Edit',
    'action.share': 'Share',
    'action.like': 'Like',

    // Messages
    'message.loading': 'Loading...',
    'message.error': 'Something went wrong',
    'message.success': 'Success!',
    'message.no.recipes': 'No recipes found',
  },
} as const

export type TranslationKey = keyof typeof translations.no
export type Language = 'no' | 'en'

export const useTranslation = () => {
  const { currentLanguage } = useLanguageStore()

  const t = (key: TranslationKey): string => {
    return translations[currentLanguage][key] || key
  }

  return { t, currentLanguage }
}
