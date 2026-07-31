/**
 * BottomNavigation Component
 * Bottom tab navigation with floating center EV icon
 * 
 * SPECIFICATION MATCH:
 * - Height: 82dp
 * - Center button: 72x72, floating, centered
 * - Home, Ride, Center Button, Service, Profile
 * - No fixed widths, uses flex
 */

import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Spacing, Radius, Shadows, Typography } from '../theme';

export type TabType = 'home' | 'rides' | 'center' | 'service' | 'profile';

interface BottomNavigationProps {
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab = 'home',
  onTabChange,
}) => {
  const tabs: { id: TabType; icon: string; label: string }[] = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'rides', icon: 'motorcycle', label: 'Rides' },
    { id: 'center', icon: 'electric-scooter', label: '' },
    { id: 'service', icon: 'wrench', label: 'Service' },
    { id: 'profile', icon: 'account', label: 'Profile' },
  ];

  const TabButton: React.FC<{
    item: { id: TabType; icon: string; label: string };
    isActive: boolean;
    isCenter: boolean;
  }> = ({ item, isActive, isCenter }) => {
    if (isCenter) {
      return (
        <View style={styles.centerTabContainer}>
          <TouchableOpacity
            style={styles.centerTabButton}
            onPress={() => onTabChange?.(item.id)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[Colors.primary, Colors.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.centerTabGradient}
            >
              <Icon name={item.icon} size={32} color={Colors.background} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => onTabChange?.(item.id)}
        activeOpacity={0.7}
      >
        <Icon
          name={item.icon}
          size={24}
          color={isActive ? Colors.primary : Colors.textSecondary}
        />
        <Text
          style={[
            styles.tabLabel,
            isActive && styles.tabLabelActive,
          ]}
        >
          {item.label}
        </Text>
        {isActive && <View style={styles.activeIndicator} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            item={tab}
            isActive={activeTab === tab.id}
            isCenter={tab.id === 'center'}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    ...Shadows.premium,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.md,
    height: 82,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    position: 'relative',
  },
  tabLabel: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.regular,
    color: Colors.textSecondary,
  },
  tabLabelActive: {
    color: Colors.primary,
    fontWeight: Typography.fontWeight.semibold,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -4,
    width: 4,
    height: 4,
    borderRadius: Radius.full,
    backgroundColor: Colors.primary,
    ...Shadows.small,
  },
  centerTabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerTabButton: {
    width: 72,
    height: 72,
    borderRadius: Radius.full,
    ...Shadows.glow,
    marginTop: -36,
    borderWidth: 4,
    borderColor: Colors.background,
  },
  centerTabGradient: {
    width: '100%',
    height: '100%',
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BottomNavigation;