import type { LucideIcon } from 'lucide-react-native';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  StyleProp,
} from 'react-native';

import LinearGradient from '@/components/system/LinearGradient';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import {
  colors,
  fonts,
  radii,
  shadows,
  spacing,
} from '@/theme';

import { haptic } from '@/utils/haptics';

interface AppButtonProps {
  label: string;
  onPress: () => void | Promise<void>;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  icon?: LucideIcon;
  loading?: boolean;
  disabled?: boolean;
  compact?: boolean;
  fullWidth?: boolean;

  // NEW
  style?: StyleProp<ViewStyle>;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function AppButton({
  label,
  onPress,
  variant = 'primary',
  icon: Icon,
  loading = false,
  disabled = false,
  compact = false,
  fullWidth = true,
  style,
}: AppButtonProps) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const textColor =
    variant === 'primary'
      ? colors.background
      : variant === 'danger'
      ? colors.error
      : colors.heading;

  const content = (
    <View style={styles.content}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={textColor}
        />
      ) : Icon ? (
        <Icon
          size={18}
          color={textColor}
          strokeWidth={2.4}
        />
      ) : null}

      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        style={[
          styles.label,
          {
            color: textColor,
          },
        ]}>
        {label}
      </Text>
    </View>
  );

  return (
    <AnimatedPressable
      disabled={disabled || loading}
      onPressIn={() => { scale.value = withSpring(0.97, { damping: 18, stiffness: 320 }); }}
      onPressOut={() => { scale.value = withSpring(1, { damping: 18, stiffness: 320 }); }}
      onPress={() => {
        void haptic.impact();
        void onPress();
      }}
      style={[
        styles.base,
        compact && styles.compact,
        fullWidth && styles.fullWidth,
        variant !== 'primary' && styles[variant],
        disabled && styles.disabled,
        variant === 'primary' && shadows.primaryGlow,
        animatedStyle,
        style,
      ]}>
      {variant === 'primary' ? (
        <LinearGradient
          colors={[
            colors.primary,
            colors.primaryLight,
          ]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={styles.gradient}>
          {content}
        </LinearGradient>
      ) : (
        content
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 54,
    borderRadius: radii.button,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },

  fullWidth: {
    width: '100%',
  },

  compact: {
    minHeight: 42,
    paddingHorizontal: spacing.md,
  },

  gradient: {
    width: '100%',
    minHeight: 54,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
  },

  label: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    letterSpacing: 0.2,
    flexShrink: 1,
  },

  secondary: {
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: 'transparent',
  },

  outline: {
    borderWidth: 1,
    borderColor: '#404040',
    backgroundColor: 'transparent',
  },

  ghost: {
    backgroundColor: colors.glassBg,
  },

  danger: {
    borderWidth: 1,
    borderColor: `${colors.error}66`,
    backgroundColor: `${colors.error}10`,
  },

  disabled: {
    opacity: 0.45,
  },
});
