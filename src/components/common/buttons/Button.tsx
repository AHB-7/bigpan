import { globalStyles } from '@/styles/globalStyles'
import React, { memo, useCallback } from 'react'
import { TouchableOpacity, ViewStyle, TextStyle, Text } from 'react-native'

interface ButtonProps {
  content: React.ReactNode
  onPress: () => void
  style?: ViewStyle
  textStyle?: TextStyle
  disabled?: boolean
}

const ButtonComponent = ({
  content,
  onPress,
  style,
  textStyle,
  disabled = false,
}: ButtonProps) => {
  const handlePress = useCallback(() => {
    if (!disabled) {
      onPress()
    }
  }, [onPress, disabled])

  return (
    <TouchableOpacity
      style={[globalStyles.button, style, disabled && { opacity: 0.6 }]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text
        style={[globalStyles.buttonText, textStyle].filter(
          (s): s is TextStyle => !!s
        )}
      >
        {content}
      </Text>
    </TouchableOpacity>
  )
}

export const Button = memo(ButtonComponent, (prevProps, nextProps) => {
  return (
    prevProps.content === nextProps.content &&
    prevProps.onPress === nextProps.onPress &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.style === nextProps.style &&
    prevProps.textStyle === nextProps.textStyle
  )
})

// const RecipesButtonComponent = ({
//   content,
//   onPress,
//   style,
//   textStyle,
//   disabled = false,
// }: ButtonProps) => {
//   const handlePress = useCallback(() => {
//     if (!disabled) {
//       onPress()
//     }
//   }, [onPress, disabled])

//   return (
//     <TouchableOpacity
//       style={[buttonStyling.recipesButton, style, disabled && { opacity: 0.6 }]}
//       onPress={handlePress}
//       disabled={disabled}
//       activeOpacity={0.7}
//     >
//       <CustomText
//         style={[buttonStyling.buttonText, textStyle].filter(
//           (s): s is TextStyle => !!s
//         )}
//       >
//         {content}
//       </CustomText>
//     </TouchableOpacity>
//   )
// }
// export const recipesButton = memo(
//   RecipesButtonComponent,
//   (prevProps, nextProps) => {
//     return (
//       prevProps.content === nextProps.content &&
//       prevProps.onPress === nextProps.onPress &&
//       prevProps.disabled === nextProps.disabled &&
//       prevProps.style === nextProps.style &&
//       prevProps.textStyle === nextProps.textStyle
//     )
//   }
// )
