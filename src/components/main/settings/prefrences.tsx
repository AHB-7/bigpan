// src/components/main/settings/Preferences.tsx
import React, { useState, useEffect } from 'react'
import { View, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { Text, Button, LoadingSpinner, InlineError } from '@/components/common'
import { useAuth } from '@/hooks/useAuth'
import { theme } from '@/styles/theme'
import { Controller } from 'react-hook-form'
import { useTranslation } from '@/hooks/useTranslation'
import { useAsyncFunction } from '@/hooks/asyncFunction'
import { NavBar } from '@/components/nav/NavBar'
import { usePreferencesForm, PreferencesFormData } from '@/schemas/forms'
import type { UpdateUserPreferencesData } from '@/types'

const isValidBudgetPreference = (
  value: string | null | undefined
): value is 'low' | 'medium' | 'high' => {
  return value === 'low' || value === 'medium' || value === 'high'
}

const COOKING_TIMES = [15, 30, 45, 60, 90]
const SERVING_SIZES = [1, 2, 4, 6, 8]
const BUDGET_OPTIONS = [
  { value: 'low' as const, label: 'Lavt', icon: '' },
  { value: 'medium' as const, label: 'Medium', icon: '' },
  { value: 'high' as const, label: 'Høyt', icon: '' },
]

export function Preferences() {
  const { preferences, updatePreferences } = useAuth()
  const { t } = useTranslation()
  const [preferencesError, setPreferencesError] = useState('')

  const { executeSupabase: savePreferences, isLoading: isSaving } =
    useAsyncFunction()
  const { control, handleSubmit, reset, isDirty } = usePreferencesForm()

  useEffect(() => {
    if (preferences) {
      const budgetPreference = isValidBudgetPreference(
        preferences.budget_preference
      )
        ? preferences.budget_preference
        : 'medium'

      reset({
        cooking_time_preference: preferences.cooking_time_preference || 60,
        serving_size_preference: preferences.serving_size_preference || 2,
        budget_preference: budgetPreference,
      })
    }
  }, [preferences, reset])

  const handleSave = async (data: PreferencesFormData) => {
    if (!isDirty) {
      router.back()
      return { success: true }
    }

    const currentBudgetPreference = isValidBudgetPreference(
      preferences?.budget_preference
    )
      ? preferences.budget_preference
      : 'medium'

    const hasActualChanges =
      data.cooking_time_preference !==
        (preferences?.cooking_time_preference || 60) ||
      data.serving_size_preference !==
        (preferences?.serving_size_preference || 2) ||
      data.budget_preference !== currentBudgetPreference

    if (!hasActualChanges) {
      router.back()
      return { success: true }
    }

    const result = await savePreferences(
      () => updatePreferences(data as UpdateUserPreferencesData),
      {
        showErrorMethod: 'toast',
        showSuccessMethod: 'toast',
        successMessage: '✅ Preferanser oppdatert!',
        errorMessage: 'Kunne ikke oppdatere preferanser',
        onSuccess: () => {
          reset(data)
          setTimeout(() => router.back(), 800)
        },
      }
    )

    return result
  }

  const handleReset = () => {
    reset()
    setPreferencesError('')
  }

  const handleBackPress = () => {
    if (isDirty && !isSaving) {
      Alert.alert(
        'Ulagrede endringer',
        'Du har ulagrede endringer. Er du sikker på at du vil gå tilbake?',
        [
          { text: 'Avbryt', style: 'cancel' },
          {
            text: 'Gå tilbake',
            style: 'destructive',
            onPress: () => router.canGoBack() && router.back(),
          },
        ]
      )
    } else if (!isSaving) {
      router.canGoBack() && router.back()
    }
  }

  const getButtonColor = () => {
    if (isSaving || isDirty) return theme.colors.primary
    return theme.colors.onBackground
  }

  const getButtonText = () => {
    if (isSaving) return 'Lagrer...'
    if (!isDirty) return 'Lukk'
    return t('settings.save')
  }

  if (!preferences) {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.colors.background }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: theme.spacing.lg,
          }}
        >
          <LoadingSpinner />
          <Text variant="body" style={{ marginTop: theme.spacing.md }}>
            Laster preferanser...
          </Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView style={{ flex: 1, padding: theme.spacing.md }}>
        {/* Header */}
        <View
          style={{
            borderLeftColor: theme.colors.primary,
            borderLeftWidth: 12,
            marginTop: theme.spacing.xxl,
            marginBottom: theme.spacing.xl,
            paddingLeft: theme.spacing.md,
          }}
        >
          <Text variant="heading2" weight="semiBold">
            {t('settings.preferences')}
          </Text>
        </View>

        {preferencesError && <InlineError message={preferencesError} />}

        {/* Cooking Preferences */}
        <View style={{ marginBottom: theme.spacing.xl }}>
          <Text
            variant="heading3"
            weight="semiBold"
            style={{ marginBottom: theme.spacing.md }}
          >
            🍳 Kokkepreferanser
          </Text>

          {/* Cooking Time */}
          <Controller
            control={control}
            name="cooking_time_preference"
            render={({ field: { onChange, value } }) => (
              <View style={{ marginBottom: theme.spacing.md }}>
                <Text
                  style={{
                    fontSize: theme.fontSize.sm,
                    fontWeight: theme.fontWeight.medium,
                    color: theme.colors.onSurface,
                    marginBottom: theme.spacing.xs,
                  }}
                >
                  Ønsket koketid: {value} minutter
                </Text>
                <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
                  {COOKING_TIMES.map((time) => (
                    <Button
                      key={time}
                      variant={value === time ? 'filled' : 'outlined'}
                      onPress={() => onChange(time)}
                      style={{ padding: theme.spacing.xs }}
                      textVariant="caption"
                    >
                      {time}m
                    </Button>
                  ))}
                </View>
              </View>
            )}
          />

          {/* Serving Size */}
          <Controller
            control={control}
            name="serving_size_preference"
            render={({ field: { onChange, value } }) => (
              <View style={{ marginBottom: theme.spacing.md }}>
                <Text
                  style={{
                    fontSize: theme.fontSize.sm,
                    fontWeight: theme.fontWeight.medium,
                    color: theme.colors.onSurface,
                    marginBottom: theme.spacing.xs,
                  }}
                >
                  Standard porsjoner: {value} personer
                </Text>
                <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
                  {SERVING_SIZES.map((size) => (
                    <Button
                      key={size}
                      variant={value === size ? 'filled' : 'outlined'}
                      onPress={() => onChange(size)}
                      style={{ flex: 1 }}
                      textVariant="caption"
                    >
                      {size}
                    </Button>
                  ))}
                </View>
              </View>
            )}
          />

          {/* Budget Preference */}
          <Controller
            control={control}
            name="budget_preference"
            render={({ field: { onChange, value } }) => (
              <View style={{ marginBottom: theme.spacing.md }}>
                <Text
                  style={{
                    fontSize: theme.fontSize.sm,
                    fontWeight: theme.fontWeight.medium,
                    color: theme.colors.onSurface,
                    marginBottom: theme.spacing.xs,
                  }}
                >
                  Budsjettpreferanse
                </Text>
                <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
                  {BUDGET_OPTIONS.map((budget) => (
                    <Button
                      key={budget.value}
                      variant={value === budget.value ? 'filled' : 'outlined'}
                      onPress={() => onChange(budget.value)}
                      style={{ flex: 1 }}
                      textVariant="caption"
                    >
                      {budget.icon} {budget.label}
                    </Button>
                  ))}
                </View>
              </View>
            )}
          />
        </View>

        {/* Quick Actions */}
        <View style={{ marginBottom: theme.spacing.xl }}>
          <Text
            variant="heading3"
            weight="semiBold"
            style={{ marginBottom: theme.spacing.md }}
          >
            ⚡ Hurtigvalg
          </Text>
          <Button
            onPress={() => router.push('/(auth)/onboarding')}
            variant="outlined"
            style={{ marginBottom: theme.spacing.md }}
          >
            ✏️ Rediger matpreferanser og allergier
          </Button>
        </View>
      </ScrollView>

      <NavBar
        config={{
          leftButton: {
            onPress: handleBackPress,
            iconName: 'arrow-back',
            shouldShow: true,
          },
          middleButton: {
            onPress: () => !isSaving && handleSubmit(handleSave)(),
            iconName: isSaving ? 'hourglass' : isDirty ? 'save' : 'close',
            text: getButtonText(),
            shouldShow: true,
            backgroundColor: getButtonColor(),
            textColor: isDirty || isSaving ? 'white' : theme.colors.surface,
            iconColor: isDirty || isSaving ? 'white' : theme.colors.surface,
          },
          rightButton: {
            onPress: handleReset,
            iconName: 'refresh',
            shouldShow: isDirty && !isSaving,
          },
        }}
      />
    </SafeAreaView>
  )
}
