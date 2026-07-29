/**
 * Theme Sizes
 * Component size definitions for the EV Scooter app
 */

export const sizes = {
  // Icon sizes
  icon: {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
    xxl: 40,
    xxxl: 48,
  },

  // Button sizes
  button: {
    sm: {
      height: 36,
      paddingHorizontal: 16,
    },
    md: {
      height: 44,
      paddingHorizontal: 20,
    },
    lg: {
      height: 52,
      paddingHorizontal: 24,
    },
  },

  // Input sizes
  input: {
    sm: {
      height: 36,
      paddingHorizontal: 12,
    },
    md: {
      height: 44,
      paddingHorizontal: 16,
    },
    lg: {
      height: 52,
      paddingHorizontal: 16,
    },
  },

  // Avatar sizes
  avatar: {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
    xxl: 80,
  },

  // Image sizes
  image: {
    thumbnail: 48,
    small: 80,
    medium: 120,
    large: 200,
    xlarge: 300,
    full: '100%',
  },

  // Component heights
  component: {
    tabBar: 56,
    header: 56,
    listItem: 56,
    card: 'auto',
  },
} as const;

export type Sizes = typeof sizes;
