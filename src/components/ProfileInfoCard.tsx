import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../constants/colors';

type Props = {
  icon: string;
  title: string;
  value: string;
};

export default function ProfileInfoCard({
  icon,
  title,
  value,
}: Props) {
  return (
    <View style={styles.card}>
      <Ionicons
        name={icon}
        size={24}
        color={COLORS.primary}
      />

      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#171717',
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },

  info: {
    marginLeft: 16,
  },

  title: {
    color: '#8A8A8A',
    fontSize: 13,
  },

  value: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
    marginTop: 6,
  },
});