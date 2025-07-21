import { Text } from '@/components/common'
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { styles } from './styles'
import { TouchableOpacity, View } from 'react-native'
import { router } from 'expo-router'

export function BigBtn() {
  return (
    <View style={styles.bigBtnContainer}>
      <TouchableOpacity
        style={styles.bigBtn}
        onPress={() => {
          router.push('/recipes')
        }}
      >
        <FontAwesome5 name="book" style={styles.bigBtnIcon} />
        <Text variant="heading3" weight="semiBold" style={styles.bigBtnText}>
          Oppskrifter &
          &{'\n'}Sammlinger
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addBtnContainer}
        onPress={() => {
          router.push('/recipes')
        }}
      >
        <MaterialIcons name="my-library-add" style={styles.addBtnIcon} />
      </TouchableOpacity>
    </View>
  )
}
