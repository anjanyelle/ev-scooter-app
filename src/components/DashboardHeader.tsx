import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../constants/colors';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';


export default function DashboardHeader() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>
          Good Evening 👋
        </Text>

        <Text style={styles.name}>
          Satwik
        </Text>

        <View style={styles.locationRow}>
          <Ionicons
            name="location"
            size={15}
            color={COLORS.primary}
          />

          <Text style={styles.location}>
            Hyderabad
          </Text>
        </View>
      </View>

      <View style={styles.right}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons
            name="notifications"
            size={22}
            color={COLORS.white}
          />
        </TouchableOpacity>

        <View style={styles.weather}>
          <Ionicons
            name="sunny"
            size={18}
            color="#FFD54F"
          />

          <Text style={styles.temp}>
            31°
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:20,
  },

  greeting:{
    color:'#888',
    fontSize:15,
  },

  name:{
    color:'white',
    fontSize:32,
    fontWeight:'800',
    marginTop:4,
  },

  locationRow:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:8,
  },

  location:{
    color:'#AAA',
    marginLeft:6,
  },

  right:{
    alignItems:'flex-end',
  },

  iconButton:{
    backgroundColor:'#171717',
    width:46,
    height:46,
    borderRadius:23,
    justifyContent:'center',
    alignItems:'center',
    marginBottom:12,
  },

  weather:{
    flexDirection:'row',
    alignItems:'center',
  },

  temp:{
    color:'white',
    marginLeft:6,
    fontWeight:'700',
  },
});