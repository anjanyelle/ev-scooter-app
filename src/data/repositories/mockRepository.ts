import {
  chargingFixture,
  dashboardFixture,
  mockUser,
  notificationsFixture,
  ridesFixture,
  serviceFixture
} from '@/data/fixtures/mockData';
import type { AuthChallenge, AuthSession, UserProfile } from '@/types/domain';
import type { AuthInput, EVRepository, OtpVerificationInput } from '@/types/repository';

const PREVIEW_OTP = '2468';
const sleep = (ms = 180) => new Promise<void>((resolve) => setTimeout(resolve, ms));
const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

function createChallenge(identifier: string): AuthChallenge {
  const normalized = identifier.trim();
  const deliveryHint = normalized.includes('@')
    ? normalized.replace(/^(.{1,2}).*(@.*)$/, '$1••••$2')
    : normalized.replace(/.(?=.{4})/g, '•');

  return {
    challengeId: `preview_challenge_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    deliveryHint: deliveryHint || 'your registered contact',
    expiresAt: new Date(Date.now() + 10 * 60_000).toISOString()
  };
}

function createSession(user: UserProfile): AuthSession {
  return {
    token: `preview_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    user: clone(user),
    createdAt: new Date().toISOString()
  };
}

export class MockEVRepository implements EVRepository {
  private pendingUser: UserProfile | null = null;
  private pendingChallenge: AuthChallenge | null = null;

  async login(input: AuthInput): Promise<AuthChallenge> {
    await sleep(500);
    this.pendingUser = {
      ...clone(mockUser),
      email: input.identifier.includes('@') ? input.identifier.trim() : mockUser.email,
      phone: input.identifier.includes('@') ? mockUser.phone : input.identifier.trim()
    };
    this.pendingChallenge = createChallenge(input.identifier);
    return clone(this.pendingChallenge);
  }

  async signup(input: AuthInput & { name: string }): Promise<AuthChallenge> {
    await sleep(650);
    const initials = input.name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('') || mockUser.avatarInitials;

    this.pendingUser = {
      ...clone(mockUser),
      name: input.name.trim(),
      avatarInitials: initials,
      email: input.identifier.includes('@') ? input.identifier.trim() : mockUser.email,
      phone: input.identifier.includes('@') ? mockUser.phone : input.identifier.trim()
    };
    this.pendingChallenge = createChallenge(input.identifier);
    return clone(this.pendingChallenge);
  }

  async verifyOtp(input: OtpVerificationInput): Promise<AuthSession> {
    await sleep(500);
    if (!this.pendingChallenge || this.pendingChallenge.challengeId !== input.challengeId) {
      throw new Error('The verification session is no longer valid.');
    }
    if (new Date(this.pendingChallenge.expiresAt).getTime() <= Date.now()) {
      throw new Error('The verification code has expired.');
    }
    if (input.code !== PREVIEW_OTP) {
      throw new Error('The verification code is incorrect.');
    }

    const session = createSession(this.pendingUser ?? clone(mockUser));
    this.pendingUser = null;
    this.pendingChallenge = null;
    return session;
  }

  async resendOtp(challengeId: string): Promise<AuthChallenge> {
    await sleep(450);
    if (!this.pendingChallenge || this.pendingChallenge.challengeId !== challengeId) {
      throw new Error('The verification session is no longer valid.');
    }
    this.pendingChallenge = {
      ...createChallenge(this.pendingChallenge.deliveryHint),
      deliveryHint: this.pendingChallenge.deliveryHint
    };
    return clone(this.pendingChallenge);
  }

 async getDashboard() {
  await sleep(120);
  return clone(dashboardFixture);
}

  async getRideStats(period: 'day' | 'week' | 'month' | 'year') {
    await sleep(550);
    const data = clone(ridesFixture);
    const multiplier = period === 'day' ? 1 : period === 'week' ? 6.4 : period === 'month' ? 24.8 : 281;
    if (period !== 'day') {
      data.todayDistanceKm = Number((data.todayDistanceKm * multiplier).toFixed(1));
      data.chart = data.chart.map((point, index) => ({
        label: point.label,
        value: Number((point.value * (0.75 + index * 0.06) * multiplier).toFixed(1))
      }));
    }
    return data;
  }

 async getCharging() {
  await sleep(120);
  return clone(chargingFixture);
}

  async getNotifications() {
    await sleep(300);
    return clone(notificationsFixture);
  }

  async getService() {
    await sleep(200);
    return clone(serviceFixture);
  }

  async sendVehicleCommand(command: 'lock' | 'unlock' | 'lights' | 'horn' | 'stop_charging') {
    await sleep(320);
    const copy: Record<typeof command, string> = {
      lock: 'Scooter locked securely',
      unlock: 'Scooter unlocked for 60 seconds',
      lights: 'Headlights flashed twice',
      horn: 'Horn sounded for 1 second',
      stop_charging: 'Charging stopped safely'
    };
    return { message: copy[command] };
  }

  async bookService(input: { dealerId: string; date: string; slot: string }) {
    await sleep(800);
    return {
      bookingId: `LEX-SVC-${Math.floor(100000 + Math.random() * 900000)}`,
      message: `Service booked for ${input.date} at ${input.slot}`
    };
  }
}
