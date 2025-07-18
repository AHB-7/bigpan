// In your InlineError.tsx
import { View } from 'react-native'
import { Text } from './Text'
import { styles } from '../stlyes'

export const InlineError = ({ message }: { message: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  )
}
