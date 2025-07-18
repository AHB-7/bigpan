import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Button } from '@/components/common'
import { theme } from '@/styles/theme'
import type { Database } from '@/types/supabase'

type FilterTag = Database['public']['Tables']['filter_tags']['Row']

interface FilterTagPickerProps {
  tags: FilterTag[]
  selectedTagIds: string[]
  onTagToggle: (tagId: string) => void
  multiSelect?: boolean
  loading?: boolean
  title?: string
}

export const FilterTagPicker: React.FC<FilterTagPickerProps> = ({
  tags,
  selectedTagIds,
  onTagToggle,
  multiSelect = true,
  loading = false,
  title,
}) => {
  if (loading) {
    return (
      <View style={styles.container}>
        <Text variant="body">Loading tags...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {title && (
        <Text variant="heading2" weight="semiBold" style={styles.title}>
          {title}
        </Text>
      )}
      <View style={styles.tagsGrid}>
        {tags.map((tag) => {
          const isSelected = selectedTagIds.includes(tag.id)
          return (
            <Button
              key={tag.id}
              variant={isSelected ? 'filled' : 'outlined'}
              onPress={() => onTagToggle(tag.id)}
              style={
                isSelected
                  ? { ...styles.tagButton, ...styles.selectedTag }
                  : styles.tagButton
              }
            >
              {tag.icon && <Text style={styles.tagIcon}>{tag.icon}</Text>}
              <Text
                variant="bodySmall"
                weight="medium"
                style={
                  isSelected
                    ? { ...styles.tagLabel, ...styles.selectedLabel }
                    : styles.tagLabel
                }
              >
                {tag.name}
              </Text>
            </Button>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
  },
  title: {
    marginBottom: theme.spacing.md,
    color: theme.colors.onBackground,
  },
  tagsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  tagButton: {
    minWidth: '45%',
    padding: theme.spacing.md,
    alignItems: 'center',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selectedTag: {
    backgroundColor: theme.colors.primary,
  },
  tagIcon: {
    fontSize: 20,
    marginRight: theme.spacing.xs,
  },
  tagLabel: {
    textAlign: 'center',
  },
  selectedLabel: {
    color: theme.colors.onBackground,
  },
})
