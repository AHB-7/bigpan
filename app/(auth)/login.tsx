import React from 'react'
import { LoginScreen } from '@/components/auth/loginScreen'
import { useAuthStore } from '@/stores'
import { Redirect } from 'expo-router'

export default function LoginPage() {
  const { isAuthenticated } = useAuthStore()

  if (isAuthenticated) {
    return <Redirect href="/home" />
  }

  return <LoginScreen />
}
