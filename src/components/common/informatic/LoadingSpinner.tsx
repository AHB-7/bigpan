import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { theme } from '@/styles/theme'
import { styles } from '../stlyes'

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
    <View style={[styles.loaderContainer, style]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  )
}
