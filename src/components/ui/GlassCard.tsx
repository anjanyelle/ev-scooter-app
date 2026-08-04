import type { PropsWithChildren } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { colors, radii, shadows, spacing } from '@/theme';

interface GlassCardProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  padding?: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function GlassCard({ children, style, onPress, padding = spacing.md }: GlassCardProps) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  if (!onPress) {
    return <View style={[styles.card, { padding }, style]}>{children}</View>;
  }

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => { scale.value = withSpring(0.985, { damping: 18, stiffness: 300 }); }}
      onPressOut={() => { scale.value = withSpring(1, { damping: 18, stiffness: 300 }); }}
      style={[styles.card, { padding }, animatedStyle, style]}
    >
      {children}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    overflow: 'hidden',
    ...shadows.card
  }
});
