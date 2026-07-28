/**
 * OTP Screen
 * OTP verification screen scaffold
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme';
import { AuthTemplate } from '../../../components/templates/AuthTemplate';
import { Spacer } from '../../../components/atoms/Spacer';
import { AppText } from '../../../components/atoms/AppText';
import { PrimaryButton } from '../../../components/molecules/PrimaryButton';

export interface OTPScreenProps {
  navigation: any;
}

export const OTPScreen: React.FC<OTPScreenProps> = ({
  navigation,
}) => {
  const theme = useTheme();

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
      showWelcome={true}
      title="Verify OTP"
      subtitle="Enter the code sent to your phone"
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