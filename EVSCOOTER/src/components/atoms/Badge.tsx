/**
 * Badge — Status/label pill component
 */
import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {Colors, FontSize, Spacing, BorderRadius} from '../../theme';
import {AppText} from './AppText';
import type {BadgeVariant} from '../../types';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
  dot?: boolean;
}

const variantColors: Record<BadgeVariant, {bg: string; text: string; dot: string}> = {
  success: {
    bg: 'rgba(114,224,0,0.15)',
    text: Colors.success,
    dot: Colors.success,
  },
  warning: {
    bg: 'rgba(255,200,87,0.15)',
    text: Colors.warning,
    dot: Colors.warning,
  },
  error: {
    bg: 'rgba(255,90,95,0.15)',
    text: Colors.error,
    dot: Colors.error,
  },
  info: {
    bg: 'rgba(56,189,248,0.15)',
    text: Colors.info,
    dot: Colors.info,
  },
  default: {
    bg: Colors.glassBg,
    text: Colors.textSecondary,
    dot: Colors.textMuted,
  },
};

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  style,
  dot = false,
}) => {
  const {bg, text, dot: dotColor} = variantColors[variant];

  return (
    <View style={[styles.container, {backgroundColor: bg}, style]}>
      {dot && <View style={[styles.dot, {backgroundColor: dotColor}]} />}
      <AppText
        variant="small"
        style={[styles.label, {color: text}]}>
        {label}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xs,
    paddingVertical: 3,
    borderRadius: BorderRadius.chip,
    gap: 4,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  label: {
    fontWeight: '600',
  },
});
