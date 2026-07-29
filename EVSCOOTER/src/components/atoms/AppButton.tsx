/**
 * AppButton — Primary, Secondary, and Outline button variants
 * Includes gradient glow for primary, animated press states
 */

import React, {useCallback} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, FontSize, FontWeight, Spacing, BorderRadius, LetterSpacing} from '../../theme';
import {AppText} from './AppText';
import {AppIcon} from './AppIcon';
import type {ButtonVariant, ButtonSize} from '../../types';

interface AppButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  iconLibrary?: 'ionicons' | 'material' | 'feather';
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

const sizeConfig: Record<ButtonSize, {height: number; fontSize: number; paddingH: number}> = {
  sm: {height: 40, fontSize: FontSize.caption, paddingH: Spacing.md},
  md: {height: 52, fontSize: FontSize.body, paddingH: Spacing.xl},
  lg: {height: 60, fontSize: FontSize.bodyLarge, paddingH: Spacing.xxl},
};

export const AppButton: React.FC<AppButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'lg',
  icon,
  iconLibrary = 'ionicons',
  iconPosition = 'right',
  loading = false,
  disabled = false,
  fullWidth = true,
  style,
}) => {
  const {height, fontSize, paddingH} = sizeConfig[size];
  const isDisabled = disabled || loading;

  const handlePress = useCallback(() => {
    if (!isDisabled) {
      onPress();
    }
  }, [isDisabled, onPress]);

  const renderContent = () => (
    <View style={styles.innerContent}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? Colors.btnPrimaryText : Colors.primary}
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <View style={styles.iconLeft}>
              <AppIcon
                name={icon}
                library={iconLibrary}
                size={fontSize + 2}
                color={variant === 'primary' ? Colors.btnPrimaryText : Colors.primary}
              />
            </View>
          )}
          <AppText
            style={[
              styles.label,
              {fontSize, letterSpacing: LetterSpacing.button},
              variant === 'primary' ? styles.labelPrimary : styles.labelSecondary,
              ...(variant === 'outline' ? [styles.labelOutline] : []),
            ]}>
            {label}
          </AppText>
          {icon && iconPosition === 'right' && (
            <View style={styles.iconRight}>
              <AppIcon
                name={icon}
                library={iconLibrary}
                size={fontSize + 2}
                color={variant === 'primary' ? Colors.btnPrimaryText : Colors.primary}
              />
            </View>
          )}
        </>
      )}
    </View>
  );

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.85}
        disabled={isDisabled}
        style={[fullWidth && styles.fullWidth, style]}>
        <LinearGradient
          colors={isDisabled ? [Colors.textDisabled, Colors.textMuted] : Colors.gradientButton}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[
            styles.base,
            {height, paddingHorizontal: paddingH},
            styles.primaryGlow,
          ]}>
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  const variantStyle =
    variant === 'secondary' ? styles.secondary : styles.outline;

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      disabled={isDisabled}
      style={[
        styles.base,
        {height, paddingHorizontal: paddingH},
        variantStyle,
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabledBase,
        style,
      ]}>
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.button,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  fullWidth: {
    width: '100%',
  },
  innerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
  },
  primaryGlow: {
    shadowColor: Colors.shadowPrimaryGlow,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 25,
    elevation: 10,
  },
  secondary: {
    backgroundColor: Colors.transparent,
    borderWidth: 1.5,
    borderColor: Colors.btnSecondaryBorder,
  },
  outline: {
    backgroundColor: Colors.transparent,
    borderWidth: 1,
    borderColor: Colors.btnOutlineBorder,
  },
  disabledBase: {
    opacity: 0.5,
  },
  label: {
    fontWeight: FontWeight.semiBold,
  },
  labelPrimary: {
    color: Colors.btnPrimaryText,
  },
  labelSecondary: {
    color: Colors.btnSecondaryText,
  },
  labelOutline: {
    color: Colors.btnOutlineText,
  },
  iconLeft: {marginRight: 4},
  iconRight: {marginLeft: 4},
});
