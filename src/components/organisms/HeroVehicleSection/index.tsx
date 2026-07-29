/**
 * HeroVehicleSection Component
 * Reusable hero section with vehicle image, branding, and titles
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme';
import { AppImage } from '../../atoms/AppImage';
import { AppText } from '../../atoms/AppText';
import { LinearGradient } from 'react-native-linear-gradient';
import { Images } from '../../../assets';

export interface HeroVehicleSectionProps {
  image?: any;
  brandName?: string;
  title?: string;
  subtitle?: string;
  backgroundVariant?: 'primary' | 'secondary' | 'tertiary';
  showGlow?: boolean;
  style?: ViewStyle;
}

export const HeroVehicleSection: React.FC<HeroVehicleSectionProps> = ({
  image = Images.BikeLogo,
  brandName,
  title,
  subtitle,
  backgroundVariant = 'primary',
  showGlow = true,
  style,
}) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, style]}>
      {/* Background Bike Image */}
      <View style={styles.imageWrapper}>
        {showGlow && (
          <View style={styles.glowContainer}>
            <LinearGradient
              colors={[...theme.gradients.accent.glow]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.glow}
            />
          </View>
        )}
        <AppImage
          source={image}
          resizeMode="contain"
          style={styles.image}
          backgroundColor="transparent"
        />
      </View>

      {/* Foreground Content */}
      <View style={styles.contentContainer}>
        {brandName && (
          <View style={styles.brandContainer}>
            <AppText variant="h3" style={{ color: theme.colors.primary.DEFAULT, letterSpacing: 2 }}>
              {brandName}
            </AppText>
          </View>
        )}
        {(title || subtitle) && (
          <View style={styles.titleContainer}>
            {title && (
              <AppText variant="h1" color="primary" style={styles.title}>
                {title}
              </AppText>
            )}
            {subtitle && (
              <AppText variant="bodyMedium" style={[styles.subtitle, { color: theme.colors.text.body }]}>
                {subtitle}
              </AppText>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 280,
    justifyContent: 'center',
    position: 'relative',
    overflow: 'visible',
    marginTop: 8,
  },
  contentContainer: {
    width: '100%',
    zIndex: 2,
    paddingTop: 12,
    paddingBottom: 24,
  },
  brandContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  imageWrapper: {
    position: 'absolute',
    top: -20,
    right: -60,
    width: 320,
    height: 320,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -75 }, { translateY: -75 }],
    width: 150,
    height: 150,
    borderRadius: 75,
    opacity: 0.8,
  },
  glow: {
    flex: 1,
    borderRadius: 75,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    opacity: 0.8,
  },
});