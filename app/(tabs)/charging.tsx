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
import { Easing } from 'react-native-reanimated';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import type { LucideIcon } from 'lucide-react-native';
import { useEffect, useState } from 'react';
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
  const particle1 = useSharedValue(0);
const particle2 = useSharedValue(0);
const particle3 = useSharedValue(0);
 
const particleStyle1 = useAnimatedStyle(() => ({
  transform: [
    {
      translateY: -particle1.value * 90,
    },
  ],
  opacity: 1 - particle1.value,
}));

const particleStyle2 = useAnimatedStyle(() => ({
  transform: [
    {
      translateY: -particle2.value * 70,
    },
  ],
  opacity: 1 - particle2.value,
}));

const particleStyle3 = useAnimatedStyle(() => ({
  transform: [
    {
      translateY: -particle3.value * 80,
    },
  ],
  opacity: 1 - particle3.value,
}));
useEffect(() => {
  particle1.value = withRepeat(
    withTiming(1, {
      duration: 2300,
      easing: Easing.linear,
    }),
    -1,
    false,
  );

  particle2.value = withRepeat(
    withTiming(1, {
      duration: 2700,
      easing: Easing.linear,
    }),
    -1,
    false,
  );

  particle3.value = withRepeat(
    withTiming(1, {
      duration: 3100,
      easing: Easing.linear,
    }),
    -1,
    false,
  );
}, []);

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
<View
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  }}
>
  
 <View
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  }}
>
  

  <StatusPill
    label={charging ? 'Charging' : 'Paused'}
    color={charging ? colors.primary : colors.warning}
  />
</View>
</View>        </View>
<View style={styles.chargeStatus}>

  <View style={styles.ringSection}>
    <View
  style={{
    width:160,
    height:160,
    alignItems:'center',
    justifyContent:'center',
  }}
>
    <CircularProgress
        value={data.batteryPercentage}
        size={160}
        strokeWidth={11}
        label="Battery Level"
        gradientId="chargeRing"
    />
</View>
     
  <Animated.View
    style={[
      styles.particle1,
      particleStyle1,
    ]}
  />

  <Animated.View
    style={[
      styles.particle2,
      particleStyle2,
    ]}
  />

  <Animated.View
    style={[
      styles.particle3,
      particleStyle3,
    ]}
  />

</View>

<View style={styles.metricSection}>

  <ChargeMetric
    icon={PlugZap}
    label="Charging Power"
    value={`${data.powerKw} kW`}
  />

  <ChargeMetric
    icon={Clock3}
    label="Time Remaining"
    value={
      charging
        ? formatDuration(data.timeToFullMinutes)
        : 'Paused'
    }
  />

  <ChargeMetric
    icon={Gauge}
    label="Current Range"
    value={`${data.currentRangeKm} km`}
  />

  <ChargeMetric
    icon={ReceiptIndianRupee}
    label="Current Cost"
    value={formatCurrency(data.currentSessionCost)}
  />

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
 chargeStatus:{
    flexDirection:'row',
    alignItems:'center',
},

ringSection:{
    width:170,
    alignItems:'center',
    justifyContent:'center',
},

metricSection:{
    flex:1,
    paddingLeft:14,
},

  statsGrid: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
chargeMetric:{
  flexDirection:'row',
  alignItems:'center',
  gap:10,
  paddingVertical:10,
  borderBottomWidth:1,
  borderBottomColor:colors.divider,
},
particle1:{
  position:'absolute',
  bottom:18,
  left:68,
  width:5,
  height:5,
  borderRadius:3,
  backgroundColor:colors.primary,
},

particle2:{
  position:'absolute',
  bottom:42,
  left:42,
  width:4,
  height:4,
  borderRadius:2,
  backgroundColor:colors.primaryLight,
},

particle3:{
  position:'absolute',
  bottom:35,
  right:44,
  width:5,
  height:5,
  borderRadius:3,
  backgroundColor:colors.primary,
},
  smallIcon: { width: 30, height: 30, borderRadius: 10, backgroundColor: `${colors.primary}10`, alignItems: 'center', justifyContent: 'center' },
  chargeLabel: { color: colors.muted, fontFamily: fonts.regular, fontSize: 11 },
  chargeValue: { color: colors.primaryLight, fontFamily: fonts.semibold, fontSize: 17, marginTop: 2 },
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
