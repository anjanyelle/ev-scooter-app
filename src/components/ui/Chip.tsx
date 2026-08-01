import type { LucideIcon } from 'lucide-react-native';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, fonts, radii, spacing } from '@/theme';
import { haptic } from '@/utils/haptics';

interface ChipProps {
  label: string;
  active?: boolean;
  icon?: LucideIcon;
  onPress?: () => void;
}

export function Chip({ label, active = false, icon: Icon, onPress }: ChipProps) {
  return (
    <Pressable
      onPress={onPress ? () => { void haptic.select(); onPress(); } : undefined}
      style={[styles.base, active ? styles.active : null]}
    >
      {Icon ? <Icon size={14} color={active ? colors.background : colors.secondary} /> : null}
      <Text style={[styles.label, active ? styles.activeLabel : null]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 34,
    borderRadius: radii.chip,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    gap: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface
  },
  active: { backgroundColor: colors.primary, borderColor: colors.primary },
  label: { fontFamily: fonts.medium, fontSize: 12, color: colors.secondary },
  activeLabel: { color: colors.background, fontFamily: fonts.semibold }
});
