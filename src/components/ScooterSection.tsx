import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

import {COLORS} from '../constants/colors';

export default function ScooterSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Your Scooter
      </Text>

      <View style={styles.card}>
        <Image
          source={require('../assets/scooter.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
  },

  title: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 18,
  },

  card: {
    backgroundColor: '#121212',
    borderRadius: 24,
    alignItems: 'center',
    paddingVertical: 25,
  },

  image: {
    width: 260,
    height: 170,
  },
});