/**
 * LoginForm Component
 * Complete login form with all molecules
 */

import React, { useState } from 'react';
import { View, StyleSheet, ViewStyle, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../../../theme';
import { AppText } from '../../atoms/AppText';
import { AppInput } from '../../atoms/AppInput';
import { PrimaryButton } from '../../molecules/PrimaryButton';
import { OrDivider } from '../../molecules/OrDivider';
import { CreateAccountCard } from '../../molecules/CreateAccountCard';
import { HelpCard } from '../../molecules/HelpCard';
import { FooterSecurity } from '../../molecules/FooterSecurity';

export interface LoginFormProps {
  onLogin: (phone: string, password: string) => void;
  onCreateAccount: () => void;
  onHelpPress: () => void;
  onForgotPassword: () => void;
  style?: ViewStyle;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onLogin,
  onCreateAccount,
  onHelpPress,
  onForgotPassword,
  style,
}) => {
  const theme = useTheme();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ phone?: string; password?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { phone?: string; password?: string } = {};

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (validateForm()) {
      onLogin(phone, password);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoid}
    >
      <View style={[styles.container, style]}>
        {/* Phone Input */}
        <AppInput
          label="Phone Number"
          placeholder="Enter your phone number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          autoCapitalize="none"
          leftIcon="phone-outline"
          error={errors.phone}
        />

        {/* Password Input */}
        <AppInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          leftIcon="lock-outline"
          rightIcon={showPassword ? 'eye-off-outline' : 'eye-outline'}
          onRightIconPress={() => setShowPassword(!showPassword)}
          error={errors.password}
        />

        {/* Forgot Password */}
        <View style={styles.forgotPasswordContainer}>
          <AppText variant="labelMedium" color="primary" onPress={onForgotPassword}>
            Forgot Password?
          </AppText>
        </View>

        {/* Login Button */}
        <PrimaryButton title="Sign In" onPress={handleLogin} />

        {/* OR Divider */}
        <OrDivider />

        {/* Create Account Card */}
        <CreateAccountCard onPress={onCreateAccount} />

        {/* Help Card */}
        <HelpCard onPress={onHelpPress} />

        {/* Footer Security */}
        <FooterSecurity />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: -8,
    marginBottom: 16,
  },
});