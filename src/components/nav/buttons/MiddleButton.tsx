// components/navBar/buttons/MiddleButton.tsx - Enhanced with color control
import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  Keyboard,
  Animated,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { styles } from '../styles'
import { theme } from '@/styles/theme'

interface MiddleIconProps {
  onPress: () => void
  iconName: React.ComponentProps<typeof Ionicons>['name']
  text?: string
  shouldShow?: boolean
  inputMode?: boolean
  inputValue?: string
  onInputChange?: (text: string) => void
  inputPlaceholder?: string
  textColor?: string
  iconColor?: string
  backgroundColor?: string
  activeTextColor?: string
  activeIconColor?: string
  activeBackgroundColor?: string
}

export function MiddleIcon({
  onPress,
  iconName,
  text,
  shouldShow = true,
  inputMode = false,
  inputValue = '',
  onInputChange,
  inputPlaceholder = 'Type here...',
  textColor,
  iconColor,
  backgroundColor,
  activeTextColor,
  activeIconColor,
  activeBackgroundColor,
}: MiddleIconProps) {
  const [isInputActive, setIsInputActive] = useState(false)
  const [keyboardHeight, setKeyboardHeight] = useState(0)
  const inputRef = useRef<TextInput>(null)
  const slideAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const keyboardWillShow = (event: any) => {
      setKeyboardHeight(event.endCoordinates.height)
    }

    const keyboardWillHide = () => {
      setKeyboardHeight(0)
    }

    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      keyboardWillShow
    )
    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      keyboardWillHide
    )

    return () => {
      showSubscription?.remove()
      hideSubscription?.remove()
    }
  }, [])

  useEffect(() => {
    if (isInputActive) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start()
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }).start()
    }
  }, [isInputActive, slideAnim])

  if (!shouldShow) return null

  const getColors = () => {
    const hasContent = inputValue && inputValue.trim().length > 0
    const isActive = isInputActive || hasContent

    const defaultTextColor = textColor || theme.colors.surfaceVariant
    const defaultIconColor = iconColor || theme.colors.surfaceVariant
    const defaultBackgroundColor = backgroundColor || theme.colors.onBackground

    return {
      currentTextColor: isActive
        ? activeTextColor || defaultTextColor
        : defaultTextColor,
      currentIconColor: isActive
        ? activeIconColor || defaultIconColor
        : defaultIconColor,
      currentBackgroundColor: isActive
        ? activeBackgroundColor || defaultBackgroundColor
        : defaultBackgroundColor,
    }
  }

  const { currentTextColor, currentIconColor, currentBackgroundColor } =
    getColors()

  const handlePress = () => {
    if (inputMode) {
      setIsInputActive(true)
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    } else {
      onPress()
    }
  }

  const handleInputBlur = () => {
    setIsInputActive(false)
  }

  const handleInputSubmit = () => {
    setIsInputActive(false)
    inputRef.current?.blur()
  }

  if (inputMode && isInputActive) {
    const inputPosition = keyboardHeight > 0 ? keyboardHeight - 10 : 10
    return (
      <Animated.View
        style={{
          position: 'absolute',
          bottom: slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, inputPosition],
          }),
          left: 16,
          right: 16,
          zIndex: 1000,
          opacity: slideAnim,
          transform: [
            {
              scale: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.9, 1],
              }),
            },
          ],
        }}
      >
        <View
          style={[
            styles.middleContainer,
            { backgroundColor: currentBackgroundColor },
          ]}
        >
          <Ionicons
            name={iconName}
            style={[styles.middleIcon, { color: currentIconColor }]}
          />
          <TextInput
            ref={inputRef}
            style={[styles.middleText, { color: currentTextColor }]}
            value={inputValue}
            onChangeText={onInputChange}
            placeholder={inputPlaceholder}
            placeholderTextColor={currentTextColor + '60'}
            onBlur={handleInputBlur}
            onSubmitEditing={handleInputSubmit}
            returnKeyType="search"
            autoFocus
            selectionColor={currentTextColor}
          />
          {inputValue && inputValue.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                onInputChange?.('')
              }}
              style={{
                marginLeft: 'auto',
                padding: 2,
                borderRadius: 100,
              }}
              hitSlop={{
                top: 10,
                bottom: 10,
                left: 10,
                right: 10,
              }}
            >
              <Ionicons
                name="close-circle"
                style={[styles.middleIcon, { color: currentIconColor }]}
              />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    )
  }

  // Render default button mode
  return (
    <TouchableOpacity
      style={[
        styles.middleContainer,
        { backgroundColor: currentBackgroundColor },
      ]}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <Ionicons
        name={iconName}
        style={[styles.middleIcon, { color: currentIconColor }]}
      />
      {text && (
        <Text
          style={[styles.middleText, { color: currentTextColor }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  )
}
