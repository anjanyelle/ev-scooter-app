import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';

type Props = {
  title: string;
  value: string;
};

export default function StatCard({title, value}: Props) {
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
    backgroundColor: '#151515',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#252525',
    paddingVertical: 14,
    alignItems: 'center',
    marginHorizontal: 4,
  },

  title: {
    color: COLORS.secondary,
    fontSize: 11,
    textAlign: 'center',
  },

  value: {
    marginTop: 8,
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '700',
  },
});