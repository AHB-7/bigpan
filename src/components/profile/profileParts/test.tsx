// Quick test component to verify image URLs
// You can temporarily add this to your app to test

import React, { useState } from 'react'
import { View, Image, Button, Text, Alert } from 'react-native'
import { BigPanImageService } from '@/services/cloudinary/optimizedImageService'

export const ImageUrlTest = () => {
  const [testUrl, setTestUrl] = useState<string>('')

  const testCloudinaryUrl = () => {
    // Test with a sample public ID (replace with actual one from your upload)
    const samplePublicId = 'bigpan/user123/users/avatars/avatar_1234567890'

    console.log('🧪 Testing Cloudinary URLs:')

    // Test different URL generation methods
    const optimizedUrl = BigPanImageService.getOptimizedUrl(samplePublicId)
    const thumbnailUrl = BigPanImageService.getThumbnailUrl(
      samplePublicId,
      'avatar'
    )
    const responsiveUrls = BigPanImageService.getResponsiveUrls(
      samplePublicId,
      'avatar'
    )

    console.log('Optimized URL:', optimizedUrl)
    console.log('Thumbnail URL:', thumbnailUrl)
    console.log('Responsive URLs:', responsiveUrls)

    setTestUrl(optimizedUrl)

    Alert.alert('URL Test', `Generated URL: ${optimizedUrl}`, [
      { text: 'Copy URL', onPress: () => console.log('URL:', optimizedUrl) },
      { text: 'OK' },
    ])
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>Image URL Test</Text>
      <Button title="Generate Test URL" onPress={testCloudinaryUrl} />

      {testUrl ? (
        <View style={{ marginTop: 20 }}>
          <Text>Testing URL: {testUrl}</Text>
          <Image
            source={{ uri: testUrl }}
            style={{ width: 100, height: 100, marginTop: 10 }}
            onLoad={() => console.log('✅ Test image loaded')}
            onError={(error) => console.log('❌ Test image failed:', error)}
          />
        </View>
      ) : null}
    </View>
  )
}
