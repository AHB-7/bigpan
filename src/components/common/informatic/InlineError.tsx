// In your InlineError.tsx
import { View, StyleSheet } from 'react-native'
import { Text } from './Text'

export const InlineError = ({ message }: { message: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFF5F5',
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
    borderRadius: 6,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
    lineHeight: 20,
  },
})