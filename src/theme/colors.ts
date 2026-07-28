/**
 * Theme Colors
 * Centralized color definitions for the EV Scooter app
 */

export const colors = {
  // Primary Brand Colors
  primary: {
    DEFAULT: '#00E5FF',
    dark: '#00B8D4',
    light: '#18FFFF',
    glow: 'rgba(0, 229, 255, 0.3)',
  },

  // Background Colors
  background: {
    primary: '#0A0E27',
    secondary: '#111640',
    tertiary: '#1A1F4E',
    gradient: ['#0A0E27', '#111640', '#1A1F4E'],
  },

  // Surface Colors
  surface: {
    DEFAULT: '#1E2349',
    elevated: '#252A5C',
    overlay: 'rgba(30, 35, 73, 0.8)',
  },

  // Text Colors
  text: {
    primary: '#FFFFFF',
    secondary: '#B0B8D0',
    tertiary: '#6B7394',
    inverse: '#0A0E27',
  },

  // Accent Colors
  accent: {
    success: '#00E676',
    warning: '#FFB300',
    error: '#FF5252',
    info: '#00E5FF',
  },

  // Border Colors
  border: {
    DEFAULT: 'rgba(255, 255, 255, 0.1)',
    light: 'rgba(255, 255, 255, 0.05)',
    focus: '#00E5FF',
  },

  // Overlay Colors
  overlay: {
    dark: 'rgba(10, 14, 39, 0.8)',
    light: 'rgba(255, 255, 255, 0.1)',
  },

  // Status Colors
  status: {
    online: '#00E676',
    offline: '#FF5252',
    charging: '#FFB300',
    available: '#00E5FF',
  },
} as const;

export type Colors = typeof colors;