/**
 * AppIcon — Centralized icon component wrapping react-native-vector-icons
 * Supports Ionicons, MaterialCommunityIcons, and Feather
 */

import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {Colors, IconSize} from '../../theme';

export type IconLibrary = 'ionicons' | 'material' | 'feather';

interface AppIconProps {
  name: string;
  library?: IconLibrary;
  size?: number;
  color?: string;
}

export const AppIcon: React.FC<AppIconProps> = ({
  name,
  library = 'ionicons',
  size = IconSize.md,
  color = Colors.iconSecondary,
}) => {
  switch (library) {
    case 'material':
      return <MaterialCommunityIcons name={name} size={size} color={color} />;
    case 'feather':
      return <Feather name={name} size={size} color={color} />;
    case 'ionicons':
    default:
      return <Ionicons name={name} size={size} color={color} />;
  }
};
