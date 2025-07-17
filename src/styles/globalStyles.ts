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

  // -----------------Forms-----------------

  form: {
    flex: 1,
  },

  inputContainer: {
    marginBottom: theme.spacing.md,
  },

  label: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.xs,
    marginLeft: theme.spacing.xs,
  },

  input: {
    borderWidth: 0.5,
    borderColor: theme.colors.onSurfaceVariant,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.m,
    fontSize: theme.fontSize.md,
    color: theme.colors.onSurface,
    backgroundColor: theme.colors.surface,
  },

  inputError: {
    borderColor: theme.colors.error,
    borderWidth: 1,
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },

  // passwordInput: {
  //   flex: 1,
  //   borderWidth: 1,
  //   borderColor: theme.colors.onSurfaceVariant,
  //   borderRadius: theme.borderRadius.md,
  //   paddingVertical: theme.spacing.md,
  //   paddingHorizontal: theme.spacing.md,
  //   paddingRight: theme.spacing.xxl + theme.spacing.md,
  //   fontSize: theme.fontSize.md,
  //   color: theme.colors.onSurface,
  //   backgroundColor: theme.colors.surface,
  // },

  passwordToggle: {
    position: 'absolute',
    right: theme.spacing.md,
    padding: theme.spacing.xs,
  },

  passwordToggleText: {
    fontSize: theme.fontSize.lg,
  },

  errorText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
  },
})

export const buttonStyle = {
  filled: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  outline: {
    borderColor: theme.colors.primary,
    borderWidth: 1,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  },
  circleButton: {
    s: {
      width: theme.spacing.sm,
      height: theme.spacing.sm,
      borderRadius: theme.borderRadius.round,
      alignItems: 'center',
      justifyContent: 'center',
    },
    m: {
      width: theme.spacing.md,
      height: theme.spacing.md,
      borderRadius: theme.borderRadius.round,
      alignItems: 'center',
      justifyContent: 'center',
    },
    l: {
      width: theme.spacing.lg,
      height: theme.spacing.lg,
      borderRadius: theme.borderRadius.round,
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
}
