import {
  BadgeHelp,
  BellRing,
  Bluetooth,
  ChevronRight,
  CircleUserRound,
  FileText,
  Fingerprint,
  Headphones,
  Info,
  LogOut,
  MoonStar,
  PhoneCall,
  ShieldAlert,
  Smartphone,
  Wrench
} from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useRouter } from '@/navigation/router';
import { useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import {
  AppButton,
  BottomSheet,
  Chip,
  ErrorState,
  GlassCard,
  Screen,
  ScreenHeader,
  SectionHeader,
  Skeleton,
  ToggleRow
} from '@/components/ui';
import { runtimeConfig } from '@/config/runtime';
import { useAuth } from '@/context/AuthContext';
import { usePreferences } from '@/context/PreferencesContext';
import { useToast } from '@/context/ToastContext';
import { evRepository } from '@/data/repository';
import { requestNotificationPermission } from '@/services/notifications';
import { useAsyncResource } from '@/hooks/useAsyncResource';
import { colors, fonts, spacing } from '@/theme';
import type { UserPreferences } from '@/types/domain';
import { formatNumber } from '@/utils/format';

const themes: Array<{ key: UserPreferences['theme']; label: string }> = [
  { key: 'amoled', label: 'AMOLED' },
  { key: 'soft-dark', label: 'Soft dark' },
  { key: 'system', label: 'System' }
];

export default function ProfileScreen() {
  const router = useRouter();
  const { session, logout } = useAuth();
  const { preferences, updatePreference } = usePreferences();
  const { showToast } = useToast();
  const resource = useAsyncResource(() => evRepository.getDashboard(), []);
  const [logoutSheet, setLogoutSheet] = useState(false);

  const handleLogout = async () => {
    setLogoutSheet(false);
    await logout();
    router.replace('/(auth)/login');
  };

  if (resource.loading) {
    return (
      <Screen header={<ScreenHeader title="Profile" subtitle="Account, vehicle and preferences" />}>
        <Skeleton height={144} radius={24} />
        <Skeleton height={190} radius={24} />
        <Skeleton height={280} radius={24} />
      </Screen>
    );
  }

  if (resource.error || !resource.data) {
    return (
      <Screen header={<ScreenHeader title="Profile" subtitle="Account, vehicle and preferences" />}>
        <ErrorState onRetry={resource.reload} />
      </Screen>
    );
  }

  const user = session?.user ?? resource.data.user;
  const vehicle = resource.data.vehicle;

  return (
    <>
      <Screen
        header={<ScreenHeader title="Profile" subtitle="Account, vehicle and preferences" />}
        refreshing={resource.refreshing}
        onRefresh={() => void resource.reload()}
      >

        <GlassCard style={styles.identityCard}>
          <View style={styles.avatar}><Text style={styles.avatarText}>{user.avatarInitials}</Text></View>
          <View style={styles.identityCopy}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.contact}>{user.email}</Text>
            <Text style={styles.contact}>{user.phone}</Text>
          </View>
          <View style={styles.verifiedBadge}><ShieldAlert size={14} color={colors.primary} /><Text style={styles.verifiedText}>Verified</Text></View>
        </GlassCard>

        <SectionHeader title="Your vehicle" subtitle="Connected vehicle and cloud services" />
        <GlassCard>
          <View style={styles.vehicleHeader}>
            <View style={styles.vehicleIcon}><Smartphone size={23} color={colors.primary} /></View>
            <View style={styles.identityCopy}>
              <Text style={styles.vehicleTitle}>{vehicle.model}</Text>
              <Text style={styles.vehicleSub}>{vehicle.nickname} · {vehicle.registrationNumber}</Text>
            </View>
            <View style={styles.onlineDot} />
          </View>
          <View style={styles.detailsGrid}>
            <Detail label="VIN" value={vehicle.vin} />
            <Detail label="Firmware" value={vehicle.firmwareVersion} />
            <Detail label="Odometer" value={`${formatNumber(vehicle.odometerKm, 0)} km`} />
            <Detail label="Connectivity" value="LTE · GPS · BLE" />
          </View>
        </GlassCard>

        <SectionHeader title="Appearance" />
        <GlassCard>
          <View style={styles.settingLead}>
            <View style={styles.settingIcon}><MoonStar size={19} color={colors.primary} /></View>
            <View style={styles.settingCopy}><Text style={styles.settingTitle}>Theme</Text><Text style={styles.settingSubtitle}>AMOLED is optimized for deeper blacks</Text></View>
          </View>
          <View style={styles.chipRow}>
            {themes.map((theme) => (
              <Chip key={theme.key} label={theme.label} active={preferences.theme === theme.key} onPress={() => updatePreference('theme', theme.key)} />
            ))}
          </View>
        </GlassCard>

        <SectionHeader title="Notifications & security" />
        <GlassCard padding={0}>
          <ToggleRow
            icon={BellRing}
            title="Push notifications"
            subtitle="Ride, vehicle and account updates"
            value={preferences.pushNotifications}
            onValueChange={(value) => {
              if (!value) {
                updatePreference('pushNotifications', false);
                return;
              }
              void requestNotificationPermission().then((granted) => {
                updatePreference('pushNotifications', granted);
                if (!granted) showToast('Notifications are disabled in Android settings.', 'warning');
              });
            }}
          />
          <ToggleRow icon={ShieldAlert} title="Security alerts" subtitle="Theft, tow, crash and movement events" value={preferences.securityAlerts} onValueChange={(value) => updatePreference('securityAlerts', value)} />
          <ToggleRow icon={Bluetooth} title="Charging alerts" subtitle="Plug-in, progress and completion" value={preferences.chargingAlerts} onValueChange={(value) => updatePreference('chargingAlerts', value)} />
          <ToggleRow icon={Wrench} title="Service reminders" subtitle="Maintenance and warranty milestones" value={preferences.serviceReminders} onValueChange={(value) => updatePreference('serviceReminders', value)} />
          <ToggleRow icon={Fingerprint} title="Biometric unlock" subtitle="Require device authentication for lock commands" value={preferences.biometricUnlock} onValueChange={(value) => updatePreference('biometricUnlock', value)} showDivider={false} />
        </GlassCard>

        <SectionHeader title="Support & app" />
        <GlassCard padding={0}>
          <MenuRow
            icon={PhoneCall}
            title="Roadside assistance"
            subtitle="24×7 priority support"
            onPress={() => {
              if (!runtimeConfig.roadsideAssistancePhone) {
                showToast('Roadside assistance number is not configured.', 'warning');
                return;
              }
              void Linking.openURL(`tel:${runtimeConfig.roadsideAssistancePhone}`);
            }}
          />
          <MenuRow icon={Headphones} title="Customer care" subtitle="Chat or call a LEXICON specialist" onPress={() => showToast('Customer care channel is not configured.', 'warning')} />
          <MenuRow icon={FileText} title="Documents" subtitle="Insurance, warranty and invoice" onPress={() => router.push('/(tabs)/service')} />
          <MenuRow icon={Info} title="About LEXICON" subtitle="Brand story, website and legal" onPress={() => router.push('/about')} />
          <MenuRow icon={BadgeHelp} title="App diagnostics" subtitle={`Version 1.1.0 · ${runtimeConfig.repositoryMode.toUpperCase()} · ${runtimeConfig.buildEnvironment}`} onPress={() => showToast('App diagnostics are healthy.', 'success')} />
        </GlassCard>

        <AppButton label="Log out" icon={LogOut} variant="danger" onPress={() => setLogoutSheet(true)} />
        <Text style={styles.footer}>LEXICON companion · React Native + TypeScript · Android</Text>
      </Screen>

      <BottomSheet visible={logoutSheet} onClose={() => setLogoutSheet(false)} title="Log out of LEXICON?" subtitle="Your local session will be removed from this device.">
        <View style={styles.sheetButtons}>
          <AppButton label="Stay signed in" variant="outline" onPress={() => setLogoutSheet(false)} />
          <AppButton label="Log out" variant="danger" icon={LogOut} onPress={handleLogout} />
        </View>
      </BottomSheet>
    </>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return <View style={styles.detail}><Text style={styles.detailLabel}>{label}</Text><Text style={styles.detailValue} numberOfLines={1}>{value}</Text></View>;
}

function MenuRow({ icon: Icon, title, subtitle, onPress }: { icon: LucideIcon; title: string; subtitle: string; onPress: () => void }) {
  return (
    <Pressable style={styles.menuRow} onPress={onPress}>
      <View style={styles.menuIcon}><Icon size={19} color={colors.primary} /></View>
      <View style={styles.settingCopy}><Text style={styles.settingTitle}>{title}</Text><Text style={styles.settingSubtitle}>{subtitle}</Text></View>
      <ChevronRight size={18} color={colors.muted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  identityCard: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  avatar: { width: 64, height: 64, borderRadius: 22, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: colors.background, fontFamily: fonts.bold, fontSize: 20 },
  identityCopy: { flex: 1, gap: 3 },
  name: { color: colors.heading, fontFamily: fonts.bold, fontSize: 19 },
  contact: { color: colors.secondary, fontFamily: fonts.regular, fontSize: 10 },
  verifiedBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 9, paddingVertical: 6, borderRadius: 20, backgroundColor: `${colors.primary}12`, borderWidth: 1, borderColor: `${colors.primary}45` },
  verifiedText: { color: colors.primary, fontFamily: fonts.semibold, fontSize: 8 },
  vehicleHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  vehicleIcon: { width: 48, height: 48, borderRadius: 16, backgroundColor: `${colors.primary}12`, alignItems: 'center', justifyContent: 'center' },
  vehicleTitle: { color: colors.heading, fontFamily: fonts.semibold, fontSize: 14 },
  vehicleSub: { color: colors.secondary, fontFamily: fonts.regular, fontSize: 9 },
  onlineDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: colors.success, shadowColor: colors.success, shadowOpacity: 0.8, shadowRadius: 8 },
  detailsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.lg },
  detail: { width: '47%', flexGrow: 1, padding: spacing.sm, borderRadius: 17, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, gap: 4 },
  detailLabel: { color: colors.muted, fontFamily: fonts.regular, fontSize: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  detailValue: { color: colors.body, fontFamily: fonts.medium, fontSize: 10 },
  settingLead: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  settingIcon: { width: 42, height: 42, borderRadius: 14, backgroundColor: `${colors.primary}12`, alignItems: 'center', justifyContent: 'center' },
  settingCopy: { flex: 1, gap: 3 },
  settingTitle: { color: colors.heading, fontFamily: fonts.semibold, fontSize: 12 },
  settingSubtitle: { color: colors.muted, fontFamily: fonts.regular, fontSize: 9, lineHeight: 13 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginTop: spacing.md },
  menuRow: { minHeight: 70, flexDirection: 'row', alignItems: 'center', gap: spacing.sm, paddingHorizontal: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.divider },
  menuIcon: { width: 40, height: 40, borderRadius: 14, backgroundColor: `${colors.primary}10`, alignItems: 'center', justifyContent: 'center' },
  sheetButtons: { gap: spacing.sm },
  footer: { color: colors.muted, fontFamily: fonts.regular, fontSize: 9, textAlign: 'center' }
});
