// ✅ Correct - move font loading to _layout.tsx
// app/_layout.tsx
import { useFonts } from 'expo-font'
import { Slot } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'

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

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return <Slot />
}
