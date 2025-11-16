import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css';

/**
 * AuthLayout - Used for authentication pages
 * Two-column layout: Brand/Image (left) + Auth Form (right)
 * Used by: Login, SignUp, ForgotPassword, etc.
 */
const AuthLayout: React.FC = () => {
  return (
    <div className={styles.authLayout}>
      {/* Left Side - Brand/Image */}
      <div className={styles.brandSide}>
        {/* Background Pattern */}
        <div className={styles.pattern} />

        {/* Content */}
        <div className={styles.brandContent}>
          <Link to="/" className={styles.logoLink}>
            <h1 className={styles.logo}>GLIMMORA</h1>
          </Link>

          <h2 className={styles.brandTitle}>Welcome to Glimmora</h2>
          <p className={styles.brandDescription}>
            Experience AI-powered hospitality. Skip the front desk, unlock with your phone, and enjoy seamless service.
          </p>

          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>
                <span>✓</span>
              </div>
              <div className={styles.featureText}>
                <div className={styles.featureTitle}>5-Star Rated</div>
                <div className={styles.featureSubtitle}>20,000+ guests</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className={styles.formSide}>
        <div className={styles.formContainer}>
          {/* Mobile Logo */}
          <div className={styles.mobileLogo}>
            <Link to="/">
              <h1 className={styles.mobileLogoText}>GLIMMORA</h1>
            </Link>
          </div>

          {/* Form Content */}
          <div className={styles.formContent}>
            <Outlet />
          </div>

          {/* Back to Home Link */}
          <div className={styles.backLink}>
            <Link to="/">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
