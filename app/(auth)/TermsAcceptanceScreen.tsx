// TermsAcceptanceScreen.tsx
import React, { useState } from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { Text, Button, LoadingSpinner } from '@/components/common'
import { theme } from '@/styles/theme'
import { useAsyncFunction } from '@/hooks/asyncFunction'
import { useAuth } from '@/hooks/useAuth'

interface TermsAcceptanceScreenProps {
  onAccept: () => void
  onDecline?: () => void
}

export const TermsAcceptanceScreen: React.FC<TermsAcceptanceScreenProps> = ({
  onAccept,
  onDecline,
}) => {
  const [hasReadTerms, setHasReadTerms] = useState(false)
  const [hasReadPrivacy, setHasReadPrivacy] = useState(false)
  const { executeSupabase, isLoading } = useAsyncFunction()
  const { acceptTerms } = useAuth()

  const canAccept = hasReadTerms && hasReadPrivacy

  const handleAcceptTerms = async () => {
    if (!canAccept) {
      Alert.alert(
        'Les vilkårene',
        'Du må lese både bruksvilkårene og personvernserklæringen før du kan fortsette.'
      )
      return
    }

    await executeSupabase(() => acceptTerms(), {
      showErrorMethod: 'alert',
      successMessage: 'Vilkår akseptert!',
      errorMessage: 'Kunne ikke akseptere vilkår. Prøv igjen.',
      onSuccess: onAccept,
    })
  }

  const handleDecline = () => {
    Alert.alert(
      'Avvis vilkår',
      'Du må akseptere våre vilkår for å bruke BigPan. Er du sikker på at du vil avvise?',
      [
        { text: 'Avbryt', style: 'cancel' },
        {
          text: 'Avvis',
          style: 'destructive',
          onPress: onDecline || (() => router.replace('/(auth)/start')),
        },
      ]
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text variant="heading1" weight="bold" style={styles.title}>
            Velkommen til BigPan! 🍳
          </Text>
          <Text variant="body" style={styles.subtitle}>
            For å komme i gang må du akseptere våre vilkår og betingelser.
          </Text>
        </View>

        {/* Terms and Conditions Section */}
        <View style={styles.section}>
          <Text
            variant="heading2"
            weight="semiBold"
            style={styles.sectionTitle}
          >
            Bruksvilkår
          </Text>

          <ScrollView style={styles.termsContainer} nestedScrollEnabled>
            <Text variant="bodySmall" style={styles.termsText}>
              {/* Add your actual terms here */}
              <Text weight="semiBold">1. Aksept av vilkår{'\n'}</Text>
              Ved å bruke BigPan aksepterer du disse vilkårene og betingelsene.
              {'\n\n'}
              <Text weight="semiBold">2. Bruk av tjenesten{'\n'}</Text>
              Du kan dele oppskrifter, delta i grupper og kommunisere med andre
              brukere.
              {'\n\n'}
              <Text weight="semiBold">3. Brukerinnhold{'\n'}</Text>
              Du er ansvarlig for innholdet du deler. Alt innhold må være lovlig
              og respektfullt.
              {'\n\n'}
              <Text weight="semiBold">4. Personvern{'\n'}</Text>
              Vi respekterer ditt personvern. Les vår personvernserklæring for
              detaljer.
              {'\n\n'}
              <Text weight="semiBold">5. Endringer{'\n'}</Text>
              Vi kan oppdatere disse vilkårene. Du vil bli varslet om vesentlige
              endringer.
            </Text>
          </ScrollView>

          <TouchableOpacity
            style={[styles.checkbox, hasReadTerms && styles.checkboxChecked]}
            onPress={() => setHasReadTerms(!hasReadTerms)}
          >
            <Text
              variant="bodySmall"
              weight={hasReadTerms ? 'semiBold' : 'regular'}
              style={[
                styles.checkboxText,
                hasReadTerms && styles.checkboxTextChecked,
              ]}
            >
              ✓ Jeg har lest og forstått bruksvilkårene
            </Text>
          </TouchableOpacity>
        </View>

        {/* Privacy Policy Section */}
        <View style={styles.section}>
          <Text
            variant="heading2"
            weight="semiBold"
            style={styles.sectionTitle}
          >
            Personvernserklæring
          </Text>

          <ScrollView style={styles.termsContainer} nestedScrollEnabled>
            <Text variant="bodySmall" style={styles.termsText}>
              {/* Add your actual privacy policy here */}
              <Text weight="semiBold">Datainnsamling{'\n'}</Text>
              Vi samler inn informasjon du gir oss når du registrerer deg og
              bruker appen.
              {'\n\n'}
              <Text weight="semiBold">Bruk av data{'\n'}</Text>
              Vi bruker dine data til å forbedre tjenesten og gi deg
              personaliserte oppskrifter.
              {'\n\n'}
              <Text weight="semiBold">Deling av data{'\n'}</Text>
              Vi deler ikke dine personlige data med tredjeparter uten ditt
              samtykke.
              {'\n\n'}
              <Text weight="semiBold">Dine rettigheter{'\n'}</Text>
              Du kan be om innsyn, retting eller sletting av dine data når som
              helst.
            </Text>
          </ScrollView>

          <TouchableOpacity
            style={[styles.checkbox, hasReadPrivacy && styles.checkboxChecked]}
            onPress={() => setHasReadPrivacy(!hasReadPrivacy)}
          >
            <Text
              variant="bodySmall"
              weight={hasReadPrivacy ? 'semiBold' : 'regular'}
              style={[
                styles.checkboxText,
                hasReadPrivacy && styles.checkboxTextChecked,
              ]}
            >
              ✓ Jeg har lest og forstått personvernserklæringen
            </Text>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttons}>
          <Button
            variant="outlined"
            onPress={handleDecline}
            style={styles.declineButton}
          >
            Avvis
          </Button>

          <Button
            variant="filled"
            onPress={handleAcceptTerms}
            disabled={!canAccept || isLoading}
            style={[
              styles.acceptButton,
              !canAccept && styles.acceptButtonDisabled,
            ]}
          >
            {isLoading ? <LoadingSpinner /> : 'Aksepter og fortsett'}
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
  },
  header: {
    marginBottom: theme.spacing.xl,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    color: theme.colors.onBackground,
  },
  subtitle: {
    textAlign: 'center',
    color: theme.colors.onSurface,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    marginBottom: theme.spacing.md,
    color: theme.colors.onBackground,
  },
  termsContainer: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: theme.colors.outline,
    borderRadius: 8,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  termsText: {
    lineHeight: 20,
    color: theme.colors.onSurface,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.outline,
    borderRadius: 8,
    backgroundColor: theme.colors.surface,
  },
  checkboxChecked: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primaryContainer,
  },
  checkboxText: {
    flex: 1,
    color: theme.colors.onSurface,
  },
  checkboxTextChecked: {
    color: theme.colors.primary,
  },
  buttons: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginTop: theme.spacing.xl,
  },
  declineButton: {
    flex: 1,
  },
  acceptButton: {
    flex: 2,
  },
  acceptButtonDisabled: {
    opacity: 0.5,
  },
})
