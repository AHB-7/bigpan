import React, { memo, useCallback } from 'react'
import { TouchableOpacity, ViewStyle, TextStyle } from 'react-native'
import { Text } from '../informatic/Text' // Assuming your Text component is in the same directory
import { typography } from '@/styles/typography'

type FontWeight = keyof typeof typography.fonts.montserrat
type TypographyVariant = keyof typeof typography.scale
type ButtonVariant = 'filled' | 'outline' | 'text'

interface ButtonProps {
  children: React.ReactNode
  onPress: () => void
  variant?: ButtonVariant
  textVariant?: TypographyVariant
  weight?: FontWeight
  textColor?: string
  backgroundColor?: string
  borderColor?: string
  style?: ViewStyle
  textStyle?: TextStyle
  disabled?: boolean
  [key: string]: any
}

const ButtonComponent = ({
  children,
  onPress,
  variant = 'filled',
  textVariant = 'body',
  weight = 'medium',
  textColor,
  backgroundColor,
  borderColor,
  style,
  textStyle,
  disabled = false,
  ...props
}: ButtonProps) => {
  const handlePress = useCallback(() => {
    if (!disabled) {
      onPress()
    }
  }, [onPress, disabled])

  const getButtonStyle = (): ViewStyle => {
    const baseStyle = {
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      opacity: disabled ? 0.6 : 1,
    }

    switch (variant) {
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: disabled ? '#CCCCCC' : borderColor || '#007AFF',
        }
      case 'text':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
        }
      case 'filled':
      default:
        return {
          ...baseStyle,
          backgroundColor: disabled ? '#CCCCCC' : backgroundColor || '#007AFF',
        }
    }
  }

  const getTextColor = (): string => {
    if (textColor) return textColor
    if (disabled) return '#999999'

    switch (variant) {
      case 'outline':
        return borderColor || '#007AFF'
      case 'text':
        return '#007AFF'
      case 'filled':
      default:
        return '#FFFFFF'
    }
  }

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
      {...props}
    >
      <Text
        variant={textVariant}
        weight={weight}
        color={getTextColor()}
        style={textStyle}
      >
        {children}
      </Text>
    </TouchableOpacity>
  )
}

export const Button = memo(ButtonComponent, (prevProps, nextProps) => {
  return (
    prevProps.children === nextProps.children &&
    prevProps.onPress === nextProps.onPress &&
    prevProps.variant === nextProps.variant &&
    prevProps.textVariant === nextProps.textVariant &&
    prevProps.weight === nextProps.weight &&
    prevProps.textColor === nextProps.textColor &&
    prevProps.backgroundColor === nextProps.backgroundColor &&
    prevProps.borderColor === nextProps.borderColor &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.style === nextProps.style &&
    prevProps.textStyle === nextProps.textStyle
  )
})
