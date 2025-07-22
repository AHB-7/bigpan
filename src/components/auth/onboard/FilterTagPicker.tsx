// src/components/auth/onboard/FilterTagPicker.tsx - Updated to show existing preferences
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Text, Button } from '@/components/common'
import { theme } from '@/styles/theme'
import type { Database } from '@/types/supabase'
import { styles } from '../styles'
import { useUserPreferences } from '@/hooks/useUserPreferences'

type FilterTag = Database['public']['Tables']['filter_tags']['Row']

interface FilterTagPickerProps {
  tags: FilterTag[]
  selectedTagIds: string[]
  onTagToggle: (tagId: string) => void
  multiSelect?: boolean
  loading?: boolean
  title?: string
  category?: string // Add category to identify which tags to pre-load
}

export const FilterTagPicker: React.FC<FilterTagPickerProps> = ({
  tags,
  selectedTagIds,
  onTagToggle,
  loading = false,
  title,
  category,
}) => {
  const { preferences } = useUserPreferences()
  const [initiallySelected, setInitiallySelected] = useState<string[]>([])

  // Pre-populate with user's existing preferences on mount
  useEffect(() => {
    if (preferences && tags.length > 0) {
      const userTagIds = getRelevantUserTags(category)
      const relevantTags = tags.filter((tag) => userTagIds.includes(tag.id))

      if (relevantTags.length > 0) {
        setInitiallySelected(relevantTags.map((tag) => tag.id))

        // Auto-select these tags if not already selected
        relevantTags.forEach((tag) => {
          if (!selectedTagIds.includes(tag.id)) {
            onTagToggle(tag.id)
          }
        })
      }
    }
  }, [preferences, tags, category])

  const getRelevantUserTags = (category?: string): string[] => {
    if (!preferences) return []

    switch (category) {
      case 'dietary':
        return (
          preferences.preferred_filter_tags?.filter((tagId) =>
            tags.some((tag) => tag.id === tagId && tag.category === 'dietary')
          ) || []
        )

      case 'allergens':
        return preferences.blocked_filter_tags || []

      case 'cuisine':
        return (
          preferences.preferred_filter_tags?.filter((tagId) =>
            tags.some((tag) => tag.id === tagId && tag.category === 'cuisine')
          ) || []
        )

      case 'difficulty':
        return (
          preferences.preferred_filter_tags?.filter((tagId) =>
            tags.some(
              (tag) => tag.id === tagId && tag.category === 'difficulty'
            )
          ) || []
        )

      case 'time':
        return (
          preferences.preferred_filter_tags?.filter((tagId) =>
            tags.some((tag) => tag.id === tagId && tag.category === 'time')
          ) || []
        )

      default:
        return preferences.preferred_filter_tags || []
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text variant="body">Laster alternativer...</Text>
      </View>
    )
  }

  // Sort tags: selected first, then alphabetically
  const sortedTags = [...tags].sort((a, b) => {
    const aSelected = selectedTagIds.includes(a.id)
    const bSelected = selectedTagIds.includes(b.id)

    if (aSelected && !bSelected) return -1
    if (!aSelected && bSelected) return 1

    return a.name.localeCompare(b.name, 'no')
  })

  return (
    <View>
      {title && (
        <Text variant="heading2" weight="semiBold" style={styles.categoryTitle}>
          {title}
        </Text>
      )}

      {/* Show info about existing selections */}
      {initiallySelected.length > 0 && (
        <View
          style={{
            marginBottom: theme.spacing.md,
            padding: theme.spacing.sm,
            backgroundColor: theme.colors.primary + '10',
            borderRadius: theme.borderRadius.md,
          }}
        >
          <Text variant="caption" style={{ color: theme.colors.primary }}>
            💡 Dine tidligere valg er allerede markert
          </Text>
        </View>
      )}

      <View style={styles.tagsGrid}>
        {sortedTags.map((tag) => {
          const isSelected = selectedTagIds.includes(tag.id)
          const wasInitiallySelected = initiallySelected.includes(tag.id)

          return (
            <Button
              key={tag.id}
              variant={isSelected ? 'filled' : 'outlined'}
              textColor={
                isSelected ? theme.colors.surface : theme.colors.onBackground
              }
              backgroundColor={
                isSelected
                  ? wasInitiallySelected
                    ? theme.colors.success // Green for previously selected
                    : theme.colors.primary // Orange for newly selected
                  : 'transparent'
              }
              style={{
                ...styles.buttonsGrow,
                ...(wasInitiallySelected && !isSelected
                  ? { borderColor: theme.colors.success, borderWidth: 2 }
                  : {}),
              }}
              onPress={() => onTagToggle(tag.id)}
            >
              {tag.icon && `${tag.icon} `}
              {tag.name}
              {wasInitiallySelected && !isSelected && ' ✓'}
            </Button>
          )
        })}
      </View>

      {/* Legend for color coding */}
      {initiallySelected.length > 0 && (
        <View
          style={{
            marginTop: theme.spacing.sm,
            flexDirection: 'row',
            gap: theme.spacing.md,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: theme.spacing.xs,
            }}
          >
            <View
              style={{
                width: 12,
                height: 12,
                backgroundColor: theme.colors.success,
                borderRadius: 6,
              }}
            />
            <Text
              variant="caption"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              Tidligere valgt
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: theme.spacing.xs,
            }}
          >
            <View
              style={{
                width: 12,
                height: 12,
                backgroundColor: theme.colors.primary,
                borderRadius: 6,
              }}
            />
            <Text
              variant="caption"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              Nytt valg
            </Text>
          </View>
        </View>
      )}
    </View>
  )
}
