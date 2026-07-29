import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

import ScooterImage from './ScooterImage';
import ActionButton from './ActionButton';
import {COLORS} from '../constants/colors';

export default function HeroScooterCard() {
  return (
    <LinearGradient
      colors={['#111111', '#162314', '#0B0B0B']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.card}>

      <ScooterImage />

      <Text style={styles.model}>LEXICON X1</Text>

      <View style={styles.statusRow}>
        <View style={styles.dot} />
        <Text style={styles.status}>Ready to Ride</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Icon
            name="battery-half"
            size={22}
            color={COLORS.primary}
          />
          <Text style={styles.value}>82%</Text>
          <Text style={styles.label}>Battery</Text>
        </View>

        <View style={styles.stat}>
          <Icon
            name="location"
            size={22}
            color={COLORS.primary}
          />
          <Text style={styles.value}>112 km</Text>
          <Text style={styles.label}>Range</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.buttons}>
        <ActionButton title="Unlock" />
        <ActionButton title="Locate" />
        <ActionButton title="Service" />
      </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 28,
    borderRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
    overflow: 'hidden',
  },

  model: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 1,
    marginTop: 8,
  },

  statusRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginRight: 8,
  },

  status: {
    color: COLORS.primary,
    fontSize: 17,
    fontWeight: '700',
  },

  divider: {
    height: 1,
    backgroundColor: '#2A2A2A',
    marginVertical: 18,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  stat: {
    alignItems: 'center',
  },

  value: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '700',
    marginTop: 6,
  },

  label: {
    color: '#8B8B8B',
    marginTop: 3,
    fontSize: 13,
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
});