import {
  Bike,
  CalendarDays,
  ChevronRight,
  Clock3,
  Gauge,
  Leaf,
  Route,
  Timer,
  Waypoints,
  Zap
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CircularProgress, LineChart, RouteMiniMap } from '@/components/charts';
import { Chip, ErrorState, GlassCard, MetricCard, Screen, ScreenHeader, SectionHeader, Skeleton } from '@/components/ui';
import { evRepository } from '@/data/repository';
import { useAsyncResource } from '@/hooks/useAsyncResource';
import { colors, fonts, radii, spacing } from '@/theme';
import { formatDuration, formatNumber, formatRideDate } from '@/utils/format';

const periods = ['day', 'week', 'month', 'year'] as const;

type Period = (typeof periods)[number];

export default function RidesScreen() {
  const [period, setPeriod] = useState<Period>('day');
  const resource = useAsyncResource(() => evRepository.getRideStats(period), [period]);

  if (resource.loading) {
    return (
      <Screen header={<ScreenHeader title="Ride Statistics" subtitle="Track your rides and performance" rightIcon={CalendarDays} />}>
        <Skeleton height={42} radius={20} />
        <View style={styles.metricRow}><Skeleton width="31%" height={118} radius={18} /><Skeleton width="31%" height={118} radius={18} /><Skeleton width="31%" height={118} radius={18} /></View>
        <View style={styles.metricRow}><Skeleton width="31%" height={118} radius={18} /><Skeleton width="31%" height={118} radius={18} /><Skeleton width="31%" height={118} radius={18} /></View>
        <Skeleton height={250} radius={24} />
        <Skeleton height={300} radius={24} />
      </Screen>
    );
  }

  if (resource.error || !resource.data) {
    return <Screen header={<ScreenHeader title="Ride Statistics" subtitle="Track your rides and performance" />}><ErrorState onRetry={resource.reload} /></Screen>;
  }

  const data = resource.data;
  return (
    <Screen
      header={<ScreenHeader title="Ride Statistics" subtitle="Track your rides and performance" rightIcon={CalendarDays} />}
      refreshing={resource.refreshing}
      onRefresh={() => void resource.reload()}
    >
      <View style={styles.filters}>
        <View style={styles.periods}>
          {periods.map((item) => <Chip key={item} label={`${item.charAt(0).toUpperCase()}${item.slice(1)}`} active={period === item} onPress={() => setPeriod(item)} />)}
        </View>
        <Chip label="May 20, 2026" icon={CalendarDays} />
      </View>

      <View style={styles.metricRow}>
        <MetricCard icon={Route} label="Total Distance" value={`${formatNumber(data.totalDistanceKm, 0)} km`} trend={data.trendPercent.totalDistance} helper="vs last month" />
        <MetricCard icon={Waypoints} label="Today’s Distance" value={`${formatNumber(data.todayDistanceKm)} km`} trend={data.trendPercent.todayDistance} helper="vs yesterday" />
        <MetricCard icon={Gauge} label="Average Speed" value={`${formatNumber(data.averageSpeedKmph, 0)} km/h`} trend={data.trendPercent.averageSpeed} helper="vs last week" />
      </View>
      <View style={styles.metricRow}>
        <MetricCard icon={Zap} label="Energy Consumption" value={`${formatNumber(data.energyWhPerKm)} Wh/km`} trend={data.trendPercent.energy} helper="vs last week" compact />
        <MetricCard icon={Clock3} label="Ride Time" value={formatDuration(data.rideTimeMinutes)} trend={data.trendPercent.rideTime} helper="vs yesterday" compact />
        <GlassCard style={styles.ecoCard} padding={spacing.sm}>
          <View style={styles.ecoTitle}><Leaf size={16} color={colors.primary} /><Text style={styles.ecoLabel}>Eco Score</Text></View>
          <CircularProgress value={data.ecoScore} size={76} strokeWidth={6} suffix="" label="Excellent" gradientId="ecoRing" />
        </GlassCard>
      </View>

      <GlassCard>
        <SectionHeader title="Distance Overview" action="This Week" />
        <Text style={styles.unit}>km</Text>
        <LineChart data={data.chart} height={220} />
      </GlassCard>

      <GlassCard>
        <SectionHeader title="Ride History" action="View All" />
        <View style={styles.rideList}>
          {data.rides.map((ride, index) => (
            <Pressable key={ride.id} style={[styles.rideItem, index > 0 ? styles.itemBorder : null]}>
              <RouteMiniMap points={ride.route} />
              <View style={styles.rideCopy}>
                <Text style={styles.rideDate}>{formatRideDate(ride.startedAt)}</Text>
                <Text style={styles.rideRoute}>{ride.from} → {ride.to}</Text>
                <View style={styles.rideMeta}>
                  <Text style={styles.metaText}>△ {ride.distanceKm} km</Text>
                  <Text style={styles.metaText}>◷ {ride.durationMinutes} min</Text>
                  <Text style={styles.metaText}>◉ {ride.averageSpeedKmph} km/h</Text>
                </View>
              </View>
              <View style={styles.scoreWrap}>
                <View style={styles.scoreCircle}><Text style={styles.score}>{ride.ecoScore}</Text></View>
                <Text style={styles.scoreLabel}>{ride.ecoScore >= 85 ? 'Excellent' : 'Good'}</Text>
              </View>
              <ChevronRight size={18} color={colors.secondary} />
            </Pressable>
          ))}
        </View>
      </GlassCard>

      <GlassCard>
        <SectionHeader title="Trip Details" action="View All" />
        <View style={styles.tripGrid}>
          <TripDetail icon={Gauge} label="Max Speed" value={`${data.tripDetails.maxSpeedKmph} km/h`} />
          <TripDetail icon={Bike} label="Max Distance" value={`${data.tripDetails.maxDistanceKm} km`} />
          <TripDetail icon={Timer} label="Max Ride Time" value={formatDuration(data.tripDetails.maxRideMinutes)} />
          <TripDetail icon={Leaf} label="Max Efficiency" value={`${data.tripDetails.maxEfficiencyWhPerKm} Wh/km`} />
        </View>
      </GlassCard>
    </Screen>
  );
}

function TripDetail({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <View style={styles.tripItem}>
      <Icon size={17} color={colors.primary} />
      <View><Text style={styles.tripLabel}>{label}</Text><Text style={styles.tripValue}>{value}</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  filters: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.sm },
  periods: { flex: 1, flexDirection: 'row', gap: 4, backgroundColor: colors.surface, borderRadius: radii.chip, padding: 4, borderWidth: 1, borderColor: colors.border },
  metricRow: { flexDirection: 'row', gap: spacing.xs },
  ecoCard: { flex: 1, minWidth: 0, alignItems: 'center', justifyContent: 'space-between' },
  ecoTitle: { flexDirection: 'row', alignItems: 'center', gap: 5, alignSelf: 'stretch' },
  ecoLabel: { color: colors.secondary, fontFamily: fonts.medium, fontSize: 10 },
  unit: { color: colors.muted, fontFamily: fonts.regular, fontSize: 9, marginTop: spacing.sm },
  rideList: { marginTop: spacing.sm },
  rideItem: { minHeight: 88, flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.sm },
  itemBorder: { borderTopWidth: 1, borderTopColor: colors.divider },
  rideCopy: { flex: 1, minWidth: 0, gap: 3 },
  rideDate: { color: colors.heading, fontFamily: fonts.medium, fontSize: 10 },
  rideRoute: { color: colors.secondary, fontFamily: fonts.regular, fontSize: 8 },
  rideMeta: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 2 },
  metaText: { color: colors.muted, fontFamily: fonts.regular, fontSize: 7.5 },
  scoreWrap: { alignItems: 'center', gap: 3 },
  scoreCircle: { width: 42, height: 42, borderRadius: 21, borderWidth: 2, borderColor: colors.primary, alignItems: 'center', justifyContent: 'center', backgroundColor: `${colors.primary}0C` },
  score: { color: colors.primaryLight, fontFamily: fonts.numeric, fontSize: 14 },
  scoreLabel: { color: colors.primary, fontFamily: fonts.medium, fontSize: 7 },
  tripGrid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: spacing.md },
  tripItem: { width: '50%', flexDirection: 'row', alignItems: 'center', gap: spacing.xs, paddingVertical: spacing.sm },
  tripLabel: { color: colors.muted, fontFamily: fonts.regular, fontSize: 8 },
  tripValue: { color: colors.heading, fontFamily: fonts.medium, fontSize: 10, marginTop: 2 }
});
