import { typography } from './typography'

export const theme = {
  ...typography,
  colors: {
    // Primary - Food/Cooking inspired
    primary: '#e7521cff', // Warm orange
    primaryLight: '#FF8A65',
    primaryDark: '#E64A19',

    // Secondary - Fresh greens
    secondary: '#4CAF50',
    secondaryLight: '#81C784',
    secondaryDark: '#388E3C',

    // Neutrals
    background: '#fcf7f7ff',
    surface: '#FFFFFF',
    surfaceVariant: '#F5F5F5',

    // Text
    onBackground: '#212121',
    onSurface: '#424242',
    onSurfaceVariant: '#757575',

    // Semantic
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',

    // Social
    like: '#E91E63',
    save: '#9C27B0',
    share: '#3F51B5',
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
    round: 50,
  },

  fontSize: {
    xs: 10,
    s: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    huge: 40,
    xhuge: 48,
  },

  fontWeight: {
    light: '300' as const,
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
    black: '900' as const,
  },

  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 8,
    },
  },
}
