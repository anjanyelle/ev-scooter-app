import LinearGradient from '@/components/system/LinearGradient';
import { Link, useRouter } from '@/navigation/router';
import { LockKeyhole, Mail, Sparkles } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  Image,
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
import Animated from 'react-native-reanimated';
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
        scroll={false}
        contentStyle={styles.content}
        bottomInset={spacing.xxl}
      >
       <View style={styles.hero}>
          <LinearGradient
            colors={[
              'transparent',
              'rgba(5,5,5,0.55)',
              colors.background,
            ]}
            style={[StyleSheet.absoluteFill, styles.gradient]}
          />
          <Image
            source={require('../../assets/frontview.png')}
            resizeMode="cover"
            style={styles.backgroundImage}
          />

          <View style={styles.logoContainer}>
            <LexiconLogo compact />
          </View>

          <View style={styles.heroCopy}>
            <View style={[styles.pill, styles.pillFlush]}>
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
       </View>

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
    flexGrow: 1,
    
  },
  hero: {
    height: 300,
    paddingTop: spacing.xs,
    paddingHorizontal: spacing.lg,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
  backgroundImage:{
    position:'absolute',

    top:55,

    left:'50%',

    width:300,

    height:235,

    transform:[
        { translateX:-150 },
    ],

    opacity:0.20,

    zIndex:0,
},
logoContainer: {
    position: 'absolute',
    top: 18,
    left: 20,
    zIndex: 20,
},

  gradient: {
    zIndex: 0,
  },
 heroCopy:{
    marginTop:180,
    width:'100%',
    paddingLeft:16,
paddingRight:16,
    gap:spacing.sm,
    zIndex:5,
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

  pillFlush: {
    marginTop: 0,
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
    lineHeight: 36,
  },

  heroSubtitle: {
    color: colors.body,
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 22,
    maxWidth: 330,
  },

  form: {
    marginHorizontal: spacing.md,
    marginTop: 0,
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

  loginScooter: {
    display: 'none',
  },
});