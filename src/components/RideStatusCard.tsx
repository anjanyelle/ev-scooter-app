import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../constants/colors';

export default function RideStatusCard() {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.dot} />
        <Text style={styles.title}>Ready to Ride</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Battery</Text>
        <Text style={styles.value}>82%</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Range</Text>
        <Text style={styles.value}>112 km</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Last Sync</Text>
        <Text style={styles.value}>Just now</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#121212',
    borderRadius: 22,
    padding: 18,
    marginTop: 24,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginRight: 10,
  },

  title: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  label: {
    color: '#8A8A8A',
    fontSize: 15,
  },

  value: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '700',
  },
});