import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { LexiconLogo } from '@/components/vehicle';
import { colors } from '@/theme';

export default function SplashScreen() {

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
