/**
 * GlassCard Component
 * Glassmorphism card component with theme support
 */

import React from 'react';
import { View, ViewProps, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { useTheme } from '../../../theme';

export interface GlassCardProps extends ViewProps {
  children: React.ReactNode;
  intensity?: 'light' | 'medium' | 'heavy';
  borderRadius?: number;
  padding?: number;
  style?: ViewStyle;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  intensity = 'medium',
  borderRadius,
  padding = 16,
  style,
  ...props
}) => {
  const theme = useTheme();

  const getIntensityStyles = (): ViewStyle => {
    switch (intensity) {
      case 'light':
        return {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.1)',
        };
      case 'heavy':
        return {
          backgroundColor: 'rgba(30, 35, 73, 0.9)',
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.15)',
        };
      default:
        return {
          backgroundColor: 'rgba(30, 35, 73, 0.7)',
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.1)',
        };
    }
  };

  return (
    <LinearGradient
      colors={[...theme.gradients.card.glass]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        styles.card,
        getIntensityStyles(),
        {
          borderRadius: borderRadius || theme.radius.card,
          padding,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
});