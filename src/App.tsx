import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/global.css';
import { AuthProvider } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';
import { HotelHomePage } from './pages/Home/HotelHomePage';
import { RoomsPage } from './pages/Rooms/RoomsPage';
import { RoomDetailPage } from './pages/RoomDetail/RoomDetailPage';
import AmenitiesPage from './pages/Amenities/AmenitiesPage';
import ContactPage from './pages/Contact/ContactPage';
import { Login } from './pages/Auth/Login';
import { SignUp } from './pages/Auth/SignUp';
import { ForgotPassword } from './pages/Auth/ForgotPassword';
import { ResetPassword } from './pages/Auth/ResetPassword';
import { VerifyEmail } from './pages/Auth/VerifyEmail';
import { BookingAccess } from './pages/Auth/BookingAccess';
import { BookingReview } from './pages/Booking/BookingReview';
import { BookingPayment } from './pages/Booking/BookingPayment';
import { BookingConfirmation } from './pages/Booking/BookingConfirmation';
import { BookingFailed } from './pages/Booking/BookingFailed';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { DashboardHome } from './pages/Dashboard/DashboardHome';
import { MyBookings } from './pages/Dashboard/MyBookings';
import { BookingDetail } from './pages/Dashboard/BookingDetail';
import { ProfileSettings } from './pages/Dashboard/ProfileSettings';
import { PaymentMethods } from './pages/Dashboard/PaymentMethods';
import { Preferences } from './pages/Dashboard/Preferences';
import { HelpSupport } from './pages/Dashboard/HelpSupport';
import { PreCheckIn } from './pages/Dashboard/PreCheckIn';
import { PreCheckInAuth } from './components/preCheckIn/PreCheckInAuth';
import PreCheckInPortal from './pages/Dashboard/PreCheckInPortal';
import PublicLayout from './components/layout/PublicLayout';
import AuthLayout from './components/layout/AuthLayout';
import ProtectedRoute from './components/guards/ProtectedRoute';
import GuestRoute from './components/guards/GuestRoute';
import NotFound from './pages/NotFound/NotFound';
import AboutPage from './pages/About/AboutPage';
import PrivacyPolicy from './pages/Legal/PrivacyPolicy';
import TermsOfService from './pages/Legal/TermsOfService';

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <Routes>
            {/* ================================================ */}
            {/* PUBLIC ROUTES - With PublicLayout               */}
            {/* Includes: Public navbar + Footer                */}
            {/* ================================================ */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HotelHomePage />} />
              <Route path="/rooms" element={<RoomsPage />} />
              <Route path="/rooms/:roomSlug" element={<RoomDetailPage />} />
              <Route path="/amenities" element={<AmenitiesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
            </Route>

            {/* ================================================ */}
            {/* AUTH PAGES - With AuthLayout                    */}
            {/* ================================================ */}
            <Route element={<AuthLayout />}>
              {/* Guest-only routes (redirect to dashboard if logged in) */}
              <Route element={<GuestRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
              </Route>

              {/* Auth pages accessible to all */}
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/booking-access" element={<BookingAccess />} />
            </Route>

            {/* ================================================ */}
            {/* BOOKING FLOW - Standalone (no layout)           */}
            {/* ================================================ */}
            <Route path="/booking/review" element={<BookingReview />} />
            <Route path="/booking/payment" element={<BookingPayment />} />
            <Route path="/booking/confirmation/:bookingId" element={<BookingConfirmation />} />
            <Route path="/booking/failed" element={<BookingFailed />} />

            {/* ================================================ */}
            {/* PRE-CHECK-IN FLOW - Standalone (no auth)        */}
            {/* Accessible by guests with token                 */}
            {/* ================================================ */}
            <Route path="/pre-check-in/:bookingId" element={<PreCheckInAuth />} />

            {/* ================================================ */}
            {/* DASHBOARD ROUTES - Protected + DashboardLayout  */}
            {/* Includes: Dashboard navbar, NO public nav/footer*/}
            {/* ================================================ */}
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<DashboardHome />} />
                <Route path="/dashboard/bookings" element={<MyBookings />} />
                <Route path="/dashboard/bookings/:id" element={<BookingDetail />} />
                <Route path="/dashboard/pre-check-in" element={<PreCheckInPortal />} />
                <Route path="/dashboard/pre-check-in/:bookingId" element={<PreCheckIn />} />
                <Route path="/dashboard/profile" element={<ProfileSettings />} />
                <Route path="/dashboard/payments" element={<PaymentMethods />} />
                <Route path="/dashboard/preferences" element={<Preferences />} />
                <Route path="/dashboard/help" element={<HelpSupport />} />
              </Route>
            </Route>

            {/* ================================================ */}
            {/* 404 NOT FOUND - Must be last                    */}
            {/* ================================================ */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;
