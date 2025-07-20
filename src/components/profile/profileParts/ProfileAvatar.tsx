import React from 'react'
import { View, Image } from 'react-native'
import { Text } from '@/components/common'
import { theme } from '@/styles/theme'

interface ProfileAvatarProps {
  avatar_url: string | null
  name: string
  size?: number
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  avatar_url,
  name,
  size = 80,
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
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: theme.colors.surfaceVariant,
          }}
          onError={() => {
            console.log('Avatar failed to load:', avatar_url)
          }}
        />
      ) : (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: theme.colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
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
    </View>
  )
}
