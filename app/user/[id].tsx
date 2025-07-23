// app/user/[id].tsx - Simplified UserPage using small components
import React, { useEffect, useState } from 'react'
import { View, ScrollView } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, LoadingSpinner } from '@/components/common'
import { useAuth } from '@/hooks/useAuth'
import { useAsyncFunction } from '@/hooks/asyncFunction'

import { theme } from '@/styles/theme'

// Import all the small components
import { ProfileHeader, RecentRecipes } from '@/components/profile/profileParts'
import { EnhancedUserProfile } from '@/types'
import { supabase } from '@/services/supabase/client'
export default function UserPage() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { executeSupabase } = useAsyncFunction()
  const [profileData, setProfileData] = useState<EnhancedUserProfile | null>(
    null
  )
  const { userId, preferences } = useAuth()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // In your user page, replace:
  const isOwnProfile = userId === id

  // Debug:
  console.log('Direct session access:', {
    storeUserId: userId,
    usingUserId: userId,
  })
  // ✅ Fixed: Compare route parameter with current user ID
  // const isOwnProfile = userId === id

  useEffect(() => {
    const loadProfile = async () => {
      if (!id) {
        setError('No user ID provided')
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      // For ANY user (including own profile), fetch from database
      await executeSupabase(
        async () => {
          // Get basic profile from profiles table
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', id)
            .single()

          if (profileError) throw profileError

          return { data: profile, error: null }
        },
        {
          showErrorMethod: 'none',
          onSuccess: (profile) => {
            if (profile) {
              // Create the enhanced profile object
              const enhancedProfileData: EnhancedUserProfile = {
                // ... your existing profile creation code (keep as is)
                id: profile.id,
                user_id: profile.user_id,
                username: profile.username || 'User',
                display_name:
                  profile.display_name || profile.username || 'User',
                bio: profile.bio || null,
                avatar_url: profile.avatar_url || null,
                cooking_level: profile.cooking_level || null,
                location: profile.location || null,
                created_at: profile.created_at,
                updated_at: profile.updated_at || null,
                allergens: profile.allergens || null,
                dietary_restrictions: profile.dietary_restrictions || null,
                favorite_cuisines: profile.favorite_cuisines || null,
                is_verified: profile.is_verified || null,
                terms_accepted: profile.terms_accepted || false,
                terms_accepted_at: profile.terms_accepted_at || null,
                terms_version: profile.terms_version || null,
                privacy_settings: profile.privacy_settings || null,
                is_friend: false,
                is_following: false,
                stats: {
                  recipes_total: 0,
                  recipes_published: 0,
                  recipes_draft: 0,
                  recipes_archived: 0,
                  total_views: 0,
                  total_likes: 0,
                  total_saves: 0,
                  avg_rating: 0,
                  total_prep_time: 0,
                  total_cook_time: 0,
                  followers_count: 0,
                  following_count: 0,
                  friends_count: 0,
                  cooking_attempts_count: 0,
                  groups_joined: 0,
                  challenges_completed: 0,
                  collections_total: 0,
                  collections_personal: 0,
                  collections_collaborative: 0,
                  collections_meal_plans: 0,
                  total_recipes_in_collections: 0,
                  avg_collection_rating: 0,
                },
                recent_recipes: [],
                popular_recipes: [],
                recent_collections: [],
                generated_at: new Date().toISOString(),
              }

              setProfileData(enhancedProfileData)
            } else {
              setError('Profile not found')
            }
          },
          onError: (err) => {
            setError('Could not load profile')
            console.error('Profile load error:', err)
          },
        }
      )

      setLoading(false)
    }

    loadProfile()
  }, [id, userId]) // ✅ Fixed: Depend on both route parameter and current user

  // Add debug logging (temporary)
  useEffect(() => {
    console.log('Profile page debug:', {
      routeId: id,
      currentUserId: userId,
      isOwnProfile: isOwnProfile,
    })
  }, [id, userId, isOwnProfile])

  // Rest of your component stays the same...
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
          {profileData ? (
            <>
              <ProfileHeader
                profile={profileData}
                isOwnProfile={isOwnProfile}
              />
              <RecentRecipes recipes={profileData.recent_recipes} />
            </>
          ) : (
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
