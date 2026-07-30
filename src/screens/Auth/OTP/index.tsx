/**
 * OTP Screen
 * OTP verification screen scaffold
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/types';
import { AuthTemplate } from '../../../components/templates/AuthTemplate';
import { Spacer } from '../../../components/atoms/Spacer';
import { AppText } from '../../../components/atoms/AppText';
import { PrimaryButton } from '../../../components/molecules/PrimaryButton';

export interface OTPScreenProps {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'OTP'>;
}

export const OTPScreen: React.FC<OTPScreenProps> = ({
  navigation,
}) => {
  const handleVerifyOTP = () => {
    console.log('OTP verification attempt');
    // TODO: Implement OTP verification logic
    // navigation.replace('Dashboard');
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <AuthTemplate
      showHero={true}
      showHeader={true}
      title="Verify Account"
      subtitle="Enter the verification code sent to your phone"
      onBackPress={handleBackPress}
    >
      <View style={styles.formWrapper}>
        <Spacer size="lg" />
        
        {/* OTP input form will be implemented here */}
        <View style={styles.placeholder}>
          <AppText variant="bodyMedium" color="secondary" style={styles.placeholderText}>
            OTP verification form coming soon...
          </AppText>
        </View>

        <Spacer size="xxl" />
        <PrimaryButton title="Verify OTP" onPress={handleVerifyOTP} />
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