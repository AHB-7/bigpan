import { theme } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  headerContainer: {
    borderLeftColor: theme.colors.primary,
    borderLeftWidth: 12,
    marginTop: theme.spacing.xxl,
    marginBottom: theme.spacing.l,
    paddingLeft: theme.spacing.md,
    marginHorizontal: theme.spacing.md,
  },

  linkssection: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
  },

  // Group similar settings together
  settingsGroup: {
    marginBottom: theme.spacing.md,
  },

  groupTitle: {
    marginBottom: theme.spacing.md,
    marginLeft: theme.spacing.sm,
    color: theme.colors.onSurfaceVariant,
  },

  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surface,
    borderWidth: 0,
    shadowColor: theme.colors.onBackground,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  linkIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.primary + '30',
  },

  linkIcon: {
    fontSize: 18,
    color: theme.colors.primary,
  },

  linkContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  linkTextContainer: {
    flex: 1,
  },

  linkText: {
    color: theme.colors.onSurface,
    marginBottom: 2,
  },

  linkSubtext: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.onSurfaceVariant,
  },
  chevronIcon: {
    fontSize: theme.fontSize.md,
    color: theme.colors.onSurfaceVariant,
  },
  logoutContainer: {
    paddingVertical: theme.spacing.md,
    borderWidth: 1,
    backgroundColor: theme.colors.onBackground + '10',
    borderColor: theme.colors.onBackground + '20',
    marginBottom: 100,
  },
  logoutIconContainer: {
    backgroundColor: theme.colors.error + '15',
  },
  logoutIcon: {
    color: theme.colors.error + '80',
  },
  logoutText: {
    color: theme.colors.error,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },

  badgeText: {
    color: theme.colors.surface,
  },

  //-------------------profile styles-------------------
  row: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  flex1: {
    flex: 1,
  },
  label: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.onSurface,
    marginBottom: theme.spacing.xs,
    marginLeft: theme.spacing.xs,
  },
})
