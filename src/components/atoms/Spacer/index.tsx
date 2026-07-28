/**
 * Spacer Component
 * Consistent spacing component
 */

import React from 'react';
import { View, ViewProps, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme';

export interface SpacerProps extends ViewProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl' | 'huge' | 'massive' | 'giant';
  vertical?: boolean;
  horizontal?: boolean;
  customSize?: number;
  style?: ViewStyle;
}

export const Spacer: React.FC<SpacerProps> = ({
  size = 'md',
  vertical = true,
  horizontal = false,
  customSize,
  style,
  ...props
}) => {
  const theme = useTheme();

  const getSpacing = (): number => {
    if (customSize !== undefined) return customSize;
    
    switch (size) {
      case 'xs': return theme.spacing.xs;
      case 'sm': return theme.spacing.sm;
      case 'md': return theme.spacing.md;
      case 'lg': return theme.spacing.lg;
      case 'xl': return theme.spacing.xl;
      case 'xxl': return theme.spacing.xxl;
      case 'xxxl': return theme.spacing.xxxl;
      case 'huge': return theme.spacing.huge;
      case 'massive': return theme.spacing.massive;
      case 'giant': return theme.spacing.giant;
      default: return theme.spacing.md;
    }
  };

  const spacing = getSpacing();

  const spacerStyle: ViewStyle = {
    ...(vertical && { height: spacing }),
    ...(horizontal && { width: spacing }),
  };

  return <View style={[spacerStyle, style]} {...props} />;
};