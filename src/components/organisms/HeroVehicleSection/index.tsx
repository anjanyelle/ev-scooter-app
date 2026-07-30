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
        {/* {showGlow && (
          <View style={styles.glowContainer}>
            <LinearGradient
              colors={[...theme.gradients.accent.glow]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.glow}
            />
          </View>
        )} */}
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
    height: 175,
    justifyContent: 'flex-end',
    position: 'relative',
    overflow: 'visible',
    marginTop: 0,
  },
  contentContainer: {
    width: '48%',
    zIndex: 2,
    paddingTop: 0,
    paddingBottom: 14,
  },
  brandContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  imageWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 220,
    height: 170,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -95 }, { translateY: -95 }],
    width: 190,
    height: 190,
    borderRadius: 95,
    opacity: 0.30,
  },
  glow: {
    flex: 1,
    borderRadius: 80,
  },
  image: {
    width: '170%',
    height: '145%',
  },
  titleContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    marginBottom: 6,
  },
  subtitle: {
    opacity: 0.85,
    lineHeight: 20,
  },
});