/**
 * MenuRow — Settings/profile menu item row molecule
 * Used in ProfileScreen settings list
 */
import React from 'react';
import {TouchableOpacity, View, StyleSheet, ViewStyle} from 'react-native';
import {Colors, Spacing, BorderRadius} from '../../theme';
import {AppText} from '../atoms/AppText';
import {AppIcon} from '../atoms/AppIcon';
import type {IconLibrary} from '../atoms/AppIcon';

interface MenuRowProps {
  icon: string;
  iconLibrary?: IconLibrary;
  label: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  iconColor?: string;
  labelColor?: string;
  showChevron?: boolean;
  style?: ViewStyle;
}

export const MenuRow: React.FC<MenuRowProps> = ({
  icon,
  iconLibrary = 'material',
  label,
  subtitle,
  onPress,
  rightElement,
  iconColor = Colors.primary,
  labelColor = Colors.textBody,
  showChevron = true,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.row, style]}>
      <View style={styles.iconBox}>
        <AppIcon name={icon} library={iconLibrary} size={20} color={iconColor} />
      </View>
      <View style={styles.textBox}>
        <AppText variant="body" style={{color: labelColor}}>
          {label}
        </AppText>
        {subtitle && (
          <AppText variant="small" style={styles.subtitle}>
            {subtitle}
          </AppText>
        )}
      </View>
      {rightElement || (showChevron && (
        <AppIcon
          name="chevron-right"
          library="ionicons"
          size={20}
          color={Colors.iconMuted}
        />
      ))}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    gap: Spacing.md,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.sm,
    backgroundColor: 'rgba(184,220,0,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBox: {
    flex: 1,
    gap: 2,
  },
  subtitle: {
    color: Colors.textMuted,
  },
});
