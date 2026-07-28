declare module 'react-native-vector-icons/MaterialCommunityIcons' {
  import { Component } from 'react';
  import { TextStyle, ImageStyle, ViewStyle } from 'react-native';

  export interface IconProps {
    name: string;
    size?: number;
    color?: string | number;
    style?: TextStyle | ImageStyle | ViewStyle;
    allowFontScaling?: boolean;
  }

  export default class Icon extends Component<IconProps> {}
}