// src/components/main/settings/Profile.tsx - Optimized with proper hook usage
import React, { useState, useEffect } from 'react'
import { View, ScrollView, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import {
  Text,
  Button,
  Input,
  LoadingSpinner,
  InlineError,
} from '@/components/common'
import { useAuth } from '@/hooks/useAuth'
import { theme } from '@/styles/theme'
import { Controller } from 'react-hook-form'
import { useTranslation } from '@/hooks/useTranslation'
import { useAsyncFunction } from '@/hooks/asyncFunction'
import { supabase } from '@/services/supabase/client'
import { NavBar } from '@/components/nav/NavBar'
import { useProfileForm, ProfileFormData } from '@/schemas/forms'

export function Profile() {
  const { user, updateProfile } = useAuth()
  const { t } = useTranslation()
  const [profileData, setProfileData] = useState<any>(null)
  const [profileError, setProfileError] = useState('')

  // ✅ Helper function to safely cast cooking level
  const getSafeCookingLevel = (
    level: string | null | undefined
  ): 'beginner' | 'intermediate' | 'advanced' => {
    if (level && ['beginner', 'intermediate', 'advanced'].includes(level)) {
      return level as 'beginner' | 'intermediate' | 'advanced'
    }
    return 'beginner'
  }

  // ✅ Use useAsyncFunction properly for profile loading
  const { executeSupabase: loadProfileData, isLoading: isLoadingProfile } =
    useAsyncFunction()

  // ✅ Use useAsyncFunction properly for saving
  const { executeSupabase: saveProfile, isLoading: isSaving } =
    useAsyncFunction()

  // ✅ Use your custom profile form hook with all form state
  const { control, handleSubmit, reset, errors, isDirty } = useProfileForm()

  // ✅ Load profile data using useAsyncFunction properly
  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.id) return

      await loadProfileData(
        async () => {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', user.id)
            .single()

          if (error) throw error
          return { data, error: null }
        },
        {
          showErrorMethod: 'inline',
          onSuccess: (data) => {
            setProfileData(data)
            // ✅ Populate form with backend data using helper function
            if (data) {
              reset({
                display_name: data.display_name || '',
                bio: data.bio || '',
                cooking_level: getSafeCookingLevel(data.cooking_level),
                location: data.location || '',
              })
              console.log('Loaded and populated profile data:', data)
            }
          },
          onShowError: (message) => setProfileError(message),
          errorMessage: 'Kunne ikke laste profil',
        }
      )
    }

    loadProfile()
  }, [user?.id])

  // ✅ Use useAsyncFunction for saving with proper error handling
  const handleSave = async (data: ProfileFormData) => {
    const result = await saveProfile(
      () =>
        updateProfile({
          display_name: data.display_name,
          bio: data.bio,
          cooking_level: data.cooking_level,
          location: data.location,
        }),
      {
        showErrorMethod: 'toast',
        showSuccessMethod: 'toast',
        successMessage: '✅ Profil oppdatert!',
        errorMessage: 'Kunne ikke oppdatere profil',
        onSuccess: () => {
          reset(data) // Mark form as clean

          // Navigate back after brief delay
          setTimeout(() => {
            router.back()
          }, 800)
        },
      }
    )

    return result
  }

  const handleReset = () => {
    reset()
    setProfileError('')
  }

  // ✅ Simplified button state management
  const getButtonColor = () => {
    if (isSaving) return theme.colors.primary
    if (isDirty) return theme.colors.primary
    return theme.colors.onBackground
  }

  const getButtonText = () => {
    if (isSaving) return 'Lagrer...'
    if (!isDirty) return 'Lukk' // ✅ Show "Close" when no changes
    return t('settings.save')
  }

  // ✅ Show loading state while profile is loading
  if (isLoadingProfile) {
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
            Laster profil...
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
            {t('settings.profile')}
          </Text>
        </View>

        {/* ✅ Use InlineError component for profile loading errors */}
        {profileError && <InlineError message={profileError} />}

        {/* ✅ Simplified form fields with schema validation */}
        <Controller
          control={control}
          name="display_name"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t('settings.profile.display_name')}
              placeholder={
                profileData?.display_name || t('settings.profile.display_name')
              }
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.display_name?.message}
              required
            />
          )}
        />

        <Controller
          control={control}
          name="bio"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t('settings.profile.bio')}
              placeholder={
                profileData?.bio || t('settings.profile.bio_placeholder')
              }
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.bio?.message}
              multiline
              numberOfLines={3}
            />
          )}
        />

        <Controller
          control={control}
          name="location"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t('settings.profile.location')}
              placeholder={
                profileData?.location || t('settings.profile.location.example')
              }
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.location?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="cooking_level"
          render={({ field: { onChange, value } }) => (
            <View style={{ marginBottom: theme.spacing.md }}>
              <Text
                style={{
                  fontSize: theme.fontSize.sm,
                  fontWeight: theme.fontWeight.medium,
                  color: theme.colors.onSurface,
                  marginBottom: theme.spacing.xs,
                  marginLeft: theme.spacing.xs,
                }}
              >
                {t('profile.cooking.level')}
              </Text>
              <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
                {[
                  { value: 'beginner', label: t('cooking.level.beginner') },
                  {
                    value: 'intermediate',
                    label: t('cooking.level.intermediate'),
                  },
                  { value: 'advanced', label: t('cooking.level.advanced') },
                ].map((level) => (
                  <Button
                    key={level.value}
                    variant={value === level.value ? 'filled' : 'outlined'}
                    onPress={() => onChange(level.value)}
                    textVariant="caption"
                    style={{ flex: 1 }}
                  >
                    {level.label}
                  </Button>
                ))}
              </View>
            </View>
          )}
        />
      </ScrollView>

      {/* ✅ Enhanced Navigation Bar with better loading states */}
      <NavBar
        config={{
          leftButton: {
            onPress: () => {
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
            },
            iconName: 'arrow-back',
            shouldShow: true,
          },
          middleButton: {
            onPress: () => {
              !isSaving && isDirty
                ? handleSubmit(handleSave)()
                : router.canGoBack() && router.back()
            },
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
