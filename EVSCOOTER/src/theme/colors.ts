/**
 * Lexicon EV Scooter — Design System Color Tokens
 * Dark AMOLED + Neon Lime (#B8DC00) + Glassmorphism
 */

export const Colors = {
  // ─── Primary Brand ────────────────────────────────────────────────────────
  primary: '#B8DC00',
  primaryHover: '#A4C800',
  primaryLight: '#D6F94D',
  primaryDark: '#8DA700',

  // ─── Background ───────────────────────────────────────────────────────────
  background: '#050505',
  surface: '#0D0D0D',
  card: '#171717',
  cardHover: '#202020',
  cardSecondary: '#111111',

  // ─── Glass Effect ─────────────────────────────────────────────────────────
  glassBg: 'rgba(255,255,255,0.05)',
  glassBorder: 'rgba(255,255,255,0.08)',
  glassShadow: 'rgba(0,0,0,0.45)',

  // ─── Accent ───────────────────────────────────────────────────────────────
  neonGreen: '#B8DC00',
  success: '#72E000',
  warning: '#FFC857',
  error: '#FF5A5F',
  info: '#38BDF8',

  // ─── Text ─────────────────────────────────────────────────────────────────
  textHeading: '#FFFFFF',
  textBody: '#D8D8D8',
  textSecondary: '#A5A5A5',
  textMuted: '#707070',
  textDisabled: '#555555',

  // ─── Borders ──────────────────────────────────────────────────────────────
  border: '#262626',
  divider: '#1E1E1E',
  activeBorder: '#B8DC00',

  // ─── Icons ────────────────────────────────────────────────────────────────
  iconPrimary: '#B8DC00',
  iconSecondary: '#FFFFFF',
  iconMuted: '#8A8A8A',

  // ─── Buttons ──────────────────────────────────────────────────────────────
  btnPrimaryBg: '#B8DC00',
  btnPrimaryText: '#050505',
  btnPrimaryHover: '#A7CB00',
  btnPrimaryPressed: '#91B100',
  btnSecondaryBorder: '#B8DC00',
  btnSecondaryText: '#B8DC00',
  btnOutlineBorder: '#404040',
  btnOutlineText: '#FFFFFF',

  // ─── Status ───────────────────────────────────────────────────────────────
  statusOnline: '#72E000',
  statusCharging: '#B8DC00',
  statusOffline: '#808080',
  statusCritical: '#FF4D4F',

  // ─── Gradients (as stop arrays for LinearGradient) ────────────────────────
  gradientHero: ['#050505', '#0C0F07', '#050505'] as string[],
  gradientButton: ['#B8DC00', '#D8FF2F'] as string[],
  gradientCardGlow: ['rgba(184,220,0,0.25)', 'transparent'] as string[],

  // ─── Shadows ──────────────────────────────────────────────────────────────
  shadowPrimaryGlow: 'rgba(184,220,0,0.35)',
  shadowCard: 'rgba(0,0,0,0.45)',

  // ─── Transparent ──────────────────────────────────────────────────────────
  transparent: 'transparent',
  white: '#FFFFFF',
  black: '#000000',
} as const;

export type ColorKey = keyof typeof Colors;
