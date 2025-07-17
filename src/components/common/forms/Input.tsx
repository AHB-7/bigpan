import React, { useState } from 'react'
import {
  View,
  TextInput,
  TouchableOpacity,
  TextInputProps,
  StyleSheet,
} from 'react-native'
import { Text } from '../informatic/Text'
import { theme } from '@/styles/theme'
import { globalStyles } from '@/styles/globalStyles'

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
    <View style={[globalStyles.inputContainer, containerStyle]}>
      {label && (
        <Text style={globalStyles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            globalStyles.input,
            error && globalStyles.inputError,
            isPassword && styles.passwordInput,
            inputStyle,
          ]}
          placeholderTextColor={theme.colors.onSurfaceVariant}
          secureTextEntry={isPassword && !showPassword}
          {...textInputProps}
        />

        {isPassword && (
          <TouchableOpacity
            style={globalStyles.passwordToggle}
            onPress={() => setShowPassword(!showPassword)}
            activeOpacity={0.7}
          >
            <Text style={globalStyles.passwordToggleText}>
              {showPassword ? '🙈' : '👁️'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={globalStyles.errorText}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  inputWrapper: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50, // Make space for the eye icon
  },
  required: {
    color: theme.colors.error || '#FF0000',
  },
})
