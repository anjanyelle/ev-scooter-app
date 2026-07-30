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
      style={[
        styles.container,
        {
          borderRadius: theme.radius.card,
          backgroundColor: theme.colors.glass.background,
          borderColor: theme.colors.glass.border,
          borderWidth: 1,
        },
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel="Create Account"
    >
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <AppText variant="bodyMedium" style={{ color: theme.colors.text.muted }}>
            Don't have an account?
          </AppText>
          <View style={styles.linkContainer}>
            <AppText variant="bodyLarge" style={{ color: theme.colors.primary.DEFAULT, fontWeight: '600' }}>
              Create Account
            </AppText>
            <AppIcon name="arrow-right" size={20} color="primary" style={styles.arrow} />
          </View>
        </View>
        <View style={[styles.iconButton, { borderColor: theme.colors.border.DEFAULT }]}>
          <AppIcon name="account-plus-outline" size={24} color="primary" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  textContainer: {
    gap: 4,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    marginLeft: 4,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});