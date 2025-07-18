// app/(auth)/onboarding/step-1.tsx
import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Text } from '@/components/common'
import { FilterTagPicker } from '@/components/auth/onboard/FilterTagPicker'
import { useFilterTagsGrouped } from '@/hooks/useFilterTags'
import { FilterTagCategory } from '@/services/filterTags'
import { useAuth } from '@/hooks/useAuth'
import { useAsyncFunction } from '@/hooks/asyncFunction'
import { router } from 'expo-router'
import { styles } from '@/components/auth/styles'

// Step configuration
const ONBOARDING_STEPS = [
  {
    categories: ['dietary', 'allergens'] as FilterTagCategory[],
    title: 'Kosthold og allergier',
    subtitle:
      'La oss starte med det viktigste - ditt kosthold og eventuelle allergier',
  },
  {
    categories: ['cuisine'] as FilterTagCategory[],
    title: 'Favorittkjøkken',
    subtitle: 'Hvilke typer mat liker du best?',
  },
  {
    categories: ['difficulty', 'time', 'cooking_method'] as FilterTagCategory[],
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
    cooking_method: 'Kokkemetoder',
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

  const { updatePreferences } = useAuth()
  const { executeSupabase, isLoading } = useAsyncFunction()

  const currentStepConfig = ONBOARDING_STEPS[currentStep]
  const { tagsGrouped, loading } = useFilterTagsGrouped(
    currentStepConfig.categories
  )

  const totalSteps = ONBOARDING_STEPS.length
  const isLastStep = currentStep === totalSteps - 1

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
    // Merge current step tags with all collected tags
    const updatedAllTags = {
      ...allSelectedTags,
      ...currentStepTags,
    }
    setAllSelectedTags(updatedAllTags)

    if (isLastStep) {
      // Final step - save to backend
      await executeSupabase(() => updatePreferences(updatedAllTags), {
        showErrorMethod: 'alert',
        successMessage: 'Profil oppdatert! Velkommen til BigPan!',
        errorMessage: 'Kunne ikke lagre preferanser. Prøv igjen.',
        onSuccess: () => {
          router.replace('/(tabs)/home')
        },
      })
    } else {
      // Move to next step
      setCurrentStep(currentStep + 1)
      setCurrentStepTags({}) // Reset current step selections
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      // Restore previous step's selections
      setCurrentStepTags({})
    }
  }

  const handleSkip = () => {
    if (isLastStep) {
      router.replace('/(tabs)/home')
    } else {
      setCurrentStep(currentStep + 1)
      setCurrentStepTags({})
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header with progress */}
        <View style={styles.header}>
          <Text variant="heading1" weight="bold" style={styles.header}>
            {currentStepConfig.title}
          </Text>
          <Text variant="caption">{currentStepConfig.subtitle}</Text>

          {/* Progress Bar */}
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
        </View>

        {/* Current step content */}
        {currentStepConfig.categories.map((category) => (
          <FilterTagPicker
            key={category}
            tags={tagsGrouped[category] || []}
            selectedTagIds={currentStepTags[category] || []}
            onTagToggle={(tagId) => handleTagToggle(category, tagId)}
            loading={loading}
            title={getCategoryTitle(category)}
          />
        ))}

        {/* Navigation Buttons */}
        <View style={styles.onboardingButtonsContainer}>
          {currentStep > 0 && (
            <Button variant="outlined" onPress={handleBack}>
              Tilbake
            </Button>
          )}

          <Button variant="outlined" onPress={handleSkip}>
            Hopp over
          </Button>

          <Button variant="filled" onPress={handleNext} disabled={isLoading}>
            {isLoading ? 'Lagrer...' : isLastStep ? 'Fullfør' : 'Neste'}
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
