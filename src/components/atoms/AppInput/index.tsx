/**
 * AppInput Component
 * Text input with theme styling
 */

import React from 'react';
import { TextInput, TextInputProps, View, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme';
import { AppText } from '../AppText';
import { AppIcon } from '../AppIcon';

export interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: string;
  rightIcon?: string;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
}

export const AppInput: React.FC<AppInputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onLeftIconPress,
  onRightIconPress,
  style,
  ...props
}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {label && (
        <AppText variant="labelMedium" color="secondary" style={styles.label}>
          {label}
        </AppText>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            borderRadius: theme.radius.input,
            borderColor: error ? theme.colors.accent.error : theme.colors.glass.border,
            backgroundColor: theme.colors.glass.background,
          },
        ]}
      >
        {leftIcon && (
          <AppIcon
            name={leftIcon}
            size={20}
            color="tertiary"
            style={styles.leftIcon}
            onPress={onLeftIconPress}
          />
        )}
        <TextInput
          style={[
            styles.input,
            {
              color: theme.colors.text.primary,
            },
            style,
          ]}
          placeholderTextColor={theme.colors.text.muted}
          accessibilityLabel={label || 'Input field'}
          accessibilityRole="text"
          testID={props.testID || 'app-input'}
          {...props}
        />
        {rightIcon && (
          <AppIcon
            name={rightIcon}
            size={20}
            color="tertiary"
            style={styles.rightIcon}
            onPress={onRightIconPress}
          />
        )}
      </View>
      {error && (
        <AppText variant="caption" color="error" style={styles.error}>
          {error}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 16,
    minHeight: 52,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 14,
  },
  leftIcon: {
    marginRight: 12,
  },
  rightIcon: {
    marginLeft: 12,
  },
  error: {
    marginTop: 6,
  },
});