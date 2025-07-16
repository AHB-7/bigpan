import React from 'react'
import { Redirect } from 'expo-router'
import { useAuthStore } from '@/stores/authStore'
import { Text, View } from 'react-native'

export default function RegisterPage() {
  const { isAuthenticated } = useAuthStore()

  if (isAuthenticated) {
    return <Redirect href="/home" />
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Register Screen</Text>
    </View>
  )
}
