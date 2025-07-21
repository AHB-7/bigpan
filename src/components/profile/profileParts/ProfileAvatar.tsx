// src/components/profile/profileParts/ProfileAvatar.tsx - Simple Gallery Only
import React, { useState } from 'react'
import { View, Image, TouchableOpacity, Alert } from 'react-native'
import { Text } from '@/components/common'
import { theme } from '@/styles/theme'
import {
  Feather,
  FontAwesome5,
  FontAwesome6,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
import { styles } from './styles'
import { useImageUpload } from '@/hooks/useImageUpload'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'

interface ProfileAvatarProps {
  avatar_url: string | null
  name: string
  size?: number
  level?: string | null
  isEditable?: boolean
  onAvatarUpdate?: (newAvatarUrl: string) => void
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  avatar_url,
  name,
  size = 100,
  level,
  isEditable = false,
  onAvatarUpdate,
}) => {
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)
  const displayUrl = uploadedUrl || avatar_url

  const { uploadImage, isUploading } = useImageUpload({
    onSuccess: (result) => {
      const newUrl = result?.secureUrl || result?.optimizedUrl
      if (newUrl) {
        setUploadedUrl(newUrl)
        onAvatarUpdate?.(newUrl)
      }
    },
    onError: (error) => {
      Alert.alert('Feil', `Kunne ikke laste opp profilbilde: ${error}`)
    },
    showSuccessMessage: true,
  })

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('')
  }

  // Simple gallery pick with auto-crop
  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert(
          'Tillatelse nødvendig',
          'Vi trenger tilgang til bildebiblioteket.'
        )
        return
      }

      // Pick image without built-in editing
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false, // Disable to avoid freezing
        quality: 1.0,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
      })

      if (result.canceled || !result.assets[0]) {
        return
      }

      const imageUri = result.assets[0].uri

      // Auto-crop to square
      const croppedImage = await cropImageToSquare(imageUri)

      // Upload the cropped image
      await uploadImage(croppedImage, 'avatar')
    } catch (error) {
      console.error('Image processing error:', error)
      Alert.alert('Feil', 'Kunne ikke behandle bildet. Prøv igjen.')
    }
  }

  // Crop image to square (center crop)
  const cropImageToSquare = async (imageUri: string): Promise<string> => {
    try {
      // Get image dimensions
      const imageInfo = await ImageManipulator.manipulateAsync(imageUri, [], {
        format: ImageManipulator.SaveFormat.JPEG,
      })

      const { width, height } = imageInfo

      // Calculate square crop (center)
      const size = Math.min(width, height)
      const cropX = (width - size) / 2
      const cropY = (height - size) / 2

      // Crop and resize
      const croppedImage = await ImageManipulator.manipulateAsync(
        imageUri,
        [
          {
            crop: {
              originX: cropX,
              originY: cropY,
              width: size,
              height: size,
            },
          },
          {
            resize: {
              width: 600, // Good size for avatars
              height: 600,
            },
          },
        ],
        {
          compress: 0.8,
          format: ImageManipulator.SaveFormat.JPEG,
        }
      )

      return croppedImage.uri
    } catch (error) {
      console.error('Cropping failed:', error)
      // If cropping fails, return original image
      return imageUri
    }
  }

  const handleAvatarPress = () => {
    if (isEditable && !isUploading) {
      pickImage()
    }
  }

  const AvatarContent = () => (
    <View style={{ position: 'relative' }}>
      {displayUrl ? (
        <Image
          source={{ uri: displayUrl }}
          style={{
            ...styles.profileAvatar,
            width: size,
            height: size,
            borderRadius: size / 2,
            opacity: isUploading ? 0.5 : 1,
          }}
          resizeMode="cover"
        />
      ) : (
        <View
          style={{
            ...styles.profileAvatar,
            width: size,
            height: size,
            borderRadius: size / 2,
            opacity: isUploading ? 0.5 : 1,
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

      {/* Loading indicator */}
      {isUploading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)',
            borderRadius: size / 2,
          }}
        >
          <Text variant="caption" style={{ color: 'white' }}>
            📤
          </Text>
        </View>
      )}

      {/* Edit indicator */}
      {isEditable && !isUploading && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            backgroundColor: theme.colors.primary,
            borderRadius: 12,
            width: 24,
            height: 24,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: theme.colors.background,
          }}
        >
          <Feather name="edit" size={12} color="white" />
        </View>
      )}
    </View>
  )

  return (
    <View style={{ marginBottom: theme.spacing.md }}>
      {isEditable ? (
        <TouchableOpacity
          onPress={handleAvatarPress}
          disabled={isUploading}
          activeOpacity={0.8}
        >
          <AvatarContent />
        </TouchableOpacity>
      ) : (
        <AvatarContent />
      )}

      {/* Cooking level badges */}
      {level === 'beginner' && (
        <FontAwesome6 name="helmet-safety" style={styles.ImageIcon} />
      )}
      {level === 'intermediate' && (
        <FontAwesome5 name="crown" style={styles.ImageIcon} />
      )}
      {level === 'advanced' && (
        <MaterialCommunityIcons name="chef-hat" style={styles.ImageIcon} />
      )}
    </View>
  )
}
