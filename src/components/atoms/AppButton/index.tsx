/**
 * AppButton Component
 * Button with variants (primary, secondary, outline)
 */

import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme';
import { AppText } from '../AppText';

export interface AppButtonProps extends Omit<TouchableOpacityProps, 'children'> {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  onPress: () => void;
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onPress,
  style,
  ...props
}) => {
  const theme = useTheme();

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: theme.radius.button,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: disabled || loading ? 0.5 : 1,
    };

    if (variant === 'primary') {
      return {
        ...baseStyle,
        backgroundColor: theme.colors.primary.DEFAULT,
      };
    }

    if (variant === 'secondary') {
      return {
        ...baseStyle,
        backgroundColor: theme.colors.surface.elevated,
      };
    }

    if (variant === 'outline') {
      return {
        ...baseStyle,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.colors.primary.DEFAULT,
      };
    }

    return baseStyle;
  };

  const getTextColor = (): string => {
    if (variant === 'outline') {
      return theme.colors.primary.DEFAULT;
    }
    return theme.colors.text.inverse;
  };

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'small':
        return { paddingVertical: theme.spacing.sm, paddingHorizontal: theme.spacing.lg };
      case 'large':
        return { paddingVertical: theme.spacing.xl, paddingHorizontal: theme.spacing.xxl };
      default:
        return { paddingVertical: theme.spacing.md, paddingHorizontal: theme.spacing.xl };
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle(), getSizeStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      <AppText variant="button" color={variant === 'outline' ? 'primary' : 'inverse'}>
        {title}
      </AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
  },
});