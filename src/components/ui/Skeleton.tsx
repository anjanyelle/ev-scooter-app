import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';
import LinearGradient from '@/components/system/LinearGradient';

import { colors, radii } from '@/theme';

interface SkeletonProps {
  width?: number | `${number}%`;
  height: number;
  radius?: number;
  style?: StyleProp<ViewStyle>;
}

export function Skeleton({ width = '100%', height, radius = radii.input, style }: SkeletonProps) {
  const progress = useSharedValue(-1);
  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 1150, easing: Easing.inOut(Easing.quad) }), -1, false);
  }, [progress]);
  const animated = useAnimatedStyle(() => ({ transform: [{ translateX: progress.value * 220 }] }));
  return (
    <View style={[styles.base, { width, height, borderRadius: radius }, style]}>
      <Animated.View style={[styles.shimmer, animated]}>
        <LinearGradient colors={['transparent', 'rgba(255,255,255,0.08)', 'transparent']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFill} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  base: { overflow: 'hidden', backgroundColor: colors.card },
  shimmer: { position: 'absolute', top: 0, bottom: 0, width: 120 }
});
