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
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  disabled = false,
  loading = false,
  onPress,
  style,
  ...props
}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={style}
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
          },
        ]}
      >
        <AppText variant="button" color="inverse">
          {title}
        </AppText>
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
    minHeight: 52,
  },
});