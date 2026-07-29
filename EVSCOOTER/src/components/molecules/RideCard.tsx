/**
 * RideCard — Ride history item card molecule
 */
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, Spacing, BorderRadius} from '../../theme';
import {AppText} from '../atoms/AppText';
import {AppIcon} from '../atoms/AppIcon';
import type {Ride} from '../../types';

interface RideCardProps {
  ride: Ride;
  onPress?: () => void;
}

export const RideCard: React.FC<RideCardProps> = ({ride, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={styles.wrapper}>
      <View style={styles.card}>
        {/* Left accent bar */}
        <LinearGradient
          colors={Colors.gradientButton}
          style={styles.accentBar}
        />
        <View style={styles.content}>
          {/* Header row */}
          <View style={styles.headerRow}>
            <View style={styles.routeInfo}>
              <AppText variant="caption" style={styles.dateText}>
                {ride.date}
              </AppText>
              <AppText variant="body" weight="semiBold">
                {ride.startLocation} → {ride.endLocation}
              </AppText>
            </View>
            <AppText variant="h4" weight="bold" color={Colors.primary}>
              {ride.distanceKm} km
            </AppText>
          </View>
          {/* Stats row */}
          <View style={styles.statsRow}>
            <RideStat icon="time-outline" label={ride.duration} />
            <RideStat icon="flash-outline" label={`${ride.energyUsed} kWh`} />
            <RideStat icon="speedometer-outline" label={`${ride.avgSpeed} km/h avg`} />
            <RideStat icon="leaf-outline" label={`${ride.co2Saved} kg CO₂`} color={Colors.success} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const RideStat: React.FC<{icon: string; label: string; color?: string}> = ({
  icon,
  label,
  color = Colors.textMuted,
}) => (
  <View style={styles.statItem}>
    <AppIcon name={icon} library="ionicons" size={13} color={color} />
    <AppText variant="small" style={{color}}>
      {label}
    </AppText>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: BorderRadius.card,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.card,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  accentBar: {
    width: 4,
  },
  content: {
    flex: 1,
    padding: Spacing.md,
    gap: Spacing.xs,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  routeInfo: {
    flex: 1,
    gap: 2,
    marginRight: Spacing.sm,
  },
  dateText: {
    color: Colors.textMuted,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginTop: 2,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
});
