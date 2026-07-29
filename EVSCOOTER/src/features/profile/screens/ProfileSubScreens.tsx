/**
 * Settings sub-screens barrel — all profile detail screens
 */

// ─── RiderProfileScreen ───────────────────────────────────────────────────────
import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, Spacing, BorderRadius} from '../../../theme';
import {AppText} from '../../../components/atoms/AppText';
import {AppButton} from '../../../components/atoms/AppButton';
import {AppInput} from '../../../components/atoms/AppInput';
import {AppIcon} from '../../../components/atoms/AppIcon';
import {AppAvatar} from '../../../components/molecules/AppAvatar';
import {MOCK_USER} from '../../../constants/mockData';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {ProfileStackParamList} from '../../../types';

type RiderProfileProps = NativeStackScreenProps<ProfileStackParamList, 'RiderProfile'>;

export const RiderProfileScreen: React.FC<RiderProfileProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState(MOCK_USER.name);
  const [email, setEmail] = useState(MOCK_USER.email);
  const [phone] = useState(MOCK_USER.phone);

  return (
    <LinearGradient colors={Colors.gradientHero} style={styles.container}>
      <View style={[styles.header, {paddingTop: insets.top + Spacing.md}]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <AppIcon name="arrow-back" library="ionicons" size={20} color={Colors.textHeading} />
        </TouchableOpacity>
        <AppText variant="h3" weight="bold">Rider Profile</AppText>
        <View style={{width: 36}} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarSection}>
          <AppAvatar size={90} showCameraIcon glowRing />
          <AppText variant="body" color={Colors.primary} style={styles.changePhoto}>
            Change Photo
          </AppText>
        </View>
        <View style={styles.form}>
          <AppInput label="Full Name" value={name} onChangeText={setName} suffixIcon="person-outline" />
          <AppInput label="Email Address" value={email} onChangeText={setEmail} keyboardType="email-address" suffixIcon="mail-outline" />
          <AppInput label="Mobile Number" value={phone} editable={false} suffixIcon="lock-closed-outline" containerStyle={styles.lockedInput} />
          <AppInput label="Date of Birth" value="15 Mar 1995" suffixIcon="calendar-outline" />
          <AppInput label="Gender" value="Male" suffixIcon="chevron-down-outline" />
        </View>
        <AppButton label="Save Changes" onPress={() => navigation.goBack()} icon="checkmark-outline" iconLibrary="ionicons" />
      </ScrollView>
    </LinearGradient>
  );
};

// ─── ConnectedDevicesScreen ───────────────────────────────────────────────────
type DevicesProps = NativeStackScreenProps<ProfileStackParamList, 'ConnectedDevices'>;

export const ConnectedDevicesScreen: React.FC<DevicesProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();

  const DEVICES = [
    {id: 'd1', name: 'Lexicon S1 Pro', type: 'scooter', connected: true, battery: 78},
    {id: 'd2', name: 'Samsung Galaxy S24', type: 'phone', connected: true},
    {id: 'd3', name: 'Xiaomi Mi Band 8', type: 'wearable', connected: false},
  ];

  return (
    <LinearGradient colors={Colors.gradientHero} style={styles.container}>
      <View style={[styles.header, {paddingTop: insets.top + Spacing.md}]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <AppIcon name="arrow-back" library="ionicons" size={20} color={Colors.textHeading} />
        </TouchableOpacity>
        <AppText variant="h3" weight="bold">Connected Devices</AppText>
        <TouchableOpacity style={styles.addBtn}>
          <AppIcon name="add" library="ionicons" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {DEVICES.map(device => (
          <View key={device.id} style={deviceStyles.card}>
            <View style={[deviceStyles.iconBox, {backgroundColor: device.connected ? 'rgba(184,220,0,0.1)' : Colors.glassBg}]}>
              <AppIcon
                name={device.type === 'scooter' ? 'scooter' : device.type === 'phone' ? 'phone-portrait-outline' : 'watch-outline'}
                library={device.type === 'scooter' ? 'material' : 'ionicons'}
                size={24}
                color={device.connected ? Colors.primary : Colors.iconMuted}
              />
            </View>
            <View style={deviceStyles.info}>
              <AppText variant="body" weight="semiBold">{device.name}</AppText>
              <AppText variant="small" style={[deviceStyles.status, {color: device.connected ? Colors.success : Colors.textMuted}]}>
                {device.connected ? '● Connected' : 'Not connected'}
                {device.battery ? `  •  ${device.battery}% battery` : ''}
              </AppText>
            </View>
            <AppIcon name={device.connected ? 'bluetooth' : 'bluetooth-outline'} library="ionicons" size={20} color={device.connected ? Colors.primary : Colors.iconMuted} />
          </View>
        ))}
        <AppButton label="Pair New Device" onPress={() => {}} variant="outline" icon="add-outline" iconLibrary="ionicons" iconPosition="left" style={styles.pairBtn} />
      </ScrollView>
    </LinearGradient>
  );
};

// ─── SettingsScreen ───────────────────────────────────────────────────────────
type SettingsProps = NativeStackScreenProps<ProfileStackParamList, 'Settings'>;

export const SettingsScreen: React.FC<SettingsProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();

  const SETTINGS = [
    {label: 'Notifications', icon: 'bell-outline', library: 'ionicons', value: 'Enabled'},
    {label: 'Language', icon: 'language-outline', library: 'ionicons', value: 'English'},
    {label: 'Theme', icon: 'moon-outline', library: 'ionicons', value: 'Dark'},
    {label: 'Units', icon: 'speedometer-outline', library: 'ionicons', value: 'Metric (km)'},
    {label: 'Privacy', icon: 'shield-outline', library: 'ionicons', value: ''},
    {label: 'About Lexicon', icon: 'information-circle-outline', library: 'ionicons', value: 'v1.0.0'},
    {label: 'Terms & Conditions', icon: 'document-text-outline', library: 'ionicons', value: ''},
  ];

  return (
    <LinearGradient colors={Colors.gradientHero} style={styles.container}>
      <View style={[styles.header, {paddingTop: insets.top + Spacing.md}]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <AppIcon name="arrow-back" library="ionicons" size={20} color={Colors.textHeading} />
        </TouchableOpacity>
        <AppText variant="h3" weight="bold">Settings</AppText>
        <View style={{width: 36}} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {SETTINGS.map((item, i) => (
          <TouchableOpacity key={i} style={settingStyles.row} activeOpacity={0.7}>
            <View style={settingStyles.iconBox}>
              <AppIcon name={item.icon} library={item.library as 'ionicons'} size={18} color={Colors.primary} />
            </View>
            <AppText variant="body" style={settingStyles.label}>{item.label}</AppText>
            <View style={settingStyles.right}>
              {item.value ? (
                <AppText variant="caption" style={settingStyles.value}>{item.value}</AppText>
              ) : null}
              <AppIcon name="chevron-forward" library="ionicons" size={16} color={Colors.iconMuted} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

// ─── SupportScreen ────────────────────────────────────────────────────────────
type SupportProps = NativeStackScreenProps<ProfileStackParamList, 'Support'>;

export const SupportScreen: React.FC<SupportProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();

  const SUPPORT_OPTIONS = [
    {icon: 'call-outline', label: 'Call Support', desc: '1800-LEXICON • 24/7 Available', library: 'ionicons'},
    {icon: 'chatbubble-outline', label: 'Live Chat', desc: 'Chat with our support team', library: 'ionicons'},
    {icon: 'car-outline', label: 'Roadside Assistance', desc: 'Emergency breakdown support', library: 'ionicons'},
    {icon: 'star-outline', label: 'Rate & Review', desc: 'Share your experience', library: 'ionicons'},
    {icon: 'bug-outline', label: 'Report a Bug', desc: 'Help us improve the app', library: 'ionicons'},
  ];

  return (
    <LinearGradient colors={Colors.gradientHero} style={styles.container}>
      <View style={[styles.header, {paddingTop: insets.top + Spacing.md}]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <AppIcon name="arrow-back" library="ionicons" size={20} color={Colors.textHeading} />
        </TouchableOpacity>
        <AppText variant="h3" weight="bold">Support</AppText>
        <View style={{width: 36}} />
      </View>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={supportStyles.heroBox}>
          <AppIcon name="headset-outline" library="ionicons" size={44} color={Colors.primary} />
          <AppText variant="h3" weight="bold" style={supportStyles.heroTitle}>How can we help?</AppText>
          <AppText variant="body" style={supportStyles.heroSubtext}>Our team is always here for you</AppText>
        </View>
        {SUPPORT_OPTIONS.map((opt, i) => (
          <TouchableOpacity key={i} style={supportStyles.card} activeOpacity={0.8}>
            <View style={supportStyles.iconBox}>
              <AppIcon name={opt.icon} library={opt.library as 'ionicons'} size={22} color={Colors.primary} />
            </View>
            <View style={supportStyles.textBox}>
              <AppText variant="body" weight="semiBold">{opt.label}</AppText>
              <AppText variant="small" style={supportStyles.desc}>{opt.desc}</AppText>
            </View>
            <AppIcon name="chevron-forward" library="ionicons" size={18} color={Colors.iconMuted} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

// ─── Shared Styles ────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {flex: 1},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.glassBg,
    borderWidth: 1,
    borderColor: Colors.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    backgroundColor: 'rgba(184,220,0,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(184,220,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.huge,
    gap: Spacing.md,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    gap: Spacing.sm,
  },
  changePhoto: {
    fontWeight: '600',
  },
  form: {
    gap: Spacing.md,
  },
  lockedInput: {
    opacity: 0.6,
  },
  pairBtn: {
    marginTop: Spacing.md,
  },
});

const deviceStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.card,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    gap: 3,
  },
  status: {},
});

const settingStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    backgroundColor: 'rgba(184,220,0,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    flex: 1,
    color: Colors.textBody,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  value: {
    color: Colors.textMuted,
  },
});

const supportStyles = StyleSheet.create({
  heroBox: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    gap: Spacing.sm,
  },
  heroTitle: {
    textAlign: 'center',
  },
  heroSubtext: {
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.card,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    gap: Spacing.md,
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
    gap: 2,
  },
  desc: {
    color: Colors.textMuted,
  },
});
