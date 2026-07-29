/**
 * SearchBar — Destination/search input molecule
 */
import React from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, ViewStyle} from 'react-native';
import {Colors, FontSize, Spacing, BorderRadius} from '../../theme';
import {AppIcon} from '../atoms/AppIcon';

interface SearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  onMicPress?: () => void;
  onPress?: () => void;
  editable?: boolean;
  style?: ViewStyle;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search Destination',
  onMicPress,
  onPress,
  editable = true,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={!editable ? onPress : undefined}
      activeOpacity={editable ? 1 : 0.8}
      style={[styles.container, style]}>
      <AppIcon name="search" library="feather" size={18} color={Colors.iconMuted} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.textMuted}
        editable={editable}
        style={styles.input}
        selectionColor={Colors.primary}
      />
      {onMicPress && (
        <TouchableOpacity onPress={onMicPress}>
          <AppIcon name="mic" library="feather" size={18} color={Colors.iconMuted} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.input,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    height: 50,
    gap: Spacing.xs,
  },
  input: {
    flex: 1,
    fontSize: FontSize.body,
    color: Colors.textBody,
    height: '100%',
  },
});
