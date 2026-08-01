import type { LucideIcon } from 'lucide-react-native';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radii, spacing } from '@/theme';

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  trend?: number;
  helper?: string;
  accent?: string;
  compact?: boolean;
}

export function MetricCard({ icon: Icon, label, value, trend, helper, accent = colors.primary, compact = false }: MetricCardProps) {
  const positive = (trend ?? 0) >= 0;
  const TrendIcon = positive ? ArrowUpRight : ArrowDownRight;
  return (
    <View style={[styles.card, compact ? styles.compact : null]}>
      <View style={styles.labelRow}>
        <Icon size={17} color={accent} strokeWidth={2.2} />
        <Text style={styles.label} numberOfLines={1}>{label}</Text>
      </View>
      <Text style={[styles.value, compact ? styles.compactValue : null]} numberOfLines={1}>{value}</Text>
      {typeof trend === 'number' ? (
        <View style={styles.trendRow}>
          <TrendIcon size={12} color={positive ? colors.success : colors.error} />
          <Text style={[styles.trend, { color: positive ? colors.success : colors.error }]}>{Math.abs(trend)}%</Text>
          {helper ? <Text style={styles.helper}>{helper}</Text> : null}
        </View>
      ) : helper ? <Text style={styles.helper}>{helper}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, minWidth: 0, backgroundColor: colors.card, borderRadius: 18, borderWidth: 1, borderColor: colors.glassBorder, padding: spacing.md, gap: spacing.sm },
  compact: { padding: spacing.sm, gap: spacing.xs },
  labelRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  label: { flex: 1, color: colors.secondary, fontFamily: fonts.medium, fontSize: 11 },
  value: { color: colors.heading, fontFamily: fonts.numeric, fontSize: 19, letterSpacing: -0.2 },
  compactValue: { fontSize: 16 },
  trendRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  trend: { fontFamily: fonts.medium, fontSize: 9 },
  helper: { color: colors.muted, fontFamily: fonts.regular, fontSize: 9, flexShrink: 1 }
});
