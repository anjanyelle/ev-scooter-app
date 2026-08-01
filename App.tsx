import { useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppErrorBoundary } from '@/components/system/AppErrorBoundary';
import { AuthProvider } from '@/context/AuthContext';
import { PreferencesProvider } from '@/context/PreferencesContext';
import { ToastProvider } from '@/context/ToastContext';
import { AppNavigator } from '@/navigation/AppNavigator';
import { configureNotificationChannels } from '@/services/notifications';
import { colors } from '@/theme';

export default function App() {
  useEffect(() => {
    void configureNotificationChannels().catch(() => undefined);
  }, []);

  return (
    <AppErrorBoundary>
      <GestureHandlerRootView style={styles.root}>
        <SafeAreaProvider>
          <PreferencesProvider>
            <AuthProvider>
              <ToastProvider>
                <StatusBar barStyle="light-content" backgroundColor={colors.background} />
                <AppNavigator />
              </ToastProvider>
            </AuthProvider>
          </PreferencesProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </AppErrorBoundary>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background }
});
