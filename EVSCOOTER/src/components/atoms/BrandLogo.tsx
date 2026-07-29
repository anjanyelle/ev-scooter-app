/**
 * BrandLogo — Lexicon EV logo wordmark
 */
import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {Colors, FontSize, FontWeight} from '../../theme';
import {AppText} from './AppText';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

const sizes = {
  sm: FontSize.h4,
  md: FontSize.h2,
  lg: FontSize.h1,
};

export const BrandLogo: React.FC<BrandLogoProps> = ({size = 'md', style}) => {
  const fontSize = sizes[size];
  return (
    <View style={[styles.container, style]}>
      <AppText
        style={[
          styles.logo,
          {fontSize},
        ]}>
        LEXICON
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    color: Colors.primary,
    fontWeight: FontWeight.extraBold,
    letterSpacing: 4,
    includeFontPadding: false,
  },
});
