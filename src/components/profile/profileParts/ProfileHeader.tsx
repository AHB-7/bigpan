import React from 'react'
import { View } from 'react-native'
import { Text } from '@/components/common'
import { ProfileAvatar } from './ProfileAvatar'
import { RelationshipBadges } from './RelationshipBadges'
import { theme } from '@/styles/theme'
import type { EnhancedUserProfile } from '@/types'
import { styles } from './styles'
import { Ionicons } from '@expo/vector-icons'
import { ProfileStats } from './ProfileStats'
import { BigBtn } from './Btn'

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
        level={profile.cooking_level}
      />

      <Text variant="heading2" weight="bold">
        {profile.display_name || profile.username}
      </Text>
      <Text variant="label" weight="regular" color={theme.colors.onSurface}>
        {profile.cooking_level}
      </Text>
      <ProfileStats stats={profile.stats} />
      {/* Later Fix */}
      {!isOwnProfile && (
        <RelationshipBadges
          is_friend={profile.is_friend}
          is_following={profile.is_following}
        />
      )}
      {isOwnProfile && (
        <>
          <Ionicons name="settings" style={styles.settingIcon} />
          <BigBtn />
        </>
      )}
    </View>
  )
}
