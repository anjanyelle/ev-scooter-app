import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

export default function ScooterImage() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.glow} />

      <Image
  source={require('../assets/scooter.png')}
  resizeMode="contain"
  style={styles.image}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40,
  },

  glow: {
    position: 'absolute',
    bottom: 20,
    width: 260,
    height: 50,
    borderRadius: 130,
    backgroundColor: '#B8FF1A',
    opacity: 0.45,
  },

  image: {
    width: 340,
    height: 240,
  },
});