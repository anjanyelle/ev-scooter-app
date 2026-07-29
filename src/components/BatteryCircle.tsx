import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {COLORS} from '../constants/colors';

type Props = {
  percentage: number;
};

export default function BatteryCircle({percentage}: Props) {
  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={160}
        width={12}
        fill={percentage}
        tintColor={COLORS.primary}
        backgroundColor="#2A2A2A"
        rotation={220}
        arcSweepAngle={280}
        lineCap="round">
        {() => (
          <View style={styles.inner}>
            <Text style={styles.percent}>{percentage}%</Text>
            <Text style={styles.label}>Battery Level</Text>
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  inner: {
    alignItems: 'center',
  },

  percent: {
    fontSize: 36,
    fontWeight: '700',
    color: COLORS.white,
  },

  label: {
    marginTop: 6,
    color: COLORS.secondary,
    fontSize: 14,
  },
});