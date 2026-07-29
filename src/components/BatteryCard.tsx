import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';

export default function BatteryCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Battery</Text>

      <Text style={styles.percent}>82%</Text>

      <Text style={styles.range}>
        Range
      </Text>

      <Text style={styles.km}>
        112 km
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#171717',
    borderRadius: 24,
    marginTop: 25,
    padding: 22,
    borderWidth: 1,
    borderColor: '#242424',
  },

  title: {
    color: COLORS.secondary,
    fontSize: 15,
  },

  percent: {
    color: COLORS.primary,
    fontSize: 42,
    fontWeight: '700',
    marginTop: 12,
  },

  range: {
    color: COLORS.secondary,
    marginTop: 12,
  },

  km: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '600',
  },
});