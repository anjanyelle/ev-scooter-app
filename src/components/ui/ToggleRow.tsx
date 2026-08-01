import type { LucideIcon } from 'lucide-react-native';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';

import { colors, fonts, spacing } from '@/theme';
import { haptic } from '@/utils/haptics';

interface ToggleRowProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  accent?: string;
  /** Show a bottom border divider (default true, set false on the last item) */
  showDivider?: boolean;
}

export function ToggleRow({ icon: Icon, title, subtitle, value, onValueChange, accent = colors.primary, showDivider = true }: ToggleRowProps) {
  const update = (next: boolean) => { void haptic.select(); onValueChange(next); };
  return (
    <Pressable style={[styles.row, showDivider ? styles.divider : null]} onPress={() => update(!value)}>
      <View style={[styles.icon, { backgroundColor: `${accent}18` }]}><Icon size={19} color={accent} /></View>
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <Switch value={value} onValueChange={update} trackColor={{ false: colors.border, true: colors.primaryDark }} thumbColor={value ? colors.primaryLight : colors.muted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, minHeight: 62, paddingVertical: spacing.xs, paddingHorizontal: spacing.md },
  divider: { borderBottomWidth: 1, borderBottomColor: colors.divider },
  icon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  copy: { flex: 1, gap: 2 },
  title: { color: colors.heading, fontFamily: fonts.medium, fontSize: 14 },
  subtitle: { color: colors.muted, fontFamily: fonts.regular, fontSize: 11, lineHeight: 16 }
});
