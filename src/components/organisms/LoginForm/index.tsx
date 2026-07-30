/**
 * LoginForm Component
 * Configurable login form for different auth modes
 */

import React, { useState } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme';
import { AppText } from '../../atoms/AppText';
import { AppInput } from '../../atoms/AppInput';
import { PhoneInput } from '../../molecules/PhoneInput';
import { PrimaryButton } from '../../molecules/PrimaryButton';
import { OrDivider } from '../../molecules/OrDivider';
import { CreateAccountCard } from '../../molecules/CreateAccountCard';
import { HelpCard } from '../../molecules/HelpCard';
import { FooterSecurity } from '../../molecules/FooterSecurity';

export type AuthMode = 'phone' | 'password' | 'otp';

export interface LoginFormProps {
  mode?: AuthMode;
  onLogin: (phone: string, password?: string) => void;
  onCreateAccount: () => void;
  onHelpPress: () => void;
  onForgotPassword: () => void;
  style?: ViewStyle;
}

export const LoginForm: React.FC<LoginFormProps> = React.memo(({
  mode = 'phone',
  onLogin,
  onCreateAccount,
  onHelpPress,
  onForgotPassword,
  style,
}) => {
  const theme = useTheme();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    phone?: string;
    password?: string;
  }>({});

  const isPasswordMode = mode === 'password';

  const validateForm = (): boolean => {
    const newErrors: {
      phone?: string;
      password?: string;
    } = {};

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (isPasswordMode) {
      if (!password.trim()) {
        newErrors.password = 'Password is required';
      } else if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (validateForm()) {
      onLogin(phone, isPasswordMode ? password : undefined);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.formCard,
          {
            backgroundColor: theme.colors.glass.background,
            borderColor: theme.colors.glass.border,
          },
        ]}
      >
        {/* Mobile Number */}
        <View style={styles.inputGroup}>
          <AppText
            variant="labelMedium"
            color="secondary"
            style={styles.label}
          >
            Mobile Number
          </AppText>

          <PhoneInput
            phoneNumber={phone}
            countryCode={countryCode}
            onPhoneNumberChange={setPhone}
            onCountryCodeChange={setCountryCode}
            onCountryCodePress={() => {}}
            error={errors.phone}
          />

          {!isPasswordMode && (
            <View style={styles.helperContainer}>
              <AppText
                variant="caption"
                style={{ color: theme.colors.accent.success }}
              >
                ✓ Use your registered mobile number
              </AppText>
            </View>
          )}
        </View>

        {/* Password */}
        {isPasswordMode && (
          <View style={styles.inputGroup}>
            <AppInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              leftIcon="lock-outline"
              rightIcon={
                showPassword
                  ? 'eye-off-outline'
                  : 'eye-outline'
              }
              onRightIconPress={() =>
                setShowPassword(!showPassword)
              }
              error={errors.password}
            />

            <View style={styles.forgotPasswordContainer}>
              <AppText
                variant="labelMedium"
                color="primary"
                onPress={onForgotPassword}
              >
                Forgot Password?
              </AppText>
            </View>
          </View>
        )}

        {/* Button */}
        <PrimaryButton
          title={isPasswordMode ? 'Sign In' : 'Continue'}
          onPress={handleLogin}
          showArrow
          style={styles.button}
        />

        {/* Divider */}
        <OrDivider />

        {/* Create Account */}
        <CreateAccountCard onPress={onCreateAccount} />

        {/* Help */}
        <HelpCard onPress={onHelpPress} />

        {/* Footer */}
        <FooterSecurity />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

  formCard: {
    // marginTop: -35,
    borderWidth: 1,
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 24,
  },

  inputGroup: {
    marginBottom: 24,
  },

  label: {
    marginBottom: 12,
  },

  helperContainer: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },

  button: {
    marginTop: 8,
  },
});