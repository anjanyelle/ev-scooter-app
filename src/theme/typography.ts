/**
 * Theme Typography
 * Font families and text styles for the EV Scooter app
 */

export const typography = {
  // Font families
  fonts: {
    regular: 'System',
    medium: 'System',
    semiBold: 'System',
    bold: 'System',
  },

  // Font sizes
  fontSize: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 17,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    huge: 40,
    massive: 48,
  },

  // Font weights
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },

  // Letter spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
  },

  // Text styles
  styles: {
    // Headings
    h1: {
      fontSize: 40,
      fontWeight: '700' as const,
      lineHeight: 48,
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: 32,
      fontWeight: '700' as const,
      lineHeight: 40,
      letterSpacing: -0.5,
    },
    h3: {
      fontSize: 24,
      fontWeight: '600' as const,
      lineHeight: 32,
      letterSpacing: 0,
    },
    h4: {
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 28,
      letterSpacing: 0,
    },

    // Body text
    bodyLarge: {
      fontSize: 17,
      fontWeight: '400' as const,
      lineHeight: 24,
      letterSpacing: 0,
    },
    bodyMedium: {
      fontSize: 15,
      fontWeight: '400' as const,
      lineHeight: 22,
      letterSpacing: 0,
    },
    bodySmall: {
      fontSize: 13,
      fontWeight: '400' as const,
      lineHeight: 18,
      letterSpacing: 0,
    },

    // Labels
    labelLarge: {
      fontSize: 15,
      fontWeight: '500' as const,
      lineHeight: 20,
      letterSpacing: 0.5,
    },
    labelMedium: {
      fontSize: 13,
      fontWeight: '500' as const,
      lineHeight: 18,
      letterSpacing: 0.5,
    },
    labelSmall: {
      fontSize: 11,
      fontWeight: '500' as const,
      lineHeight: 16,
      letterSpacing: 0.5,
    },

    // Captions
    caption: {
      fontSize: 11,
      fontWeight: '400' as const,
      lineHeight: 16,
      letterSpacing: 0.4,
    },

    // Button text
    button: {
      fontSize: 17,
      fontWeight: '600' as const,
      lineHeight: 24,
      letterSpacing: 0.5,
    },
    buttonSmall: {
      fontSize: 13,
      fontWeight: '600' as const,
      lineHeight: 18,
      letterSpacing: 0.5,
    },
  },
} as const;

export type Typography = typeof typography;