// app/user/[id].tsx - Simplified UserPage using small components
import React, { useEffect, useState } from 'react'
import { View, ScrollView } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, LoadingSpinner } from '@/components/common'
import { useAuth } from '@/hooks/useAuth'
import { useAsyncFunction } from '@/hooks/asyncFunction'
import { profileService, type EnhancedUserProfile } from '@/services/profile'
import { theme } from '@/styles/theme'

// Import all the small components
import {
  ProfileHeader,
  ProfileStats,
  ProfileInfo,
  RecentRecipes,
  ProfileActions,
} from '@/components/profile/profileParts'

export default function UserPage() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { user: currentUser, signOut } = useAuth()
  const { executeSupabase } = useAsyncFunction()
  const [profileData, setProfileData] = useState<EnhancedUserProfile | null>(
    null
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check if this is the current user's profile
  const isOwnProfile = currentUser?.id === id || currentUser?.user_id === id

  useEffect(() => {
    const loadProfile = async () => {
      if (!id) {
        setError('No user ID provided')
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      if (isOwnProfile) {
        await executeSupabase(
          () => profileService.getCurrentUserEnhancedProfile(),
          {
            showErrorMethod: 'none',
            onSuccess: (data) => setProfileData(data || null),
            onError: (err) => {
              setError('Could not load profile')
              console.error('Profile load error:', err)
            },
          }
        )
      } else {
        await executeSupabase(() => profileService.getEnhancedProfile(id), {
          showErrorMethod: 'none',
          onSuccess: (data) => {
            if (data && currentUser?.id) {
              profileService
                .updateRelationshipStatus(data, currentUser.id)
                .then((updatedProfile) => setProfileData(updatedProfile))
            } else {
              setProfileData(data || null)
            }
          },
          onError: (err) => {
            setError('Profile not available')
            console.error('Public profile load error:', err)
          },
        })
      }

      setLoading(false)
    }

    loadProfile()
  }, [id, isOwnProfile, currentUser])

  const handleSignOut = async () => {
    await executeSupabase(() => signOut(), {
      showErrorMethod: 'alert',
      successMessage: 'Logged out successfully',
      onSuccess: () => router.replace('/(auth)/login'),
    })
  }

  // Loading state
  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colors.background,
        }}
      >
        <LoadingSpinner />
        <Text variant="body" style={{ marginTop: theme.spacing.md }}>
          Laster profil...
        </Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        style={{ flex: 1, padding: theme.spacing.md }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ alignItems: 'center', marginBottom: theme.spacing.sm }}>
          {/* Profile Content */}
          {profileData ? (
            <>
              <ProfileHeader
                profile={profileData}
                isOwnProfile={isOwnProfile}
              />

              <ProfileInfo profile={profileData} />

              <RecentRecipes recipes={profileData.recent_recipes} />

              {isOwnProfile && <ProfileActions onSignOut={handleSignOut} />}
            </>
          ) : (
            /* Error State */
            <View
              style={{
                alignItems: 'center',
                padding: theme.spacing.xl,
                backgroundColor: theme.colors.surface,
                borderRadius: theme.borderRadius.lg,
                width: '100%',
              }}
            >
              <Text
                variant="heading2"
                style={{ marginBottom: theme.spacing.md }}
              >
                {error ? '⚠️ Feil' : `👤 Bruker ${id}`}
              </Text>
              <Text
                variant="body"
                style={{
                  textAlign: 'center',
                  marginBottom: theme.spacing.lg,
                  color: theme.colors.onSurfaceVariant,
                }}
              >
                {error ||
                  (isOwnProfile
                    ? 'Kunne ikke laste din profil'
                    : 'Profil ikke tilgjengelig')}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
