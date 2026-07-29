/**
 * Lexicon EV Scooter — Shared TypeScript Types
 */

// ─── Navigation Types ──────────────────────────────────────────────────────
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  OTP: {phoneNumber: string; isRegistering?: boolean};
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Rides: undefined;
  Navigation: undefined;
  Service: undefined;
  Profile: undefined;
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  RiderProfile: undefined;
  ConnectedDevices: undefined;
  VehicleDocuments: undefined;
  Subscription: undefined;
  Support: undefined;
  Settings: undefined;
  Notifications: undefined;
};

// ─── Data Types ────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  isVerified: boolean;
}

export interface Vehicle {
  id: string;
  model: string;
  color: string;
  plateNumber: string;
  batteryPercent: number;
  rangeKm: number;
  isLocked: boolean;
  isOnline: boolean;
  lastSeen: string;
  odometer: number;
  speedMode: SpeedMode;
}

export type SpeedMode = 'eco' | 'city' | 'sport';

export interface Ride {
  id: string;
  date: string;
  duration: string;
  distanceKm: number;
  energyUsed: number;
  cost: number;
  startLocation: string;
  endLocation: string;
  maxSpeed: number;
  avgSpeed: number;
  co2Saved: number;
}

export interface ServiceCenter {
  id: string;
  name: string;
  address: string;
  distanceKm: number;
  rating: number;
  isOpen: boolean;
  phone: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'alert' | 'info' | 'success' | 'warning';
  isRead: boolean;
  timestamp: string;
}

export interface RecentDestination {
  id: string;
  name: string;
  address: string;
  timestamp: string;
}

export interface FavouritePlace {
  id: string;
  label: string;
  address?: string;
  icon: string;
}

// ─── Component Prop Types ──────────────────────────────────────────────────

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'default';
export type TextVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'bodyLarge'
  | 'body'
  | 'caption'
  | 'small';
