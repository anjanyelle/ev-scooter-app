import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../constants/colors';

const controls = [
  {icon: 'lock-open', label: 'Unlock'},
  {icon: 'location', label: 'Locate'},
  {icon: 'bulb', label: 'Lights'},
  {icon: 'volume-high', label: 'Horn'},
  {icon: 'navigate', label: 'Navigate'},
  {icon: 'flash', label: 'Charge'},
];

export default function QuickControls() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Controls</Text>

      <View style={styles.grid}>
        {controls.map(item => (
          <TouchableOpacity
            key={item.label}
            style={styles.card}>
            <Ionicons
              name={item.icon}
              size={26}
              color={COLORS.primary}
            />

            <Text style={styles.label}>
              {item.label}
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

  title: {
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
    width: '31%',
    backgroundColor: '#171717',
    borderRadius: 18,
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },

  label: {
    color: COLORS.white,
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
  },
});