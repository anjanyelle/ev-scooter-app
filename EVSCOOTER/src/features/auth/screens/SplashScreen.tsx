/**
 * SplashScreen — Animated launch screen
 */
import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, Spacing} from '../../../theme';
import {BrandLogo} from '../../../components/atoms/BrandLogo';
import {AppText} from '../../../components/atoms/AppText';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {AuthStackParamList} from '../../../types';

const {width, height} = Dimensions.get('window');

type Props = NativeStackScreenProps<AuthStackParamList, 'Splash'>;

export const SplashScreen: React.FC<Props> = ({navigation}) => {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.7)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(300),
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          useNativeDriver: true,
          tension: 80,
          friction: 8,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(glowOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2800);

    return () => clearTimeout(timer);
  }, [navigation, logoOpacity, logoScale, taglineOpacity, glowOpacity]);

  return (
    <LinearGradient
      colors={['#050505', '#0C0F07', '#050505']}
      style={styles.container}>
      {/* Glow orb */}
      <Animated.View style={[styles.glowOrb, {opacity: glowOpacity}]} />

      {/* Center content */}
      <Animated.View
        style={[
          styles.center,
          {opacity: logoOpacity, transform: [{scale: logoScale}]},
        ]}>
        <BrandLogo size="lg" />
        <Animated.View style={{opacity: taglineOpacity}}>
          <AppText variant="caption" style={styles.tagline}>
            Premium Electric Scooters Built For India
          </AppText>
        </Animated.View>
      </Animated.View>

      {/* Bottom version */}
      <AppText variant="small" style={styles.version}>
        v1.0.0
      </AppText>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowOrb: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: 'rgba(184,220,0,0.04)',
    shadowColor: Colors.primary,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 80,
    elevation: 0,
  },
  center: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  tagline: {
    color: Colors.textSecondary,
    textAlign: 'center',
    letterSpacing: 0.5,
    marginTop: Spacing.xs,
  },
  version: {
    position: 'absolute',
    bottom: Spacing.xxl,
    color: Colors.textDisabled,
  },
});
