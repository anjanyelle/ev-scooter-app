import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../constants/colors';

export default function SplashScreen() {
    const navigation = useNavigation();

useEffect(() => {
  const timer = setTimeout(() => {
    navigation.navigate('Login' as never);
  }, 2500);

  return () => clearTimeout(timer);
}, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <View style={styles.logoCircle}>
          <Ionicons
            name="flash"
            size={70}
            color={COLORS.primary}
          />
        </View>

        <Text style={styles.title}>LEXICON EV</Text>

        <Text style={styles.subtitle}>
          Smart Electric Mobility
        </Text>
      </View>

      <Text style={styles.footer}>
        Powered by React Native
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'space-between',
    paddingVertical: 80,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoCircle: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: '#171717',
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: COLORS.white,
    fontSize: 36,
    fontWeight: '800',
    marginTop: 35,
    letterSpacing: 2,
  },

  subtitle: {
    color: '#9A9A9A',
    fontSize: 18,
    marginTop: 10,
  },

  footer: {
    color: '#666',
    textAlign: 'center',
    fontSize: 14,
  },
});