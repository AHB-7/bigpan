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
import { styles } from './styles'

// Type guards and constants
const isValidBudgetPreference = (
  value: string | null | undefined
): value is 'low' | 'medium' | 'high' => {
  return value === 'low' || value === 'medium' || value === 'high'
}

const PREFERENCE_OPTIONS = {
  cookingTimes: [15, 30, 45, 60, 90],
  servingSizes: [1, 2, 4, 6, 8],
  budget: [
    { value: 'low' as const, label: 'Lavt', icon: '' },
    { value: 'medium' as const, label: 'Medium', icon: '' },
    { value: 'high' as const, label: 'Høyt', icon: '' },
  ],
} as const

const DEFAULT_VALUES = {
  cookingTime: 60,
  servingSize: 2,
  budget: 'medium' as const,
} as const

// Reusable components
interface PreferenceButtonGroupProps<T> {
  value: T
  options: readonly T[] | readonly { value: T; label: string; icon?: string }[]
  onChange: (value: T) => void
  formatLabel?: (value: T) => string
}

function PreferenceButtonGroup<T extends string | number>({
  value,
  options,
  onChange,
  formatLabel,
}: PreferenceButtonGroupProps<T>) {
  return (
    <View style={styles.row}>
      {options.map((option) => {
        const optionValue = typeof option === 'object' ? option.value : option
        const optionLabel =
          typeof option === 'object'
            ? `${option.icon} ${option.label}`.trim()
            : formatLabel
              ? formatLabel(option)
              : String(option)

        return (
          <Button
            key={String(optionValue)}
            variant={value === optionValue ? 'filled' : 'outlined'}
            onPress={() => onChange(optionValue)}
            style={styles.flex1}
            textVariant="body"
          >
            {optionLabel}
          </Button>
        )
      })}
    </View>
  )
}

interface PreferenceGroupProps {
  title: string
  children: React.ReactNode
}

function PreferenceGroup({ title, children }: PreferenceGroupProps) {
  return (
    <View style={styles.settingsGroup}>
      <Text style={styles.label}>{title}</Text>
      {children}
    </View>
  )
}

export function Preferences() {
  const { preferences, updatePreferences } = useAuth()
  const { t } = useTranslation()
  const [preferencesError, setPreferencesError] = useState('')
  const { executeSupabase: savePreferences, isLoading: isSaving } =
    useAsyncFunction()
  const { control, handleSubmit, reset, isDirty } = usePreferencesForm()

  // Helper functions
  const getSafeBudgetPreference = (value: string | null | undefined) =>
    isValidBudgetPreference(value) ? value : DEFAULT_VALUES.budget

  const getDefaultFormData = () => ({
    cooking_time_preference:
      preferences?.cooking_time_preference || DEFAULT_VALUES.cookingTime,
    serving_size_preference:
      preferences?.serving_size_preference || DEFAULT_VALUES.servingSize,
    budget_preference: getSafeBudgetPreference(preferences?.budget_preference),
  })

  const hasActualChanges = (data: PreferencesFormData) => {
    const defaults = getDefaultFormData()
    return Object.keys(data).some(
      (key) =>
        data[key as keyof PreferencesFormData] !==
        defaults[key as keyof typeof defaults]
    )
  }

  const handleNavigation = (showAlert = false) => {
    if (showAlert && isDirty && !isSaving) {
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
    } else if (!isSaving && router.canGoBack()) {
      router.back()
    }
  }

  const getButtonState = () => {
    if (isSaving) return { color: theme.colors.primary, text: 'Lagrer...' }
    if (!isDirty) return { color: theme.colors.onBackground, text: 'Lukk' }
    return { color: theme.colors.primary, text: t('settings.save') }
  }

  // Effects
  useEffect(() => {
    if (preferences) {
      reset(getDefaultFormData())
    }
  }, [preferences, reset])

  // Event handlers
  const handleSave = async (data: PreferencesFormData) => {
    if (!isDirty || !hasActualChanges(data)) {
      handleNavigation()
      return { success: true }
    }

    const result = await savePreferences(
      () => updatePreferences(data as UpdateUserPreferencesData),
      {
        showErrorMethod: 'toast',
        showSuccessMethod: 'toast',
        successMessage: t('settings.preferences.successMessage' as any),
        errorMessage: t('settings.preferences.errorMessage' as any),
        onSuccess: () => {
          reset(data)
          setTimeout(() => handleNavigation(), 800)
        },
      }
    )

    return result
  }

  const handleReset = () => {
    reset()
    setPreferencesError('')
  }

  if (!preferences) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingSpinner />
        <Text variant="body">{t('settings.preferences.loading')}</Text>
      </SafeAreaView>
    )
  }

  const buttonState = getButtonState()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text variant="heading2" weight="semiBold">
          {t('settings.preferences')}
        </Text>
      </View>

      <ScrollView style={styles.linkssection}>
        {preferencesError && <InlineError message={preferencesError} />}

        <View style={styles.settingsGroup}>
          <Controller
            control={control}
            name="cooking_time_preference"
            render={({ field: { onChange, value } }) => (
              <PreferenceGroup title={t('settings.preferences.cooking_time')}>
                <PreferenceButtonGroup
                  value={value}
                  options={PREFERENCE_OPTIONS.cookingTimes}
                  onChange={onChange}
                  formatLabel={(time) => `${time}`}
                />
              </PreferenceGroup>
            )}
          />

          <Controller
            control={control}
            name="serving_size_preference"
            render={({ field: { onChange, value } }) => (
              <PreferenceGroup title={t('settings.preferences.serving_size')}>
                <PreferenceButtonGroup
                  value={value}
                  options={PREFERENCE_OPTIONS.servingSizes}
                  onChange={onChange}
                />
              </PreferenceGroup>
            )}
          />

          <Controller
            control={control}
            name="budget_preference"
            render={({ field: { onChange, value } }) => (
              <PreferenceGroup title={t('settings.preferences.budget')}>
                <PreferenceButtonGroup
                  value={value}
                  options={PREFERENCE_OPTIONS.budget}
                  onChange={onChange}
                />
              </PreferenceGroup>
            )}
          />
        </View>

        <View style={styles.settingsGroup}>
          <Text variant="heading3" weight="semiBold" style={styles.groupTitle}>
            {t('settings.preferences.mainBtn')}
          </Text>
          <Button
            onPress={() => router.push('/(auth)/onboarding')}
            variant="outlined"
            style={styles.flex1}
          >
            {t('settings.preferences.mainBtn')}
          </Button>
        </View>
      </ScrollView>

      <NavBar
        config={{
          leftButton: {
            onPress: () => handleNavigation(true),
            iconName: 'arrow-back',
            shouldShow: true,
          },
          middleButton: {
            onPress: () => !isSaving && handleSubmit(handleSave)(),
            iconName: isSaving ? 'hourglass' : isDirty ? 'save' : 'close',
            text: buttonState.text,
            shouldShow: true,
            backgroundColor: buttonState.color,
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
