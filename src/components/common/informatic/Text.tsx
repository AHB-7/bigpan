import React from 'react'
import { Text as RNText, TextStyle } from 'react-native'
import { typography } from '@/styles/typography'

type FontWeight = keyof typeof typography.fonts.montserrat
type TypographyVariant = keyof typeof typography.scale

interface TextProps {
  children: React.ReactNode
  variant?: TypographyVariant
  weight?: FontWeight
  color?: string
  style?: TextStyle
  [key: string]: any
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  weight,
  color = '#212121',
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
    <RNText style={[getTextStyle(), style]} {...props}>
      {children}
    </RNText>
  )
}
