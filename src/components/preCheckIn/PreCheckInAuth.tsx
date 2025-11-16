import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { PreCheckInFlow } from './PreCheckInFlow';
import { PreCheckInAccess } from './PreCheckInAccess';
import styles from './PreCheckInAuth.module.css';

interface GuestSession {
  token: string;
  bookingId: string;
  email: string;
  guestName: string;
  expiresAt: string;
}

export const PreCheckInAuth: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [validating, setValidating] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [guestSession, setGuestSession] = useState<GuestSession | null>(null);

  useEffect(() => {
    validateAccess();
  }, [bookingId, isAuthenticated]);

  const validateAccess = async () => {
    setValidating(true);

    // METHOD 1: Check if user is authenticated (logged in)
    if (isAuthenticated) {
      setHasAccess(true);
      setValidating(false);
      return;
    }

    // METHOD 2: Check for token in URL query params
    const token = searchParams.get('token');

    if (token && bookingId) {
      // Validate token against booking ID
      const isValid = await validateToken(token, bookingId);

      if (isValid) {
        // Store guest session
        const session: GuestSession = {
          token,
          bookingId,
          email: 'guest@example.com', // From token validation
          guestName: 'Guest User', // From token validation
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        };

        localStorage.setItem(`preCheckInSession_${bookingId}`, JSON.stringify(session));
        setGuestSession(session);
        setHasAccess(true);
      } else {
        // Invalid token - show error
        setHasAccess(false);
      }

      setValidating(false);
      return;
    }

    // METHOD 3: Check for existing guest session
    if (bookingId) {
      const savedSession = localStorage.getItem(`preCheckInSession_${bookingId}`);

      if (savedSession) {
        const session: GuestSession = JSON.parse(savedSession);

        // Check if session is expired
        if (new Date(session.expiresAt) > new Date()) {
          setGuestSession(session);
          setHasAccess(true);
          setValidating(false);
          return;
        } else {
          // Session expired - clear it
          localStorage.removeItem(`preCheckInSession_${bookingId}`);
        }
      }
    }

    // No valid access method found - show access options
    setHasAccess(false);
    setValidating(false);
  };

  const validateToken = async (token: string, bookingId: string): Promise<boolean> => {
    // Simulate API call to validate token
    // In production, this would call your backend API

    await new Promise(resolve => setTimeout(resolve, 1000));

    // For demo purposes, accept any token that's at least 10 characters
    // In production, verify JWT signature and expiration
    return token.length >= 10;
  };

  const handleBookingReferenceAccess = async (bookingRef: string, email: string) => {
    // Validate booking reference and email
    setValidating(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generate token (in production, backend would do this)
    const generatedToken = btoa(`${bookingRef}:${email}:${Date.now()}`);

    // Store session
    const session: GuestSession = {
      token: generatedToken,
      bookingId: bookingRef,
      email,
      guestName: email.split('@')[0], // Simple name extraction
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };

    localStorage.setItem(`preCheckInSession_${bookingRef}`, JSON.stringify(session));
    setGuestSession(session);

    // Navigate with token
    navigate(`/pre-check-in/${bookingRef}?token=${generatedToken}`);
    setHasAccess(true);
    setValidating(false);
  };

  if (validating) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <div className={styles.loadingText}>Validating access...</div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <PreCheckInAccess
        bookingId={bookingId}
        onBookingReferenceSubmit={handleBookingReferenceAccess}
      />
    );
  }

  return <PreCheckInFlow guestSession={guestSession} />;
};
