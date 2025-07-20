import React from 'react'
import { View } from 'react-native'
import { Text } from '@/components/common'
import { theme } from '@/styles/theme'

interface ProfileFieldProps {
  label: string
  value: string
}

export const ProfileField: React.FC<ProfileFieldProps> = ({ label, value }) => (
  <View style={{ marginBottom: theme.spacing.sm }}>
    <Text
      variant="label"
      style={{
        color: theme.colors.onSurfaceVariant,
        marginBottom: 2,
      }}
    >
      {label}:
    </Text>
    <Text variant="body" style={{ color: theme.colors.onSurface }}>
      {value}
    </Text>
  </View>
)
