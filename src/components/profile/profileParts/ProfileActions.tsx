import React from 'react'
import { View } from 'react-native'
import { Button } from '@/components/common'
import { router } from 'expo-router'
import { theme } from '@/styles/theme'

interface ProfileActionsProps {
  onSignOut: () => void
}

export const ProfileActions: React.FC<ProfileActionsProps> = ({
  onSignOut,
}) => {
  return (
    <View
      style={{
        width: '100%',
        gap: theme.spacing.md,
        marginTop: theme.spacing.lg,
      }}
    >
      <Button variant="filled" onPress={() => router.push('/profile/edit')}>
        ✏️ Rediger profil
      </Button>

      <Button
        variant="outlined"
        onPress={() => router.push('/(auth)/onboarding')}
      >
        ⚙️ Oppdater preferanser
      </Button>

      <Button variant="outlined" onPress={() => router.push('/recipes/create')}>
        ➕ Lag ny oppskrift
      </Button>

      <Button variant="text" onPress={onSignOut} textColor={theme.colors.error}>
        🚪 Logg ut
      </Button>
    </View>
  )
}
