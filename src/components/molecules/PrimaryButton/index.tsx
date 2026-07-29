/**
 * PrimaryButton Component
 * Themed primary button with gradient and shadow
 */

import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { useTheme } from '../../../theme';
import { AppText } from '../../atoms/AppText';

export interface PrimaryButtonProps extends Omit<TouchableOpacityProps, 'children'> {
  title: string;
  disabled?: boolean;
  loading?: boolean;
  onPress: () => void;
  style?: ViewStyle;
  showArrow?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  disabled = false,
  loading = false,
  onPress,
  style,
  showArrow = true,
  ...props
}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={style}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      {...props}
    >
      <LinearGradient
        colors={[...theme.gradients.button.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.button,
          {
            borderRadius: theme.radius.button,
            opacity: disabled || loading ? 0.5 : 1,
            shadowColor: theme.colors.primary.glow,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.8,
            shadowRadius: 15,
            elevation: 8,
          },
        ]}
      >
        <AppText variant="button" style={{ color: theme.colors.background.primary }}>
          {title}
        </AppText>
        {showArrow && (
          <AppText variant="button" style={[styles.arrow, { color: theme.colors.background.primary }]}>
            →
          </AppText>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    minHeight: 52,
  },
  arrow: {
    marginLeft: 8,
  },
});