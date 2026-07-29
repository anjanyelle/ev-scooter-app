/**
 * AuthHeader Component
 * Glass-styled Back button for auth screens
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme';
import { AppIcon } from '../../atoms/AppIcon';

export interface AuthHeaderProps {
  onBackPress?: () => void;
  showBackButton?: boolean;
  style?: ViewStyle;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({
  onBackPress,
  showBackButton = true,
  style,
}) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, style]}>
      {showBackButton && (
        <TouchableOpacity
          onPress={onBackPress}
          style={[
            styles.backButton,
            {
              backgroundColor: theme.colors.glass.background,
              borderColor: theme.colors.glass.border,
              borderRadius: 16,
            }
          ]}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <AppIcon name="chevron-left" size={24} color="secondary" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    zIndex: 10, // Ensure it sits above hero elements
  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
});