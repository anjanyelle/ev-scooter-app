/**
 * App Constants
 * Application-wide constants
 */

export const APP_CONFIG = {
  name: 'EV Scooter',
  version: '1.0.0',
  buildNumber: '1',
} as const;

export const API_CONFIG = {
  baseURL: __DEV__ ? 'http://localhost:3000/api' : 'https://api.evscooter.com/api',
  timeout: 30000,
  retryAttempts: 3,
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

export const ANIMATION_CONFIG = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  easing: {
    easeInOut: 'ease-in-out',
    easeOut: 'ease-out',
    easeIn: 'ease-in',
  },
} as const;

export const VALIDATION_RULES = {
  phone: {
    minLength: 10,
    maxLength: 15,
  },
  password: {
    minLength: 6,
    maxLength: 50,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecialChar: false,
  },
  name: {
    minLength: 2,
    maxLength: 50,
  },
} as const;

export const PAGINATION = {
  defaultLimit: 20,
  maxLimit: 100,
} as const;

export const RIDE_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export const VEHICLE_STATUS = {
  AVAILABLE: 'available',
  IN_USE: 'in_use',
  CHARGING: 'charging',
  MAINTENANCE: 'maintenance',
} as const;