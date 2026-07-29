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
  style?: ViewStyle;
}

export const FooterSecurity: React.FC<FooterSecurityProps> = ({ style }) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, style]}>
      <AppIcon name="lock-outline" size={16} color="primary" style={styles.icon} />
      <AppText variant="caption" style={[styles.text, { color: theme.colors.text.secondary }]}>
        Your data is safe and secure with <AppText variant="caption" style={{ color: theme.colors.primary.DEFAULT }}>LEXICON Connect</AppText>
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
    fontSize: 12,
  },
});