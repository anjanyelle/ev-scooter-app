/**
 * StatCard — Compact metric display molecule
 */
import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {Colors, Spacing} from '../../theme';
import {AppText} from '../atoms/AppText';
import {AppIcon} from '../atoms/AppIcon';
import type {IconLibrary} from '../atoms/AppIcon';

interface StatCardProps {
  icon: string;
  iconLibrary?: IconLibrary;
  label: string;
  value: string;
  style?: ViewStyle;
  iconColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  iconLibrary = 'material',
  label,
  value,
  style,
  iconColor = Colors.primary,
}) => {
  return (
    <View style={[styles.container, style]}>
      <AppIcon name={icon} library={iconLibrary} size={22} color={iconColor} />
      <AppText variant="small" style={styles.label} numberOfLines={1}>
        {label}
      </AppText>
      <AppText variant="h4" style={styles.value} weight="bold">
        {value}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  label: {
    color: Colors.textMuted,
    textAlign: 'center',
  },
  value: {
    color: Colors.textHeading,
    textAlign: 'center',
  },
});
