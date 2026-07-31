/**
 * Header Component
 * Displays the app header with hamburger menu, logo, notifications, and profile
 * 
 * SPECIFICATION MATCH:
 * - Header Height: 64dp
 * - Horizontal Padding: 16dp
 * - Menu icon: 24x24
 * - Logo: 40x40
 * - App Name: fontSize 22, fontWeight 700, marginLeft 10
 * - Notification icon: 24x24
 * - Gap between notification and profile: 16dp
 * - Profile image: 40x40 circular
 * - justifyContent: 'space-between', alignItems: 'center'
 * - No overflow, fully responsive
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Spacing, Radius, Shadows, Typography } from '../theme';

interface HeaderProps {
  onMenuPress?: () => void;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onMenuPress,
  onNotificationPress,
  onProfilePress,
}) => {
  const { width: screenWidth } = useWindowDimensions();
  const isSmallScreen = screenWidth <= 360;
  const isExtraSmallScreen = screenWidth <= 320;

  // Responsive values: scale down on small screens while keeping proportions
  const titleFontSize = isExtraSmallScreen ? 18 : isSmallScreen ? 20 : 22;
  const logoSize = isExtraSmallScreen ? 34 : 40;
  const profileSize = isExtraSmallScreen ? 34 : 40;
  const iconSize = isExtraSmallScreen ? 22 : 24;
  const titleMarginLeft = isExtraSmallScreen ? 6 : 10;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Left Section - Menu + Logo + Title */}
        <View style={styles.leftSection}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={onMenuPress}
            activeOpacity={0.7}
          >
            <Icon name="menu" size={iconSize} color={Colors.text} />
          </TouchableOpacity>

          <View style={[styles.logoContainer, { width: logoSize, height: logoSize }]}>
            <Icon name="lightning-bolt" size={logoSize * 0.6} color={Colors.primary} />
          </View>

          <Text
            style={[styles.brandText, { fontSize: titleFontSize, marginLeft: titleMarginLeft }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            LEXICON EV
          </Text>
        </View>

        {/* Right Section - Notification + Profile */}
        <View style={styles.rightSection}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onNotificationPress}
            activeOpacity={0.7}
          >
            <View style={styles.notificationIconWrapper}>
              <Icon name="bell-outline" size={24} color={Colors.text} />
              <View style={styles.notificationDot} />
            </View>
          </TouchableOpacity>

          {/* 16dp gap between notification and profile */}
          <View style={styles.profileGap} />

          <TouchableOpacity
            style={[styles.profileButton, { width: profileSize, height: profileSize }]}
            onPress={onProfilePress}
            activeOpacity={0.7}
          >
            <Image
              source={{ uri: 'https://i.pravatar.cc/100?img=12' }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.background,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 64,
    paddingHorizontal: 16,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    borderRadius: Radius.lg,
    backgroundColor: Colors.glass,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
    ...Shadows.glow,
  },
  brandText: {
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: 1.5,
    flexShrink: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIconWrapper: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: Radius.full,
    backgroundColor: Colors.primary,
    ...Shadows.small,
  },
  profileGap: {
    width: 16,
  },
  profileButton: {
    borderRadius: Radius.full,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: Colors.primary,
    ...Shadows.small,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default Header;