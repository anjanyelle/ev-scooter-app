import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';

type Props = {
  title: string;
  value: string;
};

export default function StatusCard({title, value}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#171717',
    borderRadius: 18,
    padding: 18,
    margin: 6,
    borderWidth: 1,
    borderColor: '#252525',
  },

  title: {
    color: COLORS.secondary,
    fontSize: 13,
  },

  value: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: '700',
    marginTop: 10,
  },
});