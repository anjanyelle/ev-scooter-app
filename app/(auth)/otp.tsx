import { useRouter } from '@/navigation/router';
import { ShieldCheck } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { AppButton, GlassCard, Screen, ScreenHeader } from '@/components/ui';
import { runtimeConfig } from '@/config/runtime';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { colors, fonts, radii, shadows, spacing } from '@/theme';

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Verification failed. Request a new code and try again.';
}

export default function OtpScreen() {
  const router = useRouter();
  const { authChallenge, verifyOtp, resendOtp, cancelAuthentication } = useAuth();
  const { showToast } = useToast();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (!authChallenge) router.replace('/(auth)/login');
  }, [authChallenge, router]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((current) => Math.max(0, current - 1)), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const verify = async () => {
    if (!/^\d{4,6}$/.test(code)) {
      showToast('Enter the 4–6 digit verification code.', 'warning');
      return;
    }

    setLoading(true);
    try {
      await verifyOtp(code);
      showToast('Welcome to LEXICON.', 'success');
    } catch (error) {
      showToast(errorMessage(error), 'error');
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    if (cooldown > 0 || resending) return;
    setResending(true);
    try {
      await resendOtp();
      setCode('');
      setCooldown(30);
      showToast('A fresh verification code was sent.', 'success');
    } catch (error) {
      showToast(errorMessage(error), 'error');
    } finally {
      setResending(false);
    }
  };

  return (
    <Screen
      header={
        <ScreenHeader
          title="Verify OTP"
          subtitle="Secure access to your connected scooter"
          back
          onBackPress={() => {
            cancelAuthentication();
            router.replace('/(auth)/login');
          }}
        />
      }
      bottomInset={spacing.xxl}
    >
      <View style={styles.hero}>
        <View style={styles.icon}><ShieldCheck size={34} color={colors.primary} /></View>
        <Text style={styles.title}>Check your messages</Text>
        <Text style={styles.copy}>Enter the verification code sent to {authChallenge?.deliveryHint ?? 'your registered contact'}.</Text>
        {runtimeConfig.repositoryMode === 'mock' ? <Text style={styles.previewCode}>Local preview code: 2468</Text> : null}
      </View>
      <GlassCard style={styles.card}>
        <TextInput
          value={code}
          onChangeText={(value) => setCode(value.replace(/\D/g, '').slice(0, 6))}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete="sms-otp"
          maxLength={6}
          autoFocus
          selectionColor={colors.primary}
          style={styles.otp}
          textAlign="center"
          onSubmitEditing={() => void verify()}
        />
        <AppButton label="Verify and continue" onPress={verify} loading={loading} />
        <Pressable accessibilityRole="button" disabled={cooldown > 0 || resending} onPress={() => void resend()}>
          <Text style={[styles.resend, cooldown > 0 || resending ? styles.resendDisabled : null]}>
            {resending ? 'Sending…' : cooldown > 0 ? `Resend available in ${cooldown}s` : 'Resend code'}
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          onPress={() => {
            cancelAuthentication();
            router.replace('/(auth)/login');
          }}
        >
          <Text style={styles.changeAccount}>Use a different account</Text>
        </Pressable>
      </GlassCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', paddingTop: spacing.xxl, gap: spacing.sm },
  icon: { width: 72, height: 72, borderRadius: 24, borderWidth: 1, borderColor: `${colors.primary}77`, backgroundColor: `${colors.primary}12`, alignItems: 'center', justifyContent: 'center', ...shadows.primaryGlow },
  title: { color: colors.heading, fontFamily: fonts.bold, fontSize: 23, marginTop: spacing.sm },
  copy: { color: colors.secondary, fontFamily: fonts.regular, fontSize: 13, lineHeight: 20, textAlign: 'center', maxWidth: 330 },
  previewCode: { color: colors.primaryLight, fontFamily: fonts.semibold, fontSize: 11 },
  card: { gap: spacing.lg, marginTop: spacing.lg },
  otp: { height: 76, borderRadius: radii.button, borderWidth: 1, borderColor: colors.primary, backgroundColor: colors.surface, color: colors.heading, fontFamily: fonts.numeric, fontSize: 34, letterSpacing: 14, paddingLeft: 14 },
  resend: { color: colors.primary, fontFamily: fonts.semibold, fontSize: 12, textAlign: 'center' },
  resendDisabled: { color: colors.muted },
  changeAccount: { color: colors.secondary, fontFamily: fonts.medium, fontSize: 11, textAlign: 'center' }
});
