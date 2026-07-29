/**
 * Chip — Selectable filter chip component
 */
import React from 'react';
import {TouchableOpacity, StyleSheet, ViewStyle} from 'react-native';
import {Colors, Spacing, BorderRadius} from '../../theme';
import {AppText} from './AppText';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.chip,
        selected ? styles.selected : styles.unselected,
        style,
      ]}>
      <AppText
        variant="caption"
        style={[styles.label, selected ? styles.labelSelected : styles.labelUnselected]}>
        {label}
      </AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xxs + 2,
    borderRadius: BorderRadius.chip,
    borderWidth: 1,
  },
  selected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  unselected: {
    backgroundColor: Colors.transparent,
    borderColor: Colors.border,
  },
  label: {
    fontWeight: '600',
  },
  labelSelected: {
    color: Colors.btnPrimaryText,
  },
  labelUnselected: {
    color: Colors.textSecondary,
  },
});
