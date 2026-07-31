/**
 * RideChart Component
 * Compact "Ride Stats" card for side-by-side layout with MapCard
 *
 * FIX: Replaced react-native-chart-kit with custom SVG chart
 * - Uses react-native-svg directly for more reliable rendering
 * - Removed negative margins that could cause chart clipping
 * - Chart data now renders properly on all screen sizes
 * - Compatible with React Native 0.84.1
 */

import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Path, Circle, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
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
  const { width: screenWidth } = useWindowDimensions();

  // Chart dimensions - responsive width for side-by-side layout
  // Subtract: screen padding (16*2), gap between cards (12), card padding (Spacing.md*2)
  const chartWidth = Math.max(50, (screenWidth - 16 * 2 - 12) / 2 - Spacing.md * 2);
  const chartHeight = 50;

  // Calculate chart points
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data, 0);
  const range = maxValue - minValue || 1;
  const xStep = chartWidth / (data.length - 1);

  // Calculate points - leave small padding at top and bottom
  const points = data.map((value, index) => {
    const x = index * xStep;
    const y = chartHeight - ((value - minValue) / range) * (chartHeight - 6) - 3;
    return { x, y };
  });

  // Create smooth line path using cubic bezier curves
  let linePath = '';
  points.forEach((point, index) => {
    if (index === 0) {
      linePath += `M ${point.x} ${point.y}`;
    } else {
      const prevPoint = points[index - 1];
      const cp1x = prevPoint.x + (point.x - prevPoint.x) / 3;
      const cp1y = prevPoint.y;
      const cp2x = prevPoint.x + (point.x - prevPoint.x) * (2 / 3);
      const cp2y = point.y;
      linePath += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${point.x} ${point.y}`;
    }
  });

  // Create area path (for gradient fill under the line)
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`;

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
        <Icon name="chevron-right" size={14} color={Colors.textSecondary} />
      </View>

      {/* Distance badge */}
      <View style={styles.distanceBadge}>
        <Text style={styles.distanceValue}>{totalDistance} km</Text>
      </View>

      {/* Mini chart - custom SVG implementation */}
      <View style={styles.chartWrapper}>
        <Svg width={chartWidth} height={chartHeight}>
          <Defs>
            <SvgLinearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={Colors.primary} stopOpacity={0.3} />
              <Stop offset="1" stopColor={Colors.primary} stopOpacity={0} />
            </SvgLinearGradient>
          </Defs>
          {/* Area fill under the line */}
          <Path d={areaPath} fill="url(#chartGradient)" />
          {/* Line path */}
          <Path
            d={linePath}
            fill="none"
            stroke={Colors.primary}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Data point dots */}
          {points.map((point, index) => (
            <Circle key={index} cx={point.x} cy={point.y} r={2.5} fill={Colors.primary} />
          ))}
        </Svg>
        {/* Labels row - using regular Text for reliability */}
        <View style={[styles.labelsRow, { width: chartWidth }]}>
          {labels.map((label, index) => (
            <Text key={index} style={styles.label}>
              {label}
            </Text>
          ))}
        </View>
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
    gap: 2,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text,
  },
  distanceBadge: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary + '20',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 1,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.primary + '40',
  },
  distanceValue: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
  },
  chartWrapper: {
    alignItems: 'center',
    marginTop: 2,
  },
  labelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  label: {
    fontSize: 8,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});

export default RideChart;