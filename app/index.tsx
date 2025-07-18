// app/index.tsx
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { router } from 'expo-router'
import { useAuth } from '@/hooks/useAuth'
import { LoadingSpinner } from '@/components/common/informatic/LoadingSpinner'

export default function IndexPage() {
  const [isInitializing, setIsInitializing] = useState(true)
  const { isAuthenticated, isLoading, initializeAuth, user } = useAuth()

  useEffect(() => {
    const init = async () => {
      await initializeAuth()
      setIsInitializing(false)
    }
    init()
  }, [initializeAuth])

  useEffect(() => {
    if (!isInitializing && !isLoading) {
      if (isAuthenticated && user) {
        router.replace(`/user/${user.id || user.user_id}`)
      } else {
        router.replace('/(auth)/startPage')
      }
    }
  }, [isAuthenticated, isInitializing, isLoading])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LoadingSpinner />
      <Text>Loading BigPan...</Text>
    </View>
  )
}
