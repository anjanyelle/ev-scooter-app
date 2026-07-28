/**
 * ForgotPassword Screen
 * Password reset screen scaffold
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme';
import { AuthTemplate } from '../../../components/templates/AuthTemplate';
import { Spacer } from '../../../components/atoms/Spacer';
import { AppText } from '../../../components/atoms/AppText';
import { PrimaryButton } from '../../../components/molecules/PrimaryButton';

export interface ForgotPasswordScreenProps {
  navigation: any;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  navigation,
}) => {
  const theme = useTheme();

  const handleResetPassword = () => {
    console.log('Password reset attempt');
    // TODO: Implement password reset logic
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <AuthTemplate
      showHero={true}
      showHeader={true}
      showWelcome={true}
      title="Reset Password"
      subtitle="Enter your phone number to receive a reset code"
      onBackPress={handleBackPress}
    >
      <View style={styles.formWrapper}>
        <Spacer size="lg" />
        
        {/* Forgot password form will be implemented here */}
        <View style={styles.placeholder}>
          <AppText variant="bodyMedium" color="secondary" style={styles.placeholderText}>
            Password reset form coming soon...
          </AppText>
        </View>

        <Spacer size="xxl" />
        <PrimaryButton title="Send Reset Code" onPress={handleResetPassword} />
      </View>
    </AuthTemplate>
  );
};

const styles = StyleSheet.create({
  formWrapper: {
    flex: 1,
  },
  placeholder: {
    padding: 20,
    alignItems: 'center',
  },
  placeholderText: {
    textAlign: 'center',
  },
});