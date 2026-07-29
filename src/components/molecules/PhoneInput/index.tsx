/**
 * PhoneInput Component
 * Country code + phone number input
 */

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '../../../theme';
import { AppText } from '../../atoms/AppText';
import { AppInput } from '../../atoms/AppInput';
import { AppIcon } from '../../atoms/AppIcon';

export interface PhoneInputProps {
  label?: string;
  error?: string;
  phoneNumber: string;
  countryCode: string;
  onPhoneNumberChange: (phone: string) => void;
  onCountryCodeChange: (code: string) => void;
  onCountryCodePress?: () => void;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  label,
  error,
  phoneNumber,
  countryCode,
  onPhoneNumberChange,
  onCountryCodeChange,
  onCountryCodePress,
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
        <TouchableOpacity
          style={styles.countryCodeContainer}
          onPress={onCountryCodePress}
          disabled={!onCountryCodePress}
        >
          <AppText variant="bodyMedium" color="primary">
            {countryCode}
          </AppText>
          {onCountryCodePress && (
            <AppIcon name="chevron-down" size={20} color="secondary" />
          )}
        </TouchableOpacity>
        <View style={styles.divider} />
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.phoneInput, { color: theme.colors.text.primary }]}
            value={phoneNumber}
            onChangeText={onPhoneNumberChange}
            placeholder="Enter mobile number"
            placeholderTextColor={theme.colors.text.muted}
            keyboardType="phone-pad"
          />
          <AppIcon name="cellphone-outline" size={20} color="tertiary" style={styles.rightIcon} />
        </View>
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
    minHeight: 52,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 4,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 8,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16,
  },
  phoneInput: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    fontSize: 15,
  },
  rightIcon: {
    marginLeft: 8,
  },
  error: {
    marginTop: 6,
  },
});