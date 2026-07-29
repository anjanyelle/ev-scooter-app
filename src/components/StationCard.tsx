import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../constants/colors';

export default function StationCard() {
  return (
    <View style={styles.card}>

      <View style={styles.topRow}>

        <View>
          <Text style={styles.small}>
            Nearest Station
          </Text>

          <Text style={styles.name}>
            EV Fast Hub
          </Text>

          <Text style={styles.distance}>
            2.1 km away
          </Text>
        </View>

        <View style={styles.iconCircle}>
          <Ionicons
            name="location"
            size={28}
            color={COLORS.primary}
          />
        </View>

      </View>

      <View style={styles.line} />

      <View style={styles.details}>

        <View>
          <Text style={styles.detailTitle}>
            Charger
          </Text>

          <Text style={styles.detailValue}>
            DC Fast • 24 kW
          </Text>
        </View>

        <View>
          <Text style={styles.detailTitle}>
            Available
          </Text>

          <Text style={styles.available}>
            ● Available
          </Text>
        </View>

      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          Start Charging
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#171717',
    borderRadius: 28,
    padding: 22,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#292929',
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#202020',
    justifyContent: 'center',
    alignItems: 'center',
  },

  small: {
    color: '#888',
    fontSize: 13,
  },

  name: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '700',
    marginTop: 6,
  },

  distance: {
    color: COLORS.primary,
    marginTop: 6,
    fontSize: 15,
  },

  line: {
    height: 1,
    backgroundColor: '#2A2A2A',
    marginVertical: 22,
  },

  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  detailTitle: {
    color: '#888',
    fontSize: 13,
  },

  detailValue: {
    color: COLORS.white,
    marginTop: 6,
    fontSize: 16,
    fontWeight: '600',
  },

  available: {
    color: COLORS.primary,
    marginTop: 6,
    fontSize: 16,
    fontWeight: '700',
  },

  button: {
    marginTop: 24,
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },

  buttonText: {
    color: '#000',
    fontSize: 17,
    fontWeight: '800',
  },
});