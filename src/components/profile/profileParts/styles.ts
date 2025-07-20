import { theme } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xxl,
  },
  profileAvatar: {
    backgroundColor: theme.colors.onBackground + 'aa',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: theme.colors.primary,
  },
  ImageIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    transform: [{ rotate: '45deg' }],
    fontSize: theme.fontSize.xl,
    color: theme.colors.primary,
  },
  settingIcon: {
    position: 'absolute',
    right: theme.spacing.sm,
    top: theme.spacing.sm,
    fontSize: theme.fontSize.xxl,
    color: theme.colors.onBackground + 'cc',
    transform: [{ rotate: '90deg' }],
    shadowColor: theme.colors.onBackground,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  headerStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: theme.borderRadius.lg,
    gap: theme.spacing.sm,
    marginTop: theme.spacing.xl,
  },
  headerStats: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.onBackground,
    gap: theme.spacing.xs,
    shadowColor: theme.colors.onBackground,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  headerStatsIcon: {
    fontSize: 32,
  },
})
