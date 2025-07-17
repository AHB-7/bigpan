import React from 'react'
import { Text as RNText, TextStyle, TouchableOpacity } from 'react-native'
import { typography } from '@/styles/typography'
import { router } from 'expo-router'

type FontWeight = keyof typeof typography.fonts.montserrat
type TypographyVariant = keyof typeof typography.scale
type RouterPushArg = Parameters<typeof router.push>[0]

interface LinkProps {
  children: React.ReactNode
  href: RouterPushArg
  variant?: TypographyVariant
  weight?: FontWeight
  color?: string
  style?: TextStyle
  [key: string]: any
}

export const TextLink: React.FC<LinkProps> = ({
  children,
  href,
  variant = 'body',
  weight,
  color = '#007AFF',
  style,
  ...props
}) => {
  const getTextStyle = (): TextStyle => {
    const baseStyle = typography.scale[variant]

    const finalStyle = {
      ...baseStyle,
      color,
    }

    if (weight) {
      finalStyle.fontFamily = typography.fonts.montserrat[weight]
    }

    return finalStyle
  }

  return (
    <TouchableOpacity onPress={() => router.push(href)} activeOpacity={0.7}>
      <RNText style={[getTextStyle(), style]} {...props}>
        {children}
      </RNText>
    </TouchableOpacity>
  )
}
