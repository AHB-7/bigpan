import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, Button } from '@/components/common'
import { FilterTagPicker } from '@/components/common/buttons/FilterTagPicker'
import { useFilterTagsGrouped } from '@/hooks/useFilterTags'
import { FilterTagCategory } from '@/services/filterTags'
import { styles } from '@/components/auth/onboard/styles'

interface DynamicOnboardingStepProps {
  categories: FilterTagCategory[]
  title: string
  subtitle: string
  stepNumber: number
  totalSteps: number
  onNext: (selectedTags: Record<string, string[]>) => void
  onBack?: () => void
  onSkip?: () => void
}

function getCategoryTitle(category: string): string {
  const titles: Record<string, string> = {
    dietary: 'Kosthold',
    cuisine: 'Favorittkjøkken',
    difficulty: 'Kokkenivå',
    time: 'Tidsbruk',
    cooking_method: 'Kokkemetoder',
    meal_type: 'Måltidstyper',
    season: 'Årstider',
    occasion: 'Anledninger',
    allergens: 'Allergener',
  }
  return titles[category] || category
}

export const DynamicOnboardingStep: React.FC<DynamicOnboardingStepProps> = ({
  categories,
  title,
  subtitle,
  stepNumber,
  totalSteps,
  onNext,
  onBack,
  onSkip,
}) => {
  const { tagsGrouped, loading, error } = useFilterTagsGrouped(categories)
  const [selectedTags, setSelectedTags] = useState<Record<string, string[]>>({})

  const handleTagToggle = (category: string, tagId: string) => {
    setSelectedTags((prev) => {
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

  const handleNext = () => {
    onNext(selectedTags)
  }

  if (error) {
    function d(arg0: () => void): () => void {
      return arg0
    }
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text variant="body">Error loading options: {error}</Text>
          <Button onPress={onSkip ?? d(() => {})} variant="outlined">
            Skip This Step
          </Button>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* <View style={styles.header}>
          <Text variant="heading1" weight="bold" style={styles.title}>
            {title}
          </Text>
          <Text variant="body" style={styles.subtitle}>
            {subtitle}
          </Text>

          <View style={styles.progressBar}>
            {Array.from({ length: totalSteps }, (_, index) => (
              <View
                key={index}
                style={[
                  styles.progressStep,
                  index < stepNumber - 1 && styles.completedStep,
                  index === stepNumber - 1 && styles.activeStep,
                ]}
              />
            ))}
          </View>
        </View> */}

        {categories.map((category) => (
          <FilterTagPicker
            key={category}
            tags={tagsGrouped[category] || []}
            selectedTagIds={selectedTags[category] || []}
            onTagToggle={(tagId) => handleTagToggle(category, tagId)}
            loading={loading}
            title={getCategoryTitle(category)}
          />
        ))}

        {/* Navigation Buttons */}
        <View style={styles.buttons}>
          {onBack && (
            <Button variant="outlined" onPress={onBack}>
              Tilbake
            </Button>
          )}
          {onSkip && (
            <Button
              variant="outlined"
              onPress={onSkip}
              style={styles.skipButton}
            >
              Hopp over
            </Button>
          )}
          <Button
            variant="filled"
            onPress={handleNext}
            style={styles.nextButton}
          >
            {stepNumber === totalSteps ? 'Fullfør' : 'Neste'}
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
