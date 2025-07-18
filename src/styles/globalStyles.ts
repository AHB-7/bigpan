import { StyleSheet } from 'react-native'
import { theme } from './theme'

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  screenPadding: {
    paddingHorizontal: theme.spacing.md,
  },
})
