import { Link, useRouter } from '@/navigation/router';
import { LockKeyhole, Mail, UserRound } from 'lucide-react-native';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';

import { AppButton, AppInput, GlassCard, Screen, ScreenHeader } from '@/components/ui';
import { LexiconLogo } from '@/components/vehicle';
import { runtimeConfig } from '@/config/runtime';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { colors, fonts, spacing } from '@/theme';

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Account setup could not start. Try again.';
}

export default function SignupScreen() {
  const router = useRouter();
  const { beginSignup } = useAuth();
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!name.trim() || !identifier.trim() || !password) {
      showToast('Complete all fields to create your account.', 'warning');
      return;
    }
    if (password.length < 8) {
      showToast('Use a password with at least 8 characters.', 'warning');
      return;
    }

    setLoading(true);
    try {
      await beginSignup(name, identifier, password);
      router.push('/(auth)/otp');
    } catch (error) {
      showToast(errorMessage(error), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (

   <KeyboardAvoidingView
  style={styles.flex}
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  keyboardVerticalOffset={20}
>
      <Screen header={<ScreenHeader title="Create account" subtitle="Set up your LEXICON companion" back />} bottomInset={spacing.xxl}>
        <View style={styles.logoWrap}><LexiconLogo centered /></View>
        <GlassCard style={styles.form}>
          <AppInput label="Full name" icon={UserRound} value={name} onChangeText={setName} autoComplete="name" textContentType="name" />
          <AppInput label="Email or phone" icon={Mail} value={identifier} onChangeText={setIdentifier} autoCapitalize="none" autoCorrect={false} autoComplete="email" textContentType="username" />
          <AppInput label="Password" icon={LockKeyhole} value={password} onChangeText={setPassword} secureTextEntry autoComplete="new-password" textContentType="newPassword" onSubmitEditing={() => void submit()} />
          {runtimeConfig.repositoryMode === 'mock' ? (
            <Text style={styles.hint}>Local preview mode stores only an encrypted local session and preview preferences.</Text>
          ) : null}
          <AppButton label="Create account" onPress={submit} loading={loading} />
          <View style={styles.row}><Text style={styles.muted}>Already registered?</Text><Link href="/(auth)/login" style={styles.link}>Sign in</Link></View>
        </GlassCard>
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  logoWrap: { alignItems: 'center', paddingVertical: spacing.xl },
  form: { gap: spacing.md },
  hint: { color: colors.muted, fontFamily: fonts.regular, fontSize: 10, lineHeight: 15 },
  row: { flexDirection: 'row', justifyContent: 'center', gap: 6 },
  muted: { color: colors.secondary, fontFamily: fonts.regular, fontSize: 12 },
  link: { color: colors.primary, fontFamily: fonts.semibold, fontSize: 12 }
});
