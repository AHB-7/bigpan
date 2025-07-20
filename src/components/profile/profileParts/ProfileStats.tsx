import React from 'react'
import { View } from 'react-native'
import { Text } from '@/components/common'
import { StatCard } from './StatCard'
import { theme } from '@/styles/theme'
import { ProfileStats as ProfileStatsType } from '@/types'

interface ProfileStatsProps {
  stats: ProfileStatsType
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({ stats }) => {
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
      <Text
        variant="heading3"
        style={{
          marginBottom: theme.spacing.md,
          textAlign: 'center',
        }}
      >
        📊 Statistikk
      </Text>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: theme.spacing.sm,
        }}
      >
        <StatCard
          label="Oppskrifter"
          value={stats.recipes_published}
          icon="📝"
        />
        <StatCard label="Samlinger" value={stats.collections_total} icon="📚" />
        <StatCard label="Følgere" value={stats.followers_count} icon="👥" />
        <StatCard label="Visninger" value={stats.total_views} icon="👀" />
        <StatCard label="Likes" value={stats.total_likes} icon="❤️" />
        {stats.avg_rating > 0 && (
          <StatCard
            label="Snitt rating"
            value={`${stats.avg_rating}⭐`}
            icon="⭐"
          />
        )}
      </View>
    </View>
  )
}
