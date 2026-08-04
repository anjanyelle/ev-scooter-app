import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { evRepository } from '@/data/repository';
import { clearStoredSession, getStoredSession, setStoredSession } from '@/storage/sessionStorage';
import type { AuthChallenge, AuthSession } from '@/types/domain';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface AuthContextValue {
  session: AuthSession | null;
  authChallenge: AuthChallenge | null;
  status: AuthStatus;
  beginLogin: (identifier: string, password: string) => Promise<void>;
  beginSignup: (name: string, identifier: string, password: string) => Promise<void>;
  verifyOtp: (code: string) => Promise<void>;
  resendOtp: () => Promise<void>;
  cancelAuthentication: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [authChallenge, setAuthChallenge] = useState<AuthChallenge | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    let active = true;
    getStoredSession()
      .then((storedSession) => {
        if (!active) return;
        if (storedSession) {
          setSession(storedSession);
          setStatus('authenticated');
        } else {
          setStatus('unauthenticated');
        }
      })
      .catch(() => {
        if (active) setStatus('unauthenticated');
      });
    return () => {
      active = false;
    };
  }, []);

  const beginLogin = useCallback(async (identifier: string, password: string) => {
    const challenge = await evRepository.login({ identifier: identifier.trim(), password });
    setAuthChallenge(challenge);
  }, []);

  const beginSignup = useCallback(async (name: string, identifier: string, password: string) => {
    const challenge = await evRepository.signup({ name: name.trim(), identifier: identifier.trim(), password });
    setAuthChallenge(challenge);
  }, []);

  const verifyOtp = useCallback(async (code: string) => {
    if (!authChallenge) throw new Error('Your verification session has expired. Start again.');
    const verified = await evRepository.verifyOtp({ challengeId: authChallenge.challengeId, code });
    await setStoredSession(verified);
    setSession(verified);
    setAuthChallenge(null);
    setStatus('authenticated');
  }, [authChallenge]);

  const resendOtp = useCallback(async () => {
    if (!authChallenge) throw new Error('Your verification session has expired. Start again.');
    const refreshed = await evRepository.resendOtp(authChallenge.challengeId);
    setAuthChallenge(refreshed);
  }, [authChallenge]);

  const cancelAuthentication = useCallback(() => {
    setAuthChallenge(null);
  }, []);

  const logout = useCallback(async () => {
    setSession(null);
    setAuthChallenge(null);
    setStatus('unauthenticated');
    void clearStoredSession().catch(() => undefined);
  }, []);

  const value = useMemo(
    () => ({ session, authChallenge, status, beginLogin, beginSignup, verifyOtp, resendOtp, cancelAuthentication, logout }),
    [session, authChallenge, status, beginLogin, beginSignup, verifyOtp, resendOtp, cancelAuthentication, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  return value;
}
