/**
 * GlassCard — Glassmorphism card molecule
 * rgba(255,255,255,0.05) bg, rgba(255,255,255,0.08) border, 24px radius
 */
import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {Colors, BorderRadius, Spacing} from '../../theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
  glowColor?: string;
  noBorder?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  padding = Spacing.xl,
  glowColor,
  noBorder = false,
}) => {
  return (
    <View
      style={[
        styles.card,
        {padding},
        glowColor
          ? {
              shadowColor: glowColor,
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 1,
              shadowRadius: 20,
              elevation: 10,
            }
          : styles.defaultShadow,
        noBorder && styles.noBorder,
        style,
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.glassBg,
    borderRadius: BorderRadius.card,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    overflow: 'hidden',
  },
  defaultShadow: {
    shadowColor: Colors.glassShadow,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 8,
  },
  noBorder: {
    borderWidth: 0,
  },
});
