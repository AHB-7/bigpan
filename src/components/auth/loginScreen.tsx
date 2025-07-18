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
import { styles } from './styles'
import { LoginFormData, useLoginForm } from '@/schemas/auth'
import { useAsyncFunction } from '@/hooks/asyncFunction'
import { DividerWithText } from '../common/ui/divider'

export const LoginScreen: React.FC = () => {
  const { executeSupabase, isLoading } = useAsyncFunction()
  const { signIn, user } = useAuth()
  const { control, handleSubmit, errors } = useLoginForm()
  const [loginError, setLoginError] = useState('')

  const onSubmit = async (data: LoginFormData) => {
    setLoginError('')

    await executeSupabase(() => signIn(data.email, data.password), {
      showErrorMethod: 'inline',
      errorMessage:
        'Ugyldig e-post eller passord. Vennligst sjekk dine legitimasjonsopplysninger og prøv igjen.',
      onSuccess: () => {
        user?.id
          ? router.replace(`/user/${user.id}`)
          : router.replace('/(auth)/onboarding')
      },
      onShowError: (message) => setLoginError(message),
    })
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
            <View style={styles.formContainer}>
              <Text weight="semiBold" variant="heading1" style={styles.header}>
                Logg Inn
              </Text>

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="E-post"
                    autoFocus={true}
                    placeholder="Skriv inn din e-post"
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
                    label="Passord"
                    placeholder="Skriv inn ditt passord"
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
                Glemt passord?
              </TextLink>

              <Button
                onPress={handleSubmit(onSubmit)}
                disabled={isLoading}
                variant="filled"
              >
                {isLoading && (
                  <LoadingSpinner size="small" color={theme.colors.surface} />
                )}
                {isLoading ? 'Logger inn...' : 'Logg Inn'}
              </Button>

              <View style={styles.divider}>
                <DividerWithText text="eller" />
              </View>

              <View style={styles.iconsContainer}>
                <IconButton
                  onPress={() => handleSocialAuth('apple')}
                  variant="empty"
                  icon={<AntDesign name="apple1" size={24} color="black" />}
                  accessibilityLabel="Logg inn med Apple"
                  accessibilityHint="Logg inn med din Apple-konto"
                  color={theme.colors.onSurfaceVariant}
                />
                <IconButton
                  onPress={() => handleSocialAuth('google')}
                  variant="empty"
                  icon={<AntDesign name="google" size={24} color="black" />}
                  accessibilityLabel="Logg inn med Google"
                  accessibilityHint="Logg inn med din Google-konto"
                  color={theme.colors.onSurfaceVariant}
                />
                <IconButton
                  onPress={() => handleSocialAuth('facebook')}
                  variant="empty"
                  icon={
                    <AntDesign name="facebook-square" size={24} color="black" />
                  }
                  accessibilityLabel="Logg inn med Facebook"
                  accessibilityHint="Logg inn med din Facebook-konto"
                  color={theme.colors.onSurfaceVariant}
                />
              </View>
            </View>

            <View style={styles.footer}>
              <Text variant="bodySmall">Har du ikke en konto? </Text>
              <TextLink
                href="/(auth)/register"
                variant="bodySmall"
                color={theme.colors.primary}
                weight="semiBold"
              >
                Registrer deg nå!
              </TextLink>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}
