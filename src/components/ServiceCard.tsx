/**
 * ServiceCard Component
 * "Need Service?" card with scooter thumbnail on left, text center, button right
 * 
 * SPECIFICATION MATCH:
 * - Full width
 * - Height: 90dp
 * - Service image left
 * - Text center
 * - Button right
 * - Padding: 16dp
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Spacing, Radius, Shadows, Typography } from '../theme';

interface ServiceCardProps {
  onBookService?: () => void;
  title?: string;
  description?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  onBookService,
  title = 'Need Service?',
  description = 'Book a service and keep your ride in perfect condition.',
}) => {
  return (
    <LinearGradient
      colors={['#1C1C1C', '#141414']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Left: scooter thumbnail */}
      <View style={styles.imageContainer}>
        <View style={styles.imageGlow} />
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=150&fit=crop',
          }}
          style={styles.scooterImage}
          resizeMode="contain"
        />
      </View>

      {/* Center: text block */}
      <View style={styles.textBlock}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      {/* Right: button */}
      <TouchableOpacity onPress={onBookService} activeOpacity={0.85} style={styles.ctaWrapper}>
        <LinearGradient
          colors={[Colors.primary, Colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.ctaButton}
        >
          <Text style={styles.ctaText}>Book Service</Text>
          <Icon name="chevron-right" size={16} color={Colors.background} />
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 90,
    padding: 16,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    ...Shadows.medium,
    alignItems: 'center',
    gap: Spacing.md,
    overflow: 'hidden',
  },
  imageContainer: {
    width: 70,
    height: 60,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageGlow: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    opacity: 0.12,
  },
  scooterImage: {
    width: 70,
    height: 60,
    zIndex: 1,
  },
  textBlock: {
    flex: 1,
    gap: 3,
  },
  title: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
  },
  description: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  ctaWrapper: {
    borderRadius: Radius.md,
    overflow: 'hidden',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    gap: Spacing.xs,
  },
  ctaText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.background,
  },
});

export default ServiceCard;