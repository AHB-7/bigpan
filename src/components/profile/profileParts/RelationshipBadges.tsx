import React from 'react'
import { View } from 'react-native'
import { Text } from '@/components/common'
import { theme } from '@/styles/theme'

interface RelationshipBadgesProps {
  is_friend?: boolean
  is_following?: boolean
}

export const RelationshipBadges: React.FC<RelationshipBadgesProps> = ({
  is_friend,
  is_following,
}) => {
  if (!is_friend && !is_following) return null

  return (
    <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
      {is_friend && (
        <View
          style={{
            backgroundColor: theme.colors.success + '20',
            paddingHorizontal: theme.spacing.sm,
            paddingVertical: theme.spacing.xs,
            borderRadius: theme.borderRadius.sm,
          }}
        >
          <Text variant="caption" style={{ color: theme.colors.success }}>
            👥 Venn
          </Text>
        </View>
      )}
      {is_following && !is_friend && (
        <View
          style={{
            backgroundColor: theme.colors.primary + '20',
            paddingHorizontal: theme.spacing.sm,
            paddingVertical: theme.spacing.xs,
            borderRadius: theme.borderRadius.sm,
          }}
        >
          <Text variant="caption" style={{ color: theme.colors.primary }}>
            👀 Følger
          </Text>
        </View>
      )}
    </View>
  )
}
