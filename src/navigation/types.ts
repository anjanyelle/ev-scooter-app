import type { NavigatorScreenParams } from '@react-navigation/native';

export type MainTabParamList = {
  Home: undefined;
  Rides: undefined;
  Charging: undefined;
  Service: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Signup: undefined;
  Otp: undefined;
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
  Viewer: undefined;
  Tracking: undefined;
  Notifications: undefined;
  About: undefined;
};

export type AppHref =
  | '/(auth)/login'
  | '/(auth)/signup'
  | '/(auth)/otp'
  | '/(tabs)/home'
  | '/(tabs)/rides'
  | '/(tabs)/charging'
  | '/(tabs)/service'
  | '/(tabs)/profile'
  | '/viewer'
  | '/tracking'
  | '/notifications'
  | '/about';
