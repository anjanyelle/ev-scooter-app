import { Platform, Vibration } from 'react-native';

function pulse(duration: number | number[]) {
  if (Platform.OS === 'android') Vibration.vibrate(duration);
}

export const haptic = {
  select: async () => pulse(7),
  success: async () => pulse([0, 18, 45, 22]),
  warning: async () => pulse([0, 28, 55, 28]),
  error: async () => pulse([0, 35, 45, 35, 45, 35]),
  impact: async () => pulse(14)
};
