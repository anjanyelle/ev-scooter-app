import { NativeModules, PermissionsAndroid, Platform } from 'react-native';

interface LexiconNotificationsModule {
  createChannels(): Promise<void>;
}

const nativeNotifications = NativeModules.LexiconNotifications as
  | LexiconNotificationsModule
  | undefined;

export async function configureNotificationChannels(): Promise<void> {
  if (Platform.OS !== 'android') return;
  if (!nativeNotifications) {
    throw new Error('LEXICON Android notification module is unavailable.');
  }
  await nativeNotifications.createChannels();
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (Platform.OS !== 'android') return true;
  await configureNotificationChannels();
  if (Number(Platform.Version) < 33) return true;

  const result = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    {
      title: 'Allow LEXICON notifications',
      message: 'Receive vehicle security alerts, charging updates, and service reminders.',
      buttonPositive: 'Allow',
      buttonNegative: 'Not now'
    }
  );
  return result === PermissionsAndroid.RESULTS.GRANTED;
}
