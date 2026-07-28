/**
 * ServiceCard Component
 * "Need Service?" card with scooter thumbnail on left, text + Book button on right
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

      {/* Right: text + button */}
      <View style={styles.rightContent}>
        <View style={styles.textBlock}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>

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
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: Spacing.md,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    ...Shadows.medium,
    alignItems: 'center',
    gap: Spacing.md,
    overflow: 'hidden',
  },
  imageContainer: {
    width: 90,
    height: 80,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageGlow: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.primary,
    opacity: 0.12,
  },
  scooterImage: {
    width: 90,
    height: 80,
    zIndex: 1,
  },
  rightContent: {
    flex: 1,
    gap: Spacing.sm,
  },
  textBlock: {
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
    alignSelf: 'flex-start',
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
