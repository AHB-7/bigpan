import { theme } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  keyboardAvoid: {
    flex: 1,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },

  // Header styles
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },

  logo: {
    fontSize: 64,
    marginBottom: theme.spacing.md,
  },

  title: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.onBackground,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 22,
  },

  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: theme.spacing.xl,
  },

  forgotPasswordText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.medium,
  },

  // Button styles
  loginButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
    minHeight: 48,
    ...theme.shadows.sm,
  },

  loginButtonDisabled: {
    backgroundColor: theme.colors.onSurfaceVariant,
  },

  loginButtonText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.surface,
  },

  // Divider styles
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.lg,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.onSurfaceVariant,
  },

  dividerText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.onSurfaceVariant,
    marginHorizontal: theme.spacing.md,
  },

  // Social button styles
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.onSurfaceVariant,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
  },

  socialButtonIcon: {
    fontSize: theme.fontSize.lg,
    marginRight: theme.spacing.sm,
  },

  socialButtonText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.onSurface,
  },

  // Footer styles
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing.lg,
  },

  footerText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.onSurfaceVariant,
    marginRight: theme.spacing.xs,
  },

  signUpText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.semibold,
  },
})
