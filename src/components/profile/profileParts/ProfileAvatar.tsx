import React from 'react'
import { View, Image } from 'react-native'
import { Text } from '@/components/common'
import { theme } from '@/styles/theme'
import {
  FontAwesome5,
  FontAwesome6,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
import { styles } from './styles'

interface ProfileAvatarProps {
  avatar_url: string | null
  name: string
  size?: number
  level?: string | null
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  avatar_url,
  name,
  size = 100,
  level,
}) => {
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('')
  }

  return (
    <View style={{ marginBottom: theme.spacing.md }}>
      {avatar_url ? (
        <Image
          source={{ uri: avatar_url }}
          style={{
            ...styles.profileAvatar,
            width: size,
            height: size,
            borderRadius: size / 2,
          }}
          onError={() => {
            console.log('Avatar failed to load:', avatar_url)
          }}
        />
      ) : (
        <View
          style={{
            ...styles.profileAvatar,
            width: size,
            height: size,
            borderRadius: size / 2,
          }}
        >
          <Text
            variant="heading2"
            style={{
              color: theme.colors.surface,
              fontWeight: 'bold',
              fontSize: size / 3,
            }}
          >
            {getInitials(name)}
          </Text>
        </View>
      )}
      {level === 'beginner' && (
        <FontAwesome6 name="helmet-safety" style={styles.ImageIcon} />
      )}
      {level === 'intermediate' && (
        <FontAwesome5 name="crown" style={styles.ImageIcon} />
      )}
      {level === 'expert' && (
        <MaterialCommunityIcons name="chef-hat" style={styles.ImageIcon} />
      )}
    </View>
  )
}
