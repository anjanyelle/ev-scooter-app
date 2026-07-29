/**
 * AppAvatar — User avatar with neon border ring
 */
import React from 'react';
import {View, Image, StyleSheet, ViewStyle} from 'react-native';
import {Colors, BorderRadius} from '../../theme';
import {AppIcon} from '../atoms/AppIcon';

interface AppAvatarProps {
  uri?: string;
  size?: number;
  showCameraIcon?: boolean;
  onCameraPress?: () => void;
  style?: ViewStyle;
  glowRing?: boolean;
}

export const AppAvatar: React.FC<AppAvatarProps> = ({
  uri,
  size = 80,
  showCameraIcon = false,
  onCameraPress,
  style,
  glowRing = false,
}) => {
  const ringSize = size + 8;

  return (
    <View style={[styles.wrapper, style]}>
      <View
        style={[
          styles.ring,
          {
            width: ringSize,
            height: ringSize,
            borderRadius: ringSize / 2,
            borderColor: glowRing ? Colors.primary : Colors.border,
            shadowColor: glowRing ? Colors.shadowPrimaryGlow : 'transparent',
          },
        ]}>
        {uri ? (
          <Image
            source={{uri}}
            style={[styles.image, {width: size, height: size, borderRadius: size / 2}]}
          />
        ) : (
          <View
            style={[
              styles.placeholder,
              {width: size, height: size, borderRadius: size / 2},
            ]}>
            <AppIcon name="person" library="ionicons" size={size * 0.45} color={Colors.textMuted} />
          </View>
        )}
      </View>
      {showCameraIcon && (
        <View style={styles.cameraIcon}>
          <AppIcon name="camera" library="feather" size={12} color={Colors.background} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  ring: {
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  image: {
    resizeMode: 'cover',
  },
  placeholder: {
    backgroundColor: Colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.background,
  },
});
