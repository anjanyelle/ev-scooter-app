import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import type { UserPreferences } from '@/types/domain';

const PREFERENCES_KEY = 'lexicon.user.preferences';

const defaults: UserPreferences = {
  theme: 'amoled',
  pushNotifications: false,
  securityAlerts: true,
  chargingAlerts: true,
  serviceReminders: true,
  biometricUnlock: false
};

interface PreferencesContextValue {
  preferences: UserPreferences;
  updatePreference: <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => void;
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState(defaults);

  useEffect(() => {
    AsyncStorage.getItem(PREFERENCES_KEY)
      .then((raw) => {
        if (raw) setPreferences({ ...defaults, ...(JSON.parse(raw) as Partial<UserPreferences>) });
      })
      .catch(() => undefined);
  }, []);

  // useCallback keeps the reference stable so the useMemo value below
  // does not re-create on every render.
  const updatePreference = useCallback(<K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => {
    setPreferences((current) => {
      const next = { ...current, [key]: value };
      void AsyncStorage.setItem(PREFERENCES_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo(() => ({ preferences, updatePreference }), [preferences, updatePreference]);
  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const value = useContext(PreferencesContext);
  if (!value) throw new Error('usePreferences must be used inside PreferencesProvider');
  return value;
}
