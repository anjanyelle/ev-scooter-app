/**
 * Theme exports
 * Centralized theme configuration for the EV Scooter app
 */

export { default as Colors } from './colors';
export { default as Spacing } from './spacing';
export { default as Typography } from './typography';
export { default as Radius } from './radius';
export { default as Shadows } from './shadows';

import Colors from './colors';
import Spacing from './spacing';
import Typography from './typography';
import Radius from './radius';
import Shadows from './shadows';

export const Theme = {
  Colors,
  Spacing,
  Typography,
  Radius,
  Shadows,
};

export default Theme;
