import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../constants/colors';

export default function NearestStationCard() {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>
            Nearest Charging Station
          </Text>

          <Text style={styles.station}>
            EV Fast Hub
          </Text>

          <Text style={styles.distance}>
            📍 2.1 km away
          </Text>
        </View>

        <Ionicons
          name="flash"
          size={34}
          color={COLORS.primary}
        />
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.available}>
          🟢 4 Chargers Available
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Navigate
          </Text>
        </TouchableOpacity>
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

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    color: '#888',
    fontSize: 14,
  },

  station: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '700',
    marginTop: 8,
  },

  distance: {
    color: '#AAA',
    marginTop: 8,
  },

  infoRow: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  available: {
    color: COLORS.primary,
    fontWeight: '600',
  },

  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },

  buttonText: {
    color: '#000',
    fontWeight: '700',
  },
});