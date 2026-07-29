/**
 * Login Screen
 * Main login screen with animations
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme';
import { AuthTemplate } from '../../../components/templates/AuthTemplate';
import { LoginForm } from '../../../components/organisms/LoginForm';
import { Spacer } from '../../../components/atoms/Spacer';

export interface LoginScreenProps {
  navigation: any;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  navigation,
}) => {
  const theme = useTheme();

  const handleLogin = (phone: string, password?: string) => {
    console.log('Login attempt:', { phone, password });
    // TODO: Implement login logic
    // navigation.replace('Dashboard');
  };

  const handleCreateAccount = () => {
    navigation.navigate('Registration');
  };

  const handleHelpPress = () => {
    console.log('Help pressed');
    // TODO: Implement help/support
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <AuthTemplate
      showHero={true}
      showHeader={true}
      title="Welcome Back"
      subtitle="Login to continue your ride experience"
      onBackPress={handleBackPress}
    >
      <View style={styles.formWrapper}>
        <Spacer size="lg" />
        <LoginForm
          mode="phone"
          onLogin={handleLogin}
          onCreateAccount={handleCreateAccount}
          onHelpPress={handleHelpPress}
          onForgotPassword={handleForgotPassword}
        />
      </View>
    </AuthTemplate>
  );
};

const styles = StyleSheet.create({
  formWrapper: {
    flex: 1,
  },
});