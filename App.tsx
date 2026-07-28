/**
 * EV Scooter App
 * Main application entry point
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/theme';
import { RootNavigator } from './src/navigation/RootNavigator';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <StatusBar barStyle="light-content" backgroundColor="#0A0E27" />
        <RootNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;