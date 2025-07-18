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
})
