import { BatteryMedium, Gauge, Radio, ScanLine, ShieldCheck, Sparkles } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { ErrorState, GlassCard, Screen, ScreenHeader, SectionHeader, Skeleton } from '@/components/ui';
import { Scooter3DViewer } from '@/components/vehicle';
import { evRepository } from '@/data/repository';
import { useAsyncResource } from '@/hooks/useAsyncResource';
import { colors, fonts, spacing } from '@/theme';
import { formatNumber, formatRelativeTime } from '@/utils/format';

export default function VehicleViewerScreen() {
  const resource = useAsyncResource(() => evRepository.getDashboard(), []);

  if (resource.loading) {
    return (
      <Screen bottomInset={32}>
        <ScreenHeader title="Vehicle Studio" subtitle="Loading connected vehicle" back rightIcon={ScanLine} />
        <Skeleton height={470} radius={24} />
        <Skeleton height={190} radius={24} />
      </Screen>
    );
  }

  if (resource.error || !resource.data) {
    return (
      <Screen bottomInset={32}>
        <ScreenHeader title="Vehicle Studio" subtitle="Photoreal vehicle inspection" back rightIcon={ScanLine} />
        <ErrorState message="The vehicle studio could not load the latest telemetry." onRetry={resource.reload} />
      </Screen>
    );
  }

  const { vehicle } = resource.data;

  return (
    <Screen bottomInset={32} refreshing={resource.refreshing} onRefresh={() => void resource.reload()}>
      <ScreenHeader title="Vehicle Studio" subtitle="Photoreal inspection · live vehicle context" back rightIcon={ScanLine} />

      <GlassCard padding={0} style={styles.viewerCard}>
        <Scooter3DViewer />
        <View style={styles.viewerHint} pointerEvents="none">
          <Sparkles size={15} color={colors.primary} />
          <Text style={styles.viewerHintText}>Reference-accurate product render · Android performance optimized</Text>
        </View>
      </GlassCard>

      <View style={styles.badgeRow}>
        <View style={styles.badge}><Sparkles size={14} color={colors.primary} /><Text style={styles.badgeText}>Matte black finish</Text></View>
        <View style={styles.badge}><View style={styles.limeDot} /><Text style={styles.badgeText}>Volt lime accents</Text></View>
        <View style={styles.badge}><ShieldCheck size={14} color={colors.primary} /><Text style={styles.badgeText}>Connected securely</Text></View>
      </View>

      <SectionHeader title={vehicle.model} subtitle={`${vehicle.nickname} · ${vehicle.registrationNumber}`} />
      <GlassCard>
        <Text style={styles.description}>
          The vehicle view now uses the supplied LEXICON product render so the body proportions, lighting, tyre profile,
          brake hardware, mirrors, seat materials and lime graphics remain true to the real scooter instead of appearing
          as primitive toy geometry.
        </Text>
        <View style={styles.syncRow}>
          <View style={styles.onlineDot} />
          <Text style={styles.syncText}>Last vehicle sync {formatRelativeTime(vehicle.lastSyncAt)}</Text>
        </View>
        <View style={styles.specGrid}>
          <Spec icon={BatteryMedium} label="Battery" value={`${vehicle.batteryPercentage}%`} />
          <Spec icon={Gauge} label="Dynamic range" value={`${formatNumber(vehicle.range, 0)} km`} />
          <Spec icon={Radio} label="Connectivity" value="LTE · GPS · BLE" />
          <Spec icon={ShieldCheck} label="Vehicle state" value={vehicle.isLocked ? 'Locked' : 'Unlocked'} />
        </View>
      </GlassCard>
    </Screen>
  );
}

function Spec({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <View style={styles.spec}>
      <View style={styles.specIcon}><Icon size={18} color={colors.primary} /></View>
      <Text style={styles.specLabel}>{label}</Text>
      <Text style={styles.specValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewerCard: { minHeight: 470, overflow: 'hidden' },
  viewerHint: {
    position: 'absolute',
    bottom: spacing.sm,
    left: spacing.sm,
    right: spacing.sm,
    minHeight: 42,
    paddingHorizontal: spacing.sm,
    borderRadius: 14,
    backgroundColor: 'rgba(5,5,5,0.8)',
    borderWidth: 1,
    borderColor: colors.glassBorder,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs
  },
  viewerHintText: { flexShrink: 1, color: colors.body, fontFamily: fonts.medium, fontSize: 9, textAlign: 'center' },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 6, minHeight: 34, paddingHorizontal: spacing.sm, borderRadius: 22, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  badgeText: { color: colors.secondary, fontFamily: fonts.medium, fontSize: 9 },
  limeDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary, shadowColor: colors.primary, shadowOpacity: 0.8, shadowRadius: 8 },
  description: { color: colors.body, fontFamily: fonts.regular, fontSize: 11, lineHeight: 19 },
  syncRow: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: spacing.md },
  onlineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.success, shadowColor: colors.success, shadowOpacity: 0.8, shadowRadius: 8 },
  syncText: { color: colors.secondary, fontFamily: fonts.regular, fontSize: 9 },
  specGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.lg },
  spec: { width: '47%', flexGrow: 1, borderRadius: 18, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, padding: spacing.sm, gap: 4 },
  specIcon: { width: 36, height: 36, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: `${colors.primary}10`, marginBottom: 4 },
  specLabel: { color: colors.muted, fontFamily: fonts.regular, fontSize: 8 },
  specValue: { color: colors.heading, fontFamily: fonts.semibold, fontSize: 11 }
});
