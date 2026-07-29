import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../constants/colors';

export default function TodayRideCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        Today's Ride
      </Text>

      <View style={styles.row}>
        <View style={styles.item}>
          <Ionicons
            name="speedometer"
            size={24}
            color={COLORS.primary}
          />
          <Text style={styles.value}>18 km</Text>
          <Text style={styles.label}>Distance</Text>
        </View>

        <View style={styles.item}>
          <Ionicons
            name="time"
            size={24}
            color={COLORS.primary}
          />
          <Text style={styles.value}>43 min</Text>
          <Text style={styles.label}>Ride Time</Text>
        </View>

        <View style={styles.item}>
          <Ionicons
            name="flash"
            size={24}
            color={COLORS.primary}
          />
          <Text style={styles.value}>1.8 kWh</Text>
          <Text style={styles.label}>Energy</Text>
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

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  item: {
    alignItems: 'center',
    flex: 1,
  },

  value: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
  },

  label: {
    color: '#888',
    marginTop: 6,
    fontSize: 12,
  },
});