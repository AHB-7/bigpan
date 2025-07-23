// app/(modals)/settings.tsx - Clean version using new hooks
import React, { useState, useEffect } from 'react'
import { View, ScrollView, Switch, Alert } from 'react-native'
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
import { useUserPreferences } from '@/hooks/useUserPreferences'
import { useProfileUpdate } from '@/hooks/seProfileUpdate'
import { theme } from '@/styles/theme'
import { Controller, useForm } from 'react-hook-form'
import { Ionicons } from '@expo/vector-icons'

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
}

export function UserInfo() {
  const { user, signOut } = useAuth()
  const { preferences } = useUserPreferences()
  const { updateProfileAndPreferences } = useProfileUpdate()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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

  // Update form when user data loads
  useEffect(() => {
    if (user || preferences) {
      reset({
        // Profile data from user
        display_name: user?.display_name || '',
        bio: user?.bio || '',
        cooking_level:
          user?.cooking_level === 'beginner' ||
          user?.cooking_level === 'intermediate' ||
          user?.cooking_level === 'advanced'
            ? user.cooking_level
            : 'beginner',
        location: user?.location || '',

        // Preference data from preferences
        cooking_time_preference: preferences?.cooking_time_preference || 60,
        serving_size_preference: preferences?.serving_size_preference || 2,
        budget_preference: preferences?.budget_preference || 'medium',

        // Simple notification preferences (you can expand this)
        email_notifications: true,
        push_notifications: true,
      })
    }
  }, [user, preferences, reset])

  const onSubmit = async (data: UserInfoProps) => {
    setError('')
    setIsLoading(true)

    try {
      const result = await updateProfileAndPreferences(
        // Profile updates
        {
          display_name: data.display_name,
          bio: data.bio,
          cooking_level: data.cooking_level,
          location: data.location,
        },
        // Preference updates
        {
          cooking_time_preference: data.cooking_time_preference,
          serving_size_preference: data.serving_size_preference,
          budget_preference: data.budget_preference,
          // For now, we'll store simple notification preferences
          // You can expand this later to use the full JSON structure
        }
      )

      if (result.success) {
        router.back()
      } else {
        setError(result.error || 'Kunne ikke oppdatere innstillinger')
      }
    } catch (error: any) {
      setError(error.message || 'En feil oppstod')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    Alert.alert('Bekreft utlogging', 'Er du sikker på at du vil logge ut?', [
      { text: 'Avbryt', style: 'cancel' },
      {
        text: 'Logg ut',
        style: 'destructive',
        onPress: async () => {
          setIsLoading(true)
          try {
            const result = await signOut()
            if (result.success) {
              router.replace('/(auth)/startPage')
            }
          } catch (error) {
            console.error('Sign out error:', error)
          } finally {
            setIsLoading(false)
          }
        },
      },
    ])
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: theme.spacing.md,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.surfaceVariant,
        }}
      >
        <Button
          variant="text"
          onPress={() => router.back()}
          style={{ marginRight: theme.spacing.sm }}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={theme.colors.onSurface}
          />
        </Button>
        <Text variant="heading2" weight="semiBold">
          Innstillinger
        </Text>
      </View>

      <ScrollView style={{ flex: 1, padding: theme.spacing.md }}>
        {/* Current Preferences Overview */}
        {preferences && (
          <View style={{ marginBottom: theme.spacing.xl }}>
            <Text
              variant="heading3"
              weight="semiBold"
              style={{ marginBottom: theme.spacing.md }}
            >
              Dine matpreferanser
            </Text>

            {/* Show current filter tags */}
            {preferences.preferred_filter_tags &&
              preferences.preferred_filter_tags.length > 0 && (
                <View style={{ marginBottom: theme.spacing.md }}>
                  <Text
                    variant="body"
                    weight="medium"
                    style={{ marginBottom: theme.spacing.sm }}
                  >
                    Foretrukne alternativer (
                    {preferences.preferred_filter_tags.length})
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      gap: theme.spacing.xs,
                      marginBottom: theme.spacing.sm,
                    }}
                  >
                    {preferences.preferred_filter_tags
                      .slice(0, 8)
                      .map((tagId, index) => (
                        <View
                          key={tagId}
                          style={{
                            backgroundColor: theme.colors.primary + '20',
                            paddingHorizontal: theme.spacing.sm,
                            paddingVertical: theme.spacing.xs,
                            borderRadius: theme.borderRadius.sm,
                          }}
                        >
                          <Text
                            variant="caption"
                            style={{ color: theme.colors.primary }}
                          >
                            #{index + 1}
                          </Text>
                        </View>
                      ))}
                    {preferences.preferred_filter_tags.length > 8 && (
                      <View
                        style={{
                          backgroundColor: theme.colors.surfaceVariant,
                          paddingHorizontal: theme.spacing.sm,
                          paddingVertical: theme.spacing.xs,
                          borderRadius: theme.borderRadius.sm,
                        }}
                      >
                        <Text
                          variant="caption"
                          style={{ color: theme.colors.onSurfaceVariant }}
                        >
                          +{preferences.preferred_filter_tags.length - 8} flere
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              )}

            {/* Show blocked tags (allergens) */}
            {preferences.blocked_filter_tags &&
              preferences.blocked_filter_tags.length > 0 && (
                <View style={{ marginBottom: theme.spacing.md }}>
                  <Text
                    variant="body"
                    weight="medium"
                    style={{ marginBottom: theme.spacing.sm }}
                  >
                    Allergener og blokkeringer (
                    {preferences.blocked_filter_tags.length})
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      gap: theme.spacing.xs,
                      marginBottom: theme.spacing.sm,
                    }}
                  >
                    {preferences.blocked_filter_tags
                      .slice(0, 6)
                      .map((tagId, index) => (
                        <View
                          key={tagId}
                          style={{
                            backgroundColor: theme.colors.error + '20',
                            paddingHorizontal: theme.spacing.sm,
                            paddingVertical: theme.spacing.xs,
                            borderRadius: theme.borderRadius.sm,
                          }}
                        >
                          <Text
                            variant="caption"
                            style={{ color: theme.colors.error }}
                          >
                            ❌ #{index + 1}
                          </Text>
                        </View>
                      ))}
                    {preferences.blocked_filter_tags.length > 6 && (
                      <View
                        style={{
                          backgroundColor: theme.colors.surfaceVariant,
                          paddingHorizontal: theme.spacing.sm,
                          paddingVertical: theme.spacing.xs,
                          borderRadius: theme.borderRadius.sm,
                        }}
                      >
                        <Text
                          variant="caption"
                          style={{ color: theme.colors.onSurfaceVariant }}
                        >
                          +{preferences.blocked_filter_tags.length - 6} flere
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              )}

            {/* Quick action to edit preferences */}
            <Button
              onPress={() => router.push('/(auth)/onboarding')}
              variant="outlined"
              style={{ marginBottom: theme.spacing.md }}
            >
              ✏️ Rediger matpreferanser
            </Button>
          </View>
        )}

        {/* Profile Section */}
        <View style={{ marginBottom: theme.spacing.xl }}>
          <Text
            variant="heading3"
            weight="semiBold"
            style={{ marginBottom: theme.spacing.md }}
          >
            Profilinformasjon
          </Text>

          <Controller
            control={control}
            name="display_name"
            rules={{ required: 'Visningsnavn er påkrevd' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Visningsnavn"
                placeholder="Ditt navn"
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
                label="Bio"
                placeholder="Fortell litt om deg..."
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
                <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
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
                label="Sted"
                placeholder="Oslo, Norge"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </View>

        {/* Cooking Preferences Section */}
        <View style={{ marginBottom: theme.spacing.xl }}>
          <Text
            variant="heading3"
            weight="semiBold"
            style={{ marginBottom: theme.spacing.md }}
          >
            Kokkepreferanser
          </Text>

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
                  {[15, 30, 45, 60, 90].map((time) => (
                    <Button
                      key={time}
                      variant={value === time ? 'filled' : 'outlined'}
                      onPress={() => onChange(time)}
                      style={{ flex: 1 }}
                    >
                      {time}m
                    </Button>
                  ))}
                </View>
              </View>
            )}
          />

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
                  {[1, 2, 4, 6, 8].map((size) => (
                    <Button
                      key={size}
                      variant={value === size ? 'filled' : 'outlined'}
                      onPress={() => onChange(size)}
                      style={{ flex: 1 }}
                    >
                      {size}
                    </Button>
                  ))}
                </View>
              </View>
            )}
          />

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
                  {[
                    { value: 'low', label: 'Lavt' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'high', label: 'Høyt' },
                  ].map((budget) => (
                    <Button
                      key={budget.value}
                      variant={value === budget.value ? 'filled' : 'outlined'}
                      onPress={() => onChange(budget.value)}
                      style={{ flex: 1 }}
                    >
                      {budget.label}
                    </Button>
                  ))}
                </View>
              </View>
            )}
          />
        </View>

        {/* Notifications Section */}
        <View style={{ marginBottom: theme.spacing.xl }}>
          <Text
            variant="heading3"
            weight="semiBold"
            style={{ marginBottom: theme.spacing.md }}
          >
            Varsler
          </Text>

          <Controller
            control={control}
            name="email_notifications"
            render={({ field: { onChange, value } }) => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: theme.spacing.md,
                  borderBottomWidth: 1,
                  borderBottomColor: theme.colors.surfaceVariant,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text variant="body" weight="medium">
                    E-postvarsler
                  </Text>
                  <Text
                    variant="caption"
                    style={{ color: theme.colors.onSurfaceVariant }}
                  >
                    Motta viktige oppdateringer på e-post
                  </Text>
                </View>
                <Switch
                  value={value}
                  onValueChange={onChange}
                  trackColor={{
                    false: theme.colors.surfaceVariant,
                    true: theme.colors.primary,
                  }}
                  thumbColor={
                    value ? theme.colors.surface : theme.colors.onSurfaceVariant
                  }
                />
              </View>
            )}
          />

          <Controller
            control={control}
            name="push_notifications"
            render={({ field: { onChange, value } }) => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: theme.spacing.md,
                  borderBottomWidth: 1,
                  borderBottomColor: theme.colors.surfaceVariant,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text variant="body" weight="medium">
                    Push-varsler
                  </Text>
                  <Text
                    variant="caption"
                    style={{ color: theme.colors.onSurfaceVariant }}
                  >
                    Motta varsler direkte til telefonen
                  </Text>
                </View>
                <Switch
                  value={value}
                  onValueChange={onChange}
                  trackColor={{
                    false: theme.colors.surfaceVariant,
                    true: theme.colors.primary,
                  }}
                  thumbColor={
                    value ? theme.colors.surface : theme.colors.onSurfaceVariant
                  }
                />
              </View>
            )}
          />
        </View>

        {error && <InlineError message={error} />}

        {/* Action Buttons */}
        <View
          style={{ gap: theme.spacing.md, marginBottom: theme.spacing.xxl }}
        >
          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
            variant="filled"
          >
            {isLoading && (
              <LoadingSpinner size="small" color={theme.colors.surface} />
            )}
            {isLoading ? 'Lagrer...' : 'Lagre endringer'}
          </Button>

          <Button
            onPress={() => router.push('/(auth)/onboarding')}
            variant="outlined"
            disabled={isLoading}
          >
            Rediger detaljerte preferanser
          </Button>

          <Button
            onPress={handleSignOut}
            variant="text"
            textColor={theme.colors.error}
            disabled={isLoading}
          >
            Logg ut
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
