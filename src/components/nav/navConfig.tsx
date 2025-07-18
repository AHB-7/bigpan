import { View } from 'moti'
import { Text } from 'react-native'
import { router } from 'expo-router'

export const navigationConfigs = {
  back: {
    leftButton: {
      onPress: () => {
        router.canGoBack()
          ? router.back()
          : console.log('No back navigation available')
      },
      iconName: 'arrow-back' as const,
    },
    middleButton: {
      onPress: () => {
        console.log('Preferences and Allergies: Save settings')
      },
      iconName: 'save' as const,
      text: '',
    },
    rightButton: {
      onPress: () => {
        console.log('Preferences and Allergies: Open help')
      },
      iconName: 'help' as const,
      shouldShow: false,
    },
    rightComponent: (
      <View>
        <Text>Hello</Text>
      </View>
    ),
  },
}
