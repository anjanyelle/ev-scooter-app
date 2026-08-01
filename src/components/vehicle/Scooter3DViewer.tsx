import LinearGradient from '@/components/system/LinearGradient';
import { Lightbulb, RotateCcw, ScanLine } from 'lucide-react-native';
import { memo, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';

import { colors, fonts, radii, shadows, spacing } from '@/theme';
import { haptic } from '@/utils/haptics';

const scooterSource = require('../../../assets/lexicon-scooter-reference.jpg');

const spring = {
  damping: 19,
  stiffness: 170,
  mass: 0.75
} as const;

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
export function Scooter3DViewer({ compact = false }: { compact?: boolean }) {
  const [lightsOn, setLightsOn] = useState(true);

  const tiltX = useSharedValue(0);
  const tiltY = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const scale = useSharedValue(compact ? 1.04 : 1.02);
  const savedScale = useSharedValue(scale.value);
  const lightLevel = useSharedValue(1);

  const gestures = useMemo(() => {
    const pan = Gesture.Pan()
      .minDistance(2)
      .onUpdate((event) => {
        const horizontalLimit = compact ? 18 : 26;
        const verticalLimit = compact ? 10 : 16;
        offsetX.value = Math.max(-horizontalLimit, Math.min(horizontalLimit, event.translationX * 0.28));
        offsetY.value = Math.max(-verticalLimit, Math.min(verticalLimit, event.translationY * 0.2));
        tiltY.value = Math.max(-8, Math.min(8, event.translationX * 0.045));
        tiltX.value = Math.max(-4.5, Math.min(4.5, -event.translationY * 0.03));
      })
      .onEnd(() => {
        offsetX.value = withSpring(0, spring);
        offsetY.value = withSpring(0, spring);
        tiltX.value = withSpring(0, spring);
        tiltY.value = withSpring(0, spring);
      });

    const pinch = Gesture.Pinch()
      .onBegin(() => {
        savedScale.value = scale.value;
      })
      .onUpdate((event) => {
        const minimum = compact ? 1.02 : 1;
        const maximum = compact ? 1.18 : 1.42;
        scale.value = Math.max(minimum, Math.min(maximum, savedScale.value * event.scale));
      })
      .onEnd(() => {
        const restingScale = compact ? 1.04 : 1.02;
        if (scale.value < restingScale + 0.025) {
          scale.value = withSpring(restingScale, spring);
        }
      });

    return Gesture.Simultaneous(pan, pinch);
  }, [compact, offsetX, offsetY, savedScale, scale, tiltX, tiltY]);

  const sceneStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1100 },
      { translateX: offsetX.value },
      { translateY: offsetY.value },
      { rotateX: `${tiltX.value}deg` },
      { rotateY: `${tiltY.value}deg` },
      { scale: scale.value }
    ]
  }));

  const lightStyle = useAnimatedStyle(() => ({
    opacity: interpolate(lightLevel.value, [0, 1], [0.05, 0.92]),
    transform: [{ scale: interpolate(lightLevel.value, [0, 1], [0.85, 1.1]) }]
  }));

  const toggleLights = () => {
    const next = !lightsOn;
    setLightsOn(next);
    lightLevel.value = withTiming(next ? 1 : 0, {
      duration: 320,
      easing: Easing.out(Easing.cubic)
    });
    void haptic.select();
  };

  const reset = () => {
    tiltX.value = withSpring(0, spring);
    tiltY.value = withSpring(0, spring);
    offsetX.value = withSpring(0, spring);
    offsetY.value = withSpring(0, spring);
    scale.value = withSpring(compact ? 1.04 : 1.02, spring);
    void haptic.select();
  };

  return (
    <GestureDetector gesture={gestures}>
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
        <View style={styles.floorGlow} pointerEvents="none" />

        <Animated.View style={[styles.scene, sceneStyle]} pointerEvents="none">
          <Animated.Image
            source={scooterSource}
            resizeMode="contain"
            fadeDuration={0}
            style={[styles.scooterImage, compact ? styles.scooterImageCompact : null]}
            accessibilityIgnoresInvertColors
          />
          <Animated.View style={[styles.headlightBloom, lightStyle]} />
          <Hotspot left="67%" top="44%" label="LED projector" compact={compact} />
          <Hotspot left="47%" top="62%" label="Battery pack" compact={compact} />
          <Hotspot left="28%" top="72%" label="Electric drive" compact={compact} />
        </Animated.View>

        <LinearGradient
          colors={['rgba(0,0,0,0.48)', 'transparent', 'rgba(0,0,0,0.62)']}
          locations={[0, 0.42, 1]}
          pointerEvents="none"
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.qualityBadge} pointerEvents="none">
          <ScanLine size={12} color={colors.primary} />
          <Text style={styles.qualityText}>PHOTO-REAL VEHICLE STUDIO</Text>
        </View>

        <View style={styles.controlStack}>
          {!compact ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={lightsOn ? 'Turn studio lighting off' : 'Turn studio lighting on'}
              style={[styles.control, lightsOn ? styles.controlActive : null]}
              onPress={toggleLights}
            >
              <Lightbulb size={16} color={lightsOn ? colors.background : colors.heading} />
            </Pressable>
          ) : null}
          <Pressable accessibilityRole="button" accessibilityLabel="Reset vehicle view" style={styles.control} onPress={reset}>
            <RotateCcw size={16} color={colors.heading} />
          </Pressable>
        </View>

        <View style={styles.instructions} pointerEvents="none">
          <Text style={styles.instructionTitle}>Real-world product view</Text>
          <Text style={styles.instructionText}>{compact ? 'Drag to inspect' : 'Drag to tilt · Pinch to zoom · Tap bulb for studio light'}</Text>
        </View>
      </View>
    </GestureDetector>
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
  compact: { height: 292 },
  scene: {
    position: 'absolute',
    left: '-6%',
    right: '-6%',
    top: '-4%',
    bottom: '-3%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  scooterImage: { width: '100%', height: '100%' },
  scooterImageCompact: { width: '112%', height: '112%' },
  topGlow: {
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
    position: 'absolute',
    width: '76%',
    height: 44,
    left: '12%',
    bottom: '9%',
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
    left: spacing.md,
    top: spacing.md,
    height: 30,
    paddingHorizontal: 10,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(184,220,0,0.28)',
    backgroundColor: 'rgba(5,5,5,0.72)'
  },
  qualityText: { color: colors.primaryLight, fontFamily: fonts.semibold, fontSize: 7, letterSpacing: 0.75 },
  controlStack: { position: 'absolute', top: spacing.md, right: spacing.md, gap: spacing.xs },
  control: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: 'rgba(17,17,17,0.86)',
    borderWidth: 1,
    borderColor: colors.glassBorder,
    alignItems: 'center',
    justifyContent: 'center'
  },
  controlActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  instructions: { position: 'absolute', left: spacing.md, bottom: spacing.md, gap: 3 },
  instructionTitle: { color: colors.heading, fontFamily: fonts.semibold, fontSize: 11 },
  instructionText: { color: colors.secondary, fontFamily: fonts.regular, fontSize: 8.5 }
});
