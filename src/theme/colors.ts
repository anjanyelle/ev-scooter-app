/**
 * Theme Colors
 * Centralized color definitions for the EV Scooter app
 */

export const colors = {
  // Primary Brand Colors
  primary: {
    DEFAULT: '#B8DC00',
    hover: '#A4C800',
    light: '#D6F94D',
    dark: '#8DA700',
    glow: 'rgba(184, 220, 0, 0.35)',
  },

  // Background Colors
  background: {
    primary: '#050505',
    surface: '#0D0D0D',
    card: '#171717',
    cardHover: '#202020',
    secondaryCard: '#111111',
    gradient: ['#050505', '#0C0F07', '#050505'],
  },

  // Glass Effect
  glass: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: 'rgba(255, 255, 255, 0.08)',
    shadow: 'rgba(0, 0, 0, 0.45)',
  },

  // Text Colors
  text: {
    primary: '#FFFFFF',
    body: '#D8D8D8',
    secondary: '#A5A5A5',
    muted: '#707070',
    disabled: '#555555',
  },

  // Accent Colors
  accent: {
    neonGreen: '#B8DC00',
    success: '#72E000',
    warning: '#FFC857',
    error: '#FF5A5F',
    info: '#38BDF8',
  },

  // Border Colors
  border: {
    DEFAULT: '#262626',
    divider: '#1E1E1E',
    active: '#B8DC00',
  },
  
  // Icon Colors
  icon: {
    primary: '#B8DC00',
    secondary: '#FFFFFF',
    muted: '#8A8A8A',
  },

  // Status Colors
  status: {
    online: '#72E000',
    charging: '#B8DC00',
    offline: '#808080',
    critical: '#FF4D4F',
  },
} as const;

export type Colors = typeof colors;