import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../constants/colors';

type Props = {
  icon: string;
  title: string;
  danger?: boolean;
  onPress?: () => void;
};

export default function ProfileMenuItem({
  icon,
  title,
  danger,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}>

      <View style={styles.left}>

        <Ionicons
          name={icon}
          size={22}
          color={danger ? '#FF4D4F' : COLORS.primary}
        />

        <Text
          style={[
            styles.title,
            danger && {color: '#FF4D4F'},
          ]}>
          {title}
        </Text>

      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color="#777"
      />

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: '#171717',

    padding: 18,

    borderRadius: 18,

    marginBottom: 14,

    borderWidth: 1,

    borderColor: '#252525',
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    color: COLORS.white,
    marginLeft: 16,
    fontSize: 16,
    fontWeight: '600',
  },
});