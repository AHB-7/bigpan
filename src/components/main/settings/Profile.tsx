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
import { styles } from './styles'
import type { User, CookingLevel } from '@/types'

export function Profile() {
  const { user, updateProfile } = useAuth()
  const { t } = useTranslation()
  const [profileData, setProfileData] = useState<User | null>(null)
  const [profileError, setProfileError] = useState('')
  const [isMounted, setIsMounted] = useState(false)

  const getSafeCookingLevel = (
    level: string | null | undefined
  ): 'beginner' | 'intermediate' | 'advanced' => {
    if (
      level &&
      (level === 'beginner' || level === 'intermediate' || level === 'advanced')
    ) {
      return level
    }
    return 'beginner'
  }

  const { executeSupabase: loadProfileData, isLoading: isLoadingProfile } =
    useAsyncFunction()

  const { executeSupabase: saveProfile, isLoading: isSaving } =
    useAsyncFunction()

  const { control, handleSubmit, reset, errors, isDirty } = useProfileForm()
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.id || !isMounted) return

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
          onSuccess: (data?: User) => {
            setProfileData(data || null)

            if (data) {
              reset({
                display_name: data.display_name || '',
                bio: data.bio || '',
                cooking_level: getSafeCookingLevel(data.cooking_level),
                location: data.location || '',
              })
            }
          },
          onShowError: (message: string) => setProfileError(message),
          errorMessage: 'Kunne ikke laste profil',
        }
      )
    }

    if (isMounted && user?.id) {
      loadProfile()
    }
  }, [user?.id, isMounted])

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
        successMessage: 'Profil oppdatert!',
        errorMessage: 'Kunne ikke oppdatere profil',
        onSuccess: () => {
          reset(data)
          setTimeout(() => {
            if (isMounted && router.canGoBack()) {
              try {
                router.back()
              } catch (error) {
                console.warn('Navigation error:', error)
                router.replace('/(tabs)/')
              }
            }
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

  const getButtonColor = () => {
    if (isSaving) return theme.colors.primary
    if (isDirty) return theme.colors.primary
    return theme.colors.onBackground
  }

  const getButtonText = () => {
    if (isSaving) return 'Lagrer...'
    if (!isDirty) return 'Lukk'
    return t('settings.save')
  }

  const handleNavigation = (callback: () => void) => {
    if (!isMounted) return

    try {
      callback()
    } catch (error) {
      console.warn('Navigation error:', error)
      router.replace('/(tabs)/')
    }
  }

  if (isLoadingProfile) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingSpinner />
        <Text variant="body">Laster profil data...</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text variant="heading2" weight="semiBold">
          {t('settings.profile')}
        </Text>
      </View>
      <ScrollView style={styles.linkssection}>
        {profileError && <InlineError message={profileError} />}

        <Controller
          control={control}
          name="display_name"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t('settings.profile.display_name')}
              placeholder={t('settings.profile.display_name')}
              value={value || profileData?.display_name || ''}
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
              placeholder={t('settings.profile.bio_placeholder')}
              value={value || profileData?.bio || ''}
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
              placeholder={t('settings.profile.location.example')}
              value={value || profileData?.location || ''}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.location?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="cooking_level"
          render={({ field: { onChange, value } }) => {
            const currentValue =
              value || getSafeCookingLevel(profileData?.cooking_level)
            return (
              <View style={styles.settingsGroup}>
                <Text style={styles.label}>{t('profile.cooking.level')}</Text>
                <View style={styles.row}>
                  {[
                    {
                      value: 'beginner' as const,
                      label: t('cooking.level.beginner'),
                    },
                    {
                      value: 'intermediate' as const,
                      label: t('cooking.level.intermediate'),
                    },
                    {
                      value: 'advanced' as const,
                      label: t('cooking.level.advanced'),
                    },
                  ].map((level) => (
                    <Button
                      key={level.value}
                      variant={
                        currentValue === level.value ? 'filled' : 'outlined'
                      }
                      onPress={() => onChange(level.value)}
                      textVariant="caption"
                      style={styles.flex1}
                    >
                      {level.label}
                    </Button>
                  ))}
                </View>
              </View>
            )
          }}
        />
      </ScrollView>

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
                      onPress: () =>
                        handleNavigation(() => {
                          if (router.canGoBack()) {
                            router.back()
                          }
                        }),
                    },
                  ]
                )
              } else if (!isSaving) {
                handleNavigation(() => {
                  if (router.canGoBack()) {
                    router.back()
                  }
                })
              }
            },
            iconName: 'arrow-back',
            shouldShow: true,
          },
          middleButton: {
            onPress: () => {
              if (!isSaving && isDirty) {
                handleSubmit(handleSave)()
              } else {
                handleNavigation(() => {
                  if (router.canGoBack()) {
                    router.back()
                  }
                })
              }
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
