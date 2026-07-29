/**
 * Lexicon EV Scooter — Shadow Tokens
 */
import {Platform} from 'react-native';

export const Shadows = {
  primaryGlow: Platform.select({
    ios: {
      shadowColor: 'rgba(184,220,0,0.35)',
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 1,
      shadowRadius: 25,
    },
    android: {
      elevation: 12,
    },
  }),
  card: Platform.select({
    ios: {
      shadowColor: 'rgba(0,0,0,0.45)',
      shadowOffset: {width: 0, height: 10},
      shadowOpacity: 1,
      shadowRadius: 40,
    },
    android: {
      elevation: 8,
    },
  }),
  subtle: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    android: {
      elevation: 4,
    },
  }),
};
