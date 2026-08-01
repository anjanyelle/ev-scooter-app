import { Zap } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radii, shadows, spacing } from '@/theme';

interface LexiconLogoProps { compact?: boolean; centered?: boolean; }

export function LexiconLogo({ compact = false, centered = false }: LexiconLogoProps) {
  return (
    <View style={[styles.row, centered ? styles.centered : null]}>
      <View style={[styles.mark, compact ? styles.compactMark : null]}>
        <Zap size={compact ? 18 : 28} fill={colors.primary} color={colors.primary} strokeWidth={2.6} />
      </View>
      <View>
        <Text style={[styles.wordmark, compact ? styles.compactText : null]}>LEXICON</Text>
        {!compact ? <Text style={styles.tagline}>Electric. Intelligent. Yours.</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  centered: { justifyContent: 'center' },
  mark: { width: 58, height: 58, borderRadius: radii.button, backgroundColor: colors.surface, borderWidth: 1, borderColor: `${colors.primary}88`, alignItems: 'center', justifyContent: 'center', ...shadows.primaryGlow },
  compactMark: { width: 38, height: 38, borderRadius: 12 },
  wordmark: { color: colors.heading, fontFamily: fonts.display, fontSize: 30, letterSpacing: 2.5 },
  compactText: { fontSize: 20, letterSpacing: 1.8 },
  tagline: { color: colors.primary, fontFamily: fonts.medium, fontSize: 10, letterSpacing: 0.7, marginTop: 2 }
});
