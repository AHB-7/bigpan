import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { styles } from '../styles'

type LeftMenuProps = {
  onPress: () => void
  iconName?: React.ComponentProps<typeof Ionicons>['name']
  shouldShow?: boolean
}

export function LeftMenu({
  onPress,
  iconName,
  shouldShow = true,
}: LeftMenuProps) {
  if (!shouldShow) return null

  return (
    <TouchableOpacity onPress={onPress} style={styles.leftIconContainer}>
      <Ionicons name={iconName || 'menu'} style={styles.icon} />
    </TouchableOpacity>
  )
}
