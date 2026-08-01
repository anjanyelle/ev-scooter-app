import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { BackHandler, DevSettings, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radii, spacing } from '@/theme';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (__DEV__) console.error('LEXICON app error boundary', error, info.componentStack);
  }

  private restart = () => {
    if (__DEV__) {
      DevSettings.reload();
      return;
    }
    BackHandler.exitApp();
  };

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <View style={styles.root}>
        <View style={styles.badge}><Text style={styles.badgeText}>LEXICON SAFE MODE</Text></View>
        <Text style={styles.title}>The app needs to restart.</Text>
        <Text style={styles.copy}>Your vehicle remains secure. Restart the Android client and try the action again.</Text>
        {__DEV__ ? <Text style={styles.detail}>{this.state.error.message}</Text> : null}
        <Pressable accessibilityRole="button" style={styles.button} onPress={this.restart}>
          <Text style={styles.buttonText}>Restart application</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background, justifyContent: 'center', padding: spacing.xl, gap: spacing.md },
  badge: { alignSelf: 'flex-start', borderRadius: radii.chip, borderWidth: 1, borderColor: `${colors.primary}55`, backgroundColor: `${colors.primary}12`, paddingHorizontal: spacing.sm, paddingVertical: 7 },
  badgeText: { color: colors.primary, fontFamily: fonts.semibold, fontSize: 8, letterSpacing: 1 },
  title: { color: colors.heading, fontFamily: fonts.bold, fontSize: 25, letterSpacing: -0.3 },
  copy: { color: colors.secondary, fontFamily: fonts.regular, fontSize: 13, lineHeight: 21 },
  detail: { color: colors.error, fontFamily: fonts.regular, fontSize: 10, lineHeight: 16 },
  button: { marginTop: spacing.sm, minHeight: 52, borderRadius: radii.button, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary },
  buttonText: { color: colors.background, fontFamily: fonts.semibold, fontSize: 14 }
});
