// app/(auth)/onboarding.tsx - Clean version using your existing types and structure
import React, { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FilterTagPicker } from '@/components/auth/onboard/FilterTagPicker'
import { useFilterTagsGrouped } from '@/hooks/useFilterTags'
import { FilterTagCategory } from '@/services/profile/filterTags'
import { useAuth } from '@/hooks/useAuth'
import { router } from 'expo-router'
import { styles } from '@/components/auth/styles'
import { NavBar } from '@/components/nav/NavBar'
import { theme } from '@/styles/theme'
import { Text } from '@/components/common'

const ONBOARDING_STEPS = [
  {
    categories: ['dietary'] as FilterTagCategory[],
    title: 'Kosthold',
    subtitle: 'La oss starte med det viktigste - ditt kosthold',
  },
  {
    categories: ['allergens'] as FilterTagCategory[],
    title: 'Allergener',
    subtitle: 'Er det noe du er allergisk mot?',
  },
  {
    categories: ['cuisine'] as FilterTagCategory[],
    title: 'Favorittkjøkken',
    subtitle: 'Hvilke typer mat liker du best?',
  },
  {
    categories: ['difficulty', 'time'] as FilterTagCategory[],
    title: 'Kokkeerfaring',
    subtitle: 'Fortell oss om ditt nivå og hvor mye tid du har',
  },
]

function getCategoryTitle(category: string): string {
  const titles: Record<string, string> = {
    dietary: 'Kosthold',
    cuisine: 'Favorittkjøkken',
    allergens: 'Allergener',
    difficulty: 'Nivå',
    time: 'Tidsbruk',
  }
  return titles[category] || category
}

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0)
  const [allSelectedTags, setAllSelectedTags] = useState<
    Record<string, string[]>
  >({})
  const [currentStepTags, setCurrentStepTags] = useState<
    Record<string, string[]>
  >({})
  const [isEditMode, setIsEditMode] = useState(false)

  const { user, preferences, updatePreferences } = useAuth()
  const hasCompletedOnboarding = !!preferences?.preferred_filter_tags?.length

  const currentStepConfig = ONBOARDING_STEPS[currentStep]
  const { tagsGrouped, loading } = useFilterTagsGrouped(
    currentStepConfig.categories
  )

  const totalSteps = ONBOARDING_STEPS.length
  const isLastStep = currentStep === totalSteps - 1

  // Check if user is editing existing preferences
  useEffect(() => {
    if (hasCompletedOnboarding) {
      setIsEditMode(true)
    }
  }, [hasCompletedOnboarding])

  // Pre-populate with existing preferences if available
  useEffect(() => {
    if (preferences && tagsGrouped) {
      const existingTags: Record<string, string[]> = {}

      currentStepConfig.categories.forEach((category) => {
        if (category === 'allergens') {
          existingTags[category] = preferences.blocked_filter_tags || []
        } else {
          const categoryTags = (preferences.preferred_filter_tags || []).filter(
            (tagId) =>
              tagsGrouped[category]?.some(
                (tag: { id: string }) => tag.id === tagId
              )
          )
          existingTags[category] = categoryTags
        }
      })

      setCurrentStepTags(existingTags)
    }
  }, [preferences, tagsGrouped, currentStep])

  const handleTagToggle = (category: string, tagId: string) => {
    setCurrentStepTags((prev) => {
      const categoryTags = prev[category] || []
      const isSelected = categoryTags.includes(tagId)

      return {
        ...prev,
        [category]: isSelected
          ? categoryTags.filter((id) => id !== tagId)
          : [...categoryTags, tagId],
      }
    })
  }
  const handleNext = async () => {
    const updatedAllTags = {
      ...allSelectedTags,
      ...currentStepTags,
    }
    setAllSelectedTags(updatedAllTags)

    if (isLastStep) {
      if (!user?.id) {
        console.error('No user found for onboarding completion')
        return
      }

      console.log('Saving preferences:', updatedAllTags)

      // Flatten all selected tags
      const allTagIds = Object.values(updatedAllTags).flat()

      const result = await updatePreferences({
        preferred_filter_tags: allTagIds,
        blocked_filter_tags: updatedAllTags.allergens || [],
        difficulty_preference: updatedAllTags.difficulty?.length
          ? 'intermediate'
          : 'beginner',
        cooking_time_preference: updatedAllTags.time?.length ? 45 : 60,
        serving_size_preference: 2,
        budget_preference: 'medium',
      })

      if (result.success) {
        console.log('✅ Onboarding completed successfully')
        router.replace(`/user/${user.id}`)
      } else {
        console.error('❌ Failed to save preferences:', result.error)
        router.replace(`/user/${user.id}`)
      }
    } else {
      setCurrentStep(currentStep + 1)
      setCurrentStepTags({})
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      const updatedAllTags = {
        ...allSelectedTags,
        ...currentStepTags,
      }
      setAllSelectedTags(updatedAllTags)

      setCurrentStep(currentStep - 1)

      const prevStepCategories = ONBOARDING_STEPS[currentStep - 1].categories
      const prevStepTags: Record<string, string[]> = {}

      prevStepCategories.forEach((category) => {
        if (updatedAllTags[category]) {
          prevStepTags[category] = updatedAllTags[category]
        }
      })

      setCurrentStepTags(prevStepTags)
    }
  }
  const handleSkip = async () => {
    if (isLastStep) {
      // Save whatever we have so far
      const finalTags = {
        ...allSelectedTags,
        ...currentStepTags,
      }

      if (user?.id && Object.keys(finalTags).length > 0) {
        const allTagIds = Object.values(finalTags).flat()
        await updatePreferences({
          preferred_filter_tags: allTagIds,
          blocked_filter_tags: finalTags.allergens || [],
        })
      }

      router.replace(`/user/${user?.id}`)
    } else {
      setCurrentStep(currentStep + 1)
      setCurrentStepTags({})
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.progressBar}>
        {Array.from({ length: totalSteps }, (_, index) => (
          <View
            key={index}
            style={[
              styles.progressStep,
              index < currentStep && styles.completedStep,
              index === currentStep && styles.activeStep,
            ]}
          />
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContentOnboarding}>
        {/* Show edit mode indicator */}
        {isEditMode && (
          <View
            style={{
              marginBottom: theme.spacing.md,
              padding: theme.spacing.md,
              backgroundColor: theme.colors.success + '15',
              borderRadius: theme.borderRadius.md,
              borderLeftWidth: 4,
              borderLeftColor: theme.colors.success,
            }}
          >
            <Text
              variant="body"
              weight="medium"
              style={{ color: theme.colors.success }}
            >
              ✏️ Redigerer eksisterende preferanser
            </Text>
            <Text
              variant="caption"
              style={{ color: theme.colors.onSurfaceVariant }}
            >
              Dine tidligere valg er allerede markert
            </Text>
          </View>
        )}

        {currentStepConfig.categories.map((category) => (
          <FilterTagPicker
            key={category}
            tags={tagsGrouped[category] || []}
            selectedTagIds={currentStepTags[category] || []}
            onTagToggle={(tagId) => handleTagToggle(category, tagId)}
            loading={loading}
            title={getCategoryTitle(category)}
            category={category}
          />
        ))}
      </ScrollView>

      <NavBar
        config={{
          leftButton: {
            onPress: handleBack,
            iconName: 'chevron-back',
            shouldShow: currentStep > 0,
          },
          middleButton: {
            onPress: handleSkip,
            iconName: 'play-skip-forward-outline',
            text: isLastStep
              ? isEditMode
                ? 'Oppdater'
                : 'Fullfør'
              : 'Hopp over',
          },
          rightButton: {
            onPress: handleNext,
            iconName: isLastStep ? 'checkmark' : 'chevron-forward',
            shouldShow: true,
          },
        }}
      />
    </SafeAreaView>
  )
}
