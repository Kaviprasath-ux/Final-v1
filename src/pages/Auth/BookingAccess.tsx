import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Ticket, Hash, Mail, AlertCircle, Loader, ArrowLeft } from 'lucide-react';
import { AuthLayout } from '../../components/auth/AuthLayout';
import styles from './Auth.module.css';

export const BookingAccess: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bookingReference: '',
    email: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Auto-format booking reference
    if (name === 'bookingReference') {
      processedValue = value.toUpperCase().replace(/[^A-Z0-9-]/g, '');
    }

    setFormData(prev => ({ ...prev, [name]: processedValue }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Booking reference validation
    if (!formData.bookingReference) {
      newErrors.bookingReference = 'Booking reference is required';
    } else if (formData.bookingReference.length < 8) {
      newErrors.bookingReference = 'Please enter a valid booking reference';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Access booking:', formData);
      setIsLoading(false);
      // Navigate to booking detail page
      navigate(`/booking/${formData.bookingReference.toLowerCase()}`);
    }, 1500);
  };

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Back Link */}
        <Link to="/" className={styles.backLink}>
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        {/* Icon */}
        <div className={styles.iconContainer}>
          <Ticket size={36} />
        </div>

        {/* Header */}
        <div className={`${styles.header} ${styles.centerHeader}`}>
          <h1 className={styles.title}>Access Your Booking</h1>
          <p className={styles.subtitle}>
            Enter your booking reference and email to view your reservation
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Booking Reference Field */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Booking Reference</label>
            <div className={styles.passwordWrapper}>
              <input
                type="text"
                name="bookingReference"
                value={formData.bookingReference}
                onChange={handleChange}
                placeholder="e.g., GLM-2024-001"
                className={`${styles.input} ${errors.bookingReference ? styles.inputError : ''}`}
                style={{ paddingLeft: '44px', textTransform: 'uppercase' }}
              />
              <Hash
                size={20}
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#808080',
                  pointerEvents: 'none'
                }}
              />
            </div>
            {errors.bookingReference && (
              <div className={styles.errorMessage}>
                <AlertCircle size={14} />
                {errors.bookingReference}
              </div>
            )}
          </div>

          {/* Email Field */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Email Address</label>
            <div className={styles.passwordWrapper}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email used for booking"
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                style={{ paddingLeft: '44px' }}
              />
              <Mail
                size={20}
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#808080',
                  pointerEvents: 'none'
                }}
              />
            </div>
            {errors.email && (
              <div className={styles.errorMessage}>
                <AlertCircle size={14} />
                {errors.email}
              </div>
            )}
          </div>

          {/* Access Booking Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={styles.primaryButton}
          >
            {isLoading ? (
              <>
                <Loader size={20} className={styles.spinner} />
                Accessing...
              </>
            ) : (
              'ACCESS BOOKING'
            )}
          </button>

          {/* Footer */}
          <div className={styles.footer}>
            <span className={styles.footerText}>Have an account?</span>
            <Link to="/login" className={styles.footerLink}>Sign In</Link>
          </div>
        </form>
      </motion.div>
    </AuthLayout>
  );
};
