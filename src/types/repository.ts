import type {
  AppNotification,
  AuthChallenge,
  AuthSession,
  ChargingPayload,
  DashboardPayload,
  RideStatsPayload,
  ServicePayload
} from './domain';

export interface AuthInput {
  identifier: string;
  password: string;
}

export interface OtpVerificationInput {
  challengeId: string;
  code: string;
}

export interface EVRepository {
  login(input: AuthInput): Promise<AuthChallenge>;
  signup(input: AuthInput & { name: string }): Promise<AuthChallenge>;
  verifyOtp(input: OtpVerificationInput): Promise<AuthSession>;
  resendOtp(challengeId: string): Promise<AuthChallenge>;
  getDashboard(): Promise<DashboardPayload>;
  getRideStats(period: 'day' | 'week' | 'month' | 'year'): Promise<RideStatsPayload>;
  getCharging(): Promise<ChargingPayload>;
  getNotifications(): Promise<AppNotification[]>;
  getService(): Promise<ServicePayload>;
  sendVehicleCommand(command: 'lock' | 'unlock' | 'lights' | 'horn' | 'stop_charging'): Promise<{ message: string }>;
  bookService(input: { dealerId: string; date: string; slot: string }): Promise<{ bookingId: string; message: string }>;
}
