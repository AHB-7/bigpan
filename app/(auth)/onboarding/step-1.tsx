import { useAuth } from '@/hooks/useAuth'
import { DynamicOnboardingStep } from './DynamicOnboardingStep'
import { router } from 'expo-router'
import { useAsyncFunction } from '@/hooks/asyncFunction'

export default function OnboardingAllInOne() {
  const { updatePreferences } = useAuth()
  const { executeSupabase, isLoading } = useAsyncFunction()

  const handleComplete = async (selectedTags: Record<string, string[]>) => {
    // selectedTags = {
    //   dietary: [uuid1, uuid2],
    //   cuisine: [uuid3, uuid4],
    //   difficulty: [uuid5]
    // }

    await executeSupabase(() => updatePreferences(selectedTags), {
      showErrorMethod: 'alert',
      successMessage: 'Profil oppdatert! Velkommen til BigPan!',
      errorMessage: 'Kunne ikke lagre preferanser. Prøv igjen.',
      onSuccess: () => {
        router.replace('/(tabs)/home')
      },
    })
  }

  return (
    <DynamicOnboardingStep
      categories={[
        'dietary',
        'cuisine',
        'difficulty',
        'time',
        'cooking_method',
        'meal_type',
        'equipment',
        'season',
        'occasion',
      ]}
      title="Velkommen til BigPan!"
      subtitle="Fortell oss litt om dine matpreferanser"
      stepNumber={1}
      totalSteps={1}
      onNext={handleComplete}
      onSkip={() => router.replace('/(tabs)/home')}
    />
  )
}
