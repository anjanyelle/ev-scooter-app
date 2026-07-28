/**
 * RideChart Component
 * Compact "Ride Stats" card with mini line chart matching the reference design
 */

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Spacing, Radius, Shadows, Typography } from '../theme';

interface RideChartProps {
  data?: number[];
  labels?: string[];
  totalDistance?: number;
}

const RideChart: React.FC<RideChartProps> = ({
  data = [12, 19, 8, 15, 22, 10, 48],
  labels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  totalDistance = 48,
}) => {
  const cardWidth = (Dimensions.get('window').width - Spacing.md * 2 - Spacing.md) / 2 - Spacing.md * 2;
  const chartWidth = cardWidth + Spacing.md;
  const chartHeight = 70;

  const chartData = {
    labels,
    datasets: [
      {
        data,
        color: (opacity = 1) => `rgba(200, 255, 0, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: 'transparent',
    backgroundGradientFrom: 'transparent',
    backgroundGradientTo: 'transparent',
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(200, 255, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(136, 136, 136, ${opacity})`,
    propsForDots: {
      r: 0,
    },
    propsForBackgroundLines: {
      stroke: 'transparent',
    },
  };

  return (
    <LinearGradient
      colors={['#1C1C1C', '#141414']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Ride Stats</Text>
        <Icon name="chevron-right" size={18} color={Colors.textSecondary} />
      </View>
      <Text style={styles.subtitle}>This Week Overview</Text>

      {/* Distance badge */}
      <View style={styles.distanceBadge}>
        <Text style={styles.distanceValue}>{totalDistance} km</Text>
      </View>

      {/* Mini chart */}
      <View style={styles.chartWrapper}>
        <LineChart
          data={chartData}
          width={chartWidth}
          height={chartHeight}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
          withVerticalLines={false}
          withHorizontalLines={false}
          withVerticalLabels={true}
          withHorizontalLabels={false}
          withDots={false}
          withShadow={false}
          withInnerLines={false}
          withOuterLines={false}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    ...Shadows.medium,
    gap: Spacing.xs,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text,
  },
  subtitle: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },
  distanceBadge: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary + '20',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.primary + '40',
  },
  distanceValue: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
  },
  chartWrapper: {
    marginLeft: -Spacing.md,
    marginBottom: -Spacing.md,
  },
  chart: {
    borderRadius: Radius.md,
  },
});

export default RideChart;
