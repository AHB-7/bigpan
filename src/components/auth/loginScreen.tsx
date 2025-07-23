// src/components/auth/loginScreen.tsx - Clean version with translations
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
import { useTranslation } from '@/hooks/useTranslation'
import { SafeAreaView } from 'react-native-safe-area-context'
import { theme } from '@/styles/theme'
import { AntDesign } from '@expo/vector-icons'
import {
  TextLink,
  Button,
  LoadingSpinner,
  Text,
  Input,
  InlineError,
  IconButton,
} from '@/components/common'
import { LanguagePicker } from '@/components/common/LanguagePicker'
import { styles } from './styles'
import { LoginFormData, useLoginForm } from '@/schemas/auth'
import { useAsyncFunction } from '@/hooks/asyncFunction'
import { DividerWithText } from '../common/ui/divider'

export const LoginScreen: React.FC = () => {
  const { executeSupabase, isLoading } = useAsyncFunction()
  const { signIn, user } = useAuth()
  const { t } = useTranslation()
  const { control, handleSubmit, errors } = useLoginForm()
  const [loginError, setLoginError] = useState('')

  const onSubmit = async (data: LoginFormData) => {
    setLoginError('')

    const result = await executeSupabase(
      () => signIn(data.email, data.password),
      {
        showErrorMethod: 'inline',
        errorMessage: t('auth.error.invalid'),
        onSuccess: (signInResult) => {
          console.log('SignIn result:', {
            success: true,
            userId: signInResult?.session?.user?.id,
            hasSession: !!signInResult?.session,
            hasUser: !!signInResult?.session?.user,
          })

          const userId = signInResult?.session?.user?.id
          if (userId) {
            router.replace(`/user/${userId}`)
          } else {
            console.error('No user ID in sign in result')
          }
        },
        onShowError: (message) => setLoginError(message),
      }
    )

    console.log('ExecuteSupabase result:', result)
  }

  const handleSocialAuth = (_provider: 'apple' | 'google' | 'facebook') => {
    router.push('/(auth)/register')
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {/* Language Picker at the top */}
            <View
              style={{ alignItems: 'center', marginBottom: theme.spacing.lg }}
            >
              <LanguagePicker showLabel={false} />
            </View>

            <View style={styles.formContainer}>
              <View style={styles.headerContainer}>
                <Text weight="black" variant="heading1">
                  {t('auth.login')}
                </Text>
              </View>

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label={t('auth.email')}
                    autoFocus={true}
                    placeholder={t('auth.email.placeholder')}
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
                    label={t('auth.password')}
                    placeholder={t('auth.password.placeholder')}
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

              {loginError && <InlineError message={loginError} />}

              <TextLink
                href="/(auth)/forgot-password"
                style={styles.forgotPassword}
                variant="bodySmall"
                weight="medium"
              >
                {t('auth.forgot.password')}
              </TextLink>

              <Button
                onPress={handleSubmit(onSubmit)}
                disabled={isLoading}
                variant="filled"
              >
                {isLoading && (
                  <LoadingSpinner size="small" color={theme.colors.surface} />
                )}
                {isLoading ? t('message.loading') : t('auth.login.button')}
              </Button>

              <View style={styles.divider}>
                <DividerWithText text={t('common.or')} />
              </View>

              <View style={styles.iconsContainer}>
                <IconButton
                  onPress={() => handleSocialAuth('apple')}
                  variant="empty"
                  icon={<AntDesign name="apple1" size={24} color="black" />}
                  accessibilityLabel={t('auth.apple.accessibility')}
                  accessibilityHint={t('auth.apple.hint')}
                  color={theme.colors.onSurfaceVariant}
                />
                <IconButton
                  onPress={() => handleSocialAuth('google')}
                  variant="empty"
                  icon={<AntDesign name="google" size={24} color="black" />}
                  accessibilityLabel={t('auth.google.accessibility')}
                  accessibilityHint={t('auth.google.hint')}
                  color={theme.colors.onSurfaceVariant}
                />
                <IconButton
                  onPress={() => handleSocialAuth('facebook')}
                  variant="empty"
                  icon={
                    <AntDesign name="facebook-square" size={24} color="black" />
                  }
                  accessibilityLabel={t('auth.facebook.accessibility')}
                  accessibilityHint={t('auth.facebook.hint')}
                  color={theme.colors.onSurfaceVariant}
                />
              </View>
            </View>

            <View style={styles.footer}>
              <Text variant="bodySmall">{t('auth.no.account')} </Text>
              <TextLink
                href="/(auth)/register"
                variant="bodySmall"
                color={theme.colors.primary}
                weight="semiBold"
              >
                {t('auth.register.link')}
              </TextLink>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}
