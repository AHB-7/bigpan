import React from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import { theme } from '@/styles/theme'

interface LoadingSpinnerProps {
  size?: 'small' | 'large'
  color?: string
  style?: any
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color = theme.colors.primary,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
