/**
 * Glimmora Hotel Design System
 * TypeScript Design Tokens
 */

export const colors = {
  primary: {
    main: '#A57865',
    dark: '#8B6450',
    light: '#C8A896',
    bg: '#FAF8F6',
  },
  neutral: {
    50: '#FAFAFA',
    100: '#F5F1EE',
    200: '#E8E4E0',
    300: '#D1CCC7',
    400: '#9E9891',
    500: '#6B6560',
    600: '#5C5C5C',
    700: '#3D3D3D',
    800: '#2C2C2C',
    900: '#1A1A1A',
  },
  text: {
    primary: '#2C2C2C',
    secondary: '#5C5C5C',
    tertiary: '#808080',
    disabled: '#9E9891',
    white: '#FFFFFF',
  },
  semantic: {
    success: '#27AE60',
    successLight: '#E8F5E9',
    warning: '#FFA500',
    warningLight: '#FFF4E5',
    error: '#DC3545',
    errorLight: '#FFEBEE',
    info: '#2196F3',
    infoLight: '#E3F2FD',
  },
  background: {
    primary: '#FFFFFF',
    secondary: '#F9F7F5',
    tertiary: '#F5F1EE',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  border: {
    light: '#E8E4E0',
    medium: '#D1CCC7',
    dark: '#9E9891',
    focus: '#A57865',
  },
} as const;

export const typography = {
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif",
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '28px',
    '4xl': '32px',
    '5xl': '36px',
  },
  lineHeight: {
    xs: '16px',
    sm: '20px',
    base: '24px',
    lg: '28px',
    xl: '28px',
    '2xl': '32px',
    '3xl': '36px',
    '4xl': '40px',
    '5xl': '44px',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

export const spacing = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
} as const;

export const borderRadius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
  full: '9999px',
} as const;

export const shadows = {
  xs: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  sm: '0px 2px 4px rgba(0, 0, 0, 0.06)',
  md: '0px 4px 8px rgba(0, 0, 0, 0.08)',
  lg: '0px 8px 16px rgba(0, 0, 0, 0.1)',
  xl: '0px 12px 24px rgba(0, 0, 0, 0.12)',
  '2xl': '0px 24px 48px rgba(0, 0, 0, 0.16)',
} as const;

export const transitions = {
  fast: '150ms ease',
  base: '200ms ease',
  slow: '300ms ease',
} as const;

export const breakpoints = {
  mobile: '375px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1440px',
  maxWidth: '1344px',
} as const;

export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

export const components = {
  button: {
    heightDesktop: '52px',
    heightMobile: '48px',
    paddingX: '32px',
  },
  input: {
    heightDesktop: '52px',
    heightMobile: '48px',
    padding: '14px 16px',
  },
  navigation: {
    height: '72px',
    paddingX: '48px',
  },
} as const;

// Type exports for autocomplete
export type Colors = typeof colors;
export type Typography = typeof typography;
export type Spacing = typeof spacing;
export type BorderRadius = typeof borderRadius;
export type Shadows = typeof shadows;
export type Transitions = typeof transitions;
export type Breakpoints = typeof breakpoints;
export type ZIndex = typeof zIndex;
export type Components = typeof components;
