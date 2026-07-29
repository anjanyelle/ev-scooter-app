/**
 * AppText — Atomic typography component
 * Handles all text rendering with consistent design system application
 */

import React from 'react';
import {Text, StyleSheet, TextStyle, TextProps} from 'react-native';
import {Colors, FontSize, FontWeight, LineHeight, LetterSpacing} from '../../theme';
import type {TextVariant} from '../../types';

interface AppTextProps extends TextProps {
  variant?: TextVariant;
  color?: string;
  weight?: keyof typeof FontWeight;
  align?: TextStyle['textAlign'];
  numberOfLines?: number;
  style?: TextStyle | TextStyle[];
  children: React.ReactNode;
}

const variantStyles: Record<TextVariant, TextStyle> = {
  display: {
    fontSize: FontSize.display,
    fontWeight: FontWeight.bold,
    lineHeight: LineHeight.display,
    letterSpacing: LetterSpacing.heading,
    color: Colors.textHeading,
  },
  h1: {
    fontSize: FontSize.h1,
    fontWeight: FontWeight.bold,
    lineHeight: LineHeight.h1,
    letterSpacing: LetterSpacing.heading,
    color: Colors.textHeading,
  },
  h2: {
    fontSize: FontSize.h2,
    fontWeight: FontWeight.bold,
    lineHeight: LineHeight.h2,
    letterSpacing: LetterSpacing.heading,
    color: Colors.textHeading,
  },
  h3: {
    fontSize: FontSize.h3,
    fontWeight: FontWeight.semiBold,
    lineHeight: LineHeight.h3,
    letterSpacing: LetterSpacing.heading,
    color: Colors.textHeading,
  },
  h4: {
    fontSize: FontSize.h4,
    fontWeight: FontWeight.semiBold,
    lineHeight: LineHeight.h4,
    letterSpacing: LetterSpacing.heading,
    color: Colors.textHeading,
  },
  bodyLarge: {
    fontSize: FontSize.bodyLarge,
    fontWeight: FontWeight.regular,
    lineHeight: LineHeight.bodyLarge,
    color: Colors.textBody,
  },
  body: {
    fontSize: FontSize.body,
    fontWeight: FontWeight.regular,
    lineHeight: LineHeight.body,
    color: Colors.textBody,
  },
  caption: {
    fontSize: FontSize.caption,
    fontWeight: FontWeight.regular,
    lineHeight: LineHeight.caption,
    color: Colors.textSecondary,
  },
  small: {
    fontSize: FontSize.small,
    fontWeight: FontWeight.regular,
    lineHeight: LineHeight.small,
    color: Colors.textMuted,
  },
};

export const AppText: React.FC<AppTextProps> = ({
  variant = 'body',
  color,
  weight,
  align,
  numberOfLines,
  style,
  children,
  ...rest
}) => {
  const baseStyle = variantStyles[variant];

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        styles.base,
        baseStyle,
        color ? {color} : undefined,
        weight ? {fontWeight: FontWeight[weight]} : undefined,
        align ? {textAlign: align} : undefined,
        ...(Array.isArray(style) ? style : style ? [style] : []),
      ]}
      {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
  },
});
