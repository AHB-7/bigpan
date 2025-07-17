import { useState } from 'react'
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native'
import { router } from 'expo-router'
import { Controller } from 'react-hook-form'
import { useAuth } from '@/hooks/useAuth'
import { SafeAreaView } from 'react-native-safe-area-context'
import { theme } from '@/styles/theme'
import {
  TextLink,
  Button,
  LoadingSpinner,
  Text,
  Input,
  InlineError,
} from '@/components/common'
import { globalStyles } from '@/styles/globalStyles'
import { styles } from './styles'
import { LoginFormData, useLoginForm } from '@/schemas/auth'
import { useAsyncFunction } from '@/hooks/asyncFunction'

export const LoginScreen: React.FC = () => {
  const { executeSupabase, isLoading } = useAsyncFunction()
  const { signIn } = useAuth()
  const { control, handleSubmit, errors } = useLoginForm()
  const [loginError, setLoginError] = useState('')

  const onSubmit = async (data: LoginFormData) => {
    setLoginError('')

    await executeSupabase(() => signIn(data.email, data.password), {
      showErrorMethod: 'inline', // Change to inline
      errorMessage:
        'Invalid email or password. Please check your credentials and try again.',
      onSuccess: () => router.replace('/(tabs)'),
      onShowError: (message) => setLoginError(message), // Set the error message
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header */}
            <View style={styles.header}>
              <Text variant="display">🍳</Text>
              <Text weight="semiBold" variant="heading1">
                Logg Inn
              </Text>
              <Text variant="body" color="onSurfaceVariant" weight="light">
                Sign in to discover and share amazing recipes
              </Text>
            </View>

            {/* Form */}
            <View style={globalStyles.form}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Email"
                    autoFocus={true}
                    placeholder="Enter your email"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.email?.message}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="email"
                    textContentType="emailAddress"
                    required
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Password"
                    placeholder="Enter your password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.password?.message}
                    isPassword
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="current-password"
                    textContentType="password"
                    required
                  />
                )}
              />

              {loginError ? <InlineError message={loginError} /> : null}

              <TextLink
                href="/(auth)/forgot-password"
                variant="body"
                weight="medium"
              >
                Forgot Password?
              </TextLink>

              <Button
                onPress={handleSubmit(onSubmit)}
                disabled={isLoading}
                variant="filled"
                textColor={theme.colors.surface}
                backgroundColor={theme.colors.primary}
              >
                {isLoading && (
                  <LoadingSpinner size="small" color={theme.colors.surface} />
                )}
                {isLoading ? 'Signing In...' : 'Logg Inn'}
              </Button>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account?</Text>
              <TextLink
                href={'/(auth)/register'}
                variant="caption"
                color={theme.colors.primary}
                weight="semiBold"
              >
                Sign Up
              </TextLink>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}
