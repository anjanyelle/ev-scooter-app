import type {
  AppNotification,
  AuthChallenge,
  AuthSession,
  ChargingPayload,
  DashboardPayload,
  RideStatsPayload,
  ServicePayload
} from '@/types/domain';
import type { AuthInput, EVRepository, OtpVerificationInput } from '@/types/repository';

interface HttpRepositoryOptions {
  baseUrl: string;
  getToken: () => Promise<string | null>;
  timeoutMs?: number;
}

interface ErrorPayload {
  message?: string;
  code?: string;
  error?: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number | null,
    readonly code: string,
    readonly requestId: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const RETRYABLE_STATUS = new Set([502, 503, 504]);

function createRequestId() {
  return `lex-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

function sleep(milliseconds: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, milliseconds));
}

function normalizeBaseUrl(value: string) {
  const baseUrl = value.trim().replace(/\/+$/, '');
  let parsed: URL;

  try {
    parsed = new URL(baseUrl);
  } catch {
    throw new Error('LEXICON_API_BASE_URL must be an absolute URL.');
  }

  const localDevelopmentHost = ['localhost', '127.0.0.1', '10.0.2.2'].includes(parsed.hostname);
  if (parsed.protocol !== 'https:' && !(parsed.protocol === 'http:' && localDevelopmentHost)) {
    throw new Error('LEXICON_API_BASE_URL must use HTTPS. HTTP is allowed only for local Android development.');
  }

  return baseUrl;
}

export class HttpEVRepository implements EVRepository {
  private readonly baseUrl: string;
  private readonly timeoutMs: number;

  constructor(private readonly options: HttpRepositoryOptions) {
    this.baseUrl = normalizeBaseUrl(options.baseUrl);
    this.timeoutMs = options.timeoutMs ?? 15_000;
  }

  private async request<T>(path: string, init: RequestInit = {}, attempt = 0): Promise<T> {
    const requestId = createRequestId();
    const token = await this.options.getToken();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);
    const method = (init.method ?? 'GET').toUpperCase();

    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        ...init,
        signal: controller.signal,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Request-Id': requestId,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(init.headers ?? {})
        }
      });

      const raw = await response.text();
      let payload: unknown = null;
      if (raw) {
        try {
          payload = JSON.parse(raw) as unknown;
        } catch {
          payload = raw;
        }
      }

      if (!response.ok) {
        if (method === 'GET' && RETRYABLE_STATUS.has(response.status) && attempt < 2) {
          await sleep(350 * 2 ** attempt);
          return this.request<T>(path, init, attempt + 1);
        }

        const errorPayload = typeof payload === 'object' && payload ? (payload as ErrorPayload) : null;
        const message =
          errorPayload?.message ??
          errorPayload?.error ??
          (typeof payload === 'string' ? payload : null) ??
          `Request failed with HTTP ${response.status}`;
        throw new ApiError(message, response.status, errorPayload?.code ?? 'HTTP_ERROR', requestId);
      }

      return payload as T;
    } catch (error) {
      if (error instanceof ApiError) throw error;

      const isAbort = error instanceof Error && error.name === 'AbortError';
      if (method === 'GET' && !isAbort && attempt < 2) {
        await sleep(350 * 2 ** attempt);
        return this.request<T>(path, init, attempt + 1);
      }

      throw new ApiError(
        isAbort ? 'The server took too long to respond.' : 'Unable to reach the LEXICON service.',
        null,
        isAbort ? 'REQUEST_TIMEOUT' : 'NETWORK_ERROR',
        requestId
      );
    } finally {
      clearTimeout(timeout);
    }
  }

  login(input: AuthInput): Promise<AuthChallenge> {
    return this.request('/auth/login', { method: 'POST', body: JSON.stringify(input) });
  }

  signup(input: AuthInput & { name: string }): Promise<AuthChallenge> {
    return this.request('/auth/signup', { method: 'POST', body: JSON.stringify(input) });
  }

  verifyOtp(input: OtpVerificationInput): Promise<AuthSession> {
    return this.request('/auth/verify-otp', { method: 'POST', body: JSON.stringify(input) });
  }

  resendOtp(challengeId: string): Promise<AuthChallenge> {
    return this.request('/auth/resend-otp', { method: 'POST', body: JSON.stringify({ challengeId }) });
  }

  getDashboard(): Promise<DashboardPayload> {
    return this.request('/vehicle/current-status');
  }

  getRideStats(period: 'day' | 'week' | 'month' | 'year'): Promise<RideStatsPayload> {
    return this.request(`/rides/statistics?period=${encodeURIComponent(period)}`);
  }

  getCharging(): Promise<ChargingPayload> {
    return this.request('/charging/overview');
  }

  getNotifications(): Promise<AppNotification[]> {
    return this.request('/notifications');
  }

  getService(): Promise<ServicePayload> {
    return this.request('/service/overview');
  }

  sendVehicleCommand(command: 'lock' | 'unlock' | 'lights' | 'horn' | 'stop_charging') {
    return this.request<{ message: string }>('/vehicle/commands', {
      method: 'POST',
      headers: { 'Idempotency-Key': createRequestId() },
      body: JSON.stringify({ command })
    });
  }

  bookService(input: { dealerId: string; date: string; slot: string }) {
    return this.request<{ bookingId: string; message: string }>('/service/bookings', {
      method: 'POST',
      headers: { 'Idempotency-Key': createRequestId() },
      body: JSON.stringify(input)
    });
  }
}
