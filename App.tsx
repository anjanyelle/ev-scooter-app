/**
 * EV Scooter App
 * Premium EV Scooter Dashboard Application
 *
 * @format
 * 
 * FIX 1: Status Bar Overlap
 * - SafeAreaProvider wraps entire app (for useSafeAreaInsets in screens)
 * - StatusBar is NOT set here to avoid conflict with screen-level StatusBar
 * - Each screen manages its own StatusBar with translucent + backgroundColor="transparent"
 * - No duplicate/conflicting insets logic
 */

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;