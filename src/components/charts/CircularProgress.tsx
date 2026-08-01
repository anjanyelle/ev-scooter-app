import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

import { colors, fonts } from '@/theme';

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
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (normalized / 100) * circumference;

  return (
    <View style={[styles.root, { width: size, height: size }]}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
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
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashOffset}
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={styles.center}>
        <Text style={styles.value}>{Math.round(normalized)}{suffix}</Text>
        {label ? <Text style={styles.label}>{label}</Text> : null}
        {footer}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { alignItems: 'center', justifyContent: 'center' },
  center: { alignItems: 'center', justifyContent: 'center', gap: 2 },
  value: { color: colors.heading, fontFamily: fonts.numeric, fontSize: 28, letterSpacing: -0.5 },
  label: { color: colors.secondary, fontFamily: fonts.regular, fontSize: 10 }
});
