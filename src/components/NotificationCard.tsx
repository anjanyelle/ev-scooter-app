import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../constants/colors';

const notifications = [
  {
    icon: 'construct',
    title: 'Service Due',
    subtitle: 'Next service in 6 days',
  },
  {
    icon: 'battery-charging',
    title: 'Battery Status',
    subtitle: 'Battery health is excellent',
  },
  {
    icon: 'cloud-download',
    title: 'Software Update',
    subtitle: 'Version 2.4 available',
  },
];

export default function NotificationCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Notifications</Text>

      {notifications.map(item => (
        <View key={item.title} style={styles.item}>
          <View style={styles.iconBox}>
            <Ionicons
              name={item.icon}
              size={22}
              color={COLORS.primary}
            />
          </View>

          <View style={{flex: 1}}>
            <Text style={styles.itemTitle}>
              {item.title}
            </Text>

            <Text style={styles.itemSub}>
              {item.subtitle}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 28,
    backgroundColor: '#171717',
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    marginBottom: 40,
  },

  title: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#101010',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  itemTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },

  itemSub: {
    color: '#888',
    marginTop: 4,
    fontSize: 13,
  },
});
