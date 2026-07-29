/**
 * LoginScreen — Mobile number entry screen
 * Matches the provided reference design exactly
 */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, Spacing, BorderRadius, FontSize, FontWeight} from '../../../theme';
import {AppText} from '../../../components/atoms/AppText';
import {AppButton} from '../../../components/atoms/AppButton';
import {AppInput} from '../../../components/atoms/AppInput';
import {AppDivider} from '../../../components/atoms/AppDivider';
import {AppIcon} from '../../../components/atoms/AppIcon';
import {BrandLogo} from '../../../components/atoms/BrandLogo';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {AuthStackParamList} from '../../../types';

const {width, height} = Dimensions.get('window');

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export const LoginScreen: React.FC<Props> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [phone, setPhone] = useState('');

  const handleContinue = () => {
    if (phone.trim().length >= 10) {
      navigation.navigate('OTP', {phoneNumber: phone});
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.kav}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <LinearGradient
        colors={['#050505', '#0C0F07', '#050505']}
        style={[styles.container]}>

        {/* ── Hero Section ── */}
        <View style={[styles.hero, {paddingTop: insets.top + Spacing.md}]}>
          <View style={styles.heroLeft}>
            <BrandLogo size="md" />
            <AppText variant="h1" style={styles.welcomeTitle}>
              Welcome Back
            </AppText>
            <AppText variant="body" style={styles.welcomeSubtitle}>
              Login to continue your{'\n'}ride experience
            </AppText>
          </View>
          {/* Scooter illustration placeholder (neon glow box) */}
          <View style={styles.scooterBox}>
            <LinearGradient
              colors={['rgba(184,220,0,0.08)', 'transparent']}
              style={styles.scooterGlow}>
              <AppIcon
                name="electric-scooter"
                library="material"
                size={100}
                color={Colors.primary}
              />
            </LinearGradient>
          </View>
        </View>

        {/* ── Form Card ── */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scroll}>
          <View style={styles.formCard}>

            {/* Phone input */}
            <AppText variant="caption" style={styles.inputLabel}>
              Mobile Number
            </AppText>
            <View style={styles.phoneRow}>
              {/* Country code */}
              <TouchableOpacity style={styles.countryCode} activeOpacity={0.7}>
                <AppText variant="body" weight="semiBold" style={styles.countryText}>
                  +91
                </AppText>
                <AppIcon name="chevron-down" library="ionicons" size={14} color={Colors.iconMuted} />
              </TouchableOpacity>
              {/* Number input */}
              <View style={styles.phoneInputWrap}>
                <AppInput
                  placeholder="Enter mobile number"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={phone}
                  onChangeText={setPhone}
                  suffixIcon="phone-portrait-outline"
                  containerStyle={styles.phoneInput}
                />
              </View>
            </View>

            {/* Hint */}
            <View style={styles.hintRow}>
              <AppIcon name="shield-checkmark-outline" library="ionicons" size={14} color={Colors.primary} />
              <AppText variant="small" style={styles.hintText}>
                Use your registered mobile number
              </AppText>
            </View>

            {/* Continue button */}
            <AppButton
              label="Continue"
              onPress={handleContinue}
              icon="arrow-forward"
              iconLibrary="ionicons"
              disabled={phone.length < 10}
              style={styles.continueBtn}
            />

            <AppDivider label="OR" style={styles.divider} />

            {/* Create account row */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.createAccountCard}
              onPress={() => navigation.navigate('Register')}>
              <View style={styles.createAccountText}>
                <AppText variant="small" style={styles.noAccountText}>
                  Don't have an account?
                </AppText>
                <AppText variant="body" style={styles.createAccountLabel}>
                  Create Account →
                </AppText>
              </View>
              <View style={styles.createAccountIcon}>
                <AppIcon name="person-add-outline" library="ionicons" size={24} color={Colors.primary} />
              </View>
            </TouchableOpacity>

            {/* Need Help row */}
            <TouchableOpacity activeOpacity={0.8} style={styles.helpCard}>
              <AppIcon name="headset-outline" library="ionicons" size={22} color={Colors.primary} />
              <AppText variant="body" style={styles.helpText}>
                Need Help?
              </AppText>
              <View style={styles.helpChevron}>
                <AppIcon name="chevron-forward" library="ionicons" size={18} color={Colors.iconMuted} />
              </View>
            </TouchableOpacity>

            {/* Footer */}
            <View style={styles.footer}>
              <AppIcon name="lock-closed-outline" library="ionicons" size={12} color={Colors.textMuted} />
              <AppText variant="small" style={styles.footerText}>
                Your data is safe and secure with{' '}
                <AppText variant="small" color={Colors.primary} style={styles.footerBrand}>
                  LEXICON Connect
                </AppText>
              </AppText>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  kav: {flex: 1},
  container: {flex: 1},
  hero: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.xxl,
    paddingBottom: Spacing.xl,
    alignItems: 'flex-end',
    minHeight: height * 0.32,
  },
  heroLeft: {
    flex: 1,
    gap: Spacing.xs,
  },
  welcomeTitle: {
    marginTop: Spacing.md,
    letterSpacing: -0.5,
  },
  welcomeSubtitle: {
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  scooterBox: {
    width: 130,
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scooterGlow: {
    width: 130,
    height: 130,
    borderRadius: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {flexGrow: 1},
  formCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderTopLeftRadius: BorderRadius.bottomSheet,
    borderTopRightRadius: BorderRadius.bottomSheet,
    paddingHorizontal: Spacing.xxl,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.huge,
    gap: Spacing.md,
    borderTopWidth: 1,
    borderColor: Colors.border,
  },
  inputLabel: {
    color: Colors.textSecondary,
    marginBottom: -Spacing.xs,
  },
  phoneRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
    alignItems: 'flex-start',
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.input,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    height: 54,
    gap: 4,
    minWidth: 72,
  },
  countryText: {
    color: Colors.textHeading,
  },
  phoneInputWrap: {
    flex: 1,
  },
  phoneInput: {
    flex: 1,
  },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xxs + 2,
    marginTop: -Spacing.xxs,
  },
  hintText: {
    color: Colors.textMuted,
  },
  continueBtn: {
    marginTop: Spacing.xxs,
  },
  divider: {
    marginVertical: Spacing.xxs,
  },
  createAccountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.card,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    justifyContent: 'space-between',
  },
  createAccountText: {
    gap: 2,
  },
  noAccountText: {
    color: Colors.textMuted,
  },
  createAccountLabel: {
    color: Colors.primary,
    fontWeight: FontWeight.semiBold,
  },
  createAccountIcon: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.sm,
    backgroundColor: 'rgba(184,220,0,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.card,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  helpText: {
    flex: 1,
    color: Colors.textBody,
    fontWeight: FontWeight.semiBold,
  },
  helpChevron: {},
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xxs + 2,
    marginTop: Spacing.xs,
    flexWrap: 'wrap',
  },
  footerText: {
    color: Colors.textMuted,
    textAlign: 'center',
  },
  footerBrand: {
    fontWeight: FontWeight.semiBold,
  },
});
