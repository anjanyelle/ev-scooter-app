/**
 * ForgotPasswordScreen — Password recovery via mobile OTP
 */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, Spacing, BorderRadius} from '../../../theme';
import {AppText} from '../../../components/atoms/AppText';
import {AppButton} from '../../../components/atoms/AppButton';
import {AppInput} from '../../../components/atoms/AppInput';
import {AppIcon} from '../../../components/atoms/AppIcon';
import {BrandLogo} from '../../../components/atoms/BrandLogo';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {AuthStackParamList} from '../../../types';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

export const ForgotPasswordScreen: React.FC<Props> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [phone, setPhone] = useState('');

  const handleSend = () => {
    if (phone.length >= 10) {
      navigation.navigate('OTP', {phoneNumber: phone});
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.kav}>
      <LinearGradient colors={Colors.gradientHero} style={styles.container}>
        {/* Header */}
        <View style={[styles.header, {paddingTop: insets.top + Spacing.md}]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <AppIcon name="arrow-back" library="ionicons" size={20} color={Colors.textHeading} />
          </TouchableOpacity>
          <BrandLogo size="sm" />
        </View>

        <View style={styles.content}>
          <View style={styles.iconCircle}>
            <AppIcon name="key-outline" library="ionicons" size={36} color={Colors.primary} />
          </View>
          <AppText variant="h1" style={styles.title}>
            Forgot Password?
          </AppText>
          <AppText variant="body" style={styles.subtitle}>
            Enter your registered mobile number to{'\n'}receive a reset OTP
          </AppText>

          <AppInput
            placeholder="Enter mobile number"
            keyboardType="phone-pad"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
            suffixIcon="phone-portrait-outline"
            prefix={
              <AppText variant="body" weight="semiBold" color={Colors.textHeading}>
                +91
              </AppText>
            }
          />

          <AppButton
            label="Send Reset OTP"
            onPress={handleSend}
            icon="arrow-forward"
            iconLibrary="ionicons"
            disabled={phone.length < 10}
            style={styles.btn}
          />

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <AppText variant="body" style={styles.backToLogin}>
              Back to{' '}
              <AppText variant="body" color={Colors.primary} weight="semiBold">
                Login
              </AppText>
            </AppText>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  kav: {flex: 1},
  container: {flex: 1},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xxl,
    paddingBottom: Spacing.md,
    gap: Spacing.md,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.glassBg,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xxl,
    paddingTop: Spacing.xxl,
    alignItems: 'center',
    gap: Spacing.lg,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(184,220,0,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(184,220,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  title: {textAlign: 'center'},
  subtitle: {
    textAlign: 'center',
    color: Colors.textSecondary,
    lineHeight: 24,
    marginTop: -Spacing.xs,
  },
  btn: {width: '100%'},
  backToLogin: {
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
