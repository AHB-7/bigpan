// src/components/profile/profileParts/ProfileHeader.tsx
import React, { useState } from 'react'
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
import { useAuth } from '@/hooks/useAuth'
import { useAsyncFunction } from '@/hooks/asyncFunction'

interface ProfileHeaderProps {
  profile: EnhancedUserProfile
  isOwnProfile: boolean
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  isOwnProfile,
}) => {
  const { updateProfile } = useAuth()
  const { executeSupabase } = useAsyncFunction()
  const [currentAvatarUrl, setCurrentAvatarUrl] = useState<string | null>(
    profile.avatar_url
  )

  const handleAvatarUpdate = async (newAvatarUrl: string) => {
    // Update local state immediately for instant UI feedback
    setCurrentAvatarUrl(newAvatarUrl)

    if (isOwnProfile) {
      // Save to database
      await executeSupabase(() => updateProfile({ avatar_url: newAvatarUrl }), {
        showErrorMethod: 'toast',
        successMessage: 'Profilbilde oppdatert!',
        errorMessage: 'Kunne ikke oppdatere profilbilde',
        onSuccess: (result) => {
          console.log('✅ Avatar saved to database:', result?.avatar_url)
        },
        onError: (error) => {
          console.error('❌ Failed to save avatar to database:', error)
          // Revert local state if database update fails
          setCurrentAvatarUrl(profile.avatar_url)
        },
      })
    }
  }

  return (
    <View style={styles.headerContainer}>
      <ProfileAvatar
        avatar_url={currentAvatarUrl}
        name={profile.display_name || profile.username}
        level={profile.cooking_level}
        isEditable={isOwnProfile}
        onAvatarUpdate={handleAvatarUpdate}
      />

      <Text variant="heading2" weight="bold">
        {profile.display_name || profile.username}
      </Text>
      <Text variant="label" weight="regular" color={theme.colors.onSurface}>
        {profile.cooking_level}
      </Text>
      <ProfileStats stats={profile.stats} />

      {/* Relationship badges for other users */}
      {!isOwnProfile && (
        <RelationshipBadges
          is_friend={profile.is_friend}
          is_following={profile.is_following}
        />
      )}

      {/* Settings and actions for own profile */}
      {isOwnProfile && (
        <>
          <Ionicons name="settings" style={styles.settingIcon} />
          <BigBtn />
        </>
      )}
    </View>
  )
}
