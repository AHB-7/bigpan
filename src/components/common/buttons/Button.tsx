// src/components/common/buttons/Button.tsx - Updated with translation support
import React from 'react'
import { TouchableOpacity, ViewStyle, TextStyle } from 'react-native'
import { Text } from '../informatic/Text'
import { theme } from '@/styles/theme'
import { useTranslation, TranslationKey } from '@/hooks/useTranslation'

type ButtonVariant = 'filled' | 'outlined' | 'text'

interface ButtonProps {
  children?: React.ReactNode
  onPress: () => void
  variant?: ButtonVariant
  disabled?: boolean
  loading?: boolean
  style?: ViewStyle
  textStyle?: TextStyle
  textColor?: string
  backgroundColor?: string
  // Translation support
  translationKey?: TranslationKey
  translationParams?: Record<string, string | number>
  [key: string]: any
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  variant = 'filled',
  disabled = false,
  loading = false,
  style,
  textStyle,
  textColor,
  textVariant,
  backgroundColor,
  translationKey,
  translationParams,
  ...props
}) => {
  const { t } = useTranslation()

  const buttonStyles = {
    filled: {
      backgroundColor: disabled
        ? '#CCCCCC'
        : backgroundColor || theme.colors.primary,
      borderWidth: 1,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      height: 50,
      borderColor: disabled ? '#CCCCCC' : theme.colors.primary,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: 100,
    },
    outlined: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: disabled ? '#CCCCCC' : theme.colors.primary,
      allignItems: 'center' as const,
      justifyContent: 'center' as const,
      height: 50,
      paddingHorizontal: theme.spacing.lg,
      borderRadius: 100,
      alignItems: 'center' as const,
    },
    text: {
      backgroundColor: 'transparent',
      paddingHorizontal: theme.spacing.md,
      alignItems: 'center' as const,
    },
  }

  const textColors = {
    filled: disabled ? '#999999' : textColor || 'white',
    outlined: disabled ? '#999999' : textColor || theme.colors.primary,
    text: disabled ? '#999999' : textColor || theme.colors.primary,
  }

  const isDisabled = disabled || loading

  // Get display text
  const displayText = loading
    ? t('common.loading')
    : translationKey
      ? t(translationKey, translationParams)
      : children

  return (
    <TouchableOpacity
      style={[buttonStyles[variant], style]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={isDisabled ? 1 : 0.7}
      {...props}
    >
      <Text
        variant={textVariant || 'body'}
        weight="medium"
        style={{ color: textColors[variant], ...textStyle }}
      >
        {displayText}
      </Text>
    </TouchableOpacity>
  )
}
