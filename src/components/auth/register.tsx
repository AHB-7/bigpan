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
import { RegisterFormData, useRegisterForm } from '@/schemas/auth'
import { useAsyncFunction } from '@/hooks/asyncFunction'
import { DividerWithText } from '../common/ui/divider'

export const RegistrerComponent: React.FC = () => {
  const { executeSupabase, isLoading } = useAsyncFunction()
  const { signUp } = useAuth()
  const { control, handleSubmit, errors } = useRegisterForm()
  const [formError, setFormError] = useState('')

  const onSubmit = async (data: RegisterFormData) => {
    setFormError('')

    await executeSupabase(
      () => signUp(data.email, data.password, data.userName),
      {
        showErrorMethod: 'inline',
        errorMessage:
          'Noe gikk galt under registreringen. Vennligst prøv igjen.',
        successMessage: 'Konto opprettet! Sjekk e-posten din for bekreftelse.',
        onSuccess: () => {
          router.replace('/(auth)/onboarding/step-1')
        },
        onShowError: (message) => setFormError(message),
      }
    )
  }

  const handleSocialAuth = (provider: 'apple' | 'google' | 'facebook') => {
    // TODO: Implement social authentication
    console.log(`Social auth with ${provider} - Not implemented yet`)
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
            {/* Form */}
            <View style={styles.formContainer}>
              <Text weight="semiBold" variant="heading1" style={styles.header}>
                Opprett konto
              </Text>

              {/* Email Input */}
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

              {/* Password Input */}
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
                    autoComplete="new-password"
                    textContentType="newPassword"
                    required
                  />
                )}
              />

              {/* Username Input */}
              <Controller
                control={control}
                name="userName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Brukernavn"
                    placeholder="Velg et unikt brukernavn"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.userName?.message}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="username"
                    textContentType="username"
                    required
                  />
                )}
              />

              {/* Form Error */}
              {formError ? <InlineError message={formError} /> : null}

              {/* Submit Button */}
              <Button
                onPress={handleSubmit(onSubmit)}
                disabled={isLoading}
                variant="filled"
              >
                {isLoading && (
                  <LoadingSpinner size="small" color={theme.colors.surface} />
                )}
                {isLoading ? 'Oppretter konto...' : 'Opprett konto'}
              </Button>

              {/* Social Auth Divider */}
              <View style={styles.divider}>
                <DividerWithText text="eller fortsett med" />
              </View>

              {/* Social Auth Buttons */}
              <View style={styles.iconsContainer}>
                <IconButton
                  onPress={() => handleSocialAuth('apple')}
                  variant="empty"
                  icon={<AntDesign name="apple1" size={24} color="black" />}
                  accessibilityLabel="Registrer deg med Apple"
                  accessibilityHint="Opprett konto med din Apple-konto"
                  color={theme.colors.onSurfaceVariant}
                />
                <IconButton
                  onPress={() => handleSocialAuth('google')}
                  variant="empty"
                  icon={<AntDesign name="google" size={24} color="black" />}
                  accessibilityLabel="Registrer deg med Google"
                  accessibilityHint="Opprett konto med din Google-konto"
                  color={theme.colors.onSurfaceVariant}
                />
                <IconButton
                  onPress={() => handleSocialAuth('facebook')}
                  variant="empty"
                  icon={
                    <AntDesign name="facebook-square" size={24} color="black" />
                  }
                  accessibilityLabel="Registrer deg med Facebook"
                  accessibilityHint="Opprett konto med din Facebook-konto"
                  color={theme.colors.onSurfaceVariant}
                />
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text variant="bodySmall">Har du allerede en konto? </Text>
              <TextLink
                href="/(auth)/login"
                variant="bodySmall"
                color={theme.colors.primary}
                weight="semiBold"
              >
                Logg inn her
              </TextLink>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}
