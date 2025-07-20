import React from 'react'
import { View } from 'react-native'
import { Text } from '@/components/common'
import { ProfileStats as ProfileStatsType } from '@/types'
import { styles } from './styles'
import { Ionicons } from '@expo/vector-icons'
import { theme } from '@/styles/theme'

interface ProfileStatsProps {
  stats: ProfileStatsType
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({ stats }) => {
  return (
    <View style={styles.headerStatsContainer}>
      <View style={styles.headerStats}>
        <Ionicons
          name="newspaper-outline"
          color={theme.colors.onBackground}
          style={{
            ...styles.headerStatsIcon,
            color: theme.colors.primary,
          }}
        />
        <Text variant="body" weight="semiBold">
          {stats.recipes_published}
        </Text>
      </View>
      <View style={styles.headerStats}>
        <Ionicons
          name="heart"
          color={theme.colors.onBackground}
          style={{ ...styles.headerStatsIcon, color: theme.colors.like }}
        />
        <Text variant="body" weight="semiBold">
          {stats.total_likes}
        </Text>
      </View>
      <View style={styles.headerStats}>
        <Ionicons
          name="eye"
          color={theme.colors.onBackground}
          style={{ ...styles.headerStatsIcon, color: theme.colors.share }}
        />
        <Text variant="body" weight="semiBold">
          {stats.total_views}{' '}
        </Text>
      </View>
      <View style={styles.headerStats}>
        <Ionicons
          name="star"
          color={theme.colors.onBackground}
          style={{ ...styles.headerStatsIcon, color: '#ffb835ff' }}
        />
        <Text variant="body" weight="semiBold">
          {stats.avg_rating.toFixed(1)}
        </Text>
      </View>
    </View>
  )
}
