/**
 * AppHeader — Top navigation bar organism
 * Reused across all main screens
 */
import React from 'react';
import {View, TouchableOpacity, StyleSheet, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, Spacing, IconSize, BorderRadius} from '../../theme';
import {AppText} from '../atoms/AppText';
import {AppIcon} from '../atoms/AppIcon';

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightElements?: React.ReactNode;
  style?: ViewStyle;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  onBack,
  rightElements,
  style,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.header,
        {paddingTop: insets.top + Spacing.sm},
        style,
      ]}>
      {showBack ? (
        <TouchableOpacity
          onPress={onBack}
          activeOpacity={0.7}
          style={styles.backBtn}>
          <AppIcon name="arrow-back" library="ionicons" size={IconSize.md} color={Colors.textHeading} />
        </TouchableOpacity>
      ) : (
        <View style={styles.leftPlaceholder} />
      )}
      <View style={styles.titleBlock}>
        <AppText variant="h3">{title}</AppText>
        {subtitle && (
          <AppText variant="small" style={styles.subtitle}>
            {subtitle}
          </AppText>
        )}
      </View>
      <View style={styles.rightBlock}>{rightElements}</View>
    </View>
  );
};

interface IconButtonProps {
  icon: string;
  onPress?: () => void;
  badge?: boolean;
}

export const HeaderIconButton: React.FC<IconButtonProps> = ({icon, onPress, badge}) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={headerBtnStyles.btn}>
    <AppIcon name={icon} library="ionicons" size={IconSize.sm + 2} color={Colors.textHeading} />
    {badge && <View style={headerBtnStyles.badge} />}
  </TouchableOpacity>
);

const headerBtnStyles = StyleSheet.create({
  btn: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.glassBg,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.error,
    borderWidth: 1.5,
    borderColor: Colors.background,
  },
});

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.md,
    gap: Spacing.sm,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.glassBg,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftPlaceholder: {
    width: 36,
  },
  titleBlock: {
    flex: 1,
    gap: 2,
  },
  rightBlock: {
    flexDirection: 'row',
    gap: Spacing.xs,
    alignItems: 'center',
  },
  subtitle: {
    color: Colors.textMuted,
  },
});
