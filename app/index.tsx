// app/index.tsx - Fixed version to prevent logout on hot reload
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { router } from 'expo-router'
import { useAuth } from '@/hooks/useAuth'
import { LoadingSpinner } from '@/components/common/informatic/LoadingSpinner'
import { useAuthStore } from '@/stores/authStore'

export default function IndexPage() {
  const [isInitializing, setIsInitializing] = useState(false)
  const { isAuthenticated, isLoading, initializeAuth, user } = useAuth()
  const { isInitialized } = useAuthStore()

  useEffect(() => {
    const init = async () => {
      // Don't reinitialize if already done
      if (isInitialized) {
        console.log('Auth already initialized, checking auth state...')
        // Just check current auth state and route accordingly
        if (isAuthenticated && user) {
          router.replace(`/user/${user.id || user.user_id}`)
        } else {
          router.replace('/(auth)/startPage')
        }
        return
      }

      console.log('Initializing auth for first time...')
      setIsInitializing(true)
      await initializeAuth()
      setIsInitializing(false)
    }

    init()
  }, [initializeAuth, isInitialized]) // Add isInitialized to dependencies

  useEffect(() => {
    // Only route after initialization is complete
    if (isInitialized && !isInitializing && !isLoading) {
      if (isAuthenticated && user) {
        console.log(
          'User authenticated, routing to profile:',
          user.id || user.user_id
        )
        router.replace(`/user/${user.id || user.user_id}`)
      } else {
        console.log('User not authenticated, routing to start page')
        router.replace('/(auth)/startPage')
      }
    }
  }, [isAuthenticated, isInitializing, isLoading, user, isInitialized])

  // Show loading spinner while initializing or routing
  if (!isInitialized || isInitializing || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LoadingSpinner />
        <Text style={{ marginTop: 16 }}>
          {!isInitialized ? 'Initializing BigPan...' : 'Loading...'}
        </Text>
      </View>
    )
  }

  // This should rarely be shown, as routing should happen in useEffect
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LoadingSpinner />
      <Text>Preparing BigPan...</Text>
    </View>
  )
}
