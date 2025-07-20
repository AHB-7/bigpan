import React from 'react'
import { View } from 'react-native'
import { Text } from '@/components/common'
import { ProfileField } from './ProfileField'
import { theme } from '@/styles/theme'
import type { EnhancedUserProfile } from '@/types'

interface ProfileInfoProps {
  profile: EnhancedUserProfile
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ profile }) => {
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
        ℹ️ Profilinformasjon
      </Text>

      <ProfileField label="Brukernavn" value={profile.username} />
      <ProfileField
        label="Kokkenivå"
        value={profile.cooking_level || 'Ikke satt'}
      />
      {profile.location && (
        <ProfileField label="Lokasjon" value={profile.location} />
      )}
      <ProfileField
        label="Medlem siden"
        value={new Date(profile.created_at || '').toLocaleDateString('no-NO')}
      />
    </View>
  )
}
