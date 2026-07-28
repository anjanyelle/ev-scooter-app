/**
 * HeroVehicleSection Component
 * Scooter image placeholder + glow overlay
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme';
import { AppImage } from '../../atoms/AppImage';
import { LinearGradient } from 'react-native-linear-gradient';

export interface HeroVehicleSectionProps {
  style?: ViewStyle;
}

export const HeroVehicleSection: React.FC<HeroVehicleSectionProps> = ({
  style,
}) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, style]}>
      {/* Glow effect behind the image */}
      <View style={styles.glowContainer}>
        <LinearGradient
          colors={[...theme.gradients.accent.glow]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.glow}
        />
      </View>

      {/* Scooter image placeholder */}
      <View style={styles.imageContainer}>
        <AppImage
          source={require('../../../assets/images/hero_scooter.png')}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 280,
    position: 'relative',
  },
  glowContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -75 }, { translateY: -75 }],
    width: 150,
    height: 150,
    borderRadius: 75,
    opacity: 0.6,
  },
  glow: {
    flex: 1,
    borderRadius: 75,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});