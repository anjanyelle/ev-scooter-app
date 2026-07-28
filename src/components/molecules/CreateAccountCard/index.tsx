/**
 * CreateAccountCard Component
 * Navigation card for registration
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme';
import { AppText } from '../../atoms/AppText';
import { AppIcon } from '../../atoms/AppIcon';

export interface CreateAccountCardProps {
  onPress: () => void;
  style?: ViewStyle;
}

export const CreateAccountCard: React.FC<CreateAccountCardProps> = ({
  onPress,
  style,
}) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.container, style]}
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <AppText variant="bodyMedium" color="secondary" style={styles.title}>
            Don't have an account?
          </AppText>
          <AppText variant="bodyMedium" color="primary" style={styles.link}>
            Create Account
          </AppText>
        </View>
        <AppIcon name="arrow-right" size={20} color="primary" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 15,
  },
  link: {
    fontSize: 15,
    fontWeight: '600',
  },
});