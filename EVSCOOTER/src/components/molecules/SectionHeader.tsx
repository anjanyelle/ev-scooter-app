/**
 * SectionHeader — Section title + "See All" link molecule
 */
import React from 'react';
import {View, TouchableOpacity, StyleSheet, ViewStyle} from 'react-native';
import {Colors, Spacing} from '../../theme';
import {AppText} from '../atoms/AppText';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  style?: ViewStyle;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionLabel = 'See All',
  onAction,
  style,
}) => {
  return (
    <View style={[styles.row, style]}>
      <AppText variant="h4" weight="semiBold">
        {title}
      </AppText>
      {onAction && (
        <TouchableOpacity onPress={onAction} activeOpacity={0.7}>
          <AppText variant="caption" color={Colors.primary} style={styles.action}>
            {actionLabel}
          </AppText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  action: {
    fontWeight: '600',
  },
});
