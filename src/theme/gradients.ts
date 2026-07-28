/**
 * Theme Gradients
 * Linear gradient definitions for the EV Scooter app
 */

import { LinearGradientProps } from 'react-native-linear-gradient';

export const gradients = {
  // Background gradients
  background: {
    primary: ['#0A0E27', '#111640', '#1A1F4E'],
    secondary: ['#111640', '#1A1F4E'],
    tertiary: ['#1A1F4E', '#252A5C'],
  },

  // Button gradients
  button: {
    primary: ['#00E5FF', '#00B8D4'],
    secondary: ['#18FFFF', '#00E5FF'],
    success: ['#00E676', '#00C853'],
    warning: ['#FFB300', '#FF8F00'],
    error: ['#FF5252', '#D32F2F'],
  },

  // Card gradients
  card: {
    default: ['rgba(30, 35, 73, 0.8)', 'rgba(37, 42, 92, 0.6)'],
    elevated: ['rgba(37, 42, 92, 0.9)', 'rgba(30, 35, 73, 0.7)'],
    glass: ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)'],
  },

  // Overlay gradients
  overlay: {
    dark: ['rgba(10, 14, 39, 0.9)', 'rgba(10, 14, 39, 0.7)'],
    light: ['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)'],
  },

  // Accent gradients
  accent: {
    glow: ['rgba(0, 229, 255, 0.3)', 'rgba(0, 229, 255, 0.1)'],
    success: ['rgba(0, 230, 118, 0.2)', 'rgba(0, 230, 118, 0.05)'],
    warning: ['rgba(255, 179, 0, 0.2)', 'rgba(255, 179, 0, 0.05)'],
    error: ['rgba(255, 82, 82, 0.2)', 'rgba(255, 82, 82, 0.05)'],
  },
} as const;

export type Gradients = typeof gradients;

// Helper to convert gradient to LinearGradient props
export const getGradientProps = (
  gradient: string[],
  options?: Partial<LinearGradientProps>
): LinearGradientProps => ({
  colors: gradient,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
  ...options,
});
