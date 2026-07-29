/**
 * Theme Icons
 * Icon name mappings to Material Community Icons
 */

export const icons = {
  // Navigation
  back: 'arrow-left',
  close: 'close',
  menu: 'menu',
  more: 'dots-horizontal',

  // Authentication
  user: 'account',
  email: 'email-outline',
  phone: 'phone-outline',
  lock: 'lock-outline',
  eye: 'eye-outline',
  eyeOff: 'eye-off-outline',

  // Actions
  search: 'magnify',
  filter: 'filter-variant',
  sort: 'sort',
  add: 'plus',
  edit: 'pencil',
  delete: 'delete-outline',
  save: 'content-save',
  share: 'share-variant',

  // Status
  check: 'check-circle-outline',
  error: 'alert-circle-outline',
  warning: 'alert-outline',
  info: 'information-outline',
  success: 'check-circle-outline',

  // Vehicle
  scooter: 'scooter',
  battery: 'battery',
  batteryCharging: 'battery-charging',
  batteryLow: 'battery-alert',
  speed: 'speedometer',
  location: 'map-marker-outline',
  navigation: 'navigation',

  // UI Elements
  home: 'home-outline',
  profile: 'account-outline',
  settings: 'cog-outline',
  help: 'help-circle-outline',
  logout: 'logout',
  bell: 'bell-outline',
  star: 'star-outline',
  heart: 'heart-outline',

  // Social
  google: 'google',
  apple: 'apple',
  facebook: 'facebook',
  twitter: 'twitter',

  // Misc
  arrowRight: 'arrow-right',
  arrowDown: 'chevron-down',
  arrowUp: 'chevron-up',
  arrowLeft: 'arrow-left',
  calendar: 'calendar-outline',
  clock: 'clock-outline',
  map: 'map-outline',
  qrCode: 'qrcode',
  scan: 'qrcode-scan',
} as const;

export type Icons = typeof icons;

// Helper to get icon name
export const getIconName = (key: keyof Icons): string => icons[key];