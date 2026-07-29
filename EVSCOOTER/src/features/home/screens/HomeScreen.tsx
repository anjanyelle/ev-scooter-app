/**
 * HomeScreen — Main dashboard
 * Vehicle status, battery ring, quick actions, speed modes, recent rides
 */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, Spacing, BorderRadius, FontSize, FontWeight} from '../../../theme';
import {AppText} from '../../../components/atoms/AppText';
import {AppIcon} from '../../../components/atoms/AppIcon';
import {Badge} from '../../../components/atoms/Badge';
import {GlassCard} from '../../../components/molecules/GlassCard';
import {BatteryRing} from '../../../components/molecules/BatteryRing';
import {SectionHeader} from '../../../components/molecules/SectionHeader';
import {RideCard} from '../../../components/molecules/RideCard';
import {HeaderIconButton} from '../../../components/organisms/AppHeader';
import {MOCK_VEHICLE, MOCK_USER, MOCK_RIDES, RIDE_STATS} from '../../../constants/mockData';
import type {SpeedMode} from '../../../types';

const {width} = Dimensions.get('window');

const QUICK_ACTIONS = [
  {id: 'lock', icon: 'lock-closed-outline', label: 'Lock', library: 'ionicons'},
  {id: 'horn', icon: 'megaphone-outline', label: 'Horn', library: 'ionicons'},
  {id: 'flash', icon: 'flash-outline', label: 'Flash', library: 'ionicons'},
  {id: 'find', icon: 'location-outline', label: 'Find', library: 'ionicons'},
] as const;

const SPEED_MODES: {id: SpeedMode; label: string; desc: string; maxKmh: number}[] = [
  {id: 'eco', label: 'Eco', desc: 'Max range', maxKmh: 35},
  {id: 'city', label: 'City', desc: 'Balanced', maxKmh: 50},
  {id: 'sport', label: 'Sport', desc: 'Max power', maxKmh: 65},
];

export const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [speedMode, setSpeedMode] = useState<SpeedMode>(MOCK_VEHICLE.speedMode);
  const [isLocked, setIsLocked] = useState(MOCK_VEHICLE.isLocked);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <LinearGradient colors={Colors.gradientHero} style={[styles.container]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          {paddingTop: insets.top + Spacing.md, paddingBottom: insets.bottom + 100},
        ]}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <View>
            <AppText variant="caption" style={styles.greeting}>
              {greeting} 👋
            </AppText>
            <AppText variant="h3" weight="bold">
              {MOCK_USER.name.split(' ')[0]}
            </AppText>
          </View>
          <View style={styles.headerRight}>
            <HeaderIconButton icon="notifications-outline" badge />
            <HeaderIconButton icon="settings-outline" />
          </View>
        </View>

        {/* ── Vehicle Card ── */}
        <GlassCard
          style={styles.vehicleCard}
          glowColor="rgba(184,220,0,0.15)"
          padding={Spacing.xl}>

          {/* Vehicle info row */}
          <View style={styles.vehicleHeader}>
            <View>
              <AppText variant="caption" style={styles.vehicleModel}>
                {MOCK_VEHICLE.model}
              </AppText>
              <AppText variant="small" style={styles.plateText}>
                {MOCK_VEHICLE.plateNumber}
              </AppText>
            </View>
            <Badge
              label={isLocked ? '🔒 Locked' : '🔓 Unlocked'}
              variant={isLocked ? 'warning' : 'success'}
            />
          </View>

          {/* Battery ring center */}
          <View style={styles.batteryCenter}>
            <BatteryRing
              percent={MOCK_VEHICLE.batteryPercent}
              size={width * 0.48}
              strokeWidth={12}
              label="Battery"
              sublabel={`${MOCK_VEHICLE.rangeKm} km range`}
            />
          </View>

          {/* Stats row */}
          <View style={styles.vehicleStats}>
            <VehicleStat icon="speedometer-outline" value={`${MOCK_VEHICLE.odometer} km`} label="Odometer" />
            <View style={styles.statDivider} />
            <VehicleStat icon="thermometer-outline" value="24°C" label="Battery Temp" />
            <View style={styles.statDivider} />
            <VehicleStat icon="time-outline" value={MOCK_VEHICLE.lastSeen} label="Last Active" />
          </View>
        </GlassCard>

        {/* ── Quick Actions ── */}
        <View style={styles.quickActions}>
          {QUICK_ACTIONS.map(action => (
            <TouchableOpacity
              key={action.id}
              activeOpacity={0.8}
              style={styles.actionBtn}
              onPress={() => action.id === 'lock' && setIsLocked(prev => !prev)}>
              <LinearGradient
                colors={
                  action.id === 'lock' && !isLocked
                    ? Colors.gradientButton
                    : ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']
                }
                style={styles.actionBtnInner}>
                <AppIcon
                  name={action.id === 'lock' && !isLocked ? 'lock-open-outline' : action.icon}
                  library={action.library as 'ionicons'}
                  size={24}
                  color={
                    action.id === 'lock' && !isLocked
                      ? Colors.btnPrimaryText
                      : Colors.primary
                  }
                />
              </LinearGradient>
              <AppText variant="small" style={styles.actionLabel}>
                {action.id === 'lock' ? (isLocked ? 'Unlock' : 'Lock') : action.label}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Speed Mode ── */}
        <View style={styles.section}>
          <SectionHeader title="Speed Mode" />
          <View style={styles.speedModes}>
            {SPEED_MODES.map(mode => {
              const isActive = speedMode === mode.id;
              return (
                <TouchableOpacity
                  key={mode.id}
                  onPress={() => setSpeedMode(mode.id)}
                  activeOpacity={0.8}
                  style={[styles.speedCard, isActive && styles.speedCardActive]}>
                  {isActive && (
                    <LinearGradient
                      colors={Colors.gradientButton}
                      style={StyleSheet.absoluteFill}
                    />
                  )}
                  <AppText
                    variant="caption"
                    weight="bold"
                    style={isActive ? styles.speedLabelActive : styles.speedLabelInactive}>
                    {mode.label}
                  </AppText>
                  <AppText
                    variant="small"
                    style={isActive ? styles.speedDescActive : styles.speedDescInactive}>
                    {mode.desc}
                  </AppText>
                  <AppText
                    variant="small"
                    weight="semiBold"
                    style={isActive ? styles.speedKmActive : styles.speedDescInactive}>
                    {mode.maxKmh} km/h
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ── Ride Stats ── */}
        <GlassCard style={styles.rideStatsCard} padding={Spacing.md}>
          <View style={styles.rideStatsRow}>
            <RideStat
              icon="bicycle-outline"
              value={String(RIDE_STATS.totalRides)}
              label="Total Rides"
              library="ionicons"
            />
            <View style={styles.statDivider} />
            <RideStat
              icon="map-outline"
              value={`${RIDE_STATS.totalDistanceKm}`}
              label="Km Ridden"
              library="ionicons"
            />
            <View style={styles.statDivider} />
            <RideStat
              icon="leaf-outline"
              value={`${RIDE_STATS.co2SavedKg} kg`}
              label="CO₂ Saved"
              library="ionicons"
            />
          </View>
        </GlassCard>

        {/* ── Recent Rides ── */}
        <View style={styles.section}>
          <SectionHeader title="Recent Rides" actionLabel="See All" onAction={() => {}} />
          {MOCK_RIDES.slice(0, 3).map(ride => (
            <RideCard key={ride.id} ride={ride} />
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const VehicleStat: React.FC<{icon: string; value: string; label: string}> = ({
  icon,
  value,
  label,
}) => (
  <View style={styles.vehicleStat}>
    <AppIcon name={icon} library="ionicons" size={14} color={Colors.primary} />
    <AppText variant="caption" weight="semiBold" color={Colors.textHeading}>
      {value}
    </AppText>
    <AppText variant="small" style={styles.vehicleStatLabel}>
      {label}
    </AppText>
  </View>
);

const RideStat: React.FC<{
  icon: string;
  value: string;
  label: string;
  library: 'ionicons' | 'material' | 'feather';
}> = ({icon, value, label, library}) => (
  <View style={styles.rideStat}>
    <AppIcon name={icon} library={library} size={16} color={Colors.primary} />
    <AppText variant="h4" weight="bold" color={Colors.textHeading}>
      {value}
    </AppText>
    <AppText variant="small" style={styles.vehicleStatLabel}>
      {label}
    </AppText>
  </View>
);

const styles = StyleSheet.create({
  container: {flex: 1},
  scroll: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xxs,
  },
  greeting: {
    color: Colors.textMuted,
    marginBottom: 2,
  },
  headerRight: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  vehicleCard: {
    gap: Spacing.lg,
  },
  vehicleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  vehicleModel: {
    color: Colors.textMuted,
  },
  plateText: {
    color: Colors.textSecondary,
    marginTop: 2,
  },
  batteryCenter: {
    alignItems: 'center',
  },
  vehicleStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vehicleStat: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  vehicleStatLabel: {
    color: Colors.textMuted,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.border,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.xs,
  },
  actionBtn: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.xxs + 2,
  },
  actionBtnInner: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    maxHeight: 72,
  },
  actionLabel: {
    color: Colors.textSecondary,
  },
  section: {
    gap: Spacing.md,
  },
  speedModes: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  speedCard: {
    flex: 1,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    alignItems: 'center',
    gap: 3,
    overflow: 'hidden',
  },
  speedCardActive: {
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },
  speedLabelActive: {color: Colors.btnPrimaryText},
  speedLabelInactive: {color: Colors.textSecondary},
  speedDescActive: {color: 'rgba(5,5,5,0.7)'},
  speedDescInactive: {color: Colors.textMuted},
  speedKmActive: {color: Colors.btnPrimaryText},
  rideStatsCard: {},
  rideStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rideStat: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
});
