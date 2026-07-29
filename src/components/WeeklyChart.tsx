import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../constants/colors';

const data = [
  {day: 'Mon', value: 60},
  {day: 'Tue', value: 90},
  {day: 'Wed', value: 70},
  {day: 'Thu', value: 110},
  {day: 'Fri', value: 65},
  {day: 'Sat', value: 100},
  {day: 'Sun', value: 45},
];

export default function WeeklyChart() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Weekly Distance</Text>

      <View style={styles.chart}>
        {data.map(item => (
          <View key={item.day} style={styles.item}>
            <View
              style={[
                styles.bar,
                {
                  height: item.value,
                },
              ]}
            />

            <Text style={styles.day}>
              {item.day}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#171717',
    borderRadius: 26,
    padding: 22,
    marginBottom: 26,
    borderWidth: 1,
    borderColor: '#262626',
  },

  title: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 24,
  },

  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
  },

  item: {
    alignItems: 'center',
  },

  bar: {
    width: 18,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    marginBottom: 10,
  },

  day: {
    color: '#888',
    fontSize: 12,
    marginTop: 6,
  },
});