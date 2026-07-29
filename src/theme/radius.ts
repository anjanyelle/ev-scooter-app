/**
 * Theme Border Radius
 * Border radius values for the EV Scooter app
 */

export const radius = {
  // Base radius values
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,

  // Component-specific radius
  input: 14,
  button: 16,
  card: 24,
  bottomSheet: 28,
  chip: 30,
  avatar: 9999,
  badge: 4,
  dialog: 16,
  modal: 24,
} as const;

export type Radius = typeof radius;