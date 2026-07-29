import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../constants/colors';

export default function HeroCard() {
  return (
    <LinearGradient
      colors={['#1B1B1B', '#111111']}
      style={styles.card}>
      <Text style={styles.model}>LEXICON X1</Text>

      <Text style={styles.range}>
        112 km Remaining
      </Text>

      <View style={styles.progressBackground}>
        <View style={styles.progressFill} />
      </View>

      <Text style={styles.battery}>
        Battery 82%
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 28,
    padding: 24,
    marginVertical: 24,
  },

  model: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: '800',
  },

  range: {
    color: COLORS.primary,
    fontSize: 20,
    marginTop: 10,
  },

  progressBackground: {
    height: 10,
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    marginTop: 24,
  },

  progressFill: {
    width: '82%',
    height: 10,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },

  battery: {
    color: '#BFBFBF',
    marginTop: 14,
    fontSize: 16,
  },
});