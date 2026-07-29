import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../constants/colors';

type Props = {
  title: string;
  value: string;
};

function getIcon(title: string) {
  switch (title) {
    case 'Time Remaining':
      return 'time-outline';

    case 'Charging Cost':
      return 'wallet-outline';

    case 'Charging Speed':
      return 'flash-outline';

    case 'Battery Temp':
      return 'thermometer-outline';

    default:
      return 'information-circle-outline';
  }
}

export default function InfoCard({title, value}: Props) {
  return (
    <View style={styles.card}>

      <View style={styles.iconBox}>
        <Ionicons
          name={getIcon(title)}
          size={18}
          color={COLORS.primary}
        />
      </View>

      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.value}>
        {value}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '47%',
    backgroundColor: '#171717',
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#292929',
  },

  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#202020',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },

  title: {
    color: '#8C8C8C',
    fontSize: 13,
    marginBottom: 10,
  },

  value: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '700',
  },
});