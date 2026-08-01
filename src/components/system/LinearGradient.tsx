import { useId } from 'react';
import type { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Rect, Stop } from 'react-native-svg';

interface GradientPoint {
  x: number;
  y: number;
}

type LinearGradientProps = PropsWithChildren<
  Omit<ViewProps, 'style'> & {
    colors: readonly string[];
    locations?: readonly number[];
    start?: GradientPoint;
    end?: GradientPoint;
    style?: StyleProp<ViewStyle>;
  }
>;

export default function LinearGradient({
  colors,
  locations,
  start = { x: 0.5, y: 0 },
  end = { x: 0.5, y: 1 },
  style,
  children,
  ...viewProps
}: LinearGradientProps) {
  const gradientId = `lexicon-gradient-${useId().replace(/:/g, '')}`;
  const divisor = Math.max(colors.length - 1, 1);

  return (
    <View {...viewProps} style={style}>
      <Svg pointerEvents="none" style={StyleSheet.absoluteFill}>
        <Defs>
          <SvgLinearGradient
            id={gradientId}
            x1={`${start.x * 100}%`}
            y1={`${start.y * 100}%`}
            x2={`${end.x * 100}%`}
            y2={`${end.y * 100}%`}
          >
            {colors.map((color, index) => (
              <Stop
                key={`${color}-${index}`}
                offset={`${(locations?.[index] ?? index / divisor) * 100}%`}
                stopColor={color}
              />
            ))}
          </SvgLinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill={`url(#${gradientId})`} />
      </Svg>
      {children}
    </View>
  );
}
