/**
 * StatisticsCard Component
 * Horizontal card with icon, label, value, sub-label and chevron arrow
 * 
 * SPECIFICATION MATCH:
 * - No hardcoded width (removed fixed width: 130)
 * - Uses flex: 1 for equal sizing
 * - Height: 105dp
 * - Everything aligned left
 * - 2 rows, 2 cards each, equal width, gap 12dp
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Spacing, Radius, Shadows, Typography } from '../theme';

interface StatisticsCardProps {
  icon: string;
  label: string;
  value: string | number;
  subValue?: string;
  color?: string;
  onPress?: () => void;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  icon,
  label,
  value,
  subValue,
  color = Colors.primary,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.touchable}>
      <LinearGradient
        colors={['#1C1C1C', '#141414']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        {/* Top: label + arrow */}
        <View style={styles.topRow}>
          <Text style={styles.label}>{label}</Text>
          <Icon name="chevron-right" size={16} color={Colors.textSecondary} />
        </View>

        {/* Icon circle */}
        <View style={[styles.iconContainer, { borderColor: color + '50', backgroundColor: color + '15' }]}>
          <Icon name={icon} size={20} color={color} />
        </View>

        {/* Value */}
        <Text style={styles.value}>{value}</Text>

        {/* Sub-label */}
        {subValue && (
          <Text style={styles.subValue}>{subValue}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
  },
  container: {
    flex: 1,
    height: 105,
    padding: Spacing.md,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    ...Shadows.medium,
    gap: Spacing.xs,
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.text,
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  value: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
  },
  subValue: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});

export default StatisticsCard;