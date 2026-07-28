/**
 * WeatherCard Component
 * Compact weather card matching the reference design
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Spacing, Radius, Shadows, Typography } from '../theme';

interface WeatherCardProps {
  temperature?: number;
  condition?: string;
  location?: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  temperature = 27,
  condition = 'Clear',
  location = 'Lucknow',
}) => {
  const getWeatherIcon = () => {
    switch (condition.toLowerCase()) {
      case 'clear': return 'weather-sunny';
      case 'cloudy': return 'weather-cloudy';
      case 'rain': return 'weather-rainy';
      case 'snow': return 'weather-snowy';
      default: return 'weather-sunny';
    }
  };

  return (
    <LinearGradient
      colors={['#1C1C1C', '#141414']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Temperature + icon row */}
      <View style={styles.topRow}>
        <Text style={styles.temperature}>{temperature}°C</Text>
        <Icon name={getWeatherIcon()} size={36} color={Colors.primary} />
      </View>

      {/* Condition */}
      <Text style={styles.condition}>{condition}</Text>

      {/* Location */}
      <View style={styles.locationRow}>
        <Icon name="map-marker" size={13} color={Colors.primary} />
        <Text style={styles.locationText}>{location}</Text>
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
    ...Shadows.medium,
    gap: 3,
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  temperature: {
    fontSize: Typography.fontSize.xxxl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
  },
  condition: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textSecondary,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
  },
  locationText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
});

export default WeatherCard;
