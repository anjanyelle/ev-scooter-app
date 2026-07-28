/**
 * AppImage Component
 * Responsive image component with theme support
 */

import React from 'react';
import { Image, ImageProps, StyleSheet, ImageStyle } from 'react-native';
import { useTheme } from '../../../theme';

export interface AppImageProps extends Omit<ImageProps, 'source'> {
  source: ImageProps['source'];
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
  borderRadius?: number;
  backgroundColor?: string;
  style?: ImageStyle;
}

export const AppImage: React.FC<AppImageProps> = ({
  resizeMode = 'cover',
  borderRadius,
  backgroundColor,
  style,
  ...props
}) => {
  const theme = useTheme();

  return (
    <Image
      style={[
        styles.image,
        {
          borderRadius: borderRadius || theme.radius.md,
          backgroundColor: backgroundColor || theme.colors.surface.DEFAULT,
        },
        style,
      ]}
      resizeMode={resizeMode}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
});