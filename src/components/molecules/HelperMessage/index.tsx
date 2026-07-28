/**
 * HelperMessage Component
 * Message with icon for form validation and help text
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme';
import { AppText } from '../../atoms/AppText';
import { AppIcon } from '../../atoms/AppIcon';

export interface HelperMessageProps {
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  icon?: string;
  showIcon?: boolean;
  style?: ViewStyle;
}

export const HelperMessage: React.FC<HelperMessageProps> = ({
  message,
  type = 'info',
  icon,
  showIcon = true,
  style,
}) => {
  const theme = useTheme();

  const getIconName = (): string => {
    if (icon) return icon;
    switch (type) {
      case 'success': return 'check-circle-outline';
      case 'warning': return 'alert-outline';
      case 'error': return 'alert-circle-outline';
      default: return 'information-outline';
    }
  };

  const getColor = (): string => {
    switch (type) {
      case 'success': return theme.colors.accent.success;
      case 'warning': return theme.colors.accent.warning;
      case 'error': return theme.colors.accent.error;
      default: return theme.colors.accent.info;
    }
  };

  return (
    <View style={[styles.container, style]}>
      {showIcon && (
        <AppIcon
          name={getIconName()}
          size={16}
          color={getColor()}
          style={styles.icon}
        />
      )}
      <AppText variant="caption" color={type === 'error' ? 'error' : 'secondary'}>
        {message}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 6,
  },
  icon: {
    marginRight: 6,
    marginTop: 2,
  },
});