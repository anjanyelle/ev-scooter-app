/**
 * VehicleCard Component
 * Redesigned to match Lexicon EV design - battery left, scooter image center, actions below
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Spacing, Radius, Shadows, Typography } from '../theme';

interface VehicleCardProps {
  vehicleName?: string;
  batteryPercentage?: number;
  estimatedRange?: number;
  isConnected?: boolean;
  isSecure?: boolean;
  onUnlock?: () => void;
  onFlash?: () => void;
  onHorn?: () => void;
  onSeatUnlock?: () => void;
  onMore?: () => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicleName = 'Lexicon X1',
  batteryPercentage = 76,
  estimatedRange = 105,
  isConnected = true,
  isSecure = true,
  onUnlock,
  onFlash,
  onHorn,
  onSeatUnlock,
  onMore,
}) => {
  const floatAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0.15)).current;

  useEffect(() => {
    const floatAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -8,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    const glowAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 0.3,
          duration: 1800,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.15,
          duration: 1800,
          useNativeDriver: false,
        }),
      ])
    );
    floatAnimation.start();
    glowAnimation.start();
    return () => {
      floatAnimation.stop();
      glowAnimation.stop();
    };
  }, [floatAnim, glowAnim]);

  const getBatteryColor = () => {
    if (batteryPercentage > 50) return Colors.primary;
    if (batteryPercentage > 20) return Colors.warning;
    return Colors.error;
  };

  return (
    <LinearGradient
      colors={['#1C1C1C', '#111111']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Top row: name + secure badge */}
      <View style={styles.topRow}>
        <View style={styles.nameRow}>
          <Text style={styles.vehicleName}>{vehicleName}</Text>
          <Icon name="pencil-outline" size={16} color={Colors.textSecondary} style={styles.editIcon} />
        </View>
        {isSecure && (
          <View style={styles.secureBadge}>
            <Icon name="shield-check" size={14} color={Colors.primary} />
            <Text style={styles.secureBadgeText}>Secure</Text>
          </View>
        )}
      </View>

      {/* Connected status */}
      {isConnected && (
        <View style={styles.connectedRow}>
          <View style={styles.connectedDot} />
          <Text style={styles.connectedText}>Connected</Text>
        </View>
      )}

      {/* Middle: battery info + scooter image */}
      <View style={styles.middleSection}>
        {/* Left: Battery info */}
        <View style={styles.batterySection}>
          <Text style={styles.batteryLabel}>Battery</Text>
          <Text style={[styles.batteryPercent, { color: getBatteryColor() }]}>
            {batteryPercentage}%
          </Text>

          {/* Battery bar */}
          <View style={styles.batteryBar}>
            <LinearGradient
              colors={[getBatteryColor(), getBatteryColor() + '80']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.batteryFill, { width: `${batteryPercentage}%` }]}
            />
          </View>

          <Text style={styles.rangeLabel}>Est. Range</Text>
          <Text style={styles.rangeValue}>{estimatedRange} km</Text>

          {/* ECO MODE badge */}
          <View style={styles.ecoModeBadge}>
            <Icon name="leaf" size={11} color={Colors.primary} />
            <View>
              <Text style={styles.ecoModeTitle}>ECO MODE</Text>
              <Text style={styles.ecoModeSubtitle}>Optimized for range</Text>
            </View>
          </View>
        </View>

        {/* Right: Scooter image */}
        <Animated.View style={styles.imageSection}>
          <Animated.Image
            source={require('../assets/lexicon-scooter.png')}
            style={[
              styles.scooterImage,
              { transform: [{ translateY: floatAnim }, { scaleX: -1 }] },
            ]}
            resizeMode="contain"
          />
        </Animated.View>
      </View>

      {/* Slide to Unlock - full width primary button */}
      <TouchableOpacity
        style={styles.unlockButton}
        onPress={onUnlock}
        activeOpacity={0.85}
      >
        <LinearGradient
          colors={[Colors.primary + '25', Colors.primary + '10']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.unlockGradient}
        >
          <View style={styles.unlockIconBox}>
            <Icon name="lock" size={20} color={Colors.primary} />
          </View>
          <Text style={styles.unlockText}>Slide to Unlock</Text>
          <View style={styles.unlockArrows}>
            <Text style={styles.unlockArrowText}>{'>  >  >'}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>

      {/* Quick action buttons row */}
      <View style={styles.actionsRow}>
        {[
          { icon: 'lightning-bolt', label: 'Flash', onPress: onFlash },
          { icon: 'bullhorn', label: 'Horn', onPress: onHorn },
          { icon: 'car-seat', label: 'Seat\nUnlock', onPress: onSeatUnlock },
          { icon: 'dots-horizontal', label: 'More', onPress: onMore },
        ].map((action, index) => (
          <TouchableOpacity
            key={index}
            style={styles.actionButton}
            onPress={action.onPress}
            activeOpacity={0.7}
          >
            <View style={styles.actionIconBox}>
              <Icon name={action.icon} size={22} color={Colors.text} />
            </View>
            <Text style={styles.actionLabel}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    ...Shadows.large,
    gap: Spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  vehicleName: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
  },
  editIcon: {
    marginLeft: 4,
    opacity: 0.6,
  },
  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.primary + '15',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.primary + '40',
  },
  secureBadgeText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.medium,
  },
  connectedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: -Spacing.xs,
  },
  connectedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  connectedText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.medium,
  },
  middleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 220,
  },
  batterySection: {
    flex: 1,
    gap: 6,
    zIndex: 2,
    justifyContent: 'center',
  },
  batteryLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeight.regular,
  },
  batteryPercent: {
    fontSize: 48,
    fontWeight: '800',
    lineHeight: 54,
  },
  batteryBar: {
    height: 4,
    backgroundColor: Colors.glass,
    borderRadius: Radius.full,
    overflow: 'hidden',
    width: '80%',
    marginBottom: 6,
  },
  batteryFill: {
    height: '100%',
    borderRadius: Radius.full,
  },
  rangeLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },
  rangeValue: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
  },
  ecoModeBadge: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
    backgroundColor: Colors.primary + '15',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 5,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.primary + '40',
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  ecoModeTitle: {
    fontSize: 10,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
    letterSpacing: 0.5,
  },
  ecoModeSubtitle: {
    fontSize: 9,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  imageSection: {
    flex: 1.3,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  scooterImage: {
    width: 220,
    height: 220,
    zIndex: 1,
  },
  unlockButton: {
    borderRadius: Radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.primary + '30',
  },
  unlockGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  unlockIconBox: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    backgroundColor: Colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.primary + '50',
  },
  unlockText: {
    flex: 1,
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text,
  },
  unlockArrows: {
    paddingRight: Spacing.sm,
  },
  unlockArrowText: {
    fontSize: Typography.fontSize.md,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.bold,
    letterSpacing: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    alignItems: 'center',
    gap: Spacing.xs,
    flex: 1,
  },
  actionIconBox: {
    width: 48,
    height: 48,
    borderRadius: Radius.lg,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2E2E2E',
  },
  actionLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 13,
  },
});

export default VehicleCard;
