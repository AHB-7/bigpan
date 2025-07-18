// CircleButton.tsx - Dedicated circle button component
import { TouchableOpacity, ViewStyle } from 'react-native'
import { Text } from '../informatic/Text'
import { theme } from '@/styles/theme'

export type CircleButtonVariant = 'filled' | 'outlined' | 'empty'
export type CircleSize = 'small' | 'medium' | 'large'

interface CircleButtonProps {
  children: React.ReactNode
  onPress: () => void
  size?: CircleSize
  disabled?: boolean
  style?: ViewStyle
  backgroundColor?: string
  iconColor?: string
  variant?: CircleButtonVariant
}

interface CircleButtonProps {
  children: React.ReactNode
  onPress: () => void
  size?: CircleSize
  disabled?: boolean
  style?: ViewStyle
  backgroundColor?: string
  iconColor?: string
  variant?: 'filled' | 'outlined' | 'empty'
  [key: string]: any
}

export const ButtonCircle: React.FC<CircleButtonProps> = ({
  children,
  onPress,
  size = 'medium',
  disabled = false,
  style,
  backgroundColor,
  iconColor,
  variant = 'filled',
  ...props
}) => {
  const sizes = {
    small: {
      width: 32,
      height: 32,
      borderRadius: 16,
    },
    medium: {
      width: 48,
      height: 48,
      borderRadius: 24,
    },
    large: {
      width: 64,
      height: 64,
      borderRadius: 32,
    },
  }

  const getBackgroundColor = () => {
    if (disabled) return '#CCCCCC'

    switch (variant) {
      case 'filled':
        return backgroundColor || theme.colors.primary
      case 'outlined':
      case 'empty':
        return 'transparent'
      default:
        return backgroundColor || theme.colors.primary
    }
  }

  const getBorderWidth = () => {
    switch (variant) {
      case 'outlined':
        return 1
      case 'filled':
      case 'empty':
        return 0
      default:
        return 0
    }
  }

  const getContentColor = () => {
    if (disabled) return '#999999'
    if (iconColor) return iconColor

    switch (variant) {
      case 'filled':
        return 'white'
      case 'outlined':
      case 'empty':
        return theme.colors.primary
      default:
        return 'white'
    }
  }

  const baseStyle = {
    ...sizes[size],
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    backgroundColor: getBackgroundColor(),
    borderWidth: getBorderWidth(),
    borderColor: disabled ? '#CCCCCC' : theme.colors.primary,
  }

  const contentColor = getContentColor()

  return (
    <TouchableOpacity
      style={[baseStyle, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.7}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text
          style={{ color: contentColor, fontSize: size === 'large' ? 24 : 18 }}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  )
}
