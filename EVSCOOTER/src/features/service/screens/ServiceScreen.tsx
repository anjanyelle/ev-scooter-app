/**
 * ServiceScreen — Vehicle health, booking, and service centers
 */
import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, Spacing, BorderRadius} from '../../../theme';
import {AppText} from '../../../components/atoms/AppText';
import {AppIcon} from '../../../components/atoms/AppIcon';
import {AppButton} from '../../../components/atoms/AppButton';
import {GlassCard} from '../../../components/molecules/GlassCard';
import {Badge} from '../../../components/atoms/Badge';
import {SectionHeader} from '../../../components/molecules/SectionHeader';
import {MOCK_SERVICE_CENTERS} from '../../../constants/mockData';

const HEALTH_ITEMS = [
  {label: 'Battery Health', value: 94, icon: 'battery-charging-outline', status: 'success'},
  {label: 'Motor', value: 100, icon: 'settings-outline', status: 'success'},
  {label: 'Tyre Pressure', value: 72, icon: 'ellipse-outline', status: 'warning'},
  {label: 'Brakes', value: 88, icon: 'disc-outline', status: 'success'},
] as const;

type HealthStatus = 'success' | 'warning' | 'error';

export const ServiceScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient colors={Colors.gradientHero} style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scroll,
          {paddingTop: insets.top + Spacing.md, paddingBottom: insets.bottom + 100},
        ]}>

        {/* Header */}
        <View style={styles.header}>
          <AppText variant="h2" weight="bold">
            Service
          </AppText>
          <AppText variant="small" style={styles.subtitle}>
            Vehicle health & service management
          </AppText>
        </View>

        {/* Service Reminder Card */}
        <LinearGradient
          colors={['rgba(255,200,87,0.12)', 'rgba(255,200,87,0.04)']}
          style={styles.reminderCard}>
          <View style={styles.reminderIcon}>
            <AppIcon name="warning-outline" library="ionicons" size={22} color={Colors.warning} />
          </View>
          <View style={styles.reminderText}>
            <AppText variant="body" weight="semiBold">
              Service Due in 3 Days
            </AppText>
            <AppText variant="small" style={styles.reminderSubtext}>
              Next service: 31 Jul 2026 • Odometer: 5000 km
            </AppText>
          </View>
          <AppIcon name="chevron-forward" library="ionicons" size={18} color={Colors.warning} />
        </LinearGradient>

        {/* Vehicle Health */}
        <View style={styles.section}>
          <SectionHeader title="Vehicle Health" />
          <GlassCard padding={Spacing.md} glowColor="rgba(184,220,0,0.1)">
            <View style={styles.healthGrid}>
              {HEALTH_ITEMS.map(item => (
                <HealthCard key={item.label} {...item} />
              ))}
            </View>
          </GlassCard>
        </View>

        {/* Book Service */}
        <AppButton
          label="Book Service Appointment"
          onPress={() => {}}
          icon="calendar-outline"
          iconLibrary="ionicons"
          iconPosition="left"
        />

        {/* Nearby Service Centers */}
        <View style={styles.section}>
          <SectionHeader title="Nearby Centers" onAction={() => {}} />
          {MOCK_SERVICE_CENTERS.map(center => (
            <ServiceCenterCard key={center.id} center={center} />
          ))}
        </View>

        {/* Service History */}
        <View style={styles.section}>
          <SectionHeader title="Service History" onAction={() => {}} />
          {SERVICE_HISTORY.map((s, i) => (
            <ServiceHistoryRow key={i} {...s} />
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const HealthCard: React.FC<{
  label: string;
  value: number;
  icon: string;
  status: HealthStatus;
}> = ({label, value, icon, status}) => {
  const color =
    status === 'success'
      ? Colors.success
      : status === 'warning'
      ? Colors.warning
      : Colors.error;

  return (
    <View style={healthStyles.card}>
      <View style={[healthStyles.iconBox, {backgroundColor: `${color}18`}]}>
        <AppIcon name={icon} library="ionicons" size={20} color={color} />
      </View>
      <AppText variant="h4" weight="bold" color={color}>
        {value}%
      </AppText>
      <AppText variant="small" style={healthStyles.label}>
        {label}
      </AppText>
      {/* Mini progress bar */}
      <View style={healthStyles.barTrack}>
        <View style={[healthStyles.barFill, {width: `${value}%` as any, backgroundColor: color}]} />
      </View>
    </View>
  );
};

const healthStyles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    padding: Spacing.xs,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  label: {
    color: Colors.textMuted,
    textAlign: 'center',
  },
  barTrack: {
    width: '80%',
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.border,
    overflow: 'hidden',
    marginTop: 2,
  },
  barFill: {
    height: '100%',
    borderRadius: 2,
  },
});

const ServiceCenterCard: React.FC<{center: typeof MOCK_SERVICE_CENTERS[0]}> = ({center}) => (
  <TouchableOpacity activeOpacity={0.8} style={scStyles.card}>
    <View style={scStyles.left}>
      <View style={scStyles.iconBox}>
        <AppIcon name="build-outline" library="ionicons" size={20} color={Colors.primary} />
      </View>
      <View style={scStyles.textBox}>
        <AppText variant="body" weight="semiBold" numberOfLines={1}>
          {center.name}
        </AppText>
        <AppText variant="small" style={scStyles.address} numberOfLines={1}>
          {center.address}
        </AppText>
        <View style={scStyles.meta}>
          <Badge
            label={center.isOpen ? 'Open' : 'Closed'}
            variant={center.isOpen ? 'success' : 'error'}
            dot
          />
          <AppText variant="small" style={scStyles.distance}>
            {center.distanceKm} km away
          </AppText>
          <AppIcon name="star" library="ionicons" size={11} color={Colors.warning} />
          <AppText variant="small" style={scStyles.rating}>
            {center.rating}
          </AppText>
        </View>
      </View>
    </View>
    <AppIcon name="chevron-forward" library="ionicons" size={18} color={Colors.iconMuted} />
  </TouchableOpacity>
);

const scStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.card,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    gap: Spacing.md,
    marginBottom: Spacing.xs,
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    gap: Spacing.md,
    alignItems: 'center',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(184,220,0,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBox: {
    flex: 1,
    gap: 3,
  },
  address: {
    color: Colors.textMuted,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xxs + 2,
  },
  distance: {
    color: Colors.textMuted,
  },
  rating: {
    color: Colors.warning,
    fontWeight: '600',
  },
});

const SERVICE_HISTORY = [
  {date: '12 Jun 2026', type: 'Full Service', center: 'Hazratganj Hub', status: 'Completed'},
  {date: '28 Mar 2026', type: 'Tyre Change', center: 'Gomti Nagar', status: 'Completed'},
  {date: '15 Jan 2026', type: 'Battery Check', center: 'Hazratganj Hub', status: 'Completed'},
];

const ServiceHistoryRow: React.FC<{
  date: string;
  type: string;
  center: string;
  status: string;
}> = ({date, type, center, status}) => (
  <View style={shStyles.row}>
    <View style={shStyles.dotLine}>
      <View style={shStyles.dot} />
    </View>
    <View style={shStyles.content}>
      <View style={shStyles.topRow}>
        <AppText variant="body" weight="semiBold">{type}</AppText>
        <Badge label={status} variant="success" />
      </View>
      <AppText variant="small" style={shStyles.meta}>
        {center} • {date}
      </AppText>
    </View>
  </View>
);

const shStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  dotLine: {
    alignItems: 'center',
    paddingTop: 5,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    borderWidth: 2,
    borderColor: 'rgba(184,220,0,0.3)',
  },
  content: {
    flex: 1,
    gap: 4,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  meta: {
    color: Colors.textMuted,
  },
});

const styles = StyleSheet.create({
  container: {flex: 1},
  scroll: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.lg,
  },
  header: {
    gap: 4,
  },
  subtitle: {
    color: Colors.textMuted,
  },
  reminderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.card,
    borderWidth: 1,
    borderColor: 'rgba(255,200,87,0.2)',
    padding: Spacing.md,
    gap: Spacing.md,
  },
  reminderIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,200,87,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reminderText: {
    flex: 1,
    gap: 3,
  },
  reminderSubtext: {
    color: Colors.textMuted,
  },
  section: {
    gap: Spacing.md,
  },
  healthGrid: {
    flexDirection: 'row',
  },
});
