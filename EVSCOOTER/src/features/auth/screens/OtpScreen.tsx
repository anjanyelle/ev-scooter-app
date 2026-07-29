/**
 * OtpScreen — OTP verification screen
 */
import React, {useState, useEffect, useCallback} from 'react';
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
import {AppIcon} from '../../../components/atoms/AppIcon';
import {BrandLogo} from '../../../components/atoms/BrandLogo';
import {OtpInput} from '../../../components/organisms/OtpInput';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {AuthStackParamList} from '../../../types';

type Props = NativeStackScreenProps<AuthStackParamList, 'OTP'>;

const OTP_TIMER = 60;

export const OtpScreen: React.FC<Props> = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const {phoneNumber} = route.params;
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(OTP_TIMER);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = useCallback(() => {
    setOtp('');
    setTimer(OTP_TIMER);
    setCanResend(false);
  }, []);

  const handleVerify = useCallback(() => {
    if (otp.length === 6) {
      // Navigate to main app (bypass auth)
      navigation.getParent()?.reset({
        index: 0,
        routes: [{name: 'Main'}],
      });
    }
  }, [otp, navigation]);

  const maskedPhone = `+91 XXXXX ${phoneNumber.slice(-5)}`;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.kav}>
      <LinearGradient colors={Colors.gradientHero} style={styles.container}>
        {/* Header */}
        <View style={[styles.header, {paddingTop: insets.top + Spacing.md}]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}>
            <AppIcon name="arrow-back" library="ionicons" size={20} color={Colors.textHeading} />
          </TouchableOpacity>
          <BrandLogo size="sm" />
        </View>

        <View style={styles.content}>
          {/* Icon */}
          <View style={styles.iconCircle}>
            <AppIcon name="phone-portrait-outline" library="ionicons" size={36} color={Colors.primary} />
          </View>

          {/* Titles */}
          <AppText variant="h1" style={styles.title}>
            Verify Mobile
          </AppText>
          <AppText variant="body" style={styles.subtitle}>
            We've sent a 6-digit OTP to{'\n'}
            <AppText variant="body" weight="semiBold" color={Colors.textHeading}>
              {maskedPhone}
            </AppText>
          </AppText>

          {/* OTP boxes */}
          <View style={styles.otpWrapper}>
            <OtpInput value={otp} onChange={setOtp} length={6} />
          </View>

          {/* Timer / Resend */}
          <View style={styles.resendRow}>
            {canResend ? (
              <TouchableOpacity onPress={handleResend}>
                <AppText variant="body" style={styles.resendActive}>
                  Resend OTP
                </AppText>
              </TouchableOpacity>
            ) : (
              <AppText variant="body" style={styles.timerText}>
                Resend in{' '}
                <AppText variant="body" weight="semiBold" color={Colors.primary}>
                  {timer}s
                </AppText>
              </AppText>
            )}
          </View>

          {/* Verify button */}
          <AppButton
            label="Verify & Continue"
            onPress={handleVerify}
            icon="checkmark-circle-outline"
            iconLibrary="ionicons"
            disabled={otp.length !== 6}
            style={styles.verifyBtn}
          />

          {/* Wrong number */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.wrongNumber}>
            <AppText variant="caption" style={styles.wrongText}>
              Wrong number?{' '}
              <AppText variant="caption" color={Colors.primary} style={styles.changeText}>
                Change Number
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
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: Colors.textSecondary,
    lineHeight: 24,
    marginTop: -Spacing.xs,
  },
  otpWrapper: {
    width: '100%',
    marginTop: Spacing.xs,
  },
  resendRow: {
    alignItems: 'center',
    marginTop: -Spacing.xs,
  },
  timerText: {
    color: Colors.textSecondary,
  },
  resendActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  verifyBtn: {
    width: '100%',
    marginTop: Spacing.xs,
  },
  wrongNumber: {
    alignItems: 'center',
    marginTop: -Spacing.xs,
  },
  wrongText: {
    color: Colors.textMuted,
    textAlign: 'center',
  },
  changeText: {
    fontWeight: '600',
  },
});
