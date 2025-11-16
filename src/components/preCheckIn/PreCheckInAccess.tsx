import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, LogIn, Hash, UserPlus, Mail, AlertCircle } from 'lucide-react';
import styles from './PreCheckInAccess.module.css';

interface PreCheckInAccessProps {
  bookingId?: string;
  onBookingReferenceSubmit: (bookingRef: string, email: string) => Promise<void>;
}

export const PreCheckInAccess: React.FC<PreCheckInAccessProps> = ({
  bookingId,
  onBookingReferenceSubmit
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    bookingReference: bookingId || '',
    email: ''
  });

  const handleBookingReferenceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.bookingReference || !formData.email) {
      setError('Please enter both booking reference and email');
      return;
    }

    setLoading(true);

    try {
      await onBookingReferenceSubmit(formData.bookingReference, formData.email);
    } catch (err) {
      setError('Invalid booking reference or email. Please try again.');
      setLoading(false);
    }
  };

  const handleSignIn = () => {
    const returnUrl = `/pre-check-in/${bookingId || formData.bookingReference}`;
    navigate(`/login?returnUrl=${encodeURIComponent(returnUrl)}`);
  };

  const handleCreateAccount = () => {
    const returnUrl = `/pre-check-in/${bookingId || formData.bookingReference}`;
    navigate(`/signup?returnUrl=${encodeURIComponent(returnUrl)}`);
  };

  return (
    <div className={styles.accessPage}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.header}
        >
          <div className={styles.icon}>
            <Lock size={64} />
          </div>
          <h1 className={styles.title}>Access Pre-Check-In</h1>
          <p className={styles.subtitle}>Choose how you'd like to proceed</p>
        </motion.div>

        {/* Access Options */}
        <div className={styles.options}>
          {/* Option 1: Sign In */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={styles.optionCard}
          >
            <div className={styles.optionIcon}>
              <LogIn size={32} />
            </div>
            <h3 className={styles.optionTitle}>Sign In to Your Account</h3>
            <p className={styles.optionDescription}>
              Already have a Glimmora account? Sign in to access your booking
            </p>
            <button className={styles.primaryButton} onClick={handleSignIn}>
              SIGN IN
            </button>
          </motion.div>

          {/* Option 2: Booking Reference Access */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`${styles.optionCard} ${styles.featured}`}
          >
            <div className={styles.optionIcon}>
              <Hash size={32} />
            </div>
            <h3 className={styles.optionTitle}>Access with Booking Reference</h3>
            <p className={styles.optionDescription}>
              Enter your booking reference and email to continue
            </p>

            <form onSubmit={handleBookingReferenceSubmit} className={styles.form}>
              <div className={styles.field}>
                <label className={styles.label}>
                  <Hash size={16} />
                  Booking Reference
                </label>
                <input
                  type="text"
                  value={formData.bookingReference}
                  onChange={(e) => setFormData(prev => ({ ...prev, bookingReference: e.target.value.toUpperCase() }))}
                  placeholder="GLM-2024-12345"
                  className={styles.input}
                  disabled={!!bookingId}
                  required
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>
                  <Mail size={16} />
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your@email.com"
                  className={styles.input}
                  required
                />
              </div>

              {error && (
                <div className={styles.error}>
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              <button
                type="submit"
                className={styles.primaryButton}
                disabled={loading}
              >
                {loading ? 'VALIDATING...' : 'ACCESS PRE-CHECK-IN'}
              </button>
            </form>
          </motion.div>

          {/* Option 3: Create Account */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={styles.optionCard}
          >
            <div className={styles.optionIcon}>
              <UserPlus size={32} />
            </div>
            <h3 className={styles.optionTitle}>Create an Account</h3>
            <p className={styles.optionDescription}>
              Create an account to manage all your bookings
            </p>
            <button className={styles.outlineButton} onClick={handleCreateAccount}>
              CREATE ACCOUNT
            </button>
          </motion.div>
        </div>

        {/* Help Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={styles.helpText}
        >
          Can't find your booking reference? Check your confirmation email or{' '}
          <a href="/contact" className={styles.link}>contact support</a>.
        </motion.div>
      </div>
    </div>
  );
};
