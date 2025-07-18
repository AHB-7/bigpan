import { theme } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
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

  inputWrapper: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50, // Make space for the eye icon
  },
  required: {
    color: theme.colors.error || '#FF0000',
  },
  // -----------------dividers-----------------

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.onSurfaceVariant,
  },

  dividerText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.onSurfaceVariant,
    marginHorizontal: theme.spacing.m,
  },
})
