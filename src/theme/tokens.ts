import type { TextStyle, ViewStyle } from 'react-native';

export const colors = {
  background: '#050505',
  surface: '#0D0D0D',
  card: '#171717',
  cardHover: '#202020',
  secondaryCard: '#111111',
  primary: '#B8DC00',
  primaryHover: '#A4C800',
  primaryLight: '#D6F94D',
  primaryDark: '#8DA700',
  success: '#72E000',
  warning: '#FFC857',
  error: '#FF5A5F',
  info: '#38BDF8',
  heading: '#FFFFFF',
  body: '#D8D8D8',
  secondary: '#A5A5A5',
  muted: '#707070',
  disabled: '#555555',
  border: '#262626',
  divider: '#1E1E1E',
  glassBg: 'rgba(255,255,255,0.05)',
  glassBorder: 'rgba(255,255,255,0.08)',
  black: '#000000'
} as const;

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  huge: 48,
  giant: 64
} as const;

export const radii = {
  button: 16,
  card: 24,
  input: 14,
  sheet: 28,
  chip: 30,
  round: 999
} as const;

export const fonts = {
  regular: 'sans-serif',
  medium: 'sans-serif-medium',
  semibold: 'sans-serif-medium',
  bold: 'sans-serif-medium',
  display: 'sans-serif-medium',
  numeric: 'sans-serif-medium'
} as const;

export const fontSizes = {
  display: 34,
  h1: 30,
  h2: 24,
  h3: 20,
  h4: 18,
  bodyLarge: 16,
  body: 15,
  caption: 13,
  small: 12,
  tiny: 10
} as const;

export const shadows = {
  card: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 10
  } satisfies ViewStyle,
  primaryGlow: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 13,
    elevation: 12
  } satisfies ViewStyle
} as const;

export const typography = {
  display: {
    fontFamily: fonts.display,
    fontSize: fontSizes.display,
    color: colors.heading,
    letterSpacing: -0.34
  } satisfies TextStyle,
  h1: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.h1,
    color: colors.heading,
    letterSpacing: -0.3
  } satisfies TextStyle,
  h2: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.h2,
    color: colors.heading,
    letterSpacing: -0.24
  } satisfies TextStyle,
  h3: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.h3,
    color: colors.heading,
    letterSpacing: -0.2
  } satisfies TextStyle,
  h4: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.h4,
    color: colors.heading,
    letterSpacing: -0.18
  } satisfies TextStyle,
  body: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.body,
    color: colors.body,
    lineHeight: 22
  } satisfies TextStyle,
  bodyLarge: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.bodyLarge,
    color: colors.body,
    lineHeight: 24
  } satisfies TextStyle,
  caption: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.caption,
    color: colors.secondary,
    lineHeight: 18
  } satisfies TextStyle,
  small: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.small,
    color: colors.muted,
    lineHeight: 16
  } satisfies TextStyle,
  button: {
    fontFamily: fonts.semibold,
    fontSize: fontSizes.body,
    letterSpacing: 0.2
  } satisfies TextStyle
} as const;

export const layout = {
  screenPadding: 16,
  contentMaxWidth: 720,
  bottomTabHeight: 76
} as const;
