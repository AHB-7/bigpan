import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text } from '@/components/common'
import { router } from 'expo-router'
import { theme } from '@/styles/theme'
import type { RecentRecipe } from '@/types'

interface RecentRecipesProps {
  recipes: RecentRecipe[]
}

export const RecentRecipes: React.FC<RecentRecipesProps> = ({ recipes }) => {
  if (!recipes || recipes.length === 0) return null

  return (
    <View
      style={{
        width: '100%',
        marginBottom: theme.spacing.lg,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.lg,
      }}
    >
      <Text variant="heading3" style={{ marginBottom: theme.spacing.md }}>
        🆕 Nyeste oppskrifter
      </Text>

      {recipes.map((recipe) => (
        <TouchableOpacity
          key={recipe.id}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: theme.spacing.sm,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.surfaceVariant,
          }}
          onPress={() => router.push(`/recipe/${recipe.id}`)}
        >
          <View style={{ flex: 1 }}>
            <Text variant="body" weight="medium">
              {recipe.title}
            </Text>
            <Text
              variant="caption"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              {new Date(recipe.created_at).toLocaleDateString('no-NO')} •{' '}
              {recipe.like_count} likes
            </Text>
          </View>
          <Text variant="body">→</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}
