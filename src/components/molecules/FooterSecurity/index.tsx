/**
 * FooterSecurity Component
 * Security message footer for auth screens
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme';
import { AppText } from '../../atoms/AppText';
import { AppIcon } from '../../atoms/AppIcon';

export interface FooterSecurityProps {
  message?: string;
  style?: ViewStyle;
}

export const FooterSecurity: React.FC<FooterSecurityProps> = ({
  message = 'Your data is protected with end-to-end encryption',
  style,
}) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, style]}>
      <AppIcon name="lock-outline" size={16} color="tertiary" style={styles.icon} />
      <AppText variant="caption" color="tertiary" style={styles.text}>
        {message}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    textAlign: 'center',
    fontSize: 11,
  },
});