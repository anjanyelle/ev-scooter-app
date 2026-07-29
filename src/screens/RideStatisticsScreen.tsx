import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {COLORS} from '../constants/colors';
import WeeklyChart from '../components/WeeklyChart';
import StatisticsCard from '../components/StatisticsCard';

export default function RideStatisticsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>

        <Text style={styles.title}>
          Ride Statistics
        </Text>

        <Text style={styles.subtitle}>
          Your EV performance this week
        </Text>

        <WeeklyChart />

        <View style={styles.row}>
          <StatisticsCard
            title="Distance"
            value="1842 km"
          />

          <StatisticsCard
            title="Ride Time"
            value="52 hrs"
          />
        </View>

        <View style={styles.row}>
          <StatisticsCard
            title="Energy Used"
            value="326 kWh"
          />

          <StatisticsCard
            title="CO₂ Saved"
            value="412 kg"
          />
        </View>

        <View style={styles.row}>
          <StatisticsCard
            title="Money Saved"
            value="₹12,540"
          />

          <StatisticsCard
            title="Avg Speed"
            value="48 km/h"
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 140,
  },

  title: {
    color: COLORS.white,
    fontSize: 34,
    fontWeight: '800',
  },

  subtitle: {
    color: '#8A8A8A',
    fontSize: 16,
    marginTop: 8,
    marginBottom: 28,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});