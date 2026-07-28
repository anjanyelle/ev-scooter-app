/**
 * Custom Hooks
 * Reusable React hooks for the app
 */

import { useState, useEffect, useCallback, useRef } from 'react';

// useDebounce hook
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

// useToggle hook
export const useToggle = (initialValue: boolean = false): [boolean, () => void] => {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue((prev) => !prev), []);
  return [value, toggle];
};

// usePrevious hook
export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

// useTimeout hook
export const useTimeout = (callback: () => void, delay: number | null): void => {
  useEffect(() => {
    if (delay === null) return;
    
    const timer = setTimeout(callback, delay);
    return () => clearTimeout(timer);
  }, [callback, delay]);
};

// useInterval hook
export const useInterval = (callback: () => void, delay: number | null): void => {
  useEffect(() => {
    if (delay === null) return;
    
    const interval = setInterval(callback, delay);
    return () => clearInterval(interval);
  }, [callback, delay]);
};
