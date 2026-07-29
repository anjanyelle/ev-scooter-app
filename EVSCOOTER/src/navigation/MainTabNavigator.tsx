/**
 * MainTabNavigator — Custom bottom tab bar for main app
 * Home | Rides | Navigation (center ⚡) | Service | Profile
 */
import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, Spacing, BorderRadius, FontSize} from '../theme';
import {AppText} from '../components/atoms/AppText';
import {AppIcon} from '../components/atoms/AppIcon';
import {HomeScreen} from '../features/home/screens/HomeScreen';
import {RidesScreen} from '../features/ride/screens/RidesScreen';
import {NavigationScreen} from '../features/navigation/screens/NavigationScreen';
import {ServiceScreen} from '../features/service/screens/ServiceScreen';
import {ProfileNavigator} from './ProfileNavigator';
import type {MainTabParamList} from '../types';

const Tab = createBottomTabNavigator<MainTabParamList>();
const {width} = Dimensions.get('window');

interface TabItemProps {
  icon: string;
  label: string;
  isFocused: boolean;
  onPress: () => void;
  library?: 'ionicons' | 'material' | 'feather';
}

const TabItem: React.FC<TabItemProps> = ({icon, label, isFocused, onPress, library = 'ionicons'}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    style={tabStyles.item}>
    <AppIcon
      name={icon}
      library={library}
      size={22}
      color={isFocused ? Colors.primary : Colors.iconMuted}
    />
    <AppText
      variant="small"
      style={[
        tabStyles.label,
        {color: isFocused ? Colors.primary : Colors.iconMuted},
      ]}>
      {label}
    </AppText>
    {isFocused && <View style={tabStyles.activeDot} />}
  </TouchableOpacity>
);

const CenterTabButton: React.FC<{onPress: () => void; isFocused: boolean}> = ({
  onPress,
  isFocused,
}) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={tabStyles.centerWrapper}>
    <LinearGradient
      colors={isFocused ? Colors.gradientButton : ['#1F1F1F', '#141414']}
      style={[
        tabStyles.centerBtn,
        isFocused && tabStyles.centerBtnActive,
      ]}>
      <AppIcon
        name="flash"
        library="ionicons"
        size={26}
        color={isFocused ? Colors.btnPrimaryText : Colors.iconMuted}
      />
    </LinearGradient>
  </TouchableOpacity>
);

const CustomTabBar: React.FC<any> = ({state, descriptors, navigation}) => {
  const insets = useSafeAreaInsets();

  const TAB_ICONS: Record<string, {icon: string; library: 'ionicons' | 'material' | 'feather'}> = {
    Home: {icon: 'home-outline', library: 'ionicons'},
    Rides: {icon: 'trending-up-outline', library: 'ionicons'},
    Navigation: {icon: 'flash', library: 'ionicons'}, // center
    Service: {icon: 'construct-outline', library: 'ionicons'},
    Profile: {icon: 'person-outline', library: 'ionicons'},
  };

  return (
    <View style={[tabStyles.tabBar, {paddingBottom: insets.bottom + Spacing.xxs}]}>
      <View style={tabStyles.tabBarInner}>
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;
          const isCenter = route.name === 'Navigation';

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          if (isCenter) {
            return (
              <CenterTabButton key={route.key} onPress={onPress} isFocused={isFocused} />
            );
          }

          const {icon, library} = TAB_ICONS[route.name] || {icon: 'help-outline', library: 'ionicons'};
          return (
            <TabItem
              key={route.key}
              icon={isFocused ? icon.replace('-outline', '') : icon}
              label={route.name === 'Profile' && isFocused ? 'Profile' : route.name}
              isFocused={isFocused}
              onPress={onPress}
              library={library}
            />
          );
        })}
      </View>
    </View>
  );
};

export const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Rides" component={RidesScreen} />
      <Tab.Screen name="Navigation" component={NavigationScreen} />
      <Tab.Screen name="Service" component={ServiceScreen} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};

const tabStyles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.xs,
  },
  tabBarInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
    paddingVertical: Spacing.xxs,
    position: 'relative',
  },
  label: {
    fontSize: FontSize.xs,
  },
  activeDot: {
    position: 'absolute',
    bottom: -2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
  },
  centerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    paddingBottom: 8,
  },
  centerBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -16,
    borderWidth: 3,
    borderColor: Colors.surface,
  },
  centerBtnActive: {
    shadowColor: Colors.primary,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 12,
  },
});
