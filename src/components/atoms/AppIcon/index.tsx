/**
 * AppIcon Component
 * Vector icon wrapper with theme support
 */

import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme';

export interface AppIconProps {
  name: string;
  size?: number;
  color?: 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'success' | 'warning' | 'error' | 'info' | string;
  onPress?: () => void;
  style?: ViewStyle;
}

export const AppIcon: React.FC<AppIconProps> = ({
  name,
  size = 24,
  color = 'tertiary',
  onPress,
  style,
}) => {
  const theme = useTheme();

  const getColor = (): string => {
    if (color === 'primary') return theme.colors.primary.DEFAULT;
    if (color === 'secondary') return theme.colors.text.secondary;
    if (color === 'tertiary') return theme.colors.text.muted;
    if (color === 'inverse') return theme.colors.background.primary;
    if (color === 'success') return theme.colors.accent.success;
    if (color === 'warning') return theme.colors.accent.warning;
    if (color === 'error') return theme.colors.accent.error;
    if (color === 'info') return theme.colors.accent.info;
    return color; // Custom color string
  };

  const iconElement = (
    <Icon
      name={name}
      size={size}
      color={getColor()}
      style={style}
    />
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {iconElement}
      </TouchableOpacity>
    );
  }

  return iconElement;
};