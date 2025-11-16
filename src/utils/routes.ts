/**
 * Centralized route paths and navigation helpers
 * Use these constants instead of hardcoding paths throughout the app
 */

export const routes = {
  // Public Routes
  home: '/',
  rooms: '/rooms',
  roomDetail: (slug: string) => `/rooms/${slug}`,
  amenities: '/amenities',
  contact: '/contact',
  about: '/about',

  // Auth Routes
  login: '/login',
  signup: '/signup',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  verifyEmail: '/verify-email',
  bookingAccess: '/booking-access',

  // Booking Routes
  bookingReview: '/booking/review',
  bookingPayment: '/booking/payment',
  bookingConfirmation: (id: string) => `/booking/confirmation/${id}`,
  bookingFailed: '/booking/failed',

  // Pre-Check-In Routes
  preCheckIn: (bookingId: string, token?: string) =>
    `/pre-check-in/${bookingId}${token ? `?token=${token}` : ''}`,

  // Dashboard Routes
  dashboard: '/dashboard',
  myBookings: '/dashboard/bookings',
  bookingDetail: (id: string) => `/dashboard/bookings/${id}`,
  preCheckInPortal: '/dashboard/pre-check-in',
  preCheckInPortalWithId: (bookingId: string) => `/dashboard/pre-check-in/${bookingId}`,
  profile: '/dashboard/profile',
  payments: '/dashboard/payments',
  preferences: '/dashboard/preferences',
  help: '/dashboard/help',

  // Legal Routes
  privacy: '/privacy',
  terms: '/terms',
  cookies: '/cookies',
  sitemap: '/sitemap',
};

/**
 * Helper to build URL with query parameters
 */
export const buildUrl = (path: string, params?: Record<string, string>): string => {
  if (!params || Object.keys(params).length === 0) {
    return path;
  }

  const searchParams = new URLSearchParams(params);
  return `${path}?${searchParams.toString()}`;
};

/**
 * Helper to get return URL parameter
 */
export const getReturnUrl = (defaultUrl: string = routes.dashboard): string => {
  const params = new URLSearchParams(window.location.search);
  return params.get('returnUrl') || defaultUrl;
};

/**
 * Helper to navigate with return URL
 */
export const getLoginUrl = (returnUrl?: string): string => {
  if (!returnUrl) {
    return routes.login;
  }
  return buildUrl(routes.login, { returnUrl });
};

export default routes;
