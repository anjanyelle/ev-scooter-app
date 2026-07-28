/**
 * BrandLogo Component
 * Text-based logo component with theme support
 */

import React from 'react';
import { View, ViewProps, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../theme';
import { AppText } from '../AppText';
import { AppIcon } from '../AppIcon';

export interface BrandLogoProps extends ViewProps {
  size?: 'small' | 'medium' | 'large';
  showIcon?: boolean;
  iconName?: string;
  text?: string;
  style?: ViewStyle;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'medium',
  showIcon = true,
  iconName = 'scooter',
  text = 'EV SCOOTER',
  style,
  ...props
}) => {
  const theme = useTheme();

  const getSizeStyles = (): { iconSize: number; textSize: 'h3' | 'h4' | 'h2' } => {
    switch (size) {
      case 'small':
        return { iconSize: 24, textSize: 'h4' };
      case 'large':
        return { iconSize: 40, textSize: 'h2' };
      default:
        return { iconSize: 32, textSize: 'h3' };
    }
  };

  const { iconSize, textSize } = getSizeStyles();

  return (
    <View style={[styles.container, style]} {...props}>
      {showIcon && (
        <View style={styles.iconContainer}>
          <AppIcon
            name={iconName}
            size={iconSize}
            color="primary"
          />
        </View>
      )}
      <AppText variant={textSize} color="primary" style={styles.text}>
        {text}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  text: {
    letterSpacing: 2,
  },
});