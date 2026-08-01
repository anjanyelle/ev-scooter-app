import type { TextProps, TextStyle } from 'react-native';
import { Text } from 'react-native';

import { typography } from '@/theme';

type Variant = keyof typeof typography;

interface AppTextProps extends TextProps {
  variant?: Variant;
  color?: string;
  align?: TextStyle['textAlign'];
}

export function AppText({ variant = 'body', color, align, style, ...props }: AppTextProps) {
  return <Text {...props} style={[typography[variant], color ? { color } : null, align ? { textAlign: align } : null, style]} />;
}
