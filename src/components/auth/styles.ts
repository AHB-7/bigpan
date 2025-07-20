import { theme } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  // -------------------main screen styles-------------------

  mainScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.xl,
  },
  logo: {
    width: 160,
    height: 160,
  },
  buttonsContainer: {
    width: '100%',
    marginTop: 64,
    gap: theme.spacing.md,
  },

  // -------------------login screen styles-------------------

  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  keyboardAvoid: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: theme.spacing.xxl,
  },
  headerContainer: {
    borderLeftColor: theme.colors.primary,
    borderLeftWidth: 10,
    paddingLeft: theme.spacing.sm,
    marginBottom: 64,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: theme.spacing.xl,
  },
  divider: {
    marginTop: theme.spacing.xxl,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing.lg,
  },

  // -------------------onboarding styles -------------------
  containerOnboarding: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  categoryTitle: {
    textAlign: 'center',
    marginVertical: theme.spacing.xl,
  },
  scrollContentOnboarding: {
    flexGrow: 1,
    paddingBottom: theme.spacing.xxl,
    alignContent: 'center',
    paddingHorizontal: theme.spacing.lg,
    justifyContent: 'center',
  },
  tagsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  buttonsGrow: {
    flexGrow: 1,
    maxWidth: 'auto',
    paddingVertical: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    borderRadius: 100,
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: theme.spacing.sm,
  },
  progressStep: {
    width: 40,
    height: 4,
    borderRadius: 5,
    backgroundColor: theme.colors.onSurfaceVariant + '80',
    marginHorizontal: 1,
  },
  completedStep: {
    backgroundColor: theme.colors.success,
  },
  activeStep: {
    backgroundColor: theme.colors.primary,
  },
})
