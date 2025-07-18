import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, TextInputProps } from 'react-native'
import { Text } from '../informatic/Text'
import { theme } from '@/styles/theme'
import { styles } from '../stlyes'

interface InputProps extends TextInputProps {
  label?: string
  error?: string
  isPassword?: boolean
  containerStyle?: object
  inputStyle?: object
  required?: boolean
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  isPassword = false,
  containerStyle,
  inputStyle,
  required = false,
  ...textInputProps
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View style={[styles.inputContainer, containerStyle]}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input,
            error && styles.inputError,
            isPassword && styles.passwordInput,
            inputStyle,
          ]}
          placeholderTextColor={theme.colors.onSurfaceVariant}
          secureTextEntry={isPassword && !showPassword}
          {...textInputProps}
        />

        {isPassword && (
          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={() => setShowPassword(!showPassword)}
            activeOpacity={0.7}
          >
            <Text style={styles.passwordToggleText}>
              {showPassword ? '🙈' : '👁️'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}
