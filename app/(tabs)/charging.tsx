import {
  BatteryCharging,
  CalendarClock,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Gauge,
  HousePlug,
  MapPin,
  PlugZap,
  ReceiptIndianRupee,
  SquareStop,
  Zap
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CircularProgress } from '@/components/charts';
import { AppButton, ErrorState, GlassCard, Screen, ScreenHeader, SectionHeader, Skeleton, StatusPill } from '@/components/ui';
import { useToast } from '@/context/ToastContext';
import { evRepository } from '@/data/repository';
import { useAsyncResource } from '@/hooks/useAsyncResource';
import { colors, fonts, radii, spacing } from '@/theme';
import { formatCurrency, formatDuration, formatRideDate } from '@/utils/format';
import { haptic } from '@/utils/haptics';

export default function ChargingScreen() {
  const { showToast } = useToast();
  const resource = useAsyncResource(() => evRepository.getCharging(), []);
  const [stopping, setStopping] = useState(false);
  const [stopped, setStopped] = useState(false);

  const stopCharging = async () => {
    setStopping(true);
    try {
      const result = await evRepository.sendVehicleCommand('stop_charging');
      setStopped(true);
      await haptic.success();
      showToast(result.message, 'success');
    } catch {
      showToast('Charging could not be stopped. Try again.', 'error');
    } finally {
      setStopping(false);
    }
  };

  if (resource.loading) {
    return (
      <Screen header={<ScreenHeader title="Charging" subtitle="Monitor and manage your LEXICON charging" rightLabel="Lexicon" />}>
        <Skeleton height={310} radius={24} />
        <Skeleton height={140} radius={24} />
        <Skeleton height={220} radius={24} />
        <Skeleton height={300} radius={24} />
      </Screen>
    );
  }

  if (resource.error || !resource.data) {
    return <Screen header={<ScreenHeader title="Charging" subtitle="Monitor and manage your LEXICON charging" />}><ErrorState onRetry={resource.reload} /></Screen>;
  }

  const data = resource.data;
  const charging = data.status === 'charging' && !stopped;

  return (
    <Screen
      header={<ScreenHeader title="Charging" subtitle="Monitor and manage your LEXICON charging" rightLabel="Lexicon" />}
      refreshing={resource.refreshing}
      onRefresh={() => {
        setStopped(false);
        void resource.reload();
      }}
    >
      <GlassCard>
        <View style={styles.titleRow}>
          <Text style={styles.cardTitle}>Charging Status</Text>
          <StatusPill label={charging ? 'Charging' : 'Paused'} color={charging ? colors.primary : colors.warning} />
        </View>
        <View style={styles.chargeStatus}>
          <CircularProgress value={data.batteryPercentage} size={154} strokeWidth={11} label="Battery Level" gradientId="chargeRing" />
          <View style={styles.statsGrid}>
            <ChargeMetric icon={Zap} label="Time to Full Charge" value={charging ? formatDuration(data.timeToFullMinutes) : 'Paused'} />
            <ChargeMetric icon={ReceiptIndianRupee} label="Charging Cost" value={formatCurrency(data.currentSessionCost)} />
            <ChargeMetric icon={PlugZap} label="Charging Power" value={charging ? `${data.powerKw} kW` : '0.0 kW'} />
            <ChargeMetric icon={Clock3} label="Session Duration" value={formatDuration(data.currentSessionMinutes)} />
            <ChargeMetric icon={Gauge} label="Current Range" value={`${data.currentRangeKm} km`} />
            <ChargeMetric icon={BatteryCharging} label="Charge Mode" value="Optimized" />
          </View>
        </View>
        <View style={styles.homeRow}>
          <View style={styles.homeInfo}>
            <View style={styles.homeIcon}><HousePlug size={18} color={colors.primary} /></View>
            <View><Text style={styles.homeTitle}>{charging ? 'Charging at Home' : 'Charging paused'}</Text><Text style={styles.homeSubtitle}>{data.homeChargerName} · {charging ? `${data.powerKw} kW` : 'Connected'}</Text></View>
          </View>
<AppButton
  label={charging ? 'Stop' : 'Stopped'}
  icon={SquareStop}
  variant="secondary"
  compact
  fullWidth={false}
  style={{
    width: 145,
  }}
  loading={stopping}
  disabled={!charging}
  onPress={stopCharging}
/>
 </View>
      </GlassCard>

      <GlassCard>
        <SectionHeader title="Charging History" action="View All" />
        <View style={styles.summaryGrid}>
          <SummaryItem icon={CalendarClock} label="Total Sessions" value={`${data.summary.sessions}`} />
          <SummaryItem icon={Zap} label="Total Energy" value={`${data.summary.totalEnergyKWh} kWh`} />
          <SummaryItem icon={CircleDollarSign} label="Total Cost" value={formatCurrency(data.summary.totalCost, 0)} />
          <SummaryItem icon={ReceiptIndianRupee} label="Avg. Cost / kWh" value={formatCurrency(data.summary.averageCostPerKWh)} />
        </View>
      </GlassCard>

      <GlassCard>
        <SectionHeader title="Nearby Charging Stations" action="View All" />
        <View style={styles.stationList}>
          {data.nearbyStations.map((station, index) => (
            <Pressable key={station.id} style={[styles.station, index > 0 ? styles.itemBorder : null]} onPress={() => showToast(`Opening directions to ${station.name}.`, 'info')}>
              <View style={styles.stationIcon}><MapPin size={18} color={colors.primary} /></View>
              <View style={styles.stationCopy}>
                <View style={styles.stationNameRow}><Text style={styles.stationName}>{station.name}</Text><View style={styles.availableDot} /></View>
                <Text style={styles.stationAddress}>{station.distanceKm} km · {station.address}</Text>
              </View>
              <View style={styles.typeBadge}><Text style={styles.typeText}>{station.type}</Text></View>
              <Text style={styles.power}>{station.powerKw} kW</Text>
              <ChevronRight size={17} color={colors.secondary} />
            </Pressable>
          ))}
        </View>
      </GlassCard>

      <GlassCard>
        <SectionHeader title="Charging Session History" action="View All" />
        <View style={styles.sessionList}>
          {data.sessions.map((session, index) => (
            <Pressable key={session.id} style={[styles.session, index > 0 ? styles.itemBorder : null]}>
              <View style={styles.sessionIcon}><HousePlug size={18} color={colors.primary} /></View>
              <View style={styles.sessionCopy}>
                <Text style={styles.sessionDate}>{formatRideDate(session.startedAt)}</Text>
                <Text style={styles.sessionStation}>{session.stationName}</Text>
              </View>
              <SessionValue label="Energy" value={`${session.energyKWh} kWh`} />
              <SessionValue label="Duration" value={formatDuration(session.durationMinutes)} />
              <SessionValue label="Cost" value={formatCurrency(session.cost)} accent />
              <ChevronRight size={17} color={colors.secondary} />
            </Pressable>
          ))}
        </View>
      </GlassCard>
    </Screen>
  );
}

function ChargeMetric({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <View style={styles.chargeMetric}>
      <View style={styles.smallIcon}><Icon size={15} color={colors.primary} /></View>
      <View><Text style={styles.chargeLabel}>{label}</Text><Text style={styles.chargeValue}>{value}</Text></View>
    </View>
  );
}

function SummaryItem({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <View style={styles.summaryItem}>
      <Icon size={17} color={colors.primary} />
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

function SessionValue({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return <View style={styles.sessionValue}><Text style={[styles.sessionData, accent ? styles.accent : null]}>{value}</Text><Text style={styles.sessionLabel}>{label}</Text></View>;
}

const styles = StyleSheet.create({
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { color: colors.heading, fontFamily: fonts.bold, fontSize: 16 },
  chargeStatus: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginTop: spacing.md },
  statsGrid: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chargeMetric: { width: '46%', flexGrow: 1, flexDirection: 'row', alignItems: 'center', gap: 6 },
  smallIcon: { width: 30, height: 30, borderRadius: 10, backgroundColor: `${colors.primary}10`, alignItems: 'center', justifyContent: 'center' },
  chargeLabel: { color: colors.muted, fontFamily: fonts.regular, fontSize: 7.5 },
  chargeValue: { color: colors.primaryLight, fontFamily: fonts.semibold, fontSize: 10, marginTop: 2 },
  homeRow: { marginTop: spacing.md, minHeight: 64, borderRadius: radii.button, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, padding: spacing.sm, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.sm },
  homeInfo: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  homeIcon: { width: 36, height: 36, borderRadius: 12, backgroundColor: `${colors.primary}12`, alignItems: 'center', justifyContent: 'center' },
  homeTitle: { color: colors.primaryLight, fontFamily: fonts.medium, fontSize: 10 },
  homeSubtitle: { color: colors.muted, fontFamily: fonts.regular, fontSize: 8, marginTop: 2 },
  summaryGrid: { flexDirection: 'row', marginTop: spacing.md },
  summaryItem: { flex: 1, alignItems: 'center', gap: 5, paddingHorizontal: 4, borderRightWidth: 1, borderRightColor: colors.divider },
  summaryLabel: { color: colors.muted, fontFamily: fonts.regular, fontSize: 7.5, textAlign: 'center' },
  summaryValue: { color: colors.primaryLight, fontFamily: fonts.semibold, fontSize: 10, textAlign: 'center' },
  stationList: { marginTop: spacing.sm },
  station: { minHeight: 62, flexDirection: 'row', alignItems: 'center', gap: spacing.xs, paddingVertical: spacing.xs },
  itemBorder: { borderTopWidth: 1, borderTopColor: colors.divider },
  stationIcon: { width: 36, height: 36, borderRadius: 12, backgroundColor: `${colors.primary}10`, alignItems: 'center', justifyContent: 'center' },
  stationCopy: { flex: 1, gap: 3 },
  stationNameRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  stationName: { color: colors.heading, fontFamily: fonts.medium, fontSize: 10 },
  availableDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.success },
  stationAddress: { color: colors.muted, fontFamily: fonts.regular, fontSize: 7.5 },
  typeBadge: { borderRadius: 6, borderWidth: 1, borderColor: colors.primaryDark, paddingHorizontal: 5, paddingVertical: 2 },
  typeText: { color: colors.primary, fontFamily: fonts.semibold, fontSize: 7 },
  power: { color: colors.secondary, fontFamily: fonts.medium, fontSize: 8 },
  sessionList: { marginTop: spacing.sm },
  session: { minHeight: 72, flexDirection: 'row', alignItems: 'center', gap: spacing.xs, paddingVertical: spacing.sm },
  sessionIcon: { width: 38, height: 38, borderRadius: 13, backgroundColor: `${colors.primary}10`, alignItems: 'center', justifyContent: 'center' },
  sessionCopy: { flex: 1, gap: 3 },
  sessionDate: { color: colors.heading, fontFamily: fonts.medium, fontSize: 8 },
  sessionStation: { color: colors.muted, fontFamily: fonts.regular, fontSize: 7 },
  sessionValue: { minWidth: 48, alignItems: 'center', gap: 2 },
  sessionData: { color: colors.body, fontFamily: fonts.medium, fontSize: 8 },
  sessionLabel: { color: colors.muted, fontFamily: fonts.regular, fontSize: 6.5 },
  accent: { color: colors.primaryLight }
});
