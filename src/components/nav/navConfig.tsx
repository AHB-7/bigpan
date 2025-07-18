import { View } from 'moti'
import { Text } from 'react-native'
import { router } from 'expo-router'

export const navigationConfigs = {
  back: {
    leftButton: {
      onPress: () => {
        router.canGoBack() && router.back()
      },
      iconName: 'arrow-back' as const,
    },
    middleButton: {
      onPress: () => {},
      iconName: 'save' as const,
      text: '',
    },
    rightButton: {
      onPress: () => {},
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
