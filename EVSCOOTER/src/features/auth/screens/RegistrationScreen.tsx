/**
 * RegistrationScreen — New user registration
 */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export const RegistrationScreen: React.FC<Props> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleRegister = () => {
    if (name && email && phone.length >= 10) {
      navigation.navigate('OTP', {phoneNumber: phone, isRegistering: true});
    }
  };

  const isValid = name.trim() && email.includes('@') && phone.length >= 10;

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

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scroll}>
          <View style={styles.content}>
            <View style={styles.titleBlock}>
              <AppText variant="h1">Create Account</AppText>
              <AppText variant="body" style={styles.subtitle}>
                Join Lexicon and start your electric journey
              </AppText>
            </View>

            <View style={styles.form}>
              <AppInput
                label="Full Name"
                placeholder="Enter your full name"
                value={name}
                onChangeText={setName}
                suffixIcon="person-outline"
              />
              <AppInput
                label="Email Address"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                suffixIcon="mail-outline"
              />
              <AppInput
                label="Mobile Number"
                placeholder="Enter 10-digit mobile number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                maxLength={10}
                suffixIcon="phone-portrait-outline"
                prefix={
                  <AppText variant="body" weight="semiBold" color={Colors.textHeading}>
                    +91
                  </AppText>
                }
              />
            </View>

            <AppButton
              label="Create Account"
              onPress={handleRegister}
              icon="arrow-forward"
              iconLibrary="ionicons"
              disabled={!isValid}
            />

            <View style={styles.loginRow}>
              <AppText variant="body" color={Colors.textSecondary}>
                Already have an account?{' '}
              </AppText>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <AppText variant="body" color={Colors.primary} style={styles.loginLink}>
                  Login
                </AppText>
              </TouchableOpacity>
            </View>

            <AppText variant="small" style={styles.terms}>
              By creating an account, you agree to our{' '}
              <AppText variant="small" color={Colors.primary}>Terms of Service</AppText>
              {' '}and{' '}
              <AppText variant="small" color={Colors.primary}>Privacy Policy</AppText>
            </AppText>
          </View>
        </ScrollView>
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
  scroll: {flexGrow: 1},
  content: {
    paddingHorizontal: Spacing.xxl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.huge,
    gap: Spacing.xxl,
  },
  titleBlock: {
    gap: Spacing.xs,
  },
  subtitle: {
    color: Colors.textSecondary,
  },
  form: {
    gap: Spacing.md,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -Spacing.md,
  },
  loginLink: {
    fontWeight: '600',
  },
  terms: {
    textAlign: 'center',
    color: Colors.textMuted,
    lineHeight: 18,
  },
});
