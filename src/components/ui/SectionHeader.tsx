import { ChevronRight } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, spacing } from '@/theme';

interface SectionHeaderProps {
  title: string;
  action?: string;
  onAction?: () => void;
  subtitle?: string;
}

export function SectionHeader({ title, action, onAction, subtitle }: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {action ? (
        <Pressable onPress={onAction} style={styles.action} hitSlop={8}>
          <Text style={styles.actionText}>{action}</Text>
          <ChevronRight size={15} color={colors.primary} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md },
  copy: { flex: 1 },
  title: { color: colors.heading, fontFamily: fonts.bold, fontSize: 16 },
  subtitle: { color: colors.muted, fontFamily: fonts.regular, fontSize: 11, marginTop: 2 },
  action: { flexDirection: 'row', alignItems: 'center' },
  actionText: { color: colors.primary, fontFamily: fonts.medium, fontSize: 11 }
});
