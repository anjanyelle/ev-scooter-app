/**
 * Theme Spacing
 * Consistent spacing scale for the EV Scooter app
 */

export const spacing = {
  // Base spacing units (4px base)
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
  massive: 48,
  giant: 64,

  // Semantic spacing
  screenPadding: 20,
  cardPadding: 16,
  buttonPadding: 16,
  inputPadding: 14,

  // Component-specific spacing
  iconSpacing: 12,
  elementGap: 16,
  sectionGap: 24,
  screenGap: 32,

  // Layout spacing
  headerHeight: 60,
  footerHeight: 80,
  tabBarHeight: 70,
  bottomSheetHeight: 400,

  // Border radius spacing
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
    full: 9999,
  },
} as const;

export type Spacing = typeof spacing;