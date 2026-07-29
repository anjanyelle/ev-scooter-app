/**
 * AuthNavigator — Stack navigator for unauthenticated flow
 */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {AuthStackParamList} from '../types';

import {SplashScreen} from '../features/auth/screens/SplashScreen';
import {OnboardingScreen} from '../features/auth/screens/OnboardingScreen';
import {LoginScreen} from '../features/auth/screens/LoginScreen';
import {RegistrationScreen} from '../features/auth/screens/RegistrationScreen';
import {OtpScreen} from '../features/auth/screens/OtpScreen';
import {ForgotPasswordScreen} from '../features/auth/screens/ForgotPasswordScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: {backgroundColor: '#050505'},
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{animation: 'fade'}}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegistrationScreen} />
      <Stack.Screen
        name="OTP"
        component={OtpScreen}
        options={{animation: 'slide_from_bottom'}}
      />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};
