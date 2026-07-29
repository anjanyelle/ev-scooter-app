/**
 * ProfileScreen — User profile, stats, and settings menu
 * Matches the provided reference design exactly
 */
import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, Spacing, BorderRadius} from '../../../theme';
import {AppText} from '../../../components/atoms/AppText';
import {AppIcon} from '../../../components/atoms/AppIcon';
import {Badge} from '../../../components/atoms/Badge';
import {GlassCard} from '../../../components/molecules/GlassCard';
import {MenuRow} from '../../../components/molecules/MenuRow';
import {AppAvatar} from '../../../components/molecules/AppAvatar';
import {HeaderIconButton} from '../../../components/organisms/AppHeader';
import {MOCK_USER, RIDE_STATS} from '../../../constants/mockData';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {ProfileStackParamList} from '../../../types';

type Props = NativeStackScreenProps<ProfileStackParamList, 'ProfileMain'>;

const PROFILE_MENU = [
  {
    id: 'rider',
    icon: 'account-outline',
    library: 'material',
    label: 'Rider Profile',
    subtitle: 'Edit your personal information',
    screen: 'RiderProfile',
  },
  {
    id: 'devices',
    icon: 'bluetooth',
    library: 'material',
    label: 'Connected Devices',
    subtitle: 'Manage your connected devices',
    screen: 'ConnectedDevices',
  },
  {
    id: 'docs',
    icon: 'file-document-outline',
    library: 'material',
    label: 'Vehicle Documents',
    subtitle: 'View and manage vehicle documents',
    screen: 'VehicleDocuments',
  },
  {
    id: 'sub',
    icon: 'shield-check-outline',
    library: 'material',
    label: 'Subscription Plans',
    subtitle: 'View and manage your plans',
    screen: 'Subscription',
  },
  {
    id: 'support',
    icon: 'headphones',
    library: 'material',
    label: 'Support',
    subtitle: 'Roadside assistance, customer care & feedback',
    screen: 'Support',
  },
  {
    id: 'settings',
    icon: 'cog-outline',
    library: 'material',
    label: 'Settings',
    subtitle: 'App settings and preferences',
    screen: 'Settings',
  },
] as const;

export const ProfileScreen: React.FC<Props> = ({navigation}) => {
  const insets = useSafeAreaInsets();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to sign out?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            navigation.getParent()?.getParent()?.reset({
              index: 0,
              routes: [{name: 'Auth'}],
            });
          },
        },
      ],
    );
  };

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
          <View>
            <AppText variant="h2" weight="bold">
              User Profile
            </AppText>
            <AppText variant="small" style={styles.headerSubtitle}>
              Manage your profile and preferences
            </AppText>
          </View>
          <View style={styles.headerRight}>
            <HeaderIconButton icon="notifications-outline" badge />
            <HeaderIconButton icon="headset-outline" />
          </View>
        </View>

        {/* Profile Card */}
        <GlassCard padding={Spacing.lg} glowColor="rgba(184,220,0,0.12)">
          {/* User info row */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.profileRow}>
            <AppAvatar size={70} showCameraIcon glowRing />
            <View style={styles.profileInfo}>
              <AppText variant="h3" weight="bold">
                {MOCK_USER.name}
              </AppText>
              <AppText variant="small" style={styles.profileEmail}>
                {MOCK_USER.email}
              </AppText>
              <AppText variant="small" style={styles.profilePhone}>
                {MOCK_USER.phone}
              </AppText>
              {MOCK_USER.isVerified && (
                <Badge label="● Verified" variant="success" style={styles.verifiedBadge} />
              )}
            </View>
            <AppIcon name="chevron-forward" library="ionicons" size={20} color={Colors.iconMuted} />
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Stats row */}
          <View style={styles.statsRow}>
            <ProfileStat
              icon="scooter"
              library="material"
              label="Vehicle Connected"
              value={String(RIDE_STATS.vehiclesConnected)}
            />
            <View style={styles.statDivider} />
            <ProfileStat
              icon="bicycle-outline"
              library="ionicons"
              label="Total Rides"
              value={String(RIDE_STATS.totalRides)}
            />
            <View style={styles.statDivider} />
            <ProfileStat
              icon="leaf-outline"
              library="ionicons"
              label="CO₂ Saved"
              value={`${RIDE_STATS.co2SavedKg} kg`}
            />
          </View>
        </GlassCard>

        {/* Menu items */}
        <View style={styles.menuSection}>
          {PROFILE_MENU.map(item => (
            <MenuRow
              key={item.id}
              icon={item.icon}
              iconLibrary={item.library as 'material'}
              label={item.label}
              subtitle={item.subtitle}
              onPress={() => navigation.navigate(item.screen as any)}
            />
          ))}
        </View>

        {/* Logout */}
        <MenuRow
          icon="logout"
          iconLibrary="material"
          label="Logout"
          subtitle="Sign out from your account"
          onPress={handleLogout}
          iconColor={Colors.error}
          labelColor={Colors.error}
          style={styles.logoutRow}
        />
      </ScrollView>
    </LinearGradient>
  );
};

const ProfileStat: React.FC<{
  icon: string;
  library: 'ionicons' | 'material' | 'feather';
  label: string;
  value: string;
}> = ({icon, library, label, value}) => (
  <View style={statStyles.container}>
    <AppIcon name={icon} library={library} size={20} color={Colors.primary} />
    <AppText variant="small" style={statStyles.label} numberOfLines={1}>
      {label}
    </AppText>
    <AppText variant="h4" weight="bold" color={Colors.textHeading}>
      {value}
    </AppText>
  </View>
);

const statStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  label: {
    color: Colors.textMuted,
    textAlign: 'center',
  },
});

const styles = StyleSheet.create({
  container: {flex: 1},
  scroll: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerSubtitle: {
    color: Colors.textMuted,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  profileInfo: {
    flex: 1,
    gap: 3,
  },
  profileEmail: {
    color: Colors.textSecondary,
  },
  profilePhone: {
    color: Colors.textSecondary,
  },
  verifiedBadge: {
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginVertical: Spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border,
  },
  menuSection: {
    gap: Spacing.xs,
  },
  logoutRow: {},
});
