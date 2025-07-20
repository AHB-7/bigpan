import { Image, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Text } from '../common'
import { styles } from './styles'
import { router } from 'expo-router'

export default function StartComponent() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainScreen}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          accessibilityLabel="BigPan Logo"
          source={require('../../../assets/images/logo.png')}
        />

        <Text variant="heading3" weight="light">
          BigPan hjelper deg med å finne svar på hverdagens mat utfordringer.
        </Text>

        <View style={styles.buttonsContainer}>
          <Button onPress={() => router.push('/(auth)/login')}>
            Kom i gang
          </Button>
          <Button
            variant="outlined"
            onPress={() => router.push('/(auth)/register')}
          >
            Opprett konto
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}
