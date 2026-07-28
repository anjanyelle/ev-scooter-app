/**
 * WelcomeSection Component
 * Welcome heading + subtitle for auth screens
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme';
import { AppText } from '../../atoms/AppText';
import { Spacer } from '../../atoms/Spacer';

export interface WelcomeSectionProps {
  title?: string;
  subtitle?: string;
  style?: ViewStyle;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  title = 'Welcome Back',
  subtitle = 'Sign in to continue your journey',
  style,
}) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, style]}>
      <AppText variant="h2" color="primary" style={styles.title}>
        {title}
      </AppText>
      <Spacer size="sm" />
      <AppText variant="bodyMedium" color="secondary" style={styles.subtitle}>
        {subtitle}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 22,
  },
});