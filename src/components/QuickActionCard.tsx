import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../constants/colors';

type Props = {
  title: string;
  value: string;
};

export default function QuickActionCard({
  title,
  value,
}: Props) {
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
    padding: 16,
    margin: 6,
  },

  title: {
    color: '#888',
    fontSize: 13,
  },

  value: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: '700',
    marginTop: 10,
  },
});