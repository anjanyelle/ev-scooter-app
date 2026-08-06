import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { colors, fonts } from '@/theme';
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  suffix?: string;
  footer?: ReactNode;
  gradientId?: string;
}

export function CircularProgress({
  value,
  size = 150,
  strokeWidth = 10,
  label,
  suffix = '%',
  footer,
  gradientId = 'lexiconRing'
}: CircularProgressProps) {
  const normalized = Math.min(100, Math.max(0, value));
  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => {
  let current = 0;

  const timer = setInterval(() => {
    current += 1;

    setDisplayValue(
      Math.min(current, normalized),
    );

    if (current >= normalized) {
      clearInterval(timer);
    }
  }, 18);

  return () => clearInterval(timer);
}, [normalized]);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (normalized / 100) * circumference;
  const ringScale = useSharedValue(1);

useEffect(() => {
  ringScale.value = withRepeat(
    withSequence(
      withTiming(1.003, {
        duration: 1800,
      }),
      withTiming(1, {
        duration: 1800,
      }),
    ),
    -1,
    false,
  );
}, []);

const ringAnimatedStyle = useAnimatedStyle(() => ({
  transform: [
    {
      scale: ringScale.value,
    },
  ],
}));

  return (
    <View style={[styles.root, { width: size, height: size }]}>
      <Animated.View style={[styles.svgWrapper, { width: size, height: size }, ringAnimatedStyle]}>
        <Svg
          width={size}
          height={size}
          style={styles.svg}
        >
          <Defs>
            <LinearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0" stopColor={colors.primaryLight} />
              <Stop offset="1" stopColor={colors.primaryDark} />
            </LinearGradient>
          </Defs>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.divider}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={Math.max(1, strokeWidth - 1)}
          strokeLinecap="round"
          fill="transparent"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashOffset}
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      </Animated.View>
      <View style={styles.center}>
<Text style={styles.value}>
  {Math.round(displayValue)}
  {suffix}
</Text>
        {label ? <Text style={styles.label}>{label}</Text> : null}
        {footer}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { alignItems: 'center', justifyContent: 'center' },
  svgWrapper: { alignItems: 'center', justifyContent: 'center' },
  svg: { width: '100%', height: '100%' },
  center: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  value: { color: colors.heading, fontFamily: fonts.numeric, fontSize: 28, letterSpacing: -0.5 },
  label: { color: colors.secondary, fontFamily: fonts.regular, fontSize: 10, marginTop: 2 }
});
