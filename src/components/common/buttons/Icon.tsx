import React from 'react'
import { ButtonCircle, CircleButtonVariant, CircleSize } from './ButtonCircle'

interface IconButtonProps {
  icon: string | React.ReactNode
  onPress: () => void
  size?: CircleSize
  disabled?: boolean
  variant?: CircleButtonVariant
  accessibilityLabel: string
  backgroundColor?: string
  iconColor?: string
  style?: any
  [key: string]: any
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  accessibilityLabel,
  ...props
}) => {
  return (
    <ButtonCircle accessibilityLabel={accessibilityLabel} {...props}>
      {icon}
    </ButtonCircle>
  )
}
