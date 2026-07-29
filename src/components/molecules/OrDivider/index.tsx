/**
 * OrDivider Component
 * "OR" divider with lines
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme';
import { AppText } from '../../atoms/AppText';

export interface OrDividerProps {
  text?: string;
  style?: ViewStyle;
}

export const OrDivider: React.FC<OrDividerProps> = ({
  text = 'OR',
  style,
}) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, style]} accessibilityRole="progressbar" accessibilityLabel="Divider">
      <View style={[styles.line, { backgroundColor: theme.colors.border.divider }]} />
      <AppText variant="labelMedium" style={[styles.text, { color: theme.colors.text.secondary }]}>
        {text}
      </AppText>
      <View style={[styles.line, { backgroundColor: theme.colors.border.divider }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  line: {
    flex: 1,
    height: 1,
  },
  text: {
    marginHorizontal: 16,
  },
});