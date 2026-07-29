/**
 * RidesScreen — Ride history with filter chips
 */
import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, Spacing, BorderRadius} from '../../../theme';
import {AppText} from '../../../components/atoms/AppText';
import {Chip} from '../../../components/atoms/Chip';
import {GlassCard} from '../../../components/molecules/GlassCard';
import {RideCard} from '../../../components/molecules/RideCard';
import {AppIcon} from '../../../components/atoms/AppIcon';
import {MOCK_RIDES, RIDE_STATS} from '../../../constants/mockData';

const FILTERS = ['All', 'Today', 'This Week', 'This Month'];

export const RidesScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredRides = activeFilter === 'Today'
    ? MOCK_RIDES.slice(0, 1)
    : activeFilter === 'This Week'
    ? MOCK_RIDES.slice(0, 3)
    : MOCK_RIDES;

  return (
    <LinearGradient colors={Colors.gradientHero} style={styles.container}>
      {/* Header */}
      <View style={[styles.header, {paddingTop: insets.top + Spacing.md}]}>
        <AppText variant="h2" weight="bold">
          My Rides
        </AppText>
        <AppText variant="small" style={styles.subtitle}>
          {RIDE_STATS.totalRides} total rides
        </AppText>
      </View>

      {/* Summary card */}
      <View style={styles.summaryPad}>
        <GlassCard padding={Spacing.lg} glowColor="rgba(184,220,0,0.12)">
          <View style={styles.summaryRow}>
            <SummaryItem
              icon="map-outline"
              value={`${RIDE_STATS.totalDistanceKm} km`}
              label="Total Distance"
            />
            <View style={styles.vDiv} />
            <SummaryItem
              icon="time-outline"
              value="84 hr"
              label="Total Time"
            />
            <View style={styles.vDiv} />
            <SummaryItem
              icon="leaf-outline"
              value={`${RIDE_STATS.co2SavedKg} kg`}
              label="CO₂ Saved"
            />
            <View style={styles.vDiv} />
            <SummaryItem
              icon="flash-outline"
              value={`${RIDE_STATS.totalEnergyKwh} kWh`}
              label="Energy Used"
            />
          </View>
        </GlassCard>
      </View>

      {/* Filter chips */}
      <View style={styles.filters}>
        {FILTERS.map(f => (
          <Chip
            key={f}
            label={f}
            selected={activeFilter === f}
            onPress={() => setActiveFilter(f)}
          />
        ))}
      </View>

      {/* Rides list */}
      <FlatList
        data={filteredRides}
        keyExtractor={item => item.id}
        renderItem={({item}) => <RideCard ride={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.list,
          {paddingBottom: insets.bottom + 100},
        ]}
        ListEmptyComponent={
          <View style={styles.empty}>
            <AppIcon name="bicycle-outline" library="ionicons" size={48} color={Colors.border} />
            <AppText variant="body" style={styles.emptyText}>
              No rides found
            </AppText>
          </View>
        }
      />
    </LinearGradient>
  );
};

const SummaryItem: React.FC<{icon: string; value: string; label: string}> = ({
  icon,
  value,
  label,
}) => (
  <View style={styles.summaryItem}>
    <AppIcon name={icon} library="ionicons" size={16} color={Colors.primary} />
    <AppText variant="caption" weight="bold" color={Colors.textHeading}>
      {value}
    </AppText>
    <AppText variant="small" style={styles.summaryLabel} numberOfLines={1}>
      {label}
    </AppText>
  </View>
);

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.md,
    gap: 4,
  },
  subtitle: {
    color: Colors.textMuted,
  },
  summaryPad: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  summaryLabel: {
    color: Colors.textMuted,
    textAlign: 'center',
  },
  vDiv: {
    width: 1,
    height: 36,
    backgroundColor: Colors.border,
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.xl,
    gap: Spacing.xs,
    marginBottom: Spacing.md,
  },
  list: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.xs,
  },
  empty: {
    alignItems: 'center',
    paddingTop: Spacing.huge,
    gap: Spacing.md,
  },
  emptyText: {
    color: Colors.textMuted,
  },
});
