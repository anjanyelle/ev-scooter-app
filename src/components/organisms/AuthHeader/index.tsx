/**
 * AuthHeader Component
 * Back button + BrandLogo for auth screens
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme';
import { BrandLogo } from '../../atoms/BrandLogo';
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
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <AppIcon name="arrow-left" size={24} color="primary" />
        </TouchableOpacity>
      )}
      <BrandLogo size="medium" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
});