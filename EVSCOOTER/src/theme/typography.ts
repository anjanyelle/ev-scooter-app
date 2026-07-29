/**
 * Lexicon EV Scooter — Typography System
 * Primary: Sora | Secondary: Outfit | Tertiary: Plus Jakarta Sans
 */

export const FontFamily = {
  primary: 'Sora',
  secondary: 'Outfit',
  tertiary: 'PlusJakartaSans',
  // System fallbacks
  bold: 'Sora-Bold',
  semiBold: 'Sora-SemiBold',
  regular: 'Sora-Regular',
} as const;

export const FontSize = {
  display: 34,
  h1: 30,
  h2: 24,
  h3: 20,
  h4: 18,
  bodyLarge: 16,
  body: 15,
  caption: 13,
  small: 12,
  xs: 10,
} as const;

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
  extraBold: '800' as const,
} as const;

export const LineHeight = {
  display: 42,
  h1: 38,
  h2: 32,
  h3: 28,
  h4: 26,
  bodyLarge: 24,
  body: 22,
  caption: 20,
  small: 18,
} as const;

export const LetterSpacing = {
  heading: -0.3,
  body: 0,
  button: 0.2,
  caps: 0.8,
} as const;
