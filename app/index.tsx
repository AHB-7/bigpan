import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { router } from 'expo-router'
import { useAuth } from '@/hooks/useAuth'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'

export default function IndexPage() {
  const [isInitializing, setIsInitializing] = useState(true)
  const { isAuthenticated, isLoading, initializeAuth } = useAuth()

  useEffect(() => {
    const init = async () => {
      await initializeAuth()
      setIsInitializing(false)
    }
    init()
  }, [initializeAuth])

  useEffect(() => {
    if (!isInitializing && !isLoading) {
      if (isAuthenticated) {
        router.replace('/home')
      } else {
        router.replace('/login')
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
