/**
 * ProfileNavigator — Stack for profile + all settings sub-screens
 */
import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {ProfileStackParamList} from '../types';
import {Colors, Spacing, BorderRadius} from '../theme';
import {AppText} from '../components/atoms/AppText';
import {AppIcon} from '../components/atoms/AppIcon';
import {ProfileScreen} from '../features/profile/screens/ProfileScreen';
import {
  RiderProfileScreen,
  ConnectedDevicesScreen,
  SettingsScreen,
  SupportScreen,
} from '../features/profile/screens/ProfileSubScreens';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

// Generic placeholder for screens not yet implemented
const ComingSoonScreen: React.FC<any> = ({route, navigation}) => {
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient colors={Colors.gradientHero} style={placeholderStyles.container}>
      <View style={[placeholderStyles.header, {paddingTop: insets.top + Spacing.md}]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={placeholderStyles.backBtn}>
          <AppIcon name="arrow-back" library="ionicons" size={20} color={Colors.textHeading} />
        </TouchableOpacity>
        <AppText variant="h3" weight="bold">
          {route.name.replace(/([A-Z])/g, ' $1').trim()}
        </AppText>
        <View style={{width: 36}} />
      </View>
      <View style={placeholderStyles.body}>
        <AppIcon name="construct-outline" library="ionicons" size={52} color={Colors.border} />
        <AppText variant="h3" style={placeholderStyles.title}>
          Coming Soon
        </AppText>
        <AppText variant="body" style={placeholderStyles.subtitle}>
          This screen is under development
        </AppText>
      </View>
    </LinearGradient>
  );
};

const placeholderStyles = StyleSheet.create({
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
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
  },
  title: {
    color: Colors.textMuted,
  },
  subtitle: {
    color: Colors.textDisabled,
    textAlign: 'center',
  },
});

export const ProfileNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileMain"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: {backgroundColor: '#050505'},
      }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="RiderProfile" component={RiderProfileScreen} />
      <Stack.Screen name="ConnectedDevices" component={ConnectedDevicesScreen} />
      <Stack.Screen name="VehicleDocuments" component={ComingSoonScreen} />
      <Stack.Screen name="Subscription" component={ComingSoonScreen} />
      <Stack.Screen name="Support" component={SupportScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Notifications" component={ComingSoonScreen} />
    </Stack.Navigator>
  );
};
