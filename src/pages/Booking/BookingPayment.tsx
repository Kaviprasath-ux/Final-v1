import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Lock, ShieldCheck, Loader, AlertCircle } from 'lucide-react';
import { Navbar } from '../../components/sections/Navbar';
import { HotelFooter } from '../../components/sections/HotelFooter';
import { BookingProgressStepper } from '../../components/booking/BookingProgressStepper';
import { BookingSummaryWidget } from '../../components/booking/BookingSummaryWidget';
import { useBooking } from '../../contexts/BookingContext';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Booking.module.css';

export const BookingPayment: React.FC = () => {
  const navigate = useNavigate();
  const { bookingData, createBooking, isLoading } = useBooking();
  const { isAuthenticated } = useAuth();

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    saveCard: false
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?returnUrl=/booking/payment');
      return;
    }
    if (!bookingData || !bookingData.agreedToTerms) {
      navigate('/booking/review');
    }
  }, [isAuthenticated, bookingData, navigate]);

  if (!bookingData) return null;

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)} / ${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === 'cardNumber') {
      processedValue = formatCardNumber(value.replace(/\D/g, '').slice(0, 16));
    } else if (name === 'expiryDate') {
      processedValue = formatExpiryDate(value);
    } else if (name === 'cvv') {
      processedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    setPaymentData(prev => ({ ...prev, [name]: processedValue }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!paymentData.cardNumber || paymentData.cardNumber.replace(/\s/g, '').length < 13) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }

    if (!paymentData.expiryDate || paymentData.expiryDate.length < 7) {
      newErrors.expiryDate = 'Please enter a valid expiry date';
    }

    if (!paymentData.cvv || paymentData.cvv.length < 3) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    if (!paymentData.cardholderName || paymentData.cardholderName.length < 3) {
      newErrors.cardholderName = 'Please enter cardholder name';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const result = await createBooking({
      ...paymentData,
      billingAddress: undefined
    });

    if (result.success && result.bookingId) {
      navigate(`/booking/confirmation/${result.bookingId}`);
    } else {
      navigate('/booking/failed');
    }
  };

  return (
    <div className={styles.bookingPage}>
      <Navbar />
      <BookingProgressStepper currentStep={2} />

      <div className={styles.mainContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.mainContent}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Link to="/booking/review" className={styles.backLink}>
                <ArrowLeft size={20} />
                Back to Review
              </Link>

              <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Secure Payment</h1>
                <p className={styles.pageSubtitle}>Complete your booking with secure payment</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className={styles.section}>
                  <h2 className={styles.sectionTitle}>Payment Method</h2>
                  <div className={styles.card}>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={paymentData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        className={`${styles.input} ${errors.cardNumber ? styles.inputError : ''}`}
                      />
                      {errors.cardNumber && (
                        <div className={styles.errorMessage}>
                          <AlertCircle size={14} />
                          {errors.cardNumber}
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Expiry Date</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={paymentData.expiryDate}
                          onChange={handleChange}
                          placeholder="MM / YY"
                          className={`${styles.input} ${errors.expiryDate ? styles.inputError : ''}`}
                        />
                        {errors.expiryDate && (
                          <div className={styles.errorMessage}>
                            <AlertCircle size={14} />
                            {errors.expiryDate}
                          </div>
                        )}
                      </div>

                      <div className={styles.inputGroup}>
                        <label className={styles.label}>CVV</label>
                        <input
                          type="password"
                          name="cvv"
                          value={paymentData.cvv}
                          onChange={handleChange}
                          placeholder="123"
                          maxLength={4}
                          className={`${styles.input} ${errors.cvv ? styles.inputError : ''}`}
                        />
                        {errors.cvv && (
                          <div className={styles.errorMessage}>
                            <AlertCircle size={14} />
                            {errors.cvv}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Cardholder Name</label>
                      <input
                        type="text"
                        name="cardholderName"
                        value={paymentData.cardholderName}
                        onChange={handleChange}
                        placeholder="Name as it appears on card"
                        className={`${styles.input} ${errors.cardholderName ? styles.inputError : ''}`}
                        style={{ textTransform: 'uppercase' }}
                      />
                      {errors.cardholderName && (
                        <div className={styles.errorMessage}>
                          <AlertCircle size={14} />
                          {errors.cardholderName}
                        </div>
                      )}
                    </div>

                    <label className={styles.checkboxLabel} style={{ marginTop: '16px' }}>
                      <input
                        type="checkbox"
                        checked={paymentData.saveCard}
                        onChange={(e) => setPaymentData(prev => ({ ...prev, saveCard: e.target.checked }))}
                        className={styles.hiddenCheckbox}
                      />
                      <span className={`${styles.customCheckbox} ${paymentData.saveCard ? styles.checked : ''}`}>
                        {paymentData.saveCard && <span className={styles.checkmark}>✓</span>}
                      </span>
                      <span className={styles.checkboxText}>
                        <Lock size={14} style={{ display: 'inline', marginRight: '4px' }} />
                        Save card for future bookings
                      </span>
                    </label>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', margin: '32px 0', fontSize: '12px', color: '#808080' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={16} style={{ color: '#27AE60' }} />
                    Secure Payment
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Lock size={16} style={{ color: '#27AE60' }} />
                    SSL Encrypted
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CreditCard size={16} style={{ color: '#808080' }} />
                    Powered by Stripe
                  </div>
                </div>

                <button type="submit" disabled={isLoading} className={styles.primaryButton}>
                  {isLoading ? (
                    <>
                      <Loader size={20} style={{ animation: 'spin 1s linear infinite' }} />
                      Processing Payment...
                    </>
                  ) : (
                    'COMPLETE BOOKING'
                  )}
                </button>

                <p style={{ textAlign: 'center', fontSize: '13px', color: '#808080', marginTop: '16px' }}>
                  <Lock size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  Your payment information is encrypted and secure. We do not store your card details.
                </p>
              </form>
            </motion.div>
          </div>

          <div className={styles.sidebarColumn}>
            <BookingSummaryWidget bookingData={bookingData} />
          </div>
        </div>
      </div>

      <HotelFooter />
    </div>
  );
};
