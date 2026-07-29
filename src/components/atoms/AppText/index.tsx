/**
 * AppText Component
 * Typography wrapper with theme support
 */

import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme';

export interface AppTextProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'bodyLarge' | 'bodyMedium' | 'bodySmall' | 'labelLarge' | 'labelMedium' | 'labelSmall' | 'caption' | 'button' | 'buttonSmall';
  color?: 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'success' | 'warning' | 'error' | 'info';
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  children: React.ReactNode;
}

export const AppText: React.FC<AppTextProps> = ({
  variant = 'bodyMedium',
  color = 'primary',
  align = 'auto',
  style,
  children,
  ...props
}) => {
  const theme = useTheme();

  const getColor = () => {
    if (color === 'success') return theme.colors.accent.success;
    if (color === 'warning') return theme.colors.accent.warning;
    if (color === 'error') return theme.colors.accent.error;
    if (color === 'info') return theme.colors.accent.info;
    if (color === 'tertiary') return theme.colors.text.muted;
    if (color === 'inverse') return theme.colors.background.primary;
    return theme.colors.text[color as 'primary' | 'secondary'];
  };

  const textStyle = [
    styles.base,
    theme.typography.styles[variant],
    {
      color: getColor(),
      textAlign: align,
    },
    style,
  ];

  return (
    <Text style={textStyle} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    fontSize: 15,
  },
});