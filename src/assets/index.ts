/**
 * Assets Index
 * Centralized export for all application assets
 * Import all assets from this file only
 */

export const Images = {
  BikeLogo: require('./images/EV_Bike_login_logo.png'),
} as const;

export type Images = typeof Images;
