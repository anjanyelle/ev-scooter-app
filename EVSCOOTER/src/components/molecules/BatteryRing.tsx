/**
 * BatteryRing — SVG circular battery indicator molecule
 * Shows percentage with neon lime arc progress
 */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {Circle, Defs, LinearGradient, Stop} from 'react-native-svg';
import {Colors} from '../../theme';
import {AppText} from '../atoms/AppText';

interface BatteryRingProps {
  percent: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
}

export const BatteryRing: React.FC<BatteryRingProps> = ({
  percent,
  size = 180,
  strokeWidth = 14,
  label,
  sublabel,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;
  const center = size / 2;

  const batteryColor =
    percent > 60
      ? Colors.primary
      : percent > 30
      ? Colors.warning
      : Colors.error;

  return (
    <View style={[styles.container, {width: size, height: size}]}>
      <Svg width={size} height={size} style={styles.svg}>
        <Defs>
          <LinearGradient id="batteryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor={Colors.primaryLight} />
            <Stop offset="100%" stopColor={batteryColor} />
          </LinearGradient>
        </Defs>
        {/* Track */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={Colors.border}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="url(#batteryGrad)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
        />
      </Svg>
      <View style={styles.centerContent}>
        <AppText variant="display" style={[styles.percent, {color: batteryColor}]}>
          {percent}%
        </AppText>
        {label && (
          <AppText variant="caption" style={styles.label}>
            {label}
          </AppText>
        )}
        {sublabel && (
          <AppText variant="small" style={styles.sublabel}>
            {sublabel}
          </AppText>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    position: 'absolute',
  },
  centerContent: {
    alignItems: 'center',
    gap: 2,
  },
  percent: {
    fontWeight: '700',
    includeFontPadding: false,
  },
  label: {
    color: Colors.textSecondary,
  },
  sublabel: {
    color: Colors.textMuted,
  },
});
