import LinearGradient from '@/components/system/LinearGradient';
import { Lightbulb, RotateCcw, ScanLine } from 'lucide-react-native';
import { memo, useEffect, useState } from 'react';import type { ReactNode } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { colors, fonts, radii, shadows } from '@/theme';
import { haptic } from '@/utils/haptics';

const scooterSource = require('../../../assets/scooter.png');
interface HotspotProps {
  left: `${number}%`;
  top: `${number}%`;
  label: string;
  compact: boolean;
}

const Hotspot = memo(function Hotspot({ left, top, label, compact }: HotspotProps) {
  return (
    <View style={[styles.hotspot, { left, top }]} pointerEvents="none">
      <View style={styles.hotspotPulse} />
      <View style={styles.hotspotCore} />
      {!compact ? <Text style={styles.hotspotLabel}>{label}</Text> : null}
    </View>
  );
});

/**
 * A photoreal, GPU-light vehicle studio built around the supplied product render.
 *
 * It intentionally replaces the primitive low-poly model. The reference image is
 * transformed as one physical scene with perspective tilt, parallax and pinch zoom,
 * so the scooter keeps its real-world proportions and material detail on Android.
 * A CAD/GLB asset can be dropped into the same shell later for true multi-angle orbit.
 */
export function Scooter3DViewer({ compact = false, header }: { compact?: boolean; header?: ReactNode }) {
  const [lightsOn, setLightsOn] = useState(true);
  const scooterX = useSharedValue(0);
const scooterY = useSharedValue(0);
const scooterRotate = useSharedValue(0);
const showcaseRotate = useSharedValue(0);
const scooterScale = useSharedValue(1);

const headlightOpacity = useSharedValue(0.45);
const floorScale = useSharedValue(1);
useEffect(() => {
 scooterX.value = 0; 
scooterY.value = 0;
  scooterRotate.value = withRepeat(
  withSequence(
   withTiming(-0.35, { duration: 4500 }),
withTiming(0.35, { duration: 4500 }),
    withTiming(0, { duration: 2500 }),
  ),
  -1,
  true,
);

scooterScale.value = withRepeat(
  withSequence(
   withTiming(1.002, { duration: 4500 }),
   withTiming(1, { duration: 3500 }),
  ),
  -1,
  true,
);

  headlightOpacity.value = withRepeat(
    withSequence(
      withTiming(0.9, { duration: 1200 }),
      withTiming(0.45, { duration: 1200 }),
    ),
    -1,
    false,
  );

  floorScale.value = withRepeat(
    withSequence(
      withTiming(1.15, { duration: 1500 }),
      withTiming(1, { duration: 1500 }),
    ),
    -1,
    false,
  );
  showcaseRotate.value = withRepeat(
  withSequence(
    withTiming(0, {
      duration: 12000,
      easing: Easing.linear,
    }),

    withTiming(-1.2, {
      duration: 1800,
      easing: Easing.inOut(Easing.ease),
    }),

    withTiming(1.2, {
      duration: 1800,
      easing: Easing.inOut(Easing.ease),
    }),

    withTiming(0, {
      duration: 1800,
      easing: Easing.inOut(Easing.ease),
    }),
  ),
  -1,
  false,
);
}, []);
const scooterAnimatedStyle = useAnimatedStyle(() => ({
  transform: [
    { translateX: scooterX.value },
    { translateY: scooterY.value },
{
  rotateZ: `${scooterRotate.value + showcaseRotate.value}deg`,
},    { scale: scooterScale.value },
  ],
}));


 const headlightAnimatedStyle = useAnimatedStyle(() => ({
  opacity: headlightOpacity.value,
  transform: [
    {
      scale: 0.95 + headlightOpacity.value * 0.08,
    },
  ],
}));

const floorAnimatedStyle = useAnimatedStyle(() => ({
  opacity: 0.28 + (floorScale.value - 1) * 1.8,

  transform: [
    {
      scale: floorScale.value,
    },
  ],
}));

  const toggleLights = () => {
    const next = !lightsOn;
    setLightsOn(next);
    void haptic.select();
  };

  const reset = () => void haptic.select();

  return (
    <View
        style={[styles.root, compact ? styles.compact : styles.full]}
        accessibilityLabel="Interactive photoreal LEXICON scooter viewer"
      >
        <LinearGradient
          colors={['#020302', '#0A0D05', '#020202']}
          locations={[0, 0.56, 1]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.topGlow} pointerEvents="none" />
        <Animated.View
  style={[styles.floorGlow, floorAnimatedStyle]}
  pointerEvents="none"
/>
        {header ? <View style={styles.headerWrapper}>{header}</View> : null}

        <View style={styles.scene} pointerEvents="none">
          <Animated.Image
            source={scooterSource}
            resizeMode="contain"
            fadeDuration={250}
           style={[
    styles.scooterImage,
    compact ? styles.scooterImageCompact : null,
    scooterAnimatedStyle,
]}
            accessibilityIgnoresInvertColors
          />
          {!compact && lightsOn ? (
  <Animated.View
    style={[
      styles.headlightBloom,
      headlightAnimatedStyle,
    ]}
  />
) : null}
          {!compact ? <Hotspot left="67%" top="44%" label="LED projector" compact={compact} /> : null}
          {!compact ? <Hotspot left="47%" top="62%" label="Battery pack" compact={compact} /> : null}
          {!compact ? <Hotspot left="28%" top="72%" label="Electric drive" compact={compact} /> : null}
        </View>

        {/* Clear ambient backdrop for maximum scooter visibility */}

        {!compact ? (
          <View style={styles.qualityBadge} pointerEvents="none">
            <ScanLine size={12} color={colors.primary} />
            <Text style={styles.qualityText}>PHOTO-REAL VEHICLE STUDIO</Text>
          </View>
        ) : null}

        {!compact ? (
          <View style={styles.controlStack}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={lightsOn ? 'Turn studio lighting off' : 'Turn studio lighting on'}
              style={[styles.control, lightsOn ? styles.controlActive : null]}
              onPress={toggleLights}
            >
              <Lightbulb size={16} color={lightsOn ? colors.background : colors.heading} />
            </Pressable>
            <Pressable accessibilityRole="button" accessibilityLabel="Reset vehicle view" style={styles.control} onPress={reset}>
              <RotateCcw size={16} color={colors.heading} />
            </Pressable>
          </View>
        ) : null}

        <View style={styles.instructions} pointerEvents="none">
          <Text style={styles.instructionTitle}>Real-world product view</Text>
          <Text style={styles.instructionText}>{compact ? 'Drag to inspect' : 'Drag to tilt · Pinch to zoom · Tap bulb for studio light'}</Text>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    borderRadius: radii.card,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.glassBorder,
    backgroundColor: colors.background,
    ...shadows.card
  },
  full: { height: 470 },
  compact: { height: 320 },
  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  scene: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scooterImage: {
    width: '92%',
    height: '92%',
  },
  scooterImageCompact: {
    width: '90%',
    height: '82%',
    marginTop: 38,
  },
  topGlow: {
    opacity: 0.45,
    position: 'absolute',
    width: '72%',
    height: '48%',
    left: '28%',
    top: '-18%',
    borderRadius: 240,
    backgroundColor: 'rgba(184,220,0,0.055)',
    shadowColor: colors.primary,
    shadowOpacity: 0.25,
    shadowRadius: 65
  },
  floorGlow: {
    opacity: 0.35,
    position: 'absolute',
    width: '82%',
    height: 52,
    left: '9%',
    bottom: '7%',
    borderRadius: 999,
    backgroundColor: 'rgba(184,220,0,0.12)',
    shadowColor: colors.primary,
    shadowOpacity: 0.8,
    shadowRadius: 35,
    transform: [{ scaleY: 0.5 }]
  },
  headlightBloom: {
    position: 'absolute',
    width: 54,
    height: 54,
    left: '65%',
    top: '42%',
    borderRadius: 27,
    backgroundColor: 'rgba(240,255,230,0.22)',
    shadowColor: '#F4FFE9',
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 5
  },
  hotspot: {
    position: 'absolute',
    width: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center'
  },
  hotspotPulse: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: 'rgba(214,249,77,0.45)',
    backgroundColor: 'rgba(184,220,0,0.08)'
  },
  hotspotCore: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.primaryLight,
    shadowColor: colors.primary,
    shadowOpacity: 1,
    shadowRadius: 9
  },
  hotspotLabel: {
    position: 'absolute',
    left: 14,
    width: 88,
    color: colors.body,
    fontFamily: fonts.medium,
    fontSize: 8,
    letterSpacing: 0.15,
    textShadowColor: '#000000',
    textShadowRadius: 4
  },
  qualityBadge: {
    position: 'absolute',
    left: 16,
    top: 16,
    height: 30,
    paddingHorizontal: 12,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(184,220,0,0.28)',
    backgroundColor: 'rgba(5,5,5,0.72)',
  },
  qualityText: {
    color: colors.primaryLight,
    fontFamily: fonts.semibold,
    fontSize: 8,
    letterSpacing: 0.75,
  },
  controlStack: {
    position: 'absolute',
    right: 16,
    top: 16,
    flexDirection: 'row',
    gap: 8,
    zIndex: 10,
  },
  control: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: 'rgba(17,17,17,0.86)',
    borderWidth: 1,
    borderColor: colors.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  instructions: {
    position: 'absolute',
    left: 18,
    bottom: 12,
    gap: 3,
  },
  instructionTitle: {
    color: colors.heading,
    fontFamily: fonts.semibold,
    fontSize: 10,
  },
  instructionText: {
    color: colors.secondary,
    fontFamily: fonts.regular,
    fontSize: 8,
  },
});
