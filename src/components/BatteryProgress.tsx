/**
 * BatteryProgress Component
 * Displays battery percentage with animated progress bar
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Spacing, Radius, Shadows, Typography } from '../theme';

interface BatteryProgressProps {
  percentage?: number;
  animated?: boolean;
}

const BatteryProgress: React.FC<BatteryProgressProps> = ({
  percentage = 76,
  animated = true,
}) => {
  const [progressAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (animated) {
      Animated.timing(progressAnim, {
        toValue: percentage,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    } else {
      progressAnim.setValue(percentage);
    }
  }, [percentage, animated, progressAnim]);

  const getBatteryColor = () => {
    if (percentage > 50) return Colors.primary;
    if (percentage > 20) return Colors.warning;
    return Colors.error;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Icon name="battery-high" size={24} color={getBatteryColor()} />
        </View>
        <Text style={styles.percentage}>{percentage}%</Text>
      </View>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground}>
          <Animated.View
            style={[
              styles.progressBarFill,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                }),
                backgroundColor: getBatteryColor(),
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: Spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: Radius.sm,
    backgroundColor: Colors.glass,
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentage: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
  },
  progressBarContainer: {
    width: '100%',
  },
  progressBarBackground: {
    height: 8,
    borderRadius: Radius.full,
    backgroundColor: Colors.cardLight,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: Radius.full,
    ...Shadows.glow,
  },
});

export default BatteryProgress;
