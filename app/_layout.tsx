// app/_layout.tsx
import { useFonts } from 'expo-font'
import { Slot } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { Alert } from 'react-native'
import Toast from 'react-native-toast-message'
import { configureAsyncHandlers } from '@/hooks/asyncFunction'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Montserrat-ExtraLight': require('../assets/fonts/Montserrat-ExtraLight.otf'),
    'Montserrat-Thin': require('../assets/fonts/Montserrat-Thin.otf'),
    'Montserrat-Light': require('../assets/fonts/Montserrat-Light.otf'),
    'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.otf'),
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.otf'),
    'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.otf'),
    'Montserrat-ExtraBold': require('../assets/fonts/Montserrat-ExtraBold.otf'),
    'Montserrat-Black': require('../assets/fonts/Montserrat-Black.otf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.otf'),
  })

  // Configure error and success handlers
  useEffect(() => {
    configureAsyncHandlers({
      // Toast for success messages
      toastSuccess: (message, options = {}) =>
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: message,
          position: options.position || 'bottom',
          visibilityTime: options.duration || 2000,
        }),

      // Toast for non-critical errors
      toastError: (message, options = {}) =>
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: message,
          position: options.position || 'top',
          visibilityTime: options.duration || 3000,
        }),

      // Modal for critical errors
      modalError: (title, message, actions = []) => {
        const modalActions =
          actions.length > 0 ? actions : [{ text: 'OK', style: 'default' }]
        Alert.alert(title, message, modalActions)
      },
    })
  }, [])

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <>
      <Slot />
      <Toast />
    </>
  )
}
