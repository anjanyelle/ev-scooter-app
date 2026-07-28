/**
 * AppDivider Component
 * Horizontal or vertical divider with theme support
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme';

export interface AppDividerProps {
  orientation?: 'horizontal' | 'vertical';
  thickness?: number;
  color?: string;
  margin?: number;
  style?: ViewStyle;
}

export const AppDivider: React.FC<AppDividerProps> = ({
  orientation = 'horizontal',
  thickness = 1,
  color,
  margin = 16,
  style,
}) => {
  const theme = useTheme();

  const dividerStyle: ViewStyle = {
    backgroundColor: color || theme.colors.border.DEFAULT,
    ...(orientation === 'horizontal'
      ? { height: thickness, marginVertical: margin }
      : { width: thickness, marginHorizontal: margin }),
  };

  return <View style={[dividerStyle, style]} />;
};