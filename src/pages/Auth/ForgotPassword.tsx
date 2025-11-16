import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Mail, AlertCircle, Loader, CheckCircle } from 'lucide-react';
import { AuthLayout } from '../../components/auth/AuthLayout';
import styles from './Auth.module.css';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
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
        <Link to="/login" className={styles.backLink}>
          <ArrowLeft size={20} />
          Back to Sign In
        </Link>

        {/* Icon */}
        <div className={styles.iconContainer}>
          <Lock size={36} />
        </div>

        {/* Header */}
        <div className={`${styles.header} ${styles.centerHeader}`}>
          <h1 className={styles.title}>Forgot Password?</h1>
          <p className={styles.subtitle}>
            No worries, we'll send you reset instructions
          </p>
        </div>

        {/* Success Message */}
        {isSuccess && (
          <div className={styles.successMessage}>
            <CheckCircle size={20} />
            <div className={styles.successMessageText}>
              Check your email! We've sent password reset instructions to {email}
            </div>
          </div>
        )}

        {/* Form */}
        {!isSuccess && (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Email Address</label>
              <div className={styles.passwordWrapper}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter your email"
                  className={`${styles.input} ${error ? styles.inputError : ''}`}
                  style={{ paddingLeft: '44px' }}
                />
                <Mail size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#808080', pointerEvents: 'none' }} />
              </div>
              {error && (
                <div className={styles.errorMessage}>
                  <AlertCircle size={14} />
                  {error}
                </div>
              )}
            </div>

            <button type="submit" disabled={isLoading} className={styles.primaryButton}>
              {isLoading ? (
                <>
                  <Loader size={20} className={styles.spinner} />
                  Sending...
                </>
              ) : (
                'SEND RESET LINK'
              )}
            </button>

            <div className={styles.footer}>
              <Link to="/login" className={styles.footerLink}>← Back to Sign In</Link>
            </div>
          </form>
        )}
      </motion.div>
    </AuthLayout>
  );
};
