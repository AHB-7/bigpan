import React from 'react'
import { View } from 'react-native'
import { Text } from '@/components/common'
import { ProfileAvatar } from './ProfileAvatar'
import { RelationshipBadges } from './RelationshipBadges'
import { theme } from '@/styles/theme'
import type { EnhancedUserProfile } from '@/types'
import { styles } from './styles'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

interface ProfileHeaderProps {
  profile: EnhancedUserProfile
  isOwnProfile: boolean
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  isOwnProfile,
}) => {
  return (
    <View style={styles.headerContainer}>
      <ProfileAvatar
        avatar_url={profile.avatar_url}
        name={profile.display_name || profile.username}
      />

      <Text variant="heading3">{profile.display_name || profile.username}</Text>

      {profile.bio && <Text variant="body">{profile.bio}</Text>}
      <View style={styles.headerStatsContainer}>
        <View style={styles.headerStats}>
          <Ionicons name="newspaper-outline" style={styles.headerStatsIcon} />
          <Text variant="body">{profile.stats.recipes_published}</Text>
        </View>
        <View style={styles.headerStats}>
          <Ionicons name="heart" style={styles.headerStatsIcon} />
          <Text variant="body">{profile.stats.total_likes}</Text>
        </View>
        <View style={styles.headerStats}>
          <Ionicons name="people-outline" style={styles.headerStatsIcon} />
          <Text variant="body">
            {profile.stats.followers_count + profile.stats.friends_count}
          </Text>
        </View>
        <View style={styles.headerStats}>
          <Ionicons name="eye" style={styles.headerStatsIcon} />
          <Text variant="body">{profile.stats.total_views} </Text>
        </View>
        <View style={styles.headerStats}>
          <Ionicons name="star" style={styles.headerStatsIcon} />
          <Text variant="body">{profile.stats.avg_rating.toFixed(1)}</Text>
        </View>
      </View>
      {!isOwnProfile && (
        <RelationshipBadges
          is_friend={profile.is_friend}
          is_following={profile.is_following}
        />
      )}
      {isOwnProfile && (
        <MaterialIcons name="play-arrow" style={styles.settingIcon} />
      )}
    </View>
  )
}
