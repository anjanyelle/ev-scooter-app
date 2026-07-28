/**
 * QuickActions Component
 * Displays quick action buttons for vehicle controls
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Spacing, Radius, Shadows, Typography } from '../theme';

interface QuickActionsProps {
  onUnlock?: () => void;
  onFlash?: () => void;
  onHorn?: () => void;
  onSeatUnlock?: () => void;
  onMore?: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  onUnlock,
  onFlash,
  onHorn,
  onSeatUnlock,
  onMore,
}) => {
  const ActionButton: React.FC<{
    icon: string;
    label: string;
    onPress?: () => void;
    isPrimary?: boolean;
  }> = ({ icon, label, onPress, isPrimary = false }) => (
    <TouchableOpacity
      style={[styles.actionButton, isPrimary && styles.primaryButton]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={
          isPrimary
            ? [Colors.primary, Colors.primaryDark]
            : [Colors.cardLight, Colors.card]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.buttonGradient, isPrimary && styles.primaryGradient]}
      >
        <Icon
          name={icon}
          size={24}
          color={isPrimary ? Colors.background : Colors.primary}
        />
        <Text
          style={[
            styles.buttonLabel,
            isPrimary && styles.primaryButtonLabel,
          ]}
        >
          {label}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ActionButton icon="lock-open-variant" label="Unlock" onPress={onUnlock} isPrimary />
      <ActionButton icon="flash" label="Flash" onPress={onFlash} />
      <ActionButton icon="bullhorn" label="Horn" onPress={onHorn} />
      <ActionButton icon="car-seat" label="Seat" onPress={onSeatUnlock} />
      <ActionButton icon="dots-horizontal-circle" label="More" onPress={onMore} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  actionButton: {
    flex: 1,
    minWidth: '30%',
    borderRadius: Radius.lg,
    overflow: 'hidden',
    ...Shadows.small,
  },
  primaryButton: {
    minWidth: '100%',
    marginBottom: Spacing.sm,
  },
  buttonGradient: {
    padding: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  primaryGradient: {
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    borderColor: Colors.primary,
    ...Shadows.glow,
  },
  buttonLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textSecondary,
  },
  primaryButtonLabel: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.background,
    letterSpacing: 0.5,
  },
});

export default QuickActions;
