/**
 * GreetingCard Component
 * Displays personalized greeting matching the reference design
 * 
 * SPECIFICATION MATCH:
 * - Height: 90dp
 * - Border Radius: 16dp
 * - Content vertically centered
 * - No fixed widths, uses flex
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Spacing, Radius, Shadows, Typography } from '../theme';

interface GreetingCardProps {
  userName?: string;
  timeOfDay?: 'morning' | 'afternoon' | 'evening';
}

const GreetingCard: React.FC<GreetingCardProps> = ({
  userName = 'Rider',
  timeOfDay = 'morning',
}) => {
  const getGreeting = () => {
    switch (timeOfDay) {
      case 'morning': return 'Good Morning';
      case 'afternoon': return 'Good Afternoon';
      case 'evening': return 'Good Evening';
      default: return 'Good Morning';
    }
  };

  return (
    <LinearGradient
      colors={['#1C1C1C', '#141414']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.greeting}>
        {getGreeting()}, {userName}! 👋
      </Text>
      <Text style={styles.readyText}>Ready to ride?</Text>
      <Text style={styles.motivationalText}>
        Let's make every ride electric.
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    ...Shadows.medium,
    gap: 3,
    justifyContent: 'center',
  },
  greeting: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.regular,
    color: Colors.textSecondary,
  },
  readyText: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    marginTop: 2,
  },
  motivationalText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.regular,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});

export default GreetingCard;