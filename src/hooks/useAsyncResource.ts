import { useCallback, useEffect, useRef, useState } from 'react';

interface AsyncResource<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
  refreshing: boolean;
  reload: () => Promise<void>;
}

export function useAsyncResource<T>(loader: () => Promise<T>, dependencies: readonly unknown[] = []): AsyncResource<T> {
  const mounted = useRef(true);
  const loaderRef = useRef(loader);
  loaderRef.current = loader;

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(
    async (isRefresh = false) => {
      if (isRefresh) {
        // If there is no data yet (previous attempt errored), show the full
        // loading skeleton instead of the pull-to-refresh spinner so the
        // error state disappears immediately.
        if (data === null) {
          setLoading(true);
        } else {
          setRefreshing(true);
        }
      } else {
        setLoading(true);
      }
      setError(null);
      try {
        const result = await loaderRef.current();
        if (mounted.current) {
          setData(result);
        }
      } catch (cause) {
        if (mounted.current) {
          setError(cause instanceof Error ? cause : new Error('Something went wrong'));
        }
      } finally {
        if (mounted.current) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies
  );

  useEffect(() => {
    mounted.current = true;
    void load();
    return () => {
      mounted.current = false;
    };
  }, [load]);

  return {
    data,
    error,
    loading,
    refreshing,
    reload: () => load(true)
  };
}
