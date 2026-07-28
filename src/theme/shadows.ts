/**
 * Theme Shadows
 * Shadow styles for elevation and depth
 */

import { ViewStyle } from 'react-native';
import { colors } from './colors';

export const shadows = {
  // Elevation shadows
  elevation: {
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    } as ViewStyle,

    sm: {
      shadowColor: colors.primary.DEFAULT,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    } as ViewStyle,

    md: {
      shadowColor: colors.primary.DEFAULT,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    } as ViewStyle,

    lg: {
      shadowColor: colors.primary.DEFAULT,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 8,
    } as ViewStyle,

    xl: {
      shadowColor: colors.primary.DEFAULT,
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.25,
      shadowRadius: 16,
      elevation: 12,
    } as ViewStyle,
  },

  // Glow effects
  glow: {
    primary: {
      shadowColor: colors.primary.DEFAULT,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.5,
      shadowRadius: 20,
      elevation: 10,
    } as ViewStyle,

    secondary: {
      shadowColor: colors.primary.light,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 15,
      elevation: 8,
    } as ViewStyle,
  },

  // Card shadows
  card: {
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
    } as ViewStyle,

    elevated: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.4,
      shadowRadius: 16,
      elevation: 10,
    } as ViewStyle,
  },

  // Button shadows
  button: {
    primary: {
      shadowColor: colors.primary.DEFAULT,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 6,
    } as ViewStyle,

    secondary: {
      shadowColor: colors.primary.dark,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 3,
    } as ViewStyle,
  },
} as const;

export type Shadows = typeof shadows;