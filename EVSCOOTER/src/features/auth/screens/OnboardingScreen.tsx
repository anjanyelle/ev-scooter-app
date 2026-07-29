/**
 * OnboardingScreen — 3-slide intro carousel
 */
import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors, Spacing, BorderRadius, FontSize, FontWeight} from '../../../theme';
import {AppText} from '../../../components/atoms/AppText';
import {AppButton} from '../../../components/atoms/AppButton';
import {BrandLogo} from '../../../components/atoms/BrandLogo';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {AuthStackParamList} from '../../../types';

const {width, height} = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Smart. Connected.\nElectric.',
    subtitle: 'Control your Lexicon scooter from anywhere with real-time data at your fingertips.',
    icon: '⚡',
    gradient: ['#050505', '#0A0D04', '#050505'],
  },
  {
    id: '2',
    title: 'Navigate with\nPrecision',
    subtitle: 'Built-in navigation powered by HERE Maps. Find your destination and send it to your scooter.',
    icon: '🗺️',
    gradient: ['#050505', '#040A08', '#050505'],
  },
  {
    id: '3',
    title: 'Ride Green.\nSave More.',
    subtitle: 'Track your carbon savings, monitor battery health, and enjoy zero emission rides every day.',
    icon: '🌿',
    gradient: ['#050505', '#050E05', '#050505'],
  },
];

type Props = NativeStackScreenProps<AuthStackParamList, 'Onboarding'>;

export const OnboardingScreen: React.FC<Props> = ({navigation}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (activeIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({index: activeIndex + 1});
      setActiveIndex(prev => prev + 1);
    } else {
      navigation.replace('Login');
    }
  };

  const handleSkip = () => navigation.replace('Login');

  return (
    <LinearGradient colors={Colors.gradientHero} style={styles.container}>
      <BrandLogo size="sm" style={styles.logo} />

      <FlatList
        ref={flatListRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        scrollEnabled={false}
        renderItem={({item}) => (
          <View style={[styles.slide, {width}]}>
            {/* Icon circle */}
            <View style={styles.iconCircle}>
              <AppText style={styles.emoji}>{item.icon}</AppText>
            </View>
            {/* Glow ring */}
            <View style={styles.glowRing} />
            <View style={styles.textBlock}>
              <AppText variant="h1" style={styles.title}>
                {item.title}
              </AppText>
              <AppText variant="bodyLarge" style={styles.subtitle}>
                {item.subtitle}
              </AppText>
            </View>
          </View>
        )}
      />

      {/* Dots */}
      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === activeIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <AppButton
          label={activeIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
          icon={activeIndex === SLIDES.length - 1 ? 'checkmark' : 'arrow-forward'}
          iconLibrary="ionicons"
        />
        {activeIndex < SLIDES.length - 1 && (
          <TouchableOpacity onPress={handleSkip} style={styles.skip}>
            <AppText variant="body" style={styles.skipText}>
              Skip
            </AppText>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: Spacing.xxl,
  },
  logo: {
    paddingTop: Spacing.huge + Spacing.xxl,
    paddingHorizontal: Spacing.xxl,
  },
  slide: {
    alignItems: 'center',
    paddingTop: Spacing.xxl,
    paddingHorizontal: Spacing.xxl,
    position: 'relative',
  },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(184,220,0,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(184,220,0,0.15)',
    marginBottom: Spacing.xxl,
  },
  glowRing: {
    position: 'absolute',
    top: Spacing.xxl - 20,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'transparent',
    shadowColor: Colors.primary,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 40,
    elevation: 0,
  },
  emoji: {
    fontSize: 60,
  },
  textBlock: {
    alignItems: 'center',
    gap: Spacing.md,
  },
  title: {
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    textAlign: 'center',
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.xxs + 2,
    marginBottom: Spacing.xxl,
    marginTop: Spacing.xl,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  activeDot: {
    width: 24,
    backgroundColor: Colors.primary,
  },
  inactiveDot: {
    width: 6,
    backgroundColor: Colors.border,
  },
  actions: {
    paddingHorizontal: Spacing.xxl,
    gap: Spacing.md,
  },
  skip: {
    alignItems: 'center',
    paddingVertical: Spacing.xs,
  },
  skipText: {
    color: Colors.textMuted,
  },
});
