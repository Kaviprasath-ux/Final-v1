/**
 * Application-wide constants
 */

export const APP_NAME = 'Glimmora Hotel';
export const APP_DESCRIPTION = 'AI-Powered Luxury Hospitality';
export const APP_TAGLINE = 'Experience the Future of Hospitality';

export const COLORS = {
  primary: '#A57865',
  primaryDark: '#8B6450',
  primaryLight: '#B89078',
  dark: '#2C2C2C',
  gray: '#5C5C5C',
  lightGray: '#E8E4E0',
  background: '#FAFAFA',
  backgroundLight: '#FAF8F6',
  white: '#FFFFFF',
  black: '#000000',
  success: '#27AE60',
  error: '#DC3545',
  warning: '#F39C12',
  info: '#3498DB',
} as const;

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1440,
} as const;

export const MEDIA_QUERIES = {
  mobile: `(max-width: ${BREAKPOINTS.mobile - 1}px)`,
  tablet: `(min-width: ${BREAKPOINTS.mobile}px) and (max-width: ${BREAKPOINTS.tablet - 1}px)`,
  desktop: `(min-width: ${BREAKPOINTS.tablet}px)`,
} as const;

export const CONTACT_INFO = {
  phone: '+1 (555) 123-4567',
  email: 'hello@glimmora.com',
  address: {
    street: '123 Ocean Drive',
    city: 'Paradise Bay',
    state: 'CA',
    zip: '90210',
    country: 'United States',
  },
  hours: '24/7',
} as const;

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/glimmora',
  instagram: 'https://instagram.com/glimmora',
  twitter: 'https://twitter.com/glimmora',
  linkedin: 'https://linkedin.com/company/glimmora',
  youtube: 'https://youtube.com/@glimmora',
} as const;

export const STORAGE_KEYS = {
  user: 'glimmora_user',
  bookingData: 'glimmora_booking',
  preCheckInSession: 'glimmora_precheckin',
  theme: 'glimmora_theme',
  language: 'glimmora_language',
} as const;

export const BOOKING_REFERENCE_FORMAT = /^GLM-\d{4}-\d{5}$/;

export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
} as const;

export const DEFAULT_PAGINATION = {
  pageSize: 10,
  currentPage: 1,
} as const;

export const ROOM_CATEGORIES = [
  'STANDARD',
  'DELUXE',
  'SUITE',
  'PENTHOUSE',
] as const;

export const BOOKING_STATUS = [
  'upcoming',
  'checked-in',
  'completed',
  'cancelled',
] as const;

export type RoomCategory = typeof ROOM_CATEGORIES[number];
export type BookingStatus = typeof BOOKING_STATUS[number];
