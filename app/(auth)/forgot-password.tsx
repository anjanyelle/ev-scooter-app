import { useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  
  Platform,
} from 'react-native';

import { Mail } from 'lucide-react-native';

import { useRouter } from '@/navigation/router';

import {
  AppButton,
  AppInput,
  GlassCard,
  Screen,
} from '@/components/ui';

import { useToast } from '@/context/ToastContext';

import {
  colors,
  fonts,
  spacing,
} from '@/theme';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const sendResetLink = async () => {
    if (!email.trim()) {
      showToast('Enter your registered email.', 'warning');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      showToast(
        'Password reset link sent successfully.',
        'success',
      );

      router.back();
    }, 1200);
  };

  return (
    <KeyboardAvoidingView
  style={styles.flex}
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
>
      <Screen>

        <View style={styles.header}>
          <Text style={styles.title}>
            Forgot Password
          </Text>

          <Text style={styles.subtitle}>
            Enter your registered email address.
            We will send a password reset link.
          </Text>
        </View>

        <GlassCard style={styles.card}>

          <AppInput
            label="Email"
            icon={Mail}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <AppButton
            label="Send Reset Link"
            loading={loading}
            onPress={sendResetLink}
          />

          <AppButton
            label="Back to Login"
            variant="secondary"
            onPress={() => router.back()}
          />

        </GlassCard>

      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },

  title: {
    color: colors.heading,
    fontFamily: fonts.bold,
    fontSize: 30,
  },

  subtitle: {
    color: colors.secondary,
    fontFamily: fonts.regular,
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
  },

  card: {
    gap: spacing.md,
  },
});