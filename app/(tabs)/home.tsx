import { Bluetooth } from 'lucide-react-native';
import {
  BatteryCharging,
  Bell,
  CarFront,
  ChevronRight,
  HeartPulse,
  Lightbulb,
  LocateFixed,
  Lock,
  MapPin,
  Sparkles,
  ThermometerSun,
  Unlock,
  Volume2,
  Zap
  
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useRouter } from '@/navigation/router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  withSpring,
} from 'react-native-reanimated';
import { CircularProgress } from '@/components/charts';
import {
  ErrorState,
  GlassCard,
  Screen,
  SectionHeader,
  Skeleton,
  StatusPill
} from '@/components/ui';
import { Scooter3DViewer } from '@/components/vehicle';
import { usePreferences } from '@/context/PreferencesContext';
import { useToast } from '@/context/ToastContext';
import { evRepository } from '@/data/repository';
import { useAsyncResource } from '@/hooks/useAsyncResource';
import { authenticateVehicleCommand } from '@/services/deviceAuthentication';
import { colors, fonts, radii, shadows, spacing } from '@/theme';
import { formatNumber, formatRelativeTime } from '@/utils/format';
import { haptic } from '@/utils/haptics';

const healthIcons = [
  BatteryCharging,
  Zap,
  HeartPulse,
  Bell,
];
export default function HomeScreen() {
  const router = useRouter();
  const { showToast } = useToast();
  const { preferences } = usePreferences();
  const resource = useAsyncResource(() => evRepository.getDashboard(), []);
  const [locked, setLocked] = useState(true);
  const [commanding, setCommanding] = useState<string | null>(null);
  const [bluetoothConnected, setBluetoothConnected] = useState(false);
const [bluetoothLoading, setBluetoothLoading] = useState(false);
const bluetoothScale = useSharedValue(1);
useEffect(() => {
  if (bluetoothLoading) {
    bluetoothScale.value = withRepeat(
      withTiming(1.2, {
        duration: 700,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );
  } else {
    bluetoothScale.value = withTiming(1);
  }
}, [bluetoothLoading]);
const bluetoothAnimatedStyle = useAnimatedStyle(() => ({
  transform: [
    {
      scale: bluetoothScale.value,
    },
  ],
}));

const scooterX = useSharedValue(-500);

useEffect(() => {
  if (!resource.data) return;

  scooterX.value = -450;

  scooterX.value = withTiming(
    0,
    {
      duration: 2200,
      easing: Easing.out(Easing.cubic),
    },
    () => {
     

     
    },
  );
}, [resource.data]);

const floatingStyle = useAnimatedStyle(() => ({
  transform: [
    {
      translateX: scooterX.value
    },
    
  ],
}));

const bellRotation = useSharedValue(0);

useEffect(() => {
  bellRotation.value = withRepeat(
    withSequence(
      withTiming(8, { duration: 90 }),
      withTiming(-8, { duration: 90 }),
      withTiming(5, { duration: 90 }),
      withTiming(0, { duration: 90 }),
      withTiming(0, { duration: 600 })
    ),
    -1,
    false
  );
}, []);

const bellAnimatedStyle = useAnimatedStyle(() => ({
  transform: [
    {
      rotate: `${bellRotation.value}deg`,
    },
  ],
}));
  useEffect(() => {
    if (resource.data) setLocked(resource.data.vehicle.isLocked);
  }, [resource.data]);

  const command = async (type: 'lock' | 'unlock' | 'lights' | 'horn') => {
    if (commanding) return;

    if ((type === 'lock' || type === 'unlock') && preferences.biometricUnlock) {
      const authentication = await authenticateVehicleCommand();
      if (!authentication.success) {
        showToast(authentication.message ?? 'Authentication required.', 'warning');
        return;
      }
    }

    setCommanding(type);
    try {
      const result = await evRepository.sendVehicleCommand(type);
      if (type === 'lock') setLocked(true);
      if (type === 'unlock') setLocked(false);
      await haptic.success();
      showToast(result.message, 'success');
    } catch {
      showToast('Command could not be sent. Try again.', 'error');
    } finally {
      setCommanding(null);
    }
  };
    const connectBluetooth = async () => {
  // Disconnect
  if (bluetoothConnected) {
    setBluetoothConnected(false);

    showToast(
      'Scooter disconnected.',
      'info',
    );

    return;
  }

  // Connect
  setBluetoothLoading(true);

  showToast(
    'Searching for nearby scooter...',
    'info',
  );
  await new Promise<void>((resolve) => {
  setTimeout(() => {
    resolve();
  }, 1800);
});

  

  setBluetoothLoading(false);

  setBluetoothConnected(true);

  showToast(
    'Scooter connected successfully.',
    'success',
  );
};


  if (resource.loading) {
    return (
      <Screen>
        <View style={styles.header}><View><Skeleton width={150} height={18} /><Skeleton width={220} height={12} style={{ marginTop: 8 }} /></View><Skeleton width={42} height={42} radius={14} /></View>
        <Skeleton height={280} radius={24} />
        <View style={styles.metricRow}><Skeleton width="48%" height={150} radius={24} /><Skeleton width="48%" height={150} radius={24} /></View>
        <Skeleton height={112} radius={24} />
        <Skeleton height={190} radius={24} />
      </Screen>
    );
  }

  if (resource.error || !resource.data) {
    return <Screen><ErrorState onRetry={resource.reload} /></Screen>;
  }

  const { user, vehicle, health, carbonSavedKg, nextServiceKm } = resource.data;

  return (
    <Screen refreshing={resource.refreshing} onRefresh={() => void resource.reload()}>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Text style={styles.eyebrow}>GOOD EVENING</Text>
          <Text style={styles.greeting}>{user.name.split(' ')[0]}, your ride is ready.</Text>
        </View>
        <Animated.View style={bellAnimatedStyle}>
  <Pressable
    style={styles.headerButton}
    onPress={() => router.push('/notifications')}
  >
          <Bell size={20} color={colors.heading} />
          <View style={styles.unreadDot} />
        </Pressable>
        </Animated.View>
      </View>

<Animated.View
  entering={FadeInDown.delay(200).duration(900)}
  style={floatingStyle}
>
  <GlassCard
    padding={0}
    style={styles.viewerCard}
  >
    <Scooter3DViewer
            compact
            header={
              <View style={styles.vehicleTopline}>
                <View style={styles.vehicleInfo}>
                  <Text style={styles.vehicleName} numberOfLines={1}>
                    {vehicle.nickname}
                  </Text>
                  <Text style={styles.vehicleModel} numberOfLines={1}>
                    {vehicle.model} · {vehicle.registrationNumber}
                  </Text>
                </View>
                <View
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  }}
>

  <Pressable
  onPress={() => void connectBluetooth()}
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: bluetoothConnected
  ? 'rgba(184,220,0,0.12)'
  : 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: bluetoothConnected
  ? colors.primary
  : colors.border
  }}
>
 <View
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  }}
>
  <Animated.View style={bluetoothAnimatedStyle}>
    <Bluetooth
      size={14}
      color={
        bluetoothConnected
          ? colors.primary
          : bluetoothLoading
          ? colors.warning
          : colors.secondary
      }
    />
  </Animated.View>

  {bluetoothConnected && (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 2,
      }}
    >
      {[8, 11, 14].map((height) => (
        <View
          key={height}
          style={{
            width: 2,
            height,
            borderRadius: 2,
            backgroundColor: colors.primary,
          }}
        />
      ))}
    </View>
  )}

  <View>
    <Text
      style={{
        color: bluetoothConnected
          ? colors.primary
          : bluetoothLoading
          ? colors.warning
          : colors.secondary,
        fontSize: 11,
        fontWeight: '600',
      }}
    >
     {bluetoothLoading
  ? 'Searching...'
  : bluetoothConnected
  ? 'Linked'
  : 'Pair'}
    </Text>

    {bluetoothConnected && (
      <Text
        style={{
          color: colors.success,
          fontSize: 9,
        }}
      >
        Nearby • 4 m
      </Text>
    )}

   
  </View>
</View>

</Pressable>
  <StatusPill
    label={
      vehicle.status === 'parked'
        ? 'Secured'
        : vehicle.status
    }
    color={colors.success}
  />

</View>
              </View>
            }
          />
          <Pressable style={styles.viewerCta} onPress={() => router.push('/viewer')}>
            <Sparkles size={16} color={colors.primary} />
            <Text style={styles.viewerCtaText}>Open photoreal vehicle studio</Text>
            <ChevronRight size={17} color={colors.primary} />
          </Pressable>
        </GlassCard>
      </Animated.View>

      <View style={styles.metricRow}>
        <GlassCard style={styles.batteryCard}>
<View
  style={{
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  }}
>
  <View
  style={{
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  }}
>
  <CircularProgress
    value={vehicle.batteryPercentage}
    size={150}
    strokeWidth={10}
    label="Battery level"
  />
</View>
</View>
          <View style={styles.metricFooter}>
            <Text style={styles.metricLabel}>Battery health</Text>
            <Text style={styles.metricValue}>{vehicle.batteryHealth}%</Text>
          </View>
        </GlassCard>
        <GlassCard style={styles.rangeCard}>
          <View style={styles.rangeIcon}><LocateFixed size={23} color={colors.primary} /></View>
          <Text style={styles.rangeValue}>{formatNumber(vehicle.range, 0)}<Text style={styles.rangeUnit}> km</Text></Text>
          <Text style={styles.metricLabel}>Dynamic range</Text>
          <View style={styles.divider} />
          <View style={styles.inlineMetric}><ThermometerSun size={14} color={colors.warning} /><Text style={styles.inlineMetricText}>{vehicle.temperature}°C battery</Text></View>
          <View style={styles.inlineMetric}><Bell size={14} color={colors.info} /><Text style={styles.inlineMetricText}>Thermal state nominal</Text></View>
        </GlassCard>
      </View>

      <GlassCard style={styles.statusCard}>
        <View style={styles.statusIcon}><CarFront size={22} color={colors.primary} /></View>
        <View style={styles.statusCopy}>
          <Text style={styles.statusTitle}>{locked ? 'Vehicle locked' : 'Vehicle unlocked'}</Text>
          <Text style={styles.statusSubtitle}>Last sync {formatRelativeTime(vehicle.lastSyncAt)} · {vehicle.location.address}</Text>
        </View>
        <View style={[styles.liveDot, { backgroundColor: colors.success }]} />
      </GlassCard>

      <SectionHeader title="Quick actions" subtitle="Secure commands through the connected vehicle service" />
      <View style={styles.actionGrid}>
        <QuickAction
          icon={locked ? Unlock : Lock}
          disabled={!bluetoothConnected}
          label={locked ? "Unlock" : "Lock"}
          loading={commanding === (locked ? "unlock" : "lock")}
          onPress={() => void command(locked ? "unlock" : "lock")}
        />

        <QuickAction
          icon={Lightbulb}
          disabled={!bluetoothConnected}
          label="Flash lights"
          loading={commanding === "lights"}
          onPress={() => void command("lights")}
        />

        <QuickAction
          icon={Volume2}
          disabled={!bluetoothConnected}
          label="Sound horn"
          loading={commanding === "horn"}
          onPress={() => void command("horn")}
        />

        <QuickAction
          icon={MapPin}
          disabled={!bluetoothConnected}
          label="Live tracking"
          onPress={() => router.push("/tracking")}
        />
      </View>

      <GlassCard>
        <SectionHeader title="Vehicle health" action="Diagnostics" onAction={() => showToast('No active diagnostic faults.', 'success')} />
        <View style={styles.healthGrid}>
          {health.map((item, index) => {
            const Icon = healthIcons[index] ?? HeartPulse;
            return (
              <View key={item.id} style={styles.healthItem}>
                <View style={styles.healthIcon}><Icon size={18} color={colors.primary} /></View>
                <Text style={styles.healthLabel}>{item.label}</Text>
                <Text style={styles.healthValue}>{item.value}</Text>
                <Text style={styles.healthDetail}>{item.detail}</Text>
              </View>
            );
          })}
        </View>
      </GlassCard>

      <View style={styles.metricRow}>
        <GlassCard style={styles.impactCard}>
          <View style={styles.impactIcon}><Zap size={20} color={colors.primary} /></View>
          <Text style={styles.impactValue}>{carbonSavedKg} kg</Text>
          <Text style={styles.impactLabel}>CO₂ saved</Text>
        </GlassCard>
        <GlassCard style={styles.impactCard}>
          <View style={styles.impactIcon}><HeartPulse size={20} color={colors.info} /></View>
          <Text style={styles.impactValue}>{nextServiceKm} km</Text>
          <Text style={styles.impactLabel}>Next service</Text>
        </GlassCard>
      </View>
    </Screen>
  );
}

function QuickAction({
  icon: Icon,
  label,
  onPress,
  loading = false,
  disabled = false,
}: {
  icon: LucideIcon;
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}) {
  const { showToast } = useToast();

  return (
    <Pressable
      disabled={loading}
      onPress={() => {
        if (disabled) {
          void haptic.warning();

          showToast(
            'Connect Bluetooth to control your scooter.',
            'warning',
          );

          return;
        }

        void haptic.select();
        onPress();
      }}
      style={[
        styles.quickAction,
        disabled && {
          opacity: 0.45,
        },
      ]}
    >
      <View style={styles.quickIcon}>
        {loading ? (
          <View style={styles.loadingPulse} />
        ) : (
          <Icon
            size={22}
            color={
              disabled
                ? colors.muted
                : colors.primary
            }
            strokeWidth={2.2}
          />
        )}
      </View>

      <Text
        style={[
          styles.quickLabel,
          disabled && {
            color: colors.muted,
          },
        ]}
      >
        {loading ? 'Sending…' : label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md, paddingTop: spacing.xs },
  headerCopy: { flex: 1, gap: 4 },
  eyebrow: { color: colors.primary, fontFamily: fonts.semibold, fontSize: 9, letterSpacing: 1.4 },
  greeting: { color: colors.heading, fontFamily: fonts.bold, fontSize: 21, letterSpacing: -0.25 },
  headerButton: { width: 44, height: 44, borderRadius: 15, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  unreadDot: { position: 'absolute', width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary, top: 8, right: 8, borderWidth: 2, borderColor: colors.surface },
  viewerCard: { padding: spacing.sm, paddingBottom: spacing.sm },
  vehicleTopline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    paddingTop: 16,
    paddingHorizontal: 18,
    zIndex: 4,
  },
  vehicleInfo: {
    flex: 1,
    marginRight: 8,
  },
  vehicleName: {
    color: colors.heading,
    fontFamily: fonts.bold,
    fontSize: 22,
    flexShrink: 1,
  },
  vehicleModel: { color: colors.secondary, fontFamily: fonts.regular, fontSize: 10, marginTop: 2 },
  viewerCta: { minHeight: 44, marginTop: spacing.sm, borderRadius: radii.button, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.xs },
  viewerCtaText: { color: colors.heading, fontFamily: fonts.medium, fontSize: 12 },
  metricRow: { flexDirection: 'row', gap: spacing.sm },

  batteryCard:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    overflow:'visible',
},
  rangeCard: { flex: 1, justifyContent: 'center', gap: spacing.xs },
  rangeIcon: { width: 44, height: 44, borderRadius: 15, backgroundColor: `${colors.primary}12`, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xs },
  rangeValue: { color: colors.heading, fontFamily: fonts.numeric, fontSize: 30, letterSpacing: -0.8 },
  rangeUnit: { color: colors.primary, fontSize: 14 },
  metricLabel: { color: colors.secondary, fontFamily: fonts.regular, fontSize: 10 },
  metricFooter: { alignItems: 'center', gap: 3 },
  metricValue: { color: colors.primaryLight, fontFamily: fonts.semibold, fontSize: 12 },
  divider: { height: 1, backgroundColor: colors.divider, marginVertical: spacing.xs },
  inlineMetric: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  inlineMetricText: { color: colors.secondary, fontFamily: fonts.regular, fontSize: 9, flexShrink: 1 },
  statusCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.sm },
  statusIcon: { width: 44, height: 44, borderRadius: 15, backgroundColor: `${colors.primary}12`, alignItems: 'center', justifyContent: 'center' },
  statusCopy: { flex: 1, gap: 3 },
  statusTitle: { color: colors.heading, fontFamily: fonts.semibold, fontSize: 14 },
  statusSubtitle: { color: colors.muted, fontFamily: fonts.regular, fontSize: 9, lineHeight: 14 },
  liveDot: { width: 8, height: 8, borderRadius: 4, shadowColor: colors.success, shadowOpacity: 0.9, shadowRadius: 8 },
  actionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  quickAction: { width: '48%', minHeight: 98, flexGrow: 1, borderRadius: 20, borderWidth: 1, borderColor: colors.glassBorder, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center', gap: spacing.sm, ...shadows.card },
  quickIcon: { width: 44, height: 44, borderRadius: 15, backgroundColor: `${colors.primary}12`, alignItems: 'center', justifyContent: 'center' },
  quickLabel: { color: colors.body, fontFamily: fonts.medium, fontSize: 11 },
  loadingPulse: { width: 16, height: 16, borderRadius: 8, backgroundColor: colors.primary },
  healthGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  healthItem: { width: '47%', flexGrow: 1, borderRadius: 18, padding: spacing.sm, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, gap: 3 },
  healthIcon: { width: 34, height: 34, borderRadius: 12, backgroundColor: `${colors.primary}10`, alignItems: 'center', justifyContent: 'center', marginBottom: 5 },
  healthLabel: { color: colors.secondary, fontFamily: fonts.regular, fontSize: 9 },
  healthValue: { color: colors.heading, fontFamily: fonts.semibold, fontSize: 13 },
  healthDetail: { color: colors.muted, fontFamily: fonts.regular, fontSize: 8 },
  impactCard: { flex: 1, gap: 5 },
  impactIcon: { width: 36, height: 36, borderRadius: 12, backgroundColor: `${colors.primary}12`, alignItems: 'center', justifyContent: 'center' },
  impactValue: { color: colors.heading, fontFamily: fonts.numeric, fontSize: 20 },
  impactLabel: { color: colors.secondary, fontFamily: fonts.regular, fontSize: 10 }
});
