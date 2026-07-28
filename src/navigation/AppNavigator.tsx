/**
 * App Navigator
 * Navigation setup for the EV Scooter app
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../theme';
import Dashboard from '../screens/Dashboard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: 'none' },
        }}
      >
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Icon name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Rides"
          component={Dashboard}
          options={{
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Icon name="motorcycle" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Center"
          component={Dashboard}
          options={{
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Icon name="electric-scooter" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Service"
          component={Dashboard}
          options={{
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Icon name="wrench" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Dashboard}
          options={{
            tabBarIcon: ({ color, size }: { color: string; size: number }) => (
              <Icon name="account" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
