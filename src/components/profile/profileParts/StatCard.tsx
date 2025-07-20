import React from 'react'
import { View } from 'react-native'
import { Text } from '@/components/common'
import { theme } from '@/styles/theme'

interface StatCardProps {
  label: string
  value: number | string
  icon: string
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon }) => (
  <View
    style={{
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md,
      alignItems: 'center',
      minWidth: '30%',
      flex: 1,
      marginHorizontal: 2,
    }}
  >
    <Text variant="heading2" style={{ marginBottom: 4 }}>
      {icon}
    </Text>
    <Text variant="heading3" weight="bold" style={{ marginBottom: 2 }}>
      {value}
    </Text>
    <Text
      variant="caption"
      style={{ color: theme.colors.onSurfaceVariant, textAlign: 'center' }}
    >
      {label}
    </Text>
  </View>
)
