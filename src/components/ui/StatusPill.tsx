import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radii, spacing } from '@/theme';

interface StatusPillProps { label: string; color?: string; }

export function StatusPill({ label, color = colors.success }: StatusPillProps) {
  return <View style={[styles.pill, { borderColor: `${color}66`, backgroundColor: `${color}12` }]}><View style={[styles.dot, { backgroundColor: color }]} /><Text style={[styles.text, { color }]}>{label}</Text></View>;
}

const styles = StyleSheet.create({
  pill: { minHeight: 28, borderRadius: radii.chip, borderWidth: 1, paddingHorizontal: spacing.sm, flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  text: { fontFamily: fonts.medium, fontSize: 10 }
});
