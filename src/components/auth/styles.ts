import { theme } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  // -------------------main screen styles-------------------
  mainScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 84,
  },

  egg: {
    fontSize: 124,
    color: theme.colors.primary,
  },
  buttonsContainer: {
    width: '100%',
    marginTop: 64,
    gap: 12,
    marginBottom: theme.spacing.xxl,
  },

  // -------------------login screen styles-------------------

  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.lg,
  },

  keyboardAvoid: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: theme.spacing.xxl,
  },
  header: {
    marginVertical: theme.spacing.xxl,
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

  // Footer styles
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing.lg,
  },

  // -------------------onboarding styles -------------------

  onboardingContainer: {
    flex: 1,
  },
  onboardingHeader: {
    marginVertical: theme.spacing.lg,
  },
  onboardingButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.lg,
    width: '100%',
  },
  tagsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  buttonsGrow: {
    flexGrow: 1,
    flexBasis: '48%',
    maxWidth: '50%',
    paddingVertical: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    borderRadius: 100,
  },
  progressBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: theme.spacing.lg,
  },
  progressStep: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.onSurfaceVariant,
    marginHorizontal: 2,
  },
  completedStep: {
    backgroundColor: theme.colors.primary,
  },
  activeStep: {
    backgroundColor: theme.colors.primary,
  },
})
