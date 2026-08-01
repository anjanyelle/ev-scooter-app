import * as Keychain from 'react-native-keychain';

import type { AuthSession } from '@/types/domain';

const SESSION_KEY = 'lexicon.auth.session.v1';

function isAuthSession(value: unknown): value is AuthSession {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<AuthSession>;
  return (
    typeof candidate.token === 'string' &&
    candidate.token.length > 0 &&
    typeof candidate.createdAt === 'string' &&
    Boolean(candidate.user) &&
    typeof candidate.user?.id === 'string'
  );
}

export async function getStoredSession(): Promise<AuthSession | null> {
  try {
    const credentials = await Keychain.getGenericPassword({ service: SESSION_KEY });
    if (!credentials) return null;
    const parsed: unknown = JSON.parse(credentials.password);
    if (!isAuthSession(parsed)) {
      await Keychain.resetGenericPassword({ service: SESSION_KEY });
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export async function getStoredAccessToken(): Promise<string | null> {
  const session = await getStoredSession();
  return session?.token ?? null;
}

export async function setStoredSession(session: AuthSession): Promise<void> {
  const stored = await Keychain.setGenericPassword(SESSION_KEY, JSON.stringify(session), {
    service: SESSION_KEY,
    storage: Keychain.STORAGE_TYPE.AES_GCM_NO_AUTH
  });
  if (!stored) throw new Error('Unable to store the authenticated session securely.');
}

export async function clearStoredSession(): Promise<void> {
  await Keychain.resetGenericPassword({ service: SESSION_KEY });
}
