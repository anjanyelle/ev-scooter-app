import LinearGradient from '@/components/system/LinearGradient';
import { Link, useRouter } from '@/navigation/router';
import { LockKeyhole, Mail, Sparkles } from 'lucide-react-native';
import { useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  AppButton,
  AppInput,
  GlassCard,
  Screen,
} from '@/components/ui';
import { LexiconLogo } from '@/components/vehicle';
import { runtimeConfig } from '@/config/runtime';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import {
  colors,
  fonts,
  radii,
  spacing,
} from '@/theme';

function errorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : 'Sign-in could not start. Try again.';
}

export default function LoginScreen() {
  const router = useRouter();

  const { beginLogin } = useAuth();
  const { showToast } = useToast();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!identifier.trim() || !password) {
      showToast(
        'Enter your registered email or phone and password.',
        'warning',
      );
      return;
    }

    if (password.length < 8) {
      showToast(
        'Password must contain at least 8 characters.',
        'warning',
      );
      return;
    }

    setLoading(true);

    try {
      await beginLogin(identifier, password);
      router.push('/(auth)/otp');
    } catch (error) {
      showToast(errorMessage(error), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.flex}>
      <Screen
        contentStyle={styles.content}
        bottomInset={spacing.xxl}
      >
        <ImageBackground
          source={require('../../assets/scooter.png')}
          style={styles.hero}
          imageStyle={styles.heroImage}
        >
          <LinearGradient
            colors={[
              'transparent',
              'rgba(5,5,5,0.55)',
              colors.background,
            ]}
            style={StyleSheet.absoluteFill}
          />

          <View style={styles.logo}>
            <LexiconLogo compact />
          </View>

          <View style={styles.heroCopy}>
            <View style={styles.pill}>
              <Sparkles
                size={14}
                color={colors.primary}
              />

              <Text style={styles.pillText}>
                Your ride, intelligently connected
              </Text>
            </View>

            <Text style={styles.heroTitle}>
              Welcome back.
            </Text>

            <Text style={styles.heroSubtitle}>
              Control, track and understand your
              LEXICON scooter.
            </Text>
          </View>
        </ImageBackground>

        <GlassCard style={styles.form}>
          <AppInput
            label="Email or phone"
            icon={Mail}
            value={identifier}
            onChangeText={setIdentifier}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="username"
            textContentType="username"
            keyboardType="email-address"
            returnKeyType="next"
          />

          <AppInput
            label="Password"
            icon={LockKeyhole}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="current-password"
            textContentType="password"
            returnKeyType="done"
            onSubmitEditing={() => void submit()}
          />

          {/* NEW FORGOT PASSWORD */}

          <View style={styles.forgotRow}>
            <Link
href="/(auth)/forgot-password"              style={styles.forgotLink}
            >

              Forgot Password?
            </Link>
          </View>

          {runtimeConfig.repositoryMode === 'mock' ? (
            <Text style={styles.hint}>
              Local preview mode · use any
              identifier and an 8+ character
              password.
            </Text>
          ) : null}

          <AppButton
            label="Continue securely"
            onPress={submit}
            loading={loading}
          />

          <View style={styles.signupRow}>
            <Text style={styles.signupText}>
              New to LEXICON?
            </Text>

            <Link
              href="/(auth)/signup"
              style={styles.link}
            >
              Create account
            </Link>
          </View>
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

  content: {
    paddingHorizontal: 0,
    gap: 0,
  },

  hero: {
    height: 390,
    justifyContent: 'space-between',
  },

  heroImage: {
    resizeMode: 'cover',
    opacity: 0.76,
  },

  logo: {
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.lg,
  },

  heroCopy: {
    padding: spacing.lg,
    gap: spacing.sm,
    paddingBottom: spacing.huge,
  },

  pill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: `${colors.primary}55`,
    backgroundColor: 'rgba(5,5,5,0.72)',
    borderRadius: radii.chip,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },

  pillText: {
    color: colors.primaryLight,
    fontFamily: fonts.medium,
    fontSize: 10,
  },

  heroTitle: {
    color: colors.heading,
    fontFamily: fonts.bold,
    fontSize: 32,
    letterSpacing: -0.5,
  },

  heroSubtitle: {
    color: colors.body,
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 21,
    maxWidth: 330,
  },

  form: {
    marginHorizontal: spacing.md,
    marginTop: -28,
    gap: spacing.md,
  },

  forgotRow: {
    alignItems: 'flex-end',
    marginTop: -6,
    marginBottom: 2,
  },

  forgotLink: {
    color: colors.primary,
    fontFamily: fonts.semibold,
    fontSize: 12,
  },

  hint: {
    color: colors.muted,
    fontFamily: fonts.regular,
    fontSize: 10,
    lineHeight: 15,
    marginTop: -4,
  },

  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },

  signupText: {
    color: colors.secondary,
    fontFamily: fonts.regular,
    fontSize: 12,
  },

  link: {
    color: colors.primary,
    fontFamily: fonts.semibold,
    fontSize: 12,
  },
});