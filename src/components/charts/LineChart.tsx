import { useMemo } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Svg, { Circle, Defs, Line, LinearGradient, Path, Stop } from 'react-native-svg';

import { colors, fonts, spacing } from '@/theme';

interface Point { label: string; value: number; }
interface LineChartProps { data: Point[]; height?: number; }

export function LineChart({ data, height = 190 }: LineChartProps) {
  const { width: windowWidth } = useWindowDimensions();
  const width = Math.max(260, Math.min(windowWidth - 64, 680));
  const pad = { left: 28, right: 14, top: 18, bottom: 34 };
  const chartWidth = width - pad.left - pad.right;
  const chartHeight = height - pad.top - pad.bottom;

  const geometry = useMemo(() => {
    const values = data.map((item) => item.value);
    const max = Math.max(...values, 1);
    const min = Math.min(...values, 0);
    const range = Math.max(max - min, 1);
    const points = data.map((item, index) => {
      const x = pad.left + (index / Math.max(data.length - 1, 1)) * chartWidth;
      const y = pad.top + chartHeight - ((item.value - min) / range) * chartHeight;
      return { ...item, x, y };
    });
    const path = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
    const area = points.length > 0
      ? `${path} L ${points[points.length - 1]?.x ?? pad.left} ${pad.top + chartHeight} L ${points[0]?.x ?? pad.left} ${pad.top + chartHeight} Z`
      : '';
    return { points, path, area, min, max };
  }, [chartHeight, chartWidth, data]);

  return (
    <View style={[styles.root, { height }]}>
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id="chartArea" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={colors.primary} stopOpacity={0.38} />
            <Stop offset="1" stopColor={colors.primary} stopOpacity={0} />
          </LinearGradient>
        </Defs>
        {[0, 0.33, 0.66, 1].map((ratio) => (
          <Line
            key={ratio}
            x1={pad.left}
            x2={width - pad.right}
            y1={pad.top + chartHeight * ratio}
            y2={pad.top + chartHeight * ratio}
            stroke={colors.divider}
            strokeWidth={1}
            strokeDasharray="3 6"
          />
        ))}
        {geometry.area ? <Path d={geometry.area} fill="url(#chartArea)" /> : null}
        {geometry.path ? <Path d={geometry.path} fill="none" stroke={colors.primaryLight} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" /> : null}
        {geometry.points.map((point, index) => (
          <Circle
            key={`${point.label}-${index}`}
            cx={point.x}
            cy={point.y}
            r={index === geometry.points.length - 1 ? 6 : 3}
            fill={colors.primary}
            stroke={index === geometry.points.length - 1 ? colors.primaryLight : colors.background}
            strokeWidth={index === geometry.points.length - 1 ? 3 : 1.5}
          />
        ))}
      </Svg>
      <View style={[styles.labels, { left: pad.left - 8, right: pad.right - 2 }]}> 
        {data.map((point) => <Text key={point.label} style={styles.label}>{point.label}</Text>)}
      </View>
      {geometry.points.length > 0 ? (
        <View style={[styles.bubble, { right: spacing.xs, top: Math.max(4, (geometry.points.at(-1)?.y ?? 20) - 26) }]}>
          <Text style={styles.bubbleText}>{geometry.points.at(-1)?.value.toFixed(1)} km</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { width: '100%', position: 'relative', overflow: 'hidden' },
  labels: { position: 'absolute', bottom: 2, flexDirection: 'row', justifyContent: 'space-between' },
  label: { color: colors.muted, fontFamily: fonts.regular, fontSize: 8 },
  bubble: { position: 'absolute', borderRadius: 10, backgroundColor: colors.cardHover, borderWidth: 1, borderColor: `${colors.primary}55`, paddingHorizontal: 8, paddingVertical: 4 },
  bubbleText: { color: colors.primaryLight, fontFamily: fonts.semibold, fontSize: 9 }
});
