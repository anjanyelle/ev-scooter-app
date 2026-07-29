/**
 * Theme Gradients
 * Linear gradient definitions for the EV Scooter app
 */

import { LinearGradientProps } from 'react-native-linear-gradient';

export const gradients = {
  // Background gradients
  background: {
    primary: ['#050505', '#0C0F07', '#050505'],
    secondary: ['#0C0F07', '#050505'],
    tertiary: ['#111111', '#050505'],
  },

  // Button gradients
  button: {
    primary: ['#B8DC00', '#D8FF2F'],
    secondary: ['rgba(184, 220, 0, 0.1)', 'rgba(216, 255, 47, 0.1)'],
    success: ['#72E000', '#8BF01A'],
    warning: ['#FFC857', '#FFD880'],
    error: ['#FF5A5F', '#FF7D81'],
  },

  // Card gradients
  card: {
    default: ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)'],
    elevated: ['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)'],
    glass: ['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.02)'],
  },

  // Overlay gradients
  overlay: {
    dark: ['rgba(5, 5, 5, 0.9)', 'rgba(5, 5, 5, 0.7)'],
    light: ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)'],
  },

  // Accent gradients
  accent: {
    glow: ['rgba(184, 220, 0, 0.25)', 'transparent'],
    success: ['rgba(114, 224, 0, 0.2)', 'transparent'],
    warning: ['rgba(255, 200, 87, 0.2)', 'transparent'],
    error: ['rgba(255, 90, 95, 0.2)', 'transparent'],
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
