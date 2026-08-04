import { CheckCircle2, CircleAlert, Info, TriangleAlert } from 'lucide-react-native';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fonts, radii, shadows, spacing } from '@/theme';

type ToastKind = 'success' | 'warning' | 'error' | 'info';

interface ToastItem {
  id: number;
  message: string;
  kind: ToastKind;
}

interface ToastContextValue {
  showToast: (message: string, kind?: ToastKind) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const iconMap = {
  success: CheckCircle2,
  warning: TriangleAlert,
  error: CircleAlert,
  info: Info
};

const colorMap = {
  success: colors.success,
  warning: colors.warning,
  error: colors.error,
  info: colors.info
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastItem | null>(null);
  const insets = useSafeAreaInsets();

  const showToast = useCallback((message: string, kind: ToastKind = 'success') => {
    const item = { id: Date.now(), message, kind };
    setToast(item);
    setTimeout(() => {
      setToast((current) => (current?.id === item.id ? null : current));
    }, 2400);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);
  const Icon = toast ? iconMap[toast.kind] : Info;

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast ? (
        <Animated.View entering={FadeInDown.duration(240)} exiting={FadeOutUp.duration(180)} style={[styles.toast, { top: insets.top + spacing.sm }]}>
          <View style={[styles.icon, { backgroundColor: `${colorMap[toast.kind]}18` }]}>
            <Icon size={19} color={colorMap[toast.kind]} strokeWidth={2.4} />
          </View>
          <Text style={styles.text} numberOfLines={2}>{toast.message}</Text>
        </Animated.View>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const value = useContext(ToastContext);
  if (!value) throw new Error('useToast must be used inside ToastProvider');
  return value;
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    minHeight: 58,
    borderRadius: radii.button,
    backgroundColor: colors.cardHover,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    zIndex: 999,
    ...shadows.card
  },
  icon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    flex: 1,
    color: colors.heading,
    fontFamily: fonts.medium,
    fontSize: 13,
    lineHeight: 18
  }
});
