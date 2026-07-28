/**
 * Header Component
 * Displays the app header with hamburger menu, logo, notifications, and profile
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
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
  return (
    <View style={styles.container}>
      {/* Left - Hamburger Menu */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={onMenuPress}
        activeOpacity={0.7}
      >
        <Icon name="menu" size={28} color={Colors.text} />
      </TouchableOpacity>

      {/* Center - Logo and Brand Name */}
      <View style={styles.centerContainer}>
        <View style={styles.logoContainer}>
          <Icon name="lightning-bolt" size={26} color={Colors.primary} />
        </View>
        <Text style={styles.brandText}>LEXICON EV</Text>
      </View>

      {/* Right - Notification and Profile */}
      <View style={styles.rightContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onNotificationPress}
          activeOpacity={0.7}
        >
          <Icon name="bell-outline" size={24} color={Colors.text} />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.profileButton}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  iconButton: {
    padding: Spacing.xs,
  },
  centerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: Radius.lg,
    backgroundColor: Colors.glass,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
    ...Shadows.glow,
  },
  brandText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text,
    letterSpacing: 1.5,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: Radius.full,
    backgroundColor: Colors.primary,
    ...Shadows.small,
  },
  profileButton: {
    width: 40,
    height: 40,
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
