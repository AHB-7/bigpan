import React from 'react'
import { Redirect } from 'expo-router'
import { useAuthStore } from '@/stores/authStore'
import { Text, View, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'

export default function HomePage() {
  const { isAuthenticated, user } = useAuthStore()

  if (!isAuthenticated) {
    return <Redirect href="/login" />
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 24, marginBottom: 20 }}>🍳 BigPan Home</Text>
      <Text style={{ marginBottom: 20 }}>Welcome, {user?.username}!</Text>

      {/* Navigation buttons */}
      <TouchableOpacity
        style={{
          backgroundColor: '#FF6B35',
          padding: 15,
          borderRadius: 8,
          marginBottom: 10,
          width: 200,
        }}
        onPress={() => router.push('/discover')}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
          🔍 Discover Recipes
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: '#4CAF50',
          padding: 15,
          borderRadius: 8,
          marginBottom: 10,
          width: 200,
        }}
        onPress={() => router.push('/create-recipe')}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
          ➕ Create Recipe
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: '#2196F3',
          padding: 15,
          borderRadius: 8,
          marginBottom: 10,
          width: 200,
        }}
        onPress={() => router.push('/social')}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>👥 Social</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: '#9C27B0',
          padding: 15,
          borderRadius: 8,
          marginBottom: 10,
          width: 200,
        }}
        onPress={() => router.push('/profile')}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>👤 Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: '#FF9800',
          padding: 15,
          borderRadius: 8,
          marginBottom: 20,
          width: 200,
        }}
        onPress={() => router.push('/notifications')}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
          🔔 Notifications
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: '#f44336',
          padding: 15,
          borderRadius: 8,
          width: 200,
        }}
        onPress={async () => {
          // await signOut()
          router.replace('/login')
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>🚪 Logout</Text>
      </TouchableOpacity>
    </View>
  )
}
