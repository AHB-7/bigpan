import React from 'react'
import { View } from 'react-native'
import { Text, Button } from '@/components/common'
import { theme } from '@/styles/theme'
import type { Database } from '@/types/supabase'
import { styles } from '../styles'

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
    <View>
      {title && (
        <Text variant="heading2" weight="semiBold" style={styles.categoryTitle}>
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
              textColor={
                isSelected ? theme.colors.surface : theme.colors.onBackground
              }
              style={styles.buttonsGrow}
              onPress={() => onTagToggle(tag.id)}
            >
              {tag.icon}
              {tag.name}
            </Button>
          )
        })}
      </View>
    </View>
  )
}
