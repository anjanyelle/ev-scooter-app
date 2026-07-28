/**
 * Theme Index
 * Central export for all theme values and ThemeProvider
 */

import React, { createContext, useContext, ReactNode } from 'react';
import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';
import { radius } from './radius';
import { gradients } from './gradients';
import { shadows } from './shadows';
import { icons } from './icons';

// Theme context type
export interface Theme {
  colors: typeof colors;
  spacing: typeof spacing;
  typography: typeof typography;
  radius: typeof radius;
  gradients: typeof gradients;
  shadows: typeof shadows;
  icons: typeof icons;
}

// Default theme
export const defaultTheme: Theme = {
  colors,
  spacing,
  typography,
  radius,
  gradients,
  shadows,
  icons,
};

// Theme context
const ThemeContext = createContext<Theme>(defaultTheme);

// Theme provider props
interface ThemeProviderProps {
  children: ReactNode;
  theme?: Partial<Theme>;
}

// Theme provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  theme: customTheme,
}) => {
  const theme = {
    ...defaultTheme,
    ...customTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Export all theme values
export { colors, spacing, typography, radius, gradients, shadows, icons };

// Export types
export type { Colors } from './colors';
export type { Spacing } from './spacing';
export type { Typography } from './typography';
export type { Radius } from './radius';
export type { Gradients } from './gradients';
export type { Shadows } from './shadows';
export type { Icons } from './icons';