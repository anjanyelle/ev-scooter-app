/**
 * AppInput — Text input with design system styling
 * Supports prefix, suffix icons, error states, and labels
 */

import React, {useState, useRef} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {Colors, FontSize, Spacing, BorderRadius} from '../../theme';
import {AppText} from './AppText';
import {AppIcon} from './AppIcon';
import type {IconLibrary} from './AppIcon';

interface AppInputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  hint?: string;
  error?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  suffixIcon?: string;
  suffixIconLibrary?: IconLibrary;
  onSuffixPress?: () => void;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
}

export const AppInput: React.FC<AppInputProps> = ({
  label,
  hint,
  error,
  prefix,
  suffix,
  suffixIcon,
  suffixIconLibrary = 'ionicons',
  onSuffixPress,
  containerStyle,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const borderColor = error
    ? Colors.error
    : isFocused
    ? Colors.activeBorder
    : Colors.border;

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && (
        <AppText variant="caption" style={styles.label}>
          {label}
        </AppText>
      )}
      <View style={[styles.inputRow, {borderColor}]}>
        {prefix && <View style={styles.prefix}>{prefix}</View>}
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholderTextColor={Colors.textMuted}
          selectionColor={Colors.primary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
        {(suffix || suffixIcon) && (
          <TouchableOpacity
            onPress={onSuffixPress}
            disabled={!onSuffixPress}
            style={styles.suffix}>
            {suffix ||
              (suffixIcon && (
                <AppIcon
                  name={suffixIcon}
                  library={suffixIconLibrary}
                  size={20}
                  color={Colors.iconMuted}
                />
              ))}
          </TouchableOpacity>
        )}
      </View>
      {hint && !error && (
        <AppText variant="small" style={styles.hint}>
          {hint}
        </AppText>
      )}
      {error && (
        <AppText variant="small" color={Colors.error} style={styles.hint}>
          {error}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: Spacing.xxs,
  },
  label: {
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.input,
    borderWidth: 1,
    paddingHorizontal: Spacing.md,
    height: 54,
  },
  prefix: {
    marginRight: Spacing.xs,
  },
  input: {
    flex: 1,
    fontSize: FontSize.body,
    color: Colors.textBody,
    height: '100%',
  },
  suffix: {
    marginLeft: Spacing.xs,
  },
  hint: {
    marginTop: 4,
    marginLeft: 4,
  },
});
