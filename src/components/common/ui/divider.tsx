import { View } from 'react-native'
import { Text } from '../informatic/Text'
import { styles } from '../stlyes'

/**
 * Divider component to visually separate sections in the UI.
 * It includes a line on either side of the text "or".
 */

type DividerProps = {
  text?: string
}

export const DividerWithText: React.FC<DividerProps> = ({ text }) => {
  return (
    <View style={styles.divider}>
      <View style={styles.dividerLine} />
      <Text style={styles.dividerText}>{text}</Text>
      <View style={styles.dividerLine} />
    </View>
  )
}

export const Divider: React.FC = () => {
  return (
    <View style={styles.divider}>
      <View style={styles.dividerLine} />
    </View>
  )
}
