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
      accessibilityLabel="Need Help?"
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <AppIcon name="headphones" size={24} color="primary" />
        </View>
        <View style={styles.textContainer}>
          <AppText variant="bodyLarge" color="primary" style={styles.title}>
            Need Help?
          </AppText>
        </View>
        <AppIcon name="chevron-right" size={24} color="secondary" />
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
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    paddingRight: 36, // offset icon width to truly center the text
  },
  title: {
    fontWeight: '500',
  },
});