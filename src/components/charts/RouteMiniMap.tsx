import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { colors, radii } from '@/theme';

interface RouteMiniMapProps { points: Array<{ x: number; y: number }>; width?: number; height?: number; }

export function RouteMiniMap({ points, width = 82, height = 48 }: RouteMiniMapProps) {
  const path = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${(point.x / 100) * width} ${(point.y / 100) * height}`).join(' ');
  const first = points[0];
  const last = points.at(-1);
  return (
    <View style={[styles.root, { width, height }]}>
      <Svg width={width} height={height}>
        {path ? <Path d={path} stroke={colors.primary} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" /> : null}
        {first ? <Circle cx={(first.x / 100) * width} cy={(first.y / 100) * height} r={3} fill={colors.primaryLight} /> : null}
        {last ? <Circle cx={(last.x / 100) * width} cy={(last.y / 100) * height} r={3} fill={colors.heading} /> : null}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { backgroundColor: colors.surface, borderRadius: radii.input, borderWidth: 1, borderColor: colors.border, overflow: 'hidden' }
});
