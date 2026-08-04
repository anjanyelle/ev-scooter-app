import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BatteryCharging, Home, Route, UserRound, Wrench } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';
import { useAuth } from '@/context/AuthContext';

import LoginScreen from '../../app/(auth)/login';
import OtpScreen from '../../app/(auth)/otp';
import SignupScreen from '../../app/(auth)/signup';
import ForgotPasswordScreen from '../../app/(auth)/forgot-password';
import ChargingScreen from '../../app/(tabs)/charging';
import HomeScreen from '../../app/(tabs)/home';
import ProfileScreen from '../../app/(tabs)/profile';
import RidesScreen from '../../app/(tabs)/rides';
import ServiceScreen from '../../app/(tabs)/service';
import AboutScreen from '../../app/about';
import SplashScreen from '../../app/index';
import NotificationsScreen from '../../app/notifications';
import TrackingScreen from '../../app/tracking';
import ViewerScreen from '../../app/viewer';
import { colors, fonts, layout, shadows } from '@/theme';

import { navigationRef } from './router';
import type { MainTabParamList, RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<MainTabParamList>();

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.primary,
    background: colors.background,
    card: colors.surface,
    text: colors.heading,
    border: colors.border,
    notification: colors.primary
  }
};

const TabBarBackground = () => <View style={[StyleSheet.absoluteFill, styles.tabBarBg]} />;
const HomeIcon = ({ color }: { color: string }) => <Home size={21} color={color} strokeWidth={2} />;
const RidesIcon = ({ color }: { color: string }) => <Route size={21} color={color} strokeWidth={2} />;
const ChargingIcon = () => (
  <View style={styles.centerButton}>
    <BatteryCharging size={28} color={colors.background} strokeWidth={2.6} fill={colors.primary} />
  </View>
);
const ServiceIcon = ({ color }: { color: string }) => <Wrench size={21} color={color} strokeWidth={2} />;
const ProfileIcon = ({ color }: { color: string }) => <UserRound size={21} color={color} strokeWidth={2} />;

function MainTabsNavigator() {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.background },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontFamily: fonts.medium, fontSize: 9, marginTop: 3 },
        tabBarStyle: styles.tabBar,
        tabBarBackground: TabBarBackground
      }}
    >
      <Tabs.Screen name="Home" component={HomeScreen} options={{ title: 'Home', tabBarIcon: HomeIcon }} />
      <Tabs.Screen name="Rides" component={RidesScreen} options={{ title: 'Rides', tabBarIcon: RidesIcon }} />
      <Tabs.Screen
        name="Charging"
        component={ChargingScreen}
        options={{
          title: 'Charging',
          tabBarLabelStyle: { marginTop: 8, fontFamily: fonts.medium, fontSize: 9 },
          tabBarIcon: ChargingIcon
        }}
      />
      <Tabs.Screen name="Service" component={ServiceScreen} options={{ title: 'Service', tabBarIcon: ServiceIcon }} />
      <Tabs.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile', tabBarIcon: ProfileIcon }} />
    </Tabs.Navigator>
  );
}

export function AppNavigator() {
  const { status } = useAuth();

  return (
    <NavigationContainer ref={navigationRef} theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'fade_from_bottom',
          animationDuration: 240,
          gestureEnabled: true
        }}
      >
        {status === 'loading' ? (
          <Stack.Screen name="Splash" component={SplashScreen} options={{ animation: 'fade' }} />
        ) : status === 'unauthenticated' ? (
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginScreen} options={{ animation: 'fade' }} />
            <Stack.Screen name="Signup" component={SignupScreen} options={{ animation: 'fade' }} />
            <Stack.Screen name="Otp" component={OtpScreen} options={{ animation: 'fade' }} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
              options={{ animation: 'slide_from_right' }}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="MainTabs" component={MainTabsNavigator} options={{ animation: 'fade' }} />
            <Stack.Screen name="Viewer" component={ViewerScreen} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="Tracking" component={TrackingScreen} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="About" component={AboutScreen} options={{ animation: 'slide_from_right' }} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBarBg: {
    backgroundColor: 'rgba(13,13,13,0.96)'
  },
  tabBar: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 10,
    height: layout.bottomTabHeight,
    borderTopWidth: 0,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    backgroundColor: 'rgba(13,13,13,0.9)',
    borderRadius: 22,
    paddingBottom: 7,
    paddingTop: 8,
    overflow: 'visible',
    ...shadows.card
  },
  centerButton: {
    width: 58,
    height: 58,
    marginTop: -26,
    borderRadius: 29,
    backgroundColor: colors.primary,
    borderWidth: 5,
    borderColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.primaryGlow
  }
});
