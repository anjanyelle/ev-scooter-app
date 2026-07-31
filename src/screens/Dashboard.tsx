/**
 * Dashboard Screen
 * Main dashboard screen displaying all EV scooter information
 * 
 * RESPONSIVE LAYOUT FIXES:
 * - All hardcoded widths removed, replaced with flex:1
 * - Both top cards now equal width (flex:1)
 * - Map + RideChart now equal halves (flex:1)
 * - Service card height is content-driven (no fixed height)
 * - useWindowDimensions for responsive breakpoints
 * - Consistent 16dp padding on all sides
 * - SafeAreaView enabled for notch support
 * - Flexbox layout throughout
 */

import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Spacing, Radius, Shadows, Typography } from '../theme';
import Header from '../components/Header';
import GreetingCard from '../components/GreetingCard';
import WeatherCard from '../components/WeatherCard';
import VehicleCard from '../components/VehicleCard';
import StatisticsCard from '../components/StatisticsCard';
import MapCard from '../components/MapCard';
import RideChart from '../components/RideChart';
import ServiceCard from '../components/ServiceCard';
import BottomNavigation, { TabType } from '../components/BottomNavigation';

const Dashboard: React.FC = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const navigation = useNavigation<any>();
  const { width: screenWidth } = useWindowDimensions();
  const isSmallScreen = screenWidth <= 360;

  // Map route names to tab ids
  const activeTab: TabType = (() => {
    switch (route.name) {
      case 'Dashboard':
        return 'home';
      case 'Rides':
        return 'rides';
      case 'Center':
        return 'center';
      case 'Service':
        return 'service';
      case 'Profile':
        return 'profile';
      default:
        return 'home';
    }
  })();

  const handleTabChange = (tab: TabType) => {
    const routeMap: Record<TabType, string> = {
      home: 'Dashboard',
      rides: 'Rides',
      center: 'Center',
      service: 'Service',
      profile: 'Profile',
    };
    navigation.navigate(routeMap[tab]);
  };

  // Responsive spacing: smaller gaps on small screens
  const sectionGap = isSmallScreen ? 12 : 16;
  const cardGap = isSmallScreen ? 8 : 12;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <View style={[styles.content, { paddingBottom: insets.bottom }]}>
        <Header
          onMenuPress={() => console.log('Menu pressed')}
          onNotificationPress={() => console.log('Notification pressed')}
          onProfilePress={() => handleTabChange('profile')}
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {activeTab === 'home' && (
            <>
              {/* TOP CARDS ROW - Two equal cards using flex:1 */}
              {/* Both cards get equal width for consistent sizing */}
              <View style={[styles.topCardsRow, { gap: cardGap }]}>
                <View style={styles.topCardWrapper}>
                  <GreetingCard userName="Rider" timeOfDay="morning" />
                </View>
                <View style={styles.topCardWrapper}>
                  <WeatherCard
                    temperature={27}
                    condition="Clear"
                    location="Lucknow"
                  />
                </View>
              </View>

              {/* VEHICLE CARD - Full width with padding */}
              <View style={[styles.vehicleCardWrapper, { marginTop: sectionGap }]}>
                <VehicleCard
                  vehicleName="Lexicon X1"
                  batteryPercentage={76}
                  estimatedRange={105}
                  isConnected={true}
                  isSecure={true}
                  onUnlock={() => console.log('Unlock pressed')}
                  onFlash={() => console.log('Flash pressed')}
                  onHorn={() => console.log('Horn pressed')}
                  onSeatUnlock={() => console.log('Seat unlock pressed')}
                  onMore={() => console.log('More pressed')}
                />
              </View>

              {/* STATISTICS SECTION - 2 rows, 2 cards each, equal width */}
              <View style={[styles.statsSection, { marginTop: sectionGap }]}>
                <View style={[styles.statsRow, { gap: cardGap }]}>
                  <View style={styles.statCardWrapper}>
                    <StatisticsCard
                      icon="battery-heart"
                      label="Battery Health"
                      value="Good"
                      subValue="80%"
                    />
                  </View>
                  <View style={styles.statCardWrapper}>
                    <StatisticsCard
                      icon="battery-charging"
                      label="Last Charge"
                      value="80%"
                    />
                  </View>
                </View>
                <View style={[styles.statsRow, { gap: cardGap }]}>
                  <View style={styles.statCardWrapper}>
                    <StatisticsCard
                      icon="motorcycle"
                      label="Total Rides"
                      value="128"
                    />
                  </View>
                  <View style={styles.statCardWrapper}>
                    <StatisticsCard
                      icon="map-marker-distance"
                      label="Distance"
                      value="523 km"
                    />
                  </View>
                </View>
              </View>

              {/* MAP + RIDE CHART SIDE BY SIDE - Equal halves using flex:1 */}
              <View style={[styles.mapRideRow, { marginTop: sectionGap, gap: cardGap }]}>
                <View style={styles.mapRideHalf}>
                  <MapCard
                    onFindChargers={() => console.log('Find chargers pressed')}
                    chargerCount={3}
                  />
                </View>
                <View style={styles.mapRideHalf}>
                  <RideChart
                    data={[12, 19, 8, 15, 22, 10, 48]}
                    labels={['M', 'T', 'W', 'T', 'F', 'S', 'S']}
                    totalDistance={48}
                  />
                </View>
              </View>

              {/* SERVICE CARD - Content-driven height, no fixed height */}
              <View style={[styles.serviceSection, { marginTop: sectionGap }]}>
                <ServiceCard
                  onBookService={() => console.log('Book service pressed')}
                />
              </View>
            </>
          )}

          {activeTab === 'rides' && (
            <View style={styles.section}>
              <RideChart
                data={[12, 19, 8, 15, 22, 10, 48]}
                labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                totalDistance={48}
              />
            </View>
          )}

          {activeTab === 'center' && (
            <View style={styles.section}>
              <MapCard
                onFindChargers={() => console.log('Find chargers pressed')}
                chargerCount={3}
              />
            </View>
          )}

          {activeTab === 'service' && (
            <View style={styles.section}>
              <ServiceCard
                onBookService={() => console.log('Book service pressed')}
              />
            </View>
          )}

          {activeTab === 'profile' && (
            <View style={styles.profileContainer}>
              <LinearGradient
                colors={[Colors.cardLight, Colors.card]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.profileHeaderCard}
              >
                <View style={styles.profileHeaderContent}>
                  <View style={styles.profileAvatarContainer}>
                    <Image
                      source={{ uri: 'https://i.pravatar.cc/100?img=12' }}
                      style={styles.profileAvatarImage}
                    />
                  </View>
                  <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>Lexicon Rider</Text>
                    <Text style={styles.profileEmail}>rider@lexicon.ev</Text>
                    <View style={styles.eliteBadge}>
                      <Icon name="crown" size={14} color={Colors.background} />
                      <Text style={styles.eliteBadgeText}>ELITE MEMBER</Text>
                    </View>
                  </View>
                </View>
              </LinearGradient>

              <View style={styles.profileStatsRow}>
                <View style={styles.profileStatCard}>
                  <Icon name="leaf" size={20} color={Colors.primary} />
                  <Text style={styles.profileStatValue}>1,240 kg</Text>
                  <Text style={styles.profileStatLabel}>CO2 Saved</Text>
                </View>
                <View style={styles.profileStatCard}>
                  <Icon name="lightning-bolt" size={20} color={Colors.primary} />
                  <Text style={styles.profileStatValue}>4,850</Text>
                  <Text style={styles.profileStatLabel}>EV Points</Text>
                </View>
              </View>

              <View style={styles.profileMenu}>
                <TouchableOpacity style={styles.profileMenuItem}>
                  <View style={styles.profileMenuItemLeft}>
                    <Icon name="cog-outline" size={22} color={Colors.primary} />
                    <Text style={styles.profileMenuItemText}>Settings</Text>
                  </View>
                  <Icon name="chevron-right" size={20} color={Colors.textSecondary} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.profileMenuItem}>
                  <View style={styles.profileMenuItemLeft}>
                    <Icon name="shield-check-outline" size={22} color={Colors.primary} />
                    <Text style={styles.profileMenuItemText}>Security & Lock</Text>
                  </View>
                  <Icon name="chevron-right" size={20} color={Colors.textSecondary} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.profileMenuItem}>
                  <View style={styles.profileMenuItemLeft}>
                    <Icon name="help-circle-outline" size={22} color={Colors.primary} />
                    <Text style={styles.profileMenuItemText}>Help & Support</Text>
                  </View>
                  <Icon name="chevron-right" size={20} color={Colors.textSecondary} />
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View style={styles.bottomPadding} />
        </ScrollView>

        <BottomNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },

  // TOP CARDS ROW - Two equal flex:1 cards with consistent padding
  topCardsRow: {
    flexDirection: 'row',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  topCardWrapper: {
    flex: 1,
    height: 90,
  },

  // VEHICLE CARD - Full width with padding
  vehicleCardWrapper: {
    paddingHorizontal: 16,
  },

  // STATISTICS SECTION - 2 rows, 2 equal cards each
  statsSection: {
    paddingHorizontal: 16,
    gap: 12,
  },
  statsRow: {
    flexDirection: 'row',
  },
  statCardWrapper: {
    flex: 1,
  },

  // MAP + RIDE CHART - Equal halves using flex:1
  mapRideRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  mapRideHalf: {
    flex: 1,
  },

  // SERVICE CARD - Full width, content-driven height
  serviceSection: {
    paddingHorizontal: 16,
  },

  section: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  bottomPadding: {
    height: Spacing.xl,
  },

  // PROFILE SECTION
  profileContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
    gap: Spacing.md,
  },
  profileHeaderCard: {
    padding: Spacing.lg,
    borderRadius: Radius.xl,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadows.medium,
  },
  profileHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  profileAvatarContainer: {
    width: 64,
    height: 64,
    borderRadius: Radius.full,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  profileAvatarImage: {
    width: '100%',
    height: '100%',
  },
  profileInfo: {
    gap: Spacing.xs,
  },
  profileName: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
  },
  profileEmail: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  eliteBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.sm,
    alignSelf: 'flex-start',
  },
  eliteBadgeText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.background,
  },
  profileStatsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  profileStatCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    gap: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  profileStatValue: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
  },
  profileStatLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },
  profileMenu: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    overflow: 'hidden',
  },
  profileMenuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  profileMenuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  profileMenuItemText: {
    fontSize: Typography.fontSize.md,
    color: Colors.text,
  },
});

export default Dashboard;