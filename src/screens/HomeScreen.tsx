import React from 'react';
import BatteryCard from '../components/BatteryCard';
import StatCard from '../components/StatCard';
import ScooterSection from '../components/ScooterSection';
import {ScrollView} from 'react-native';
import RideStatusCard from '../components/RideStatusCard';
import HeroScooterCard from '../components/HeroScooterCard';
import QuickActionGrid from '../components/QuickActionGrid';
import HeroCard from '../components/HeroCard';
import DashboardHeader from '../components/DashboardHeader';
import TodayRideCard from '../components/TodayRideCard';
import VehicleHealthCard from '../components/VehicleHealthCard';
import QuickControls from '../components/QuickControls';
import NearestStationCard from '../components/NearestStationCard';
import NotificationCard from '../components/NotificationCard';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {COLORS} from '../constants/colors';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
 <ScrollView
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{paddingBottom: 40}}>

<DashboardHeader />

<HeroScooterCard />

<QuickControls />
<TodayRideCard />
<VehicleHealthCard />
<NearestStationCard />
<NotificationCard />
{/* <QuickActionGrid /> */}
{/* <HeroCard /> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingHorizontal: 20,
        paddingTop: 45,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },

  greeting: {
    color: COLORS.secondary,
    fontSize: 16,
  },

  name: {
    color: COLORS.white,
    fontSize: 30,
    fontWeight: '700',
    marginTop: 5,
  },

  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 18,
  },
  
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
});