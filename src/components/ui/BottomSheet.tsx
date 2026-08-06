import { X } from 'lucide-react-native';
import type { PropsWithChildren } from 'react';
import { useEffect, useRef } from 'react';
import { Animated, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import ReAnimated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, fonts, radii, spacing } from '@/theme';

interface BottomSheetProps extends PropsWithChildren {
  visible: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
}

export function BottomSheet({ visible, onClose, title, subtitle, children }: BottomSheetProps) {
  const insets = useSafeAreaInsets();
  // Use a plain RN Animated value for the backdrop opacity to avoid the
  // double-animation flicker that occurs when Reanimated FadeIn/FadeOut is
  // nested inside a Modal on Android.
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(backdropOpacity, {
      toValue: visible ? 1 : 0,
      duration: visible ? 180 : 160,
      useNativeDriver: true,
    }).start();
  }, [visible, backdropOpacity]);

  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={onClose} statusBarTranslucent>
      <View style={styles.root}>
        <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        </Animated.View>
        <ReAnimated.View entering={SlideInDown.springify().damping(220)} exiting={SlideOutDown.duration(220)} style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, spacing.lg) }]}>
          <View style={styles.handle} />
          <View style={styles.header}>
            <View style={styles.copy}>
              <Text style={styles.title}>{title}</Text>
              {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
            </View>
            <Pressable onPress={onClose} style={styles.close}><X size={20} color={colors.heading} /></Pressable>
          </View>
          {children}
        </ReAnimated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0,0,0,0.68)' },
  sheet: { backgroundColor: colors.card, borderTopLeftRadius: radii.sheet, borderTopRightRadius: radii.sheet, paddingHorizontal: spacing.lg, paddingTop: spacing.sm, borderWidth: 1, borderColor: colors.glassBorder, gap: spacing.md },
  handle: { width: 48, height: 4, borderRadius: 2, backgroundColor: colors.muted, alignSelf: 'center', opacity: 0.5 },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  copy: { flex: 1 },
  title: { color: colors.heading, fontFamily: fonts.bold, fontSize: 20 },
  subtitle: { color: colors.secondary, fontFamily: fonts.regular, fontSize: 12, marginTop: 3 },
  close: { width: 40, height: 40, borderRadius: 14, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' }
});
