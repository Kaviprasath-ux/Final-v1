import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, XCircle, CreditCard } from 'lucide-react';
import { Navbar } from '../../components/sections/Navbar';
import { HotelFooter } from '../../components/sections/HotelFooter';
import { BookingProgressStepper } from '../../components/booking/BookingProgressStepper';
import { BookingSummaryWidget } from '../../components/booking/BookingSummaryWidget';
import { useBooking } from '../../contexts/BookingContext';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Booking.module.css';

export const BookingReview: React.FC = () => {
  const navigate = useNavigate();
  const { bookingData, updateBookingData } = useBooking();
  const { isAuthenticated } = useAuth();

  const [specialRequests, setSpecialRequests] = useState({
    earlyCheckIn: false,
    lateCheckout: false,
    airportTransfer: false,
    highFloor: false,
    quietRoom: false,
    extraPillows: false,
    babyCot: false,
    additionalNotes: ''
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/login?returnUrl=/booking/review');
      return;
    }

    // Redirect if no booking data
    if (!bookingData) {
      navigate('/rooms');
      return;
    }

    // Load existing special requests if any
    if (bookingData.specialRequests) {
      setSpecialRequests(bookingData.specialRequests);
    }
    if (bookingData.agreedToTerms) {
      setAgreedToTerms(bookingData.agreedToTerms);
    }
  }, [isAuthenticated, bookingData, navigate]);

  if (!bookingData) {
    return null;
  }

  const handleContinue = () => {
    if (!agreedToTerms) {
      setError('You must agree to the policies and terms to continue');
      return;
    }

    // Update booking data with special requests
    updateBookingData({ specialRequests, agreedToTerms });

    // Navigate to payment
    navigate('/booking/payment');
  };

  const handleRequestChange = (field: keyof typeof specialRequests, value: boolean | string) => {
    setSpecialRequests(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={styles.bookingPage}>
      <Navbar />
      <BookingProgressStepper currentStep={1} />

      <div className={styles.mainContainer}>
        <div className={styles.contentWrapper}>
          {/* Left Column - Main Content */}
          <div className={styles.mainContent}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {/* Header */}
              <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Review Your Booking</h1>
                <p className={styles.pageSubtitle}>Almost there! Please review your booking details</p>
              </div>

              {/* Your Trip Section */}
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Your Trip</h2>
                <div className={styles.card}>
                  <div className={styles.tripGrid}>
                    <div className={styles.tripDetail}>
                      <div className={styles.tripLabel}>Check-in</div>
                      <div className={styles.tripValue}>{new Date(bookingData.checkIn).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</div>
                    </div>
                    <div className={styles.tripDetail}>
                      <div className={styles.tripLabel}>Check-out</div>
                      <div className={styles.tripValue}>{new Date(bookingData.checkOut).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</div>
                    </div>
                    <div className={styles.tripDetail}>
                      <div className={styles.tripLabel}>Guests</div>
                      <div className={styles.tripValue}>{bookingData.guests} {bookingData.guests === 1 ? 'Adult' : 'Adults'}</div>
                    </div>
                    <div className={styles.tripDetail}>
                      <div className={styles.tripLabel}>Room</div>
                      <div className={styles.tripValue}>{bookingData.roomName}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Requests Section */}
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Special Requests</h2>
                <p className={styles.sectionDescription}>Let us know if you have any special requirements</p>
                <div className={styles.card}>
                  <div className={styles.requestsList}>
                    {[
                      { key: 'earlyCheckIn', label: 'Early check-in (if available)' },
                      { key: 'lateCheckout', label: 'Late check-out (subject to availability)' },
                      { key: 'airportTransfer', label: 'Airport transfer' },
                      { key: 'highFloor', label: 'High floor preferred' },
                      { key: 'quietRoom', label: 'Quiet room preferred' },
                      { key: 'extraPillows', label: 'Extra pillows' },
                      { key: 'babyCot', label: 'Baby cot' }
                    ].map((request) => (
                      <label key={request.key} className={styles.requestItem}>
                        <input
                          type="checkbox"
                          checked={specialRequests[request.key as keyof typeof specialRequests] as boolean}
                          onChange={(e) => handleRequestChange(request.key as keyof typeof specialRequests, e.target.checked)}
                          className={styles.hiddenCheckbox}
                        />
                        <span className={`${styles.customCheckbox} ${specialRequests[request.key as keyof typeof specialRequests] ? styles.checked : ''}`}>
                          {specialRequests[request.key as keyof typeof specialRequests] && <span className={styles.checkmark}>✓</span>}
                        </span>
                        <span className={styles.requestLabel}>{request.label}</span>
                      </label>
                    ))}
                  </div>

                  <div className={styles.additionalNotes}>
                    <label className={styles.label}>Additional Requests</label>
                    <textarea
                      value={specialRequests.additionalNotes}
                      onChange={(e) => handleRequestChange('additionalNotes', e.target.value)}
                      placeholder="Any other special requests? (Optional)"
                      className={styles.textarea}
                    />
                  </div>
                </div>
              </div>

              {/* Policies & Terms Section */}
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Policies & Terms</h2>
                <div className={styles.card}>
                  <div className={styles.policiesList}>
                    <div className={styles.policyItem}>
                      <XCircle size={20} style={{ color: '#27AE60' }} />
                      <div>
                        <div className={styles.policyTitle}>Free Cancellation</div>
                        <div className={styles.policyText}>Full refund if cancelled before {new Date(new Date(bookingData.checkIn).getTime() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className={styles.policyItem}>
                      <CreditCard size={20} style={{ color: '#A57865' }} />
                      <div>
                        <div className={styles.policyTitle}>Secure Payment</div>
                        <div className={styles.policyText}>Your payment information is encrypted and secure</div>
                      </div>
                    </div>
                    <div className={styles.policyItem}>
                      <FileText size={20} style={{ color: '#5C5C5C' }} />
                      <div>
                        <div className={styles.policyTitle}>House Rules</div>
                        <div className={styles.policyText}>Check-in: 3 PM | Check-out: 11 AM | No smoking | No pets</div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.termsCheckbox}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => {
                          setAgreedToTerms(e.target.checked);
                          setError('');
                        }}
                        className={styles.hiddenCheckbox}
                      />
                      <span className={`${styles.customCheckbox} ${agreedToTerms ? styles.checked : ''}`}>
                        {agreedToTerms && <span className={styles.checkmark}>✓</span>}
                      </span>
                      <span className={styles.checkboxText}>
                        I agree to the <a href="/cancellation-policy" className={styles.link}>cancellation policy</a>, <a href="/house-rules" className={styles.link}>house rules</a>, and <a href="/terms" className={styles.link}>guest terms</a>
                      </span>
                    </label>
                    {error && <div className={styles.errorText}>{error}</div>}
                  </div>
                </div>
              </div>

              {/* Continue Button */}
              <button onClick={handleContinue} className={styles.primaryButton}>
                CONTINUE TO PAYMENT
              </button>
            </motion.div>
          </div>

          {/* Right Column - Booking Summary */}
          <div className={styles.sidebarColumn}>
            <BookingSummaryWidget bookingData={bookingData} showEditButton={false} />
          </div>
        </div>
      </div>

      <HotelFooter />
    </div>
  );
};
