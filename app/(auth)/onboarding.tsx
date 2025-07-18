// app/(auth)/onboarding/step-1.tsx
import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FilterTagPicker } from '@/components/auth/onboard/FilterTagPicker'
import { useFilterTagsGrouped } from '@/hooks/useFilterTags'
import { FilterTagCategory } from '@/services/filterTags'
import { useAuth } from '@/hooks/useAuth'
import { useAsyncFunction } from '@/hooks/asyncFunction'
import { router } from 'expo-router'
import { styles } from '@/components/auth/styles'
import { NavBar } from '@/components/nav/NavBar'
import { theme } from '@/styles/theme'

// Step configuration
const ONBOARDING_STEPS = [
  {
    categories: ['dietary'] as FilterTagCategory[],
    title: 'Kosthold ',
    subtitle:
      'La oss starte med det viktigste - ditt kosthold og eventuelle allergier',
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
    // ✅ ALWAYS merge current step tags into all tags (local state only)
    const updatedAllTags = {
      ...allSelectedTags,
      ...currentStepTags,
    }
    setAllSelectedTags(updatedAllTags)

    console.log('📝 Updated local tags (not saved yet):', updatedAllTags)

    if (isLastStep) {
      // ✅ ONLY save to database on the FINAL step
      console.log('💾 Final step - saving to database...')
      await executeSupabase(() => updatePreferences(updatedAllTags), {
        showErrorMethod: 'alert',
        successMessage: 'Profil oppdatert! Velkommen til BigPan!',
        errorMessage: 'Kunne ikke lagre preferanser. Prøv igjen.',
        onSuccess: () => {
          router.replace('/(tabs)/home')
        },
      })
    } else {
      // ✅ Just move to next step (NO database save)
      console.log('➡️ Moving to next step (no database save)')
      setCurrentStep(currentStep + 1)
      setCurrentStepTags({}) // Reset current step selections
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      // ✅ Save current step tags before going back
      const updatedAllTags = {
        ...allSelectedTags,
        ...currentStepTags,
      }
      setAllSelectedTags(updatedAllTags)

      setCurrentStep(currentStep - 1)

      // ✅ Load previous step's tags into currentStepTags
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
      // ✅ If skipping final step, save whatever we have so far
      const finalTags = {
        ...allSelectedTags,
        ...currentStepTags,
      }

      console.log('⏭️ Skipping final step - saving current progress...')
      await executeSupabase(() => updatePreferences(finalTags), {
        showErrorMethod: 'alert',
        successMessage: 'Velkommen til BigPan!',
        errorMessage:
          'Kunne ikke lagre preferanser, men du kan sette dem senere.',
        onSuccess: () => {
          router.replace('/(tabs)/home')
        },
        onError: () => {
          // Even if saving fails, let them into the app
          router.replace('/(tabs)/home')
        },
      })
    } else {
      // ✅ Just skip to next step (NO database save)
      console.log('⏭️ Skipping step (no database save)')
      setCurrentStep(currentStep + 1)
      setCurrentStepTags({})
    }
  }

  // ✅ Also add a "Finish Early" option if user wants to complete onboarding
  const handleFinishEarly = async () => {
    const finalTags = {
      ...allSelectedTags,
      ...currentStepTags,
    }

    console.log('🏁 Finishing onboarding early...')
    await executeSupabase(() => updatePreferences(finalTags), {
      showErrorMethod: 'alert',
      successMessage: 'Profil oppdatert! Velkommen til BigPan!',
      errorMessage: 'Kunne ikke lagre preferanser. Prøv igjen.',
      onSuccess: () => {
        router.replace('/(tabs)/home')
      },
    })
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
            text: isLastStep ? 'Fullfør' : 'Hopp over',
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
