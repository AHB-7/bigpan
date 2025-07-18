import { theme } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
    color: theme.colors.onBackground,
  },
  subtitle: {
    textAlign: 'center',
    color: theme.colors.onSurfaceVariant,
    marginBottom: theme.spacing.lg,
  },
  progressBar: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  progressStep: {
    width: 60,
    height: 4,
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: 2,
  },
  activeStep: {
    backgroundColor: theme.colors.primary,
  },
  completedStep: {
    backgroundColor: theme.colors.onBackground,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    marginBottom: theme.spacing.md,
    color: theme.colors.onBackground,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  levelGrid: {
    gap: theme.spacing.sm,
  },
  timeGrid: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  servingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  optionCard: {
    minWidth: '45%',
    padding: theme.spacing.md,
    alignItems: 'center',
    borderRadius: 12,
  },
  levelCard: {
    padding: theme.spacing.lg,
    alignItems: 'center',
    borderRadius: 12,
  },
  timeCard: {
    flex: 1,
    padding: theme.spacing.md,
    alignItems: 'center',
    borderRadius: 12,
  },
  servingCard: {
    minWidth: '45%',
    padding: theme.spacing.md,
    alignItems: 'center',
    borderRadius: 12,
  },
  selectedCard: {
    backgroundColor: theme.colors.primary,
  },
  optionIcon: {
    fontSize: 24,
    marginBottom: theme.spacing.xs,
  },
  optionLabel: {
    textAlign: 'center',
  },
  selectedLabel: {
    color: theme.colors.background,
  },
  levelIcon: {
    fontSize: 32,
    marginBottom: theme.spacing.sm,
  },
  levelLabel: {
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  levelDescription: {
    textAlign: 'center',
    color: theme.colors.onSurfaceVariant,
  },
  selectedDescription: {
    color: theme.colors.background,
  },
  timeLabel: {
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  timeDescription: {
    textAlign: 'center',
    color: theme.colors.onSurfaceVariant,
  },
  servingIcon: {
    fontSize: 24,
    marginBottom: theme.spacing.xs,
  },
  servingLabel: {
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  skipButton: {
    flex: 1,
  },
  nextButton: {
    flex: 2,
  },
})
