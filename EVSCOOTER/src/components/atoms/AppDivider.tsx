/**
 * AppDivider — Horizontal rule with optional label
 */
import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {Colors, Spacing} from '../../theme';
import {AppText} from './AppText';

interface AppDividerProps {
  label?: string;
  style?: ViewStyle;
  color?: string;
}

export const AppDivider: React.FC<AppDividerProps> = ({
  label,
  style,
  color = Colors.divider,
}) => {
  if (label) {
    return (
      <View style={[styles.row, style]}>
        <View style={[styles.line, {backgroundColor: color}]} />
        <AppText variant="caption" style={styles.label}>
          {label}
        </AppText>
        <View style={[styles.line, {backgroundColor: color}]} />
      </View>
    );
  }
  return <View style={[styles.full, {backgroundColor: color}, style]} />;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  line: {
    flex: 1,
    height: 1,
  },
  label: {
    color: Colors.textMuted,
  },
  full: {
    height: 1,
    width: '100%',
  },
});
