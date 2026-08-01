import type { LucideIcon } from 'lucide-react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useRouter } from '@/navigation/router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radii, spacing } from '@/theme';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  back?: boolean;
  /** Override the default router.back() behavior for the back button */
  onBackPress?: () => void;
  rightIcon?: LucideIcon;
  onRightPress?: () => void;
  /** rightLabel takes precedence over rightIcon when both are supplied */
  rightLabel?: string;
}

export function ScreenHeader({ title, subtitle, back = false, onBackPress, rightIcon: RightIcon, onRightPress, rightLabel }: ScreenHeaderProps) {
  const router = useRouter();
  const handleBack = onBackPress ?? (() => router.back());
  // If both rightLabel and rightIcon are provided, rightLabel wins to avoid
  // rendering two conflicting controls in the same slot.
  const showLabel = Boolean(rightLabel);
  const showIcon = !showLabel && Boolean(RightIcon);
  return (
    <View style={styles.header}>
      {back ? (
        <Pressable style={styles.iconButton} onPress={handleBack}>
          <ArrowLeft size={21} color={colors.heading} />
        </Pressable>
      ) : null}
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {showLabel || showIcon ? (
        <Pressable style={showLabel ? styles.labelButton : styles.iconButton} onPress={onRightPress}>
          {showIcon && RightIcon ? <RightIcon size={19} color={colors.primary} /> : null}
          {showLabel ? <Text style={styles.rightLabel}>{rightLabel}</Text> : null}
        </Pressable>
      ) : <View style={back ? styles.placeholder : null} />}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { minHeight: 58, flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingHorizontal: spacing.md },
  copy: { flex: 1 },
  title: { color: colors.heading, fontFamily: fonts.bold, fontSize: 20 },
  subtitle: { color: colors.secondary, fontFamily: fonts.regular, fontSize: 11, marginTop: 2 },
  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center'
  },
  labelButton: { minHeight: 40, paddingHorizontal: spacing.md, borderRadius: radii.chip, borderWidth: 1, borderColor: `${colors.primary}55`, alignItems: 'center', justifyContent: 'center' },
  rightLabel: { color: colors.primary, fontFamily: fonts.semibold, fontSize: 12 },
  placeholder: { width: 42 }
});
