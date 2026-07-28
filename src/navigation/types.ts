/**
 * Navigation Types
 * Type definitions for React Navigation
 */

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Registration: undefined;
  OTP: { phoneNumber?: string };
  ForgotPassword: undefined;
};

export type MainStackParamList = {
  Dashboard: undefined;
  Profile: undefined;
  Settings: undefined;
  RideHistory: undefined;
  Wallet: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Scan: undefined;
  Profile: undefined;
};

// Screen names for type-safe navigation
export const SCREEN_NAMES = {
  // Auth screens
  LOGIN: 'Login' as const,
  REGISTRATION: 'Registration' as const,
  OTP: 'OTP' as const,
  FORGOT_PASSWORD: 'ForgotPassword' as const,
  
  // Main screens
  DASHBOARD: 'Dashboard' as const,
  PROFILE: 'Profile' as const,
  SETTINGS: 'Settings' as const,
  RIDE_HISTORY: 'RideHistory' as const,
  WALLET: 'Wallet' as const,
  
  // Bottom tabs
  HOME: 'Home' as const,
  SCAN: 'Scan' as const,
} as const;

export type ScreenName = typeof SCREEN_NAMES[keyof typeof SCREEN_NAMES];