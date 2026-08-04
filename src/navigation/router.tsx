import {
  CommonActions,
  StackActions,
  createNavigationContainerRef
} from '@react-navigation/native';
import { useEffect, useMemo } from 'react';
import type { PropsWithChildren } from 'react';
import { Text } from 'react-native';
import type { StyleProp, TextStyle } from 'react-native';

import type { AppHref, MainTabParamList, RootStackParamList } from './types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

type RootRouteName = Exclude<keyof RootStackParamList, 'MainTabs'>;

type Target =
  | { kind: 'tab'; screen: keyof MainTabParamList }
  | { kind: 'root'; screen: RootRouteName };

const targets: Record<AppHref, Target> = {
  '/(auth)/login': { kind: 'root', screen: 'Login' },
  '/(auth)/signup': { kind: 'root', screen: 'Signup' },
  '/(auth)/otp': { kind: 'root', screen: 'Otp' },
  '/(auth)/forgot-password': {
  kind: 'root',
  screen: 'ForgotPassword',
},
  '/(tabs)/home': { kind: 'tab', screen: 'Home' },
  '/(tabs)/rides': { kind: 'tab', screen: 'Rides' },
  '/(tabs)/charging': { kind: 'tab', screen: 'Charging' },
  '/(tabs)/service': { kind: 'tab', screen: 'Service' },
  '/(tabs)/profile': { kind: 'tab', screen: 'Profile' },
  '/viewer': { kind: 'root', screen: 'Viewer' },
  '/tracking': { kind: 'root', screen: 'Tracking' },
  '/notifications': { kind: 'root', screen: 'Notifications' },
  '/about': { kind: 'root', screen: 'About' }
};

function dispatchHref(href: AppHref, mode: 'push' | 'replace') {
  const attempt = () => {
    if (!navigationRef.isReady()) return;
    const target = targets[href];
    if (!target) return;

    if (target.kind === 'tab') {
      if (mode === 'replace') {
        navigationRef.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'MainTabs', params: { screen: target.screen } }]
          }) as any
        );
        return;
      }
      navigationRef.navigate('MainTabs', {
        screen: target.screen,
      });
      return;
    }

    if (mode === 'replace') {
      navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: target.screen }]
        }) as any
      );
      return;
    }

    navigationRef.dispatch(StackActions.push(target.screen));
  };

  if (!navigationRef.isReady()) {
    setTimeout(attempt, 50);
  } else {
    attempt();
  }
}

export function useRouter() {
  return useMemo(
    () => ({
      push: (href: AppHref) => dispatchHref(href, 'push'),
      replace: (href: AppHref) => dispatchHref(href, 'replace'),
      back: () => {
        if (navigationRef.isReady() && navigationRef.canGoBack()) navigationRef.goBack();
      }
    }),
    []
  );
}

interface LinkProps extends PropsWithChildren {
  href: AppHref;
  style?: StyleProp<TextStyle>;
}

export function Link({ href, style, children }: LinkProps) {
  return (
    <Text accessibilityRole="link" onPress={() => dispatchHref(href, 'push')} style={style}>
      {children}
    </Text>
  );
}

export function Redirect({ href }: { href: AppHref }) {
  useEffect(() => {
    dispatchHref(href, 'replace');
  }, [href]);
  return null;
}
