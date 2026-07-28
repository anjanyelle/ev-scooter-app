/**
 * MapCard Component
 * Compact "Find Nearby Chargers" card matching the reference design
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Spacing, Radius, Shadows, Typography } from '../theme';

interface MapCardProps {
  onFindChargers?: () => void;
  chargerCount?: number;
}

const MapCard: React.FC<MapCardProps> = ({
  onFindChargers,
  chargerCount = 3,
}) => {
  return (
    <LinearGradient
      colors={['#1C1C1C', '#141414']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Find Nearby Chargers</Text>
        <Icon name="chevron-right" size={18} color={Colors.textSecondary} />
      </View>

      <Text style={styles.subtitle}>
        Quickly locate chargers{'\n'}near you.
      </Text>

      {/* Charger markers visual */}
      <View style={styles.mapVisual}>
        {[0, 1, 2].map((i) => (
          <View key={i} style={[styles.markerDot, i === 1 && styles.markerDotActive]}>
            <Icon name="ev-station" size={12} color={i === 1 ? Colors.background : Colors.primary} />
          </View>
        ))}
      </View>

      {/* CTA Button */}
      <TouchableOpacity
        style={styles.ctaButton}
        onPress={onFindChargers}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[Colors.primary, Colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.buttonGradient}
        >
          <Text style={styles.buttonText}>Find Chargers</Text>
          <Icon name="chevron-right" size={16} color={Colors.background} />
        </LinearGradient>
      </TouchableOpacity>
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
    gap: Spacing.sm,
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
    flex: 1,
  },
  subtitle: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  mapVisual: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginVertical: Spacing.xs,
  },
  markerDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary + '20',
    borderWidth: 1.5,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerDotActive: {
    backgroundColor: Colors.primary,
  },
  ctaButton: {
    borderRadius: Radius.md,
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    gap: Spacing.xs,
  },
  buttonText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.background,
  },
});

export default MapCard;
