/**
 * AppContainer Component
 * Layout container with theme support
 */

import React from 'react';
import { View, ViewProps, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme';

export interface AppContainerProps extends ViewProps {
  children: React.ReactNode;
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  backgroundColor?: string;
  style?: ViewStyle;
}

export const AppContainer: React.FC<AppContainerProps> = ({
  children,
  padding = 'md',
  backgroundColor,
  style,
  ...props
}) => {
  const theme = useTheme();

  const getPadding = (): number => {
    switch (padding) {
      case 'none': return 0;
      case 'xs': return theme.spacing.xs;
      case 'sm': return theme.spacing.sm;
      case 'lg': return theme.spacing.lg;
      case 'xl': return theme.spacing.xl;
      default: return theme.spacing.md;
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          padding: getPadding(),
          backgroundColor: backgroundColor || theme.colors.background.primary,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});