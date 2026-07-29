import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../constants/colors';

const actions = [
  {icon: 'lock-open', title: 'Unlock'},
  {icon: 'locate', title: 'Locate'},
  {icon: 'flash', title: 'Charge'},
  {icon: 'construct', title: 'Service'},
];

export default function QuickActionGrid() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Quick Actions</Text>

      <View style={styles.grid}>
        {actions.map(item => (
          <TouchableOpacity key={item.title} style={styles.card}>
            <Ionicons
              name={item.icon}
              size={28}
              color={COLORS.primary}
            />

            <Text style={styles.text}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
  },

  heading: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 18,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  card: {
    width: '48%',
    height: 120,
    backgroundColor: '#171717',
    borderRadius: 22,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#262626',
  },

  text: {
    color: COLORS.white,
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
  },
});