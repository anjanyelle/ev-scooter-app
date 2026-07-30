/**
 * ForgotPassword Screen
 * Password reset screen scaffold
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';
import { AuthTemplate } from '../../../components/templates/AuthTemplate';
import { Spacer } from '../../../components/atoms/Spacer';
import { AppText } from '../../../components/atoms/AppText';
import { PrimaryButton } from '../../../components/molecules/PrimaryButton';

export interface ForgotPasswordScreenProps {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  navigation,
}) => {
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
      title="Forgot Password"
      subtitle="Enter your email or phone to reset your password"
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