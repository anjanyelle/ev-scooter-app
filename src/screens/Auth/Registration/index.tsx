/**
 * Registration Screen
 * User registration screen scaffold
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme';
import { AuthTemplate } from '../../../components/templates/AuthTemplate';
import { Spacer } from '../../../components/atoms/Spacer';
import { AppText } from '../../../components/atoms/AppText';
import { PrimaryButton } from '../../../components/molecules/PrimaryButton';

export interface RegistrationScreenProps {
  navigation: any;
}

export const RegistrationScreen: React.FC<RegistrationScreenProps> = ({
  navigation,
}) => {
  const theme = useTheme();

  const handleRegister = () => {
    console.log('Registration attempt');
    // TODO: Implement registration logic
    // navigation.navigate('OTP');
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <AuthTemplate
      showHero={true}
      showHeader={true}
      showWelcome={true}
      title="Create Account"
      subtitle="Join us and start your journey"
      onBackPress={handleBackPress}
    >
      <View style={styles.formWrapper}>
        <Spacer size="lg" />
        
        {/* Registration form will be implemented here */}
        <View style={styles.placeholder}>
          <AppText variant="bodyMedium" color="secondary" style={styles.placeholderText}>
            Registration form coming soon...
          </AppText>
        </View>

        <Spacer size="xxl" />
        <PrimaryButton title="Create Account" onPress={handleRegister} />
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