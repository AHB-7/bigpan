import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Text, View, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'

export default function RecipePage() {
  const { id } = useLocalSearchParams()

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 24, marginBottom: 20 }}>🍽️ Recipe {id}</Text>

      <TouchableOpacity
        style={{
          backgroundColor: '#4CAF50',
          padding: 15,
          borderRadius: 8,
          marginBottom: 10,
        }}
        onPress={() => router.push(`/recipe/cooking/${id}`)}
      >
        <Text style={{ color: 'white' }}>👨‍🍳 Start Cooking</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: '#FF9800',
          padding: 15,
          borderRadius: 8,
          marginBottom: 10,
        }}
        onPress={() => router.push(`/recipe/edit/${id}`)}
      >
        <Text style={{ color: 'white' }}>✏️ Edit Recipe</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ backgroundColor: '#666', padding: 15, borderRadius: 8 }}
        onPress={() => router.back()}
      >
        <Text style={{ color: 'white' }}>← Back</Text>
      </TouchableOpacity>
    </View>
  )
}
