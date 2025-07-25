// src/hooks/useTranslation.ts - Enhanced with comprehensive translations
import { useLanguageStore } from '@/stores/languageStore'

// Comprehensive translation dictionary
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
    'auth.username.placeholder': 'Velg et unikt brukernavn',
    'auth.error.invalid':
      'Ugyldig e-post eller passord. Vennligst sjekk dine legitimasjonsopplysninger og prøv igjen.',
    'auth.no.account': 'Har du ikke en konto?',
    'auth.register.link': 'Registrer deg nå!',
    'auth.have.account': 'Har du allerede en konto?',
    'auth.login.link': 'Logg inn her',
    'auth.apple.accessibility': 'Logg inn med Apple',
    'auth.apple.hint': 'Logg inn med din Apple-konto',
    'auth.google.accessibility': 'Logg inn med Google',
    'auth.google.hint': 'Logg inn med din Google-konto',
    'auth.facebook.accessibility': 'Logg inn med Facebook',
    'auth.facebook.hint': 'Logg inn med din Facebook-konto',
    'auth.create.account': 'Opprett konto',
    'auth.terms.accept': 'Jeg aksepterer',
    'auth.terms.link': 'bruksvilkårene',
    'auth.privacy.link': 'personvernserklæringen',

    // Navigation
    'nav.home': 'Hjem',
    'nav.discover': 'Utforsk',
    'nav.create': 'Opprett',
    'nav.profile': 'Profil',
    'nav.settings': 'Innstillinger',
    'nav.back': 'Tilbake',
    'nav.close': 'Lukk',
    'nav.menu': 'Meny',
    'nav.search': 'Søk',

    // Profile
    'profile.title': 'Profil',
    'profile.recipes': 'Oppskrifter',
    'profile.collections': 'Samlinger',
    'profile.friends': 'Venner',
    'profile.groups': 'Grupper',
    'profile.settings': 'Innstillinger',
    'profile.recent.recipes': 'Nyeste oppskrifter',
    'profile.popular.recipes': 'Populære oppskrifter',
    'profile.stats.recipes': 'Oppskrifter',
    'profile.stats.likes': 'Likes',
    'profile.stats.views': 'Visninger',
    'profile.stats.rating': 'Vurdering',
    'profile.edit': 'Rediger profil',
    'profile.bio': 'Bio',
    'profile.location': 'Sted',
    'profile.cooking.level': 'Kokkenivå',
    'profile.display.name': 'Visningsnavn',

    // Recipe
    'recipe.title': 'Oppskrift',
    'recipe.ingredients': 'Ingredienser',
    'recipe.steps': 'Fremgangsmåte',
    'recipe.cooking.time': 'Koketid',
    'recipe.prep.time': 'Forberedelsestid',
    'recipe.total.time': 'Total tid',
    'recipe.servings': 'Porsjoner',
    'recipe.difficulty': 'Vanskelighetsgrad',
    'recipe.category': 'Kategori',
    'recipe.tags': 'Tagger',
    'recipe.description': 'Beskrivelse',
    'recipe.instructions': 'Instruksjoner',
    'recipe.create': 'Opprett oppskrift',
    'recipe.edit': 'Rediger oppskrift',
    'recipe.save': 'Lagre oppskrift',
    'recipe.delete': 'Slett oppskrift',
    'recipe.share': 'Del oppskrift',
    'recipe.like': 'Lik',
    'recipe.unlike': 'Ikke lik lenger',
    'recipe.save.to.collection': 'Lagre til samling',
    'recipe.start.cooking': 'Start matlaging',
    'recipe.made.this': 'Jeg laget dette',
    'recipe.rating': 'Vurdering',
    'recipe.reviews': 'Anmeldelser',
    'recipe.no.recipes': 'Ingen oppskrifter funnet',

    // Difficulty levels
    'difficulty.beginner': 'Nybegynner',
    'difficulty.intermediate': 'Øvet',
    'difficulty.advanced': 'Ekspert',

    // Cooking levels
    'cooking.level.beginner': 'Nybegynner',
    'cooking.level.intermediate': 'Øvet',
    'cooking.level.advanced': 'Ekspert',

    // Collections
    'collections.title': 'Samlinger',
    'collections.create': 'Opprett samling',
    'collections.edit': 'Rediger samling',
    'collections.delete': 'Slett samling',
    'collections.name': 'Navn',
    'collections.description': 'Beskrivelse',
    'collections.recipes.count': '{count} oppskrifter',
    'collections.empty': 'Ingen samlinger ennå',
    'collections.add.recipe': 'Legg til oppskrift',

    // Settings
    'settings.title': 'Innstillinger',
    'settings.app': 'App',
    'settings.support': 'Støtte',

    'settings.profile': 'Profil og personlige opplysninger',
    'settings.profile.subtitle': 'Rediger profil og personlige opplysninger',
    'settings.profile.display_name': 'Visningsnavn',
    'settings.profile.bio': 'Bio',
    'settings.profile.bio_placeholder': 'Fortell litt om deg selv...',
    'settings.profile.location': 'Full adresse',
    'settings.profile.location.example': 'Oslo, Norge',
    'settings.update.success': 'Innstillinger oppdatert!',

    'settings.profile.form.display_name': 'Visningsnavn er påkrevd',
    'settings.profile.form.bio': 'Bio må være mindre enn 500 tegn',
    'settings.profile.form.location': 'Sted må være mindre enn 100 tegn',

    'settings.preferences': 'Matpreferanser',
    'settings.preferences.subtitle': 'Kosthold, allergier og favorittkjøkken',

    'settings.notifications': 'Varsler',
    'settings.notifications.subtitle': 'Push-varsler og e-postvarsler',

    'settings.language': 'Språk',
    'settings.language.current': 'Norsk',

    'settings.theme': 'Tema',
    'settings.theme.light': 'Lyst tema',

    'settings.about': 'Om BigPan',
    'settings.about.version': 'Versjon 1.0.0',

    'settings.help': 'Hjelp',
    'settings.help.subtitle': 'FAQ og brukerstøtte',

    'settings.feedback': 'Tilbakemelding',
    'settings.feedback.subtitle': 'Send oss dine tanker',

    'settings.save': 'Lagre innstillinger',
    'settings.logout': 'Logg ut',

    // Meal Planning
    'meal.planning.title': 'Måltidsplanlegging',
    'meal.planning.week': 'Uke',
    'meal.planning.day': 'Dag',
    'meal.planning.breakfast': 'Frokost',
    'meal.planning.lunch': 'Lunsj',
    'meal.planning.dinner': 'Middag',
    'meal.planning.shopping.list': 'Handleliste',
    'meal.planning.generate.list': 'Generer handleliste',

    // Social
    'social.friends': 'Venner',
    'social.groups': 'Grupper',
    'social.following': 'Følger',
    'social.followers': 'Følgere',
    'social.send.request': 'Send venneforespørsel',
    'social.accept.request': 'Aksepter forespørsel',
    'social.decline.request': 'Avslå forespørsel',
    'social.remove.friend': 'Fjern venn',
    'social.join.group': 'Bli med i gruppe',
    'social.leave.group': 'Forlat gruppe',

    // Common
    'common.or': 'eller',
    'common.and': 'og',
    'common.yes': 'Ja',
    'common.no': 'Nei',
    'common.ok': 'OK',
    'common.cancel': 'Avbryt',
    'common.continue': 'Fortsett',
    'common.skip': 'Hopp over',
    'common.next': 'Neste',
    'common.previous': 'Forrige',
    'common.finish': 'Fullfør',
    'common.save': 'Lagre',
    'common.delete': 'Slett',
    'common.edit': 'Rediger',
    'common.share': 'Del',
    'common.like': 'Lik',
    'common.search': 'Søk',
    'common.filter': 'Filtrer',
    'common.sort': 'Sorter',
    'common.all': 'Alle',
    'common.none': 'Ingen',
    'common.loading': 'Laster...',
    'common.error': 'Feil',
    'common.success': 'Suksess',
    'common.required': 'Påkrevd',
    'common.optional': 'Valgfritt',
    'common.minutes': 'minutter',
    'common.hours': 'timer',
    'common.servings': 'porsjoner',

    // Messages
    'message.loading': 'Laster...',
    'message.error': 'Noe gikk galt',
    'message.success': 'Suksess!',
    'message.no.results': 'Ingen resultater',
    'message.try.again': 'Prøv igjen',
    'message.internet.required': 'Internettforbindelse kreves',

    // Errors
    'error.general': 'En feil oppstod',
    'error.network': 'Nettverksfeil',
    'error.server': 'Serverfeil',
    'error.not.found': 'Ikke funnet',
    'error.unauthorized': 'Ikke autorisert',
    'error.validation': 'Valideringsfeil',

    // Time formats
    'time.now': 'Nå',
    'time.minutes.ago': '{count} minutter siden',
    'time.hours.ago': '{count} timer siden',
    'time.days.ago': '{count} dager siden',
    'time.weeks.ago': '{count} uker siden',
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
    'auth.username.placeholder': 'Choose a unique username',
    'auth.error.invalid':
      'Invalid email or password. Please check your credentials and try again.',
    'auth.no.account': "Don't have an account?",
    'auth.register.link': 'Sign up now!',
    'auth.have.account': 'Already have an account?',
    'auth.login.link': 'Log in here',
    'auth.apple.accessibility': 'Login with Apple',
    'auth.apple.hint': 'Login with your Apple account',
    'auth.google.accessibility': 'Login with Google',
    'auth.google.hint': 'Login with your Google account',
    'auth.facebook.accessibility': 'Login with Facebook',
    'auth.facebook.hint': 'Login with your Facebook account',
    'auth.create.account': 'Create Account',
    'auth.terms.accept': 'I accept the',
    'auth.terms.link': 'terms of service',
    'auth.privacy.link': 'privacy policy',

    // Navigation
    'nav.home': 'Home',
    'nav.discover': 'Discover',
    'nav.create': 'Create',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    'nav.back': 'Back',
    'nav.close': 'Close',
    'nav.menu': 'Menu',
    'nav.search': 'Search',

    // Profile
    'profile.title': 'Profile',
    'profile.recipes': 'Recipes',
    'profile.collections': 'Collections',
    'profile.friends': 'Friends',
    'profile.groups': 'Groups',
    'profile.settings': 'Settings',
    'profile.recent.recipes': 'Recent Recipes',
    'profile.popular.recipes': 'Popular Recipes',
    'profile.stats.recipes': 'Recipes',
    'profile.stats.likes': 'Likes',
    'profile.stats.views': 'Views',
    'profile.stats.rating': 'Rating',
    'profile.edit': 'Edit Profile',
    'profile.bio': 'Bio',
    'profile.location': 'Location',
    'profile.cooking.level': 'Cooking Level',
    'profile.display.name': 'Display Name',

    // Recipe
    'recipe.title': 'Recipe',
    'recipe.ingredients': 'Ingredients',
    'recipe.steps': 'Instructions',
    'recipe.cooking.time': 'Cooking Time',
    'recipe.prep.time': 'Prep Time',
    'recipe.total.time': 'Total Time',
    'recipe.servings': 'Servings',
    'recipe.difficulty': 'Difficulty',
    'recipe.category': 'Category',
    'recipe.tags': 'Tags',
    'recipe.description': 'Description',
    'recipe.instructions': 'Instructions',
    'recipe.create': 'Create Recipe',
    'recipe.edit': 'Edit Recipe',
    'recipe.save': 'Save Recipe',
    'recipe.delete': 'Delete Recipe',
    'recipe.share': 'Share Recipe',
    'recipe.like': 'Like',
    'recipe.unlike': 'Unlike',
    'recipe.save.to.collection': 'Save to Collection',
    'recipe.start.cooking': 'Start Cooking',
    'recipe.made.this': 'I Made This',
    'recipe.rating': 'Rating',
    'recipe.reviews': 'Reviews',
    'recipe.no.recipes': 'No recipes found',

    // Difficulty levels
    'difficulty.beginner': 'Beginner',
    'difficulty.intermediate': 'Intermediate',
    'difficulty.advanced': 'Advanced',

    // Cooking levels
    'cooking.level.beginner': 'Beginner',
    'cooking.level.intermediate': 'Intermediate',
    'cooking.level.advanced': 'Advanced',

    // Collections
    'collections.title': 'Collections',
    'collections.create': 'Create Collection',
    'collections.edit': 'Edit Collection',
    'collections.delete': 'Delete Collection',
    'collections.name': 'Name',
    'collections.description': 'Description',
    'collections.recipes.count': '{count} recipes',
    'collections.empty': 'No collections yet',
    'collections.add.recipe': 'Add Recipe',

    // Settings
    'settings.title': 'Settings',
    'settings.app': 'App',
    'settings.support': 'Support',

    'settings.profile': 'Profile and Personal Information',
    'settings.profile.subtitle': 'Edit profile and personal information',
    'settings.profile.display_name': 'Display Name',
    'settings.profile.bio': 'Bio',
    'settings.profile.bio_placeholder': 'Tell us about yourself...',
    'settings.profile.location': 'Full address',
    'settings.profile.location.example': 'Oslo, Norway',
    'settings.update.success': 'Settings updated successfully!',

    'settings.profile.form.display_name': 'Display name is required',
    'settings.profile.form.bio': 'Bio must be less than 500 characters',
    'settings.profile.form.location':
      'Location must be less than 100 characters',

    'settings.preferences': 'Food Preferences',
    'settings.preferences.subtitle': 'Diet, allergies, and favorite cuisines',

    'settings.notifications': 'Notifications',
    'settings.notifications.subtitle': 'Push notifications and email alerts',

    'settings.language': 'Language',
    'settings.language.current': 'English',

    'settings.theme': 'Theme',
    'settings.theme.light': 'Light theme',

    'settings.about': 'About BigPan',
    'settings.about.version': 'Version 1.0.0',

    'settings.help': 'Help',
    'settings.help.subtitle': 'FAQ and user support',

    'settings.feedback': 'Feedback',
    'settings.feedback.subtitle': 'Send us your thoughts',

    'settings.save': 'Save Settings',
    'settings.logout': 'Sign Out',

    // Meal Planning
    'meal.planning.title': 'Meal Planning',
    'meal.planning.week': 'Week',
    'meal.planning.day': 'Day',
    'meal.planning.breakfast': 'Breakfast',
    'meal.planning.lunch': 'Lunch',
    'meal.planning.dinner': 'Dinner',
    'meal.planning.shopping.list': 'Shopping List',
    'meal.planning.generate.list': 'Generate Shopping List',

    // Social
    'social.friends': 'Friends',
    'social.groups': 'Groups',
    'social.following': 'Following',
    'social.followers': 'Followers',
    'social.send.request': 'Send Friend Request',
    'social.accept.request': 'Accept Request',
    'social.decline.request': 'Decline Request',
    'social.remove.friend': 'Remove Friend',
    'social.join.group': 'Join Group',
    'social.leave.group': 'Leave Group',

    // Common
    'common.or': 'or',
    'common.and': 'and',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.ok': 'OK',
    'common.cancel': 'Cancel',
    'common.continue': 'Continue',
    'common.skip': 'Skip',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.finish': 'Finish',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.share': 'Share',
    'common.like': 'Like',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.all': 'All',
    'common.none': 'None',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.required': 'Required',
    'common.optional': 'Optional',
    'common.minutes': 'minutes',
    'common.hours': 'hours',
    'common.servings': 'servings',

    // Messages
    'message.loading': 'Loading...',
    'message.error': 'Something went wrong',
    'message.success': 'Success!',
    'message.no.results': 'No results found',
    'message.try.again': 'Try again',
    'message.internet.required': 'Internet connection required',

    // Errors
    'error.general': 'An error occurred',
    'error.network': 'Network error',
    'error.server': 'Server error',
    'error.not.found': 'Not found',
    'error.unauthorized': 'Unauthorized',
    'error.validation': 'Validation error',

    // Time formats
    'time.now': 'Now',
    'time.minutes.ago': '{count} minutes ago',
    'time.hours.ago': '{count} hours ago',
    'time.days.ago': '{count} days ago',
    'time.weeks.ago': '{count} weeks ago',
  },
} as const

export type TranslationKey = keyof typeof translations.no
export type Language = 'no' | 'en'

export const useTranslation = () => {
  const { currentLanguage } = useLanguageStore()

  const t = (
    key: TranslationKey,
    params?: Record<string, string | number>
  ): string => {
    let translation: string = translations[currentLanguage][key] || key

    // Handle parameter interpolation
    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        translation = translation.replace(`{${paramKey}}`, String(value))
      })
    }

    return translation
  }

  return { t, currentLanguage }
}
