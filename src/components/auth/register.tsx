// Updated register.tsx with terms acceptance checkbox

import { useState } from 'react'
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Linking,
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

  // ✅ Add terms acceptance state
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [privacyAccepted, setPrivacyAccepted] = useState(false)

  const onSubmit = async (data: RegisterFormData) => {
    setFormError('')

    // ✅ Check terms acceptance before submitting
    if (!termsAccepted || !privacyAccepted) {
      setFormError(
        'Du må akseptere bruksvilkårene og personvernserklæringen for å registrere deg.'
      )
      return
    }

    await executeSupabase(
      () =>
        signUp(data.email, data.password, data.userName, {
          termsAccepted: true,
          privacyAccepted: true,
        }),
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

  const openTermsLink = () => {
    // You can either open external link or navigate to in-app terms screen
    Linking.openURL('https://bigpan.no/terms') // Replace with your actual terms URL
    // Or navigate to in-app screen: router.push('/(auth)/terms')
  }

  const openPrivacyLink = () => {
    // You can either open external link or navigate to in-app privacy screen
    Linking.openURL('https://bigpan.no/privacy') // Replace with your actual privacy URL
    // Or navigate to in-app screen: router.push('/(auth)/privacy')
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

              {/* ✅ Terms Acceptance Section */}
              <View style={termsStyles.termsContainer}>
                {/* Terms Checkbox */}
                <TouchableOpacity
                  style={termsStyles.checkboxContainer}
                  onPress={() => setTermsAccepted(!termsAccepted)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      termsStyles.checkbox,
                      termsAccepted && termsStyles.checkboxChecked,
                    ]}
                  >
                    {termsAccepted && (
                      <AntDesign
                        name="check"
                        size={16}
                        color={theme.colors.onSurface}
                      />
                    )}
                  </View>
                  <View style={termsStyles.checkboxTextContainer}>
                    <Text variant="bodySmall" style={termsStyles.checkboxText}>
                      Jeg aksepterer{' '}
                      <Text
                        variant="bodySmall"
                        style={termsStyles.linkText}
                        onPress={openTermsLink}
                      >
                        bruksvilkårene
                      </Text>
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* Privacy Checkbox */}
                <TouchableOpacity
                  style={termsStyles.checkboxContainer}
                  onPress={() => setPrivacyAccepted(!privacyAccepted)}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      termsStyles.checkbox,
                      privacyAccepted && termsStyles.checkboxChecked,
                    ]}
                  >
                    {privacyAccepted && (
                      <AntDesign
                        name="check"
                        size={16}
                        color={theme.colors.onSurface}
                      />
                    )}
                  </View>
                  <View style={termsStyles.checkboxTextContainer}>
                    <Text variant="bodySmall" style={termsStyles.checkboxText}>
                      Jeg aksepterer{' '}
                      <Text
                        variant="bodySmall"
                        style={termsStyles.linkText}
                        onPress={openPrivacyLink}
                      >
                        personvernserklæringen
                      </Text>
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Form Error */}
              {formError ? <InlineError message={formError} /> : null}

              {/* Submit Button */}
              <Button
                onPress={handleSubmit(onSubmit)}
                disabled={isLoading || !termsAccepted || !privacyAccepted}
                variant="filled"
                style={
                  !termsAccepted || !privacyAccepted
                    ? termsStyles.disabledButton
                    : undefined
                }
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

// ✅ Add styles for terms section
const termsStyles = {
  termsContainer: {
    marginVertical: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  checkboxContainer: {
    flexDirection: 'row' as const,
    alignItems: 'flex-start' as const,
    gap: theme.spacing.sm,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: theme.colors.onSurface,
    borderRadius: 4,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    backgroundColor: theme.colors.surface,
    marginTop: 2, // Align with text baseline
  },
  checkboxChecked: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  checkboxTextContainer: {
    flex: 1,
  },
  checkboxText: {
    color: theme.colors.onSurface,
    lineHeight: 20,
  },
  linkText: {
    color: theme.colors.primary,
    textDecorationLine: 'underline' as const,
  },
  disabledButton: {
    opacity: 0.5,
  },
}
