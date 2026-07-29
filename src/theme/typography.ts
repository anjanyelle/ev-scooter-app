/**
 * Theme Typography
 * Font families and text styles for the EV Scooter app
 */

export const typography = {
  // Font families
  fonts: {
    primary: 'Sora',
    secondary: 'Outfit',
    tertiary: 'Plus Jakarta Sans',
    regular: 'Sora-Regular',
    medium: 'Sora-Medium',
    semiBold: 'Sora-SemiBold',
    bold: 'Sora-Bold',
  },

  // Font sizes
  fontSize: {
    small: 12,
    caption: 13,
    body: 15,
    bodyLarge: 16,
    h4: 18,
    h3: 20,
    h2: 24,
    h1: 30,
    display: 34,
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
    wide: 0.2,
    wider: 0.5,
  },

  // Text styles
  styles: {
    // Headings
    h1: {
      fontFamily: 'Sora-Bold',
      fontSize: 30,
      fontWeight: '700' as const,
      lineHeight: 38,
      letterSpacing: -0.3,
    },
    h2: {
      fontFamily: 'Sora-Bold',
      fontSize: 24,
      fontWeight: '700' as const,
      lineHeight: 32,
      letterSpacing: -0.24,
    },
    h3: {
      fontFamily: 'Sora-Bold',
      fontSize: 20,
      fontWeight: '700' as const,
      lineHeight: 28,
      letterSpacing: -0.2,
    },
    h4: {
      fontFamily: 'Sora-Bold',
      fontSize: 18,
      fontWeight: '700' as const,
      lineHeight: 26,
      letterSpacing: -0.18,
    },

    // Body text
    bodyLarge: {
      fontFamily: 'Sora-Regular',
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 24,
      letterSpacing: 0,
    },
    bodyMedium: {
      fontFamily: 'Sora-Regular',
      fontSize: 15,
      fontWeight: '400' as const,
      lineHeight: 22,
      letterSpacing: 0,
    },
    bodySmall: {
      fontFamily: 'Sora-Regular',
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 18,
      letterSpacing: 0,
    },

    // Labels
    labelLarge: {
      fontFamily: 'Sora-Medium',
      fontSize: 15,
      fontWeight: '500' as const,
      lineHeight: 20,
      letterSpacing: 0,
    },
    labelMedium: {
      fontFamily: 'Sora-Medium',
      fontSize: 13,
      fontWeight: '500' as const,
      lineHeight: 18,
      letterSpacing: 0,
    },
    labelSmall: {
      fontFamily: 'Sora-Medium',
      fontSize: 11,
      fontWeight: '500' as const,
      lineHeight: 16,
      letterSpacing: 0,
    },

    // Captions
    caption: {
      fontFamily: 'Sora-Regular',
      fontSize: 13,
      fontWeight: '400' as const,
      lineHeight: 18,
      letterSpacing: 0,
    },

    // Button text
    button: {
      fontFamily: 'Sora-SemiBold',
      fontSize: 16,
      fontWeight: '600' as const,
      lineHeight: 24,
      letterSpacing: 0.2,
    },
    buttonSmall: {
      fontFamily: 'Sora-SemiBold',
      fontSize: 13,
      fontWeight: '600' as const,
      lineHeight: 18,
      letterSpacing: 0.2,
    },
  },
} as const;

export type Typography = typeof typography;