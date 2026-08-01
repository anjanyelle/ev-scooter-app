import { AlertTriangle, RefreshCcw } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from './AppButton';
import { GlassCard } from './GlassCard';
import { colors, fonts, spacing } from '@/theme';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry: () => void | Promise<void>;
}

export function ErrorState({
  title = 'Unable to load this screen',
  message = 'Check your connection and try again. Your saved session is still secure.',
  onRetry
}: ErrorStateProps) {
  return (
    <GlassCard style={styles.card}>
      <View style={styles.icon}><AlertTriangle size={28} color={colors.warning} /></View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <AppButton label="Try again" icon={RefreshCcw} variant="secondary" onPress={onRetry} />
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: { minHeight: 240, alignItems: 'center', justifyContent: 'center', gap: spacing.sm },
  icon: { width: 58, height: 58, borderRadius: 20, backgroundColor: `${colors.warning}12`, borderWidth: 1, borderColor: `${colors.warning}45`, alignItems: 'center', justifyContent: 'center' },
  title: { color: colors.heading, fontFamily: fonts.bold, fontSize: 17, textAlign: 'center' },
  message: { color: colors.secondary, fontFamily: fonts.regular, fontSize: 11, lineHeight: 18, textAlign: 'center', maxWidth: 300, marginBottom: spacing.xs }
});
