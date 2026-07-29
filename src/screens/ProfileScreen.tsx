import React from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import ProfileMenuItem from '../components/ProfileMenuItem';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../constants/colors';
import ProfileInfoCard from '../components/ProfileInfoCard';

export default function ProfileScreen() {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>

        <View style={styles.avatar}>
          <Ionicons
            name="person"
            size={60}
            color={COLORS.primary}
          />
        </View>

        <Text style={styles.name}>Satwik</Text>

        <Text style={styles.member}>
          Premium Member
        </Text>

        <View style={styles.section}>
          <ProfileInfoCard
            icon="bicycle"
            title="Vehicle"
            value="LEXICON X1"
          />

          <ProfileInfoCard
            icon="battery-charging"
            title="Battery Health"
            value="94%"
          />

          <ProfileInfoCard
            icon="speedometer"
            title="Total Distance"
            value="1842 km"
          />

          <ProfileInfoCard
            icon="construct"
            title="Service Due"
            value="28 Days"
          />

          <ProfileInfoCard
            icon="shield-checkmark"
            title="Warranty"
            value="Active"
          />
          <ProfileMenuItem
  icon="car-outline"
  title="My Vehicle"
/>

<ProfileMenuItem
  icon="settings-outline"
  title="Settings"
/>

<ProfileMenuItem
  icon="notifications-outline"
  title="Notifications"
/>

<ProfileMenuItem
  icon="moon-outline"
  title="Dark Mode"
/>

<ProfileMenuItem
  icon="help-circle-outline"
  title="Help & Support"
/>

<ProfileMenuItem
  icon="information-circle-outline"
  title="About App"
/>

<ProfileMenuItem
  icon="log-out-outline"
  title="Logout"
  danger
  onPress={() =>
    Alert.alert(
      'Logout',
      'Do you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () =>
            navigation.navigate('Login' as never),
        },
      ],
    )
  }
/>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 140,
    alignItems: 'center',
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#171717',
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  name: {
    color: COLORS.white,
    fontSize: 30,
    fontWeight: '800',
  },

  member: {
    color: COLORS.primary,
    fontSize: 16,
    marginTop: 8,
    marginBottom: 32,
  },

  section: {
    width: '100%',
  },
});