import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import ChargingScreen from '../screens/ChargingScreen';
import RideStatisticsScreen from '../screens/RideStatisticsScreen';
import ProfileScreen from '../screens/ProfileScreen';

import {COLORS} from '../constants/colors';

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <Tab.Navigator
    screenOptions={({route}) => ({
        headerShown: false,
      
        tabBarShowLabel: true,
      
        tabBarActiveTintColor: '#C6FF00',
      
        tabBarInactiveTintColor: '#666',
      
        tabBarStyle: {
          position: 'absolute',
      
          left: 16,
          right: 16,
          bottom: 16,
      
          borderRadius: 24,
      
          height: 74,
      
          backgroundColor: '#161616',
      
          borderTopWidth: 0,
      
          paddingBottom: 10,
      
          paddingTop: 8,
      
          elevation: 10,
        },
      
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';
      
          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
      
            case 'Charging':
              iconName = focused ? 'flash' : 'flash-outline';
              break;
      
            case 'Statistics':
              iconName = focused
                ? 'stats-chart'
                : 'stats-chart-outline';
              break;
      
            case 'Profile':
              iconName = focused
                ? 'person-circle'
                : 'person-circle-outline';
              break;
          }
      
          return (
            <Ionicons
              name={iconName}
              size={24}
              color={color}
            />
          );
        },
      })}
      >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Charging"
        component={ChargingScreen}
      />

      <Tab.Screen
        name="Statistics"
        component={RideStatisticsScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}