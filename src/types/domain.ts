export type VehicleStatus = 'parked' | 'riding' | 'charging' | 'offline';
export type ChargingType = 'AC' | 'DC';
export type NotificationType =
  | 'battery'
  | 'charging'
  | 'theft'
  | 'tow'
  | 'crash'
  | 'ota'
  | 'service';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarInitials: string;
}

export interface VehicleTelemetry {
  vin: string;
  model: string;
  nickname: string;
  registrationNumber: string;
  firmwareVersion: string;
  batteryPercentage: number;
  range: number;
  batteryHealth: number;
  temperature: number;
  odometerKm: number;
  status: VehicleStatus;
  isLocked: boolean;
  isCharging: boolean;
  lastSyncAt: string;
  location: GeoPoint;
  lastParkedLocation: GeoPoint;
}

export interface GeoPoint {
  latitude: number;
  longitude: number;
  label: string;
  address: string;
}

export interface HealthMetric {
  id: string;
  label: string;
  value: string;
  status: 'good' | 'attention' | 'critical';
  detail: string;
}

export interface DashboardPayload {
  user: UserProfile;
  vehicle: VehicleTelemetry;
  health: HealthMetric[];
  carbonSavedKg: number;
  nextServiceKm: number;
}

export interface RideRecord {
  id: string;
  startedAt: string;
  from: string;
  to: string;
  distanceKm: number;
  durationMinutes: number;
  averageSpeedKmph: number;
  maxSpeedKmph: number;
  energyWhPerKm: number;
  ecoScore: number;
  route: Array<{ x: number; y: number }>;
}

export interface RideStatsPayload {
  totalDistanceKm: number;
  todayDistanceKm: number;
  averageSpeedKmph: number;
  energyWhPerKm: number;
  rideTimeMinutes: number;
  ecoScore: number;
  trendPercent: {
    totalDistance: number;
    todayDistance: number;
    averageSpeed: number;
    energy: number;
    rideTime: number;
  };
  chart: Array<{ label: string; value: number }>;
  rides: RideRecord[];
  tripDetails: {
    maxSpeedKmph: number;
    maxDistanceKm: number;
    maxRideMinutes: number;
    maxEfficiencyWhPerKm: number;
  };
}

export interface ChargingSession {
  id: string;
  startedAt: string;
  stationName: string;
  energyKWh: number;
  durationMinutes: number;
  cost: number;
  type: ChargingType;
}

export interface ChargingStation {
  id: string;
  name: string;
  distanceKm: number;
  address: string;
  type: ChargingType;
  availablePorts: number;
  totalPorts: number;
  powerKw: number;
}

export interface ChargingPayload {
  batteryPercentage: number;
  status: 'charging' | 'not_charging';
  timeToFullMinutes: number;
  powerKw: number;
  currentRangeKm: number;
  currentSessionCost: number;
  currentSessionMinutes: number;
  homeChargerName: string;
  summary: {
    sessions: number;
    totalEnergyKWh: number;
    totalCost: number;
    averageCostPerKWh: number;
  };
  nearbyStations: ChargingStation[];
  sessions: ChargingSession[];
}

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  severity: 'info' | 'success' | 'warning' | 'critical';
}

export interface Dealer {
  id: string;
  name: string;
  address: string;
  distanceKm: number;
  rating: number;
  nextAvailable: string;
}

export interface VehicleDocument {
  id: string;
  type: 'insurance' | 'warranty' | 'invoice';
  title: string;
  subtitle: string;
  status: string;
  validUntil?: string;
}

export interface ServicePayload {
  nextServiceDue: string;
  nextServiceKm: number;
  dealers: Dealer[];
  documents: VehicleDocument[];
  serviceHistory: Array<{
    id: string;
    date: string;
    title: string;
    odometerKm: number;
    dealer: string;
  }>;
}

export interface AuthChallenge {
  challengeId: string;
  deliveryHint: string;
  expiresAt: string;
}

export interface AuthSession {
  token: string;
  user: UserProfile;
  createdAt: string;
}

export interface UserPreferences {
  theme: 'amoled' | 'system' | 'soft-dark';
  pushNotifications: boolean;
  securityAlerts: boolean;
  chargingAlerts: boolean;
  serviceReminders: boolean;
  biometricUnlock: boolean;
}
