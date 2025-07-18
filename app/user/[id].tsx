import React, { useEffect, useState } from 'react'
import { View, ScrollView } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, Button, LoadingSpinner } from '@/components/common'
import { useAuth } from '@/hooks/useAuth'
import { theme } from '@/styles/theme'
import type { User } from '@/types'

export default function UserPage() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { user: currentUser, getCurrentUserProfile, signOut } = useAuth()
  const [profileData, setProfileData] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check if this is the current user's profile
  const isOwnProfile = currentUser?.id === id || currentUser?.user_id === id

  useEffect(() => {
    const loadProfile = async () => {
      if (isOwnProfile) {
        // Load current user's full profile
        const { data, error } = await getCurrentUserProfile()
        if (data) {
          setProfileData(data)
        } else {
          console.log('Profile error:', error)
        }
      } else {
        // For other users, you'd load their public profile here
        // For now, just show basic info
        setProfileData(null)
      }
      setLoading(false)
    }

    loadProfile()
  }, [id, isOwnProfile])

  const handleSignOut = async () => {
    const result = await signOut()
    if (result.success) {
      router.replace('/(auth)/login')
    }
  }

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <LoadingSpinner />
        <Text variant="body" style={{ marginTop: 16 }}>
          Laster profil...
        </Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView style={{ flex: 1, padding: theme.spacing.lg }}>
        <View style={{ alignItems: 'center', marginBottom: theme.spacing.xl }}>
          <Text variant="heading1" style={{ marginBottom: theme.spacing.sm }}>
            {isOwnProfile ? 'Min Profil' : 'Brukerprofil'}
          </Text>

          {profileData ? (
            <>
              <Text
                variant="heading2"
                style={{ marginBottom: theme.spacing.md }}
              >
                {profileData.display_name || profileData.username}
              </Text>

              <View style={{ width: '100%', marginBottom: theme.spacing.lg }}>
                <Text
                  variant="heading3"
                  style={{ marginBottom: theme.spacing.sm }}
                >
                  Profilinformasjon
                </Text>

                <View style={{ marginBottom: theme.spacing.sm }}>
                  <Text variant="label">Brukernavn:</Text>
                  <Text variant="body">{profileData.username}</Text>
                </View>

                <View style={{ marginBottom: theme.spacing.sm }}>
                  <Text variant="label">Kokkenivå:</Text>
                  <Text variant="body">
                    {profileData.cooking_level || 'Ikke satt'}
                  </Text>
                </View>

                {profileData.bio && (
                  <View style={{ marginBottom: theme.spacing.sm }}>
                    <Text variant="label">Bio:</Text>
                    <Text variant="body">{profileData.bio}</Text>
                  </View>
                )}

                {profileData.dietary_restrictions &&
                  profileData.dietary_restrictions.length > 0 && (
                    <View style={{ marginBottom: theme.spacing.sm }}>
                      <Text variant="label">Kosthold:</Text>
                      <Text variant="body">
                        {profileData.dietary_restrictions.length} valgte
                        preferanser
                      </Text>
                    </View>
                  )}

                {profileData.favorite_cuisines &&
                  profileData.favorite_cuisines.length > 0 && (
                    <View style={{ marginBottom: theme.spacing.sm }}>
                      <Text variant="label">Favorittkjøkken:</Text>
                      <Text variant="body">
                        {profileData.favorite_cuisines.length} valgte kjøkken
                      </Text>
                    </View>
                  )}
              </View>
            </>
          ) : (
            <>
              <Text
                variant="heading2"
                style={{ marginBottom: theme.spacing.md }}
              >
                Bruker {id}
              </Text>
              <Text
                variant="body"
                style={{ textAlign: 'center', marginBottom: theme.spacing.lg }}
              >
                {isOwnProfile
                  ? 'Kunne ikke laste din profil'
                  : 'Offentlig profil ikke tilgjengelig'}
              </Text>
            </>
          )}

          {isOwnProfile && (
            <View style={{ width: '100%', gap: theme.spacing.md }}>
              <Button
                variant="outlined"
                onPress={() => router.push('/profile/edit')}
              >
                Rediger profil
              </Button>

              <Button
                variant="outlined"
                onPress={() => router.push('/(auth)/onboarding')}
              >
                Oppdater preferanser
              </Button>

              <Button
                variant="text"
                onPress={handleSignOut}
                textColor={theme.colors.error}
              >
                Logg ut
              </Button>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
