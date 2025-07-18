import { theme } from '@/styles/theme'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    alignItems: 'center',
    height: 60,
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    gap: 20,
    zIndex: 25,
  },

  leftIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.onBackground,
  },
  middleContainer: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 18,
    alignItems: 'center',
    gap: 20,
  },
  middleText: {
    color: theme.colors.surfaceVariant,
    fontSize: theme.fontSize.md,
  },
  icon: {
    color: theme.colors.surfaceVariant,
    fontSize: theme.borderRadius.xl,
  },
  middleIcon: {
    color: theme.colors.surfaceVariant,
    fontSize: theme.fontSize.md,
  },

  rightIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.onBackground,
  },
  leftIconPartsFlex: {
    position: 'absolute',
    alignItems: 'center',
    gap: 5,
    bottom: 60,
    left: 18,
  },
  middleContainerFlex: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    bottom: 60,
    zIndex: 10,
    paddingHorizontal: 18,
    left: 70,
  },
  middleContainerFlexItems: {
    height: 50,
    flex: 1,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    gap: 5,
  },
  middleContainerFlexItemsText: {
    color: theme.colors.onSurface,
    fontSize: theme.fontSize.md,
  },
  middleContainerFlexItemsIcon: {
    color: theme.colors.onSurface,
    fontSize: theme.fontSize.md,
  },
  rightIconPartsFlex: {
    position: 'absolute',
    alignItems: 'center',
    gap: 5,
    bottom: 60,
    right: 18,
  },
  leftIconPartsContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#252A34',
  },
})
