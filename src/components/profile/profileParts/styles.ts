import { theme } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
    borderColor: theme.colors.onBackground,
    borderWidth: 1,
    borderRadius: theme.borderRadius.lg,
    width: '100%',
    paddingTop: theme.spacing.sm,
  },
  settingIcon: {
    position: 'absolute',
    right: theme.spacing.sm,
    top: theme.spacing.sm,
    fontSize: theme.fontSize.xxxl,
    color: theme.colors.primary,
    transform: [{ rotate: '90deg' }],
  },
  headerStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    gap: theme.spacing.sm,
    width: '100%',
    marginTop: theme.spacing.xl,
  },
  headerStats: {
    flexGrow: 1,
    backgroundColor: theme.colors.surfaceVariant,
    padding: theme.spacing.md,
    alignContent: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
  },
  headerStatsIcon: {
    fontSize: theme.fontSize.xxl,
    color: theme.colors.onSurfaceVariant,
  },
})
