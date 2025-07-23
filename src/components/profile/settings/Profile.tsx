// app/(modals)/settings.tsx - Clean version using new hooks
import React, { useState, useEffect } from 'react'
import { View, ScrollView, Switch, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { Text, Button, Input } from '@/components/common'
import { useAuth } from '@/hooks/useAuth'
import { theme } from '@/styles/theme'
import { Controller, useForm } from 'react-hook-form'
import { Ionicons } from '@expo/vector-icons'
import { useTranslation } from '@/hooks/useTranslation'
import { useAsyncFunction } from '@/hooks/asyncFunction'
import { supabase } from '@/services/supabase/client'

interface UserInfoProps {
  // Profile fields
  display_name: string
  bio: string
  cooking_level: 'beginner' | 'intermediate' | 'advanced'
  location: string

  // Preference fields
  cooking_time_preference: number
  serving_size_preference: number
  budget_preference: string

  // Notification settings (simple boolean for now)
  email_notifications: boolean
  push_notifications: boolean

  sms_notifications: boolean
  dark_mode: boolean
}

export function Profile() {
  const { user, preferences, updateProfile, updatePreferences } = useAuth()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()
  const [profileData, setProfileData] = useState<any>(null)
  const { executeSupabase } = useAsyncFunction()

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserInfoProps>({
    defaultValues: {
      // Profile defaults
      display_name: '',
      bio: '',
      cooking_level: 'beginner',
      location: '',

      // Preference defaults
      cooking_time_preference: 60,
      serving_size_preference: 2,
      budget_preference: 'medium',

      // Notification defaults
      email_notifications: true,
      push_notifications: true,
    },
  })

  useEffect(() => {
    const loadProfile = async () => {
      if (user?.id) {
        await executeSupabase(
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
            showErrorMethod: 'none',
            onSuccess: (data) => setProfileData(data),
            onError: (err) => console.error('Profile load error:', err),
          }
        )
      }
    }

    loadProfile()
  }, [user?.id])

  // Update the form reset useEffect
  useEffect(() => {
    if (profileData || preferences) {
      reset({
        // Use profileData instead of user_metadata
        display_name: profileData?.display_name || '',
        bio: profileData?.bio || '',
        cooking_level: profileData?.cooking_level || 'beginner',
        location: profileData?.location,

        // Preference data from preferences
        cooking_time_preference: preferences?.cooking_time_preference || 60,
        serving_size_preference: preferences?.serving_size_preference || 2,
        budget_preference: preferences?.budget_preference || 'medium',

        // Simple notification preferences
        email_notifications: true,
        push_notifications: true,
      })
    }
  }, [profileData, preferences, reset])

  const onSubmit = async (data: UserInfoProps) => {
    setError('')
    setIsLoading(true)

    try {
      const profileResult = await updateProfile({
        display_name: data.display_name,
        bio: data.bio,
        cooking_level: data.cooking_level,
        location: data.location,
      })
      const preferencesResult = await updatePreferences({
        cooking_time_preference: data.cooking_time_preference,
        serving_size_preference: data.serving_size_preference,
        budget_preference: data.budget_preference,
      })
      if (profileResult.success && preferencesResult.success) {
        router.back()
      } else {
        setError(
          preferencesResult.error || 'Kunne ikke oppdatere innstillinger'
        )
      }
    } catch (error: any) {
      setError(error.message || 'En feil oppstod')
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    console.log('user', user)
    console.log('preferences', preferences)
  }, [user, preferences])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView style={{ flex: 1, padding: theme.spacing.md }}>
        {/* Profile Section */}
        <View style={{ marginBottom: theme.spacing.xl }}>
          <Text
            variant="heading3"
            weight="semiBold"
            style={{ marginBottom: theme.spacing.md }}
          >
            {t('settings.profile')}
          </Text>

          <Controller
            control={control}
            name="display_name"
            rules={{ required: t('settings.profile.display_name_required') }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={t('settings.profile.display_name')}
                placeholder={t('settings.profile.display_name')}
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
                  user?.user_metadata?.bio ||
                  t('settings.profile.bio_placeholder')
                }
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                multiline
                numberOfLines={3}
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
                  Kokkenivå
                </Text>
                <View style={{ gap: theme.spacing.sm }}>
                  {[
                    { value: 'beginner', label: 'Nybegynner' },
                    { value: 'intermediate', label: 'Øvet' },
                    { value: 'advanced', label: 'Ekspert' },
                  ].map((level) => (
                    <Button
                      key={level.value}
                      variant={value === level.value ? 'filled' : 'outlined'}
                      onPress={() => onChange(level.value)}
                      style={{ flex: 1 }}
                    >
                      {level.label}
                    </Button>
                  ))}
                </View>
              </View>
            )}
          />

          <Controller
            control={control}
            name="location"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={t('settings.profile.location')}
                placeholder={t('settings.profile.location.example')}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </View>
        <Button
          variant="filled"
          onPress={handleSubmit(onSubmit)}
          loading={isLoading}
          style={{ marginBottom: theme.spacing.md }}
        >
          {t('settings.save')}
        </Button>
      </ScrollView>
    </SafeAreaView>
  )
}
