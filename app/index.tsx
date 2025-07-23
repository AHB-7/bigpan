// app/index.tsx - Fixed version to prevent logout on hot reload
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { router } from 'expo-router'
import { useAuth } from '@/hooks/useAuth'
import { LoadingSpinner } from '@/components/common/informatic/LoadingSpinner'
import { useAuthStore } from '@/stores/authStore'

export default function IndexPage() {
  const [isInitializing, setIsInitializing] = useState(false)
  const { isAuthenticated, isLoading, user } = useAuth()

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && user) {
        router.replace(`/user/${user.id}`)
      } else {
        router.replace('/(auth)/startPage')
      }
    }
  }, [isAuthenticated, isLoading, user])

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LoadingSpinner />
        <Text>Loading BigPan...</Text>
      </View>
    )
  }
}
