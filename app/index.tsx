import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { LexiconLogo } from '@/components/vehicle';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from '@/navigation/router';
import { colors } from '@/theme';

export default function SplashScreen() {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'authenticated') {
      router.replace('/(tabs)/home');
    } else {
      router.replace('/(auth)/login');
    }
  }, [status, router]);

  return (
    <View style={styles.root}>
      <LexiconLogo />
      <ActivityIndicator
        size="large"
        color={colors.primary}
        style={styles.spinner}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32
  },
  spinner: {
    marginTop: 8
  }
});
