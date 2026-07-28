/**
 * HelpCard Component
 * Help/support card component
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme';
import { AppText } from '../../atoms/AppText';
import { AppIcon } from '../../atoms/AppIcon';

export interface HelpCardProps {
  onPress: () => void;
  style?: ViewStyle;
}

export const HelpCard: React.FC<HelpCardProps> = ({
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
        <View style={styles.iconContainer}>
          <AppIcon name="help-circle-outline" size={24} color="primary" />
        </View>
        <View style={styles.textContainer}>
          <AppText variant="labelMedium" color="primary" style={styles.title}>
            Need Help?
          </AppText>
          <AppText variant="bodySmall" color="secondary" style={styles.subtitle}>
            Contact our support team
          </AppText>
        </View>
        <AppIcon name="arrow-right" size={20} color="tertiary" />
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
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
  },
});