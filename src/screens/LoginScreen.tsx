import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {COLORS} from '../constants/colors';

export default function LoginScreen() {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>
          Sign in to continue
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#777"
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#777"
          secureTextEntry
          style={styles.input}
        />

<TouchableOpacity
  style={styles.button}
  onPress={() => navigation.navigate('Main' as never)}>          <Text style={styles.buttonText}>
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.register}>
            Create a new account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },

  header: {
    marginBottom: 50,
  },

  title: {
    color: COLORS.white,
    fontSize: 34,
    fontWeight: '800',
  },

  subtitle: {
    color: '#8A8A8A',
    fontSize: 16,
    marginTop: 10,
  },

  form: {
    width: '100%',
  },

  input: {
    backgroundColor: '#171717',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
    color: COLORS.white,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    marginBottom: 18,
  },

  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
  },

  register: {
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 24,
    fontSize: 16,
  },
});