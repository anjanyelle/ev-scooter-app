import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../constants/colors';

export default function VehicleHealthCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        Vehicle Health
      </Text>

      <View style={styles.grid}>

        <View style={styles.item}>
          <Ionicons
            name="battery-charging"
            size={24}
            color={COLORS.primary}
          />
          <Text style={styles.value}>94%</Text>
          <Text style={styles.label}>Battery</Text>
        </View>

        <View style={styles.item}>
          <Ionicons
            name="thermometer"
            size={24}
            color={COLORS.primary}
          />
          <Text style={styles.value}>32°C</Text>
          <Text style={styles.label}>Temperature</Text>
        </View>

        <View style={styles.item}>
          <Ionicons
            name="radio-button-on"
            size={24}
            color={COLORS.primary}
          />
          <Text style={styles.value}>34 PSI</Text>
          <Text style={styles.label}>Tyres</Text>
        </View>

        <View style={styles.item}>
          <Ionicons
            name="build"
            size={24}
            color={COLORS.primary}
          />
          <Text style={styles.value}>Excellent</Text>
          <Text style={styles.label}>Motor</Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 28,
    backgroundColor: '#171717',
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },

  title: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  item: {
    width: '48%',
    backgroundColor: '#111',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 14,
  },

  value: {
    color: COLORS.white,
    fontWeight: '700',
    marginTop: 10,
    fontSize: 16,
  },

  label: {
    color: '#888',
    marginTop: 6,
    fontSize: 12,
  },
});