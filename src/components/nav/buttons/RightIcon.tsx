import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { styles } from '../styles'
// import { NotificationBadge } from '../../../features/social/shared/NotificationBadge'

type RightIconProps = {
  onPress: () => void
  iconName?: React.ComponentProps<typeof Ionicons>['name']
  shouldShow?: boolean
}

export function RightIcon({
  onPress,
  iconName,
  shouldShow = true,
}: RightIconProps) {
  return (
    shouldShow && (
      <TouchableOpacity onPress={onPress} style={styles.rightIconContainer}>
        <Ionicons name={iconName || 'notifications'} style={styles.icon} />
        {/* {(iconName === 'notifications' || !iconName) && <NotificationBadge />} */}
      </TouchableOpacity>
    )
  )
}
