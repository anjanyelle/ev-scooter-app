import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../constants/colors';

type Props = {
  title: string;
  value: string;
};

export default function StatisticsCard({title, value}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '47%',
    backgroundColor: '#171717',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: '#262626',
    marginBottom: 16,
  },

  title: {
    color: '#888',
    fontSize: 13,
  },

  value: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: '700',
    marginTop: 10,
  },
});