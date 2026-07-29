import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

import BatteryCircle from '../components/BatteryCircle';
import InfoCard from '../components/InfoCard';
import StationCard from '../components/StationCard';
import {COLORS} from '../constants/colors';

export default function ChargingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
  style={{flex: 1}}
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 140,
  }}>
        <Text style={styles.title}>Charging</Text>

        <Text style={styles.subtitle}>
          Monitor your EV charging session
        </Text>

        <View style={styles.circleCard}>
          <BatteryCircle percentage={82} />

          <Text style={styles.status}>
            Charging...
          </Text>
        </View>

        <View style={styles.row}>
          <InfoCard
            title="Time Remaining"
            value="00:48"
          />

          <InfoCard
            title="Charging Cost"
            value="₹145"
          />
        </View>

        <View style={styles.row}>
          <InfoCard
            title="Charging Speed"
            value="24 kW"
          />

          <InfoCard
            title="Battery Temp"
            value="32°C"
          />
        </View>

        <StationCard />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
      },
  title: {
    color: COLORS.white,
    fontSize: 34,
    fontWeight: '800',
  },

  subtitle: {
    color: '#8C8C8C',
    fontSize: 16,
    marginTop: 8,
    marginBottom: 28,
  },

  circleCard: {
    backgroundColor: '#171717',
    borderRadius: 28,
    paddingVertical: 30,
    marginBottom: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#252525',
  },

  status: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: '700',
    marginTop: 18,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});