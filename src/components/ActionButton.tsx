import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../constants/colors';

type Props = {
  title: string;
};

const getIcon = (title: string) => {
  switch (title) {
    case 'Unlock':
      return 'lock-open';
    case 'Locate':
      return 'location';
    case 'Service':
      return 'construct';
    default:
      return 'ellipse';
  }
};

export default function ActionButton({title}: Props) {
  return (
    <TouchableOpacity activeOpacity={0.85} style={styles.button}>
      <Icon
        name={getIcon(title)}
        size={22}
        color={COLORS.primary}
      />

      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 16,
    borderRadius: 18,
    backgroundColor: '#1B1B1B',
    borderWidth: 1,
    borderColor: '#2F2F2F',
    alignItems: 'center',
  },

  text: {
    color: COLORS.white,
    fontWeight: '700',
    marginTop: 8,
    fontSize: 14,
  },
});