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
  button: {
    backgroundColor: theme.colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.onBackground,
    fontSize: theme.fontSize.md,
  },
})
