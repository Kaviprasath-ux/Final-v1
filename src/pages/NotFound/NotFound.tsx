import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';
import styles from './NotFound.module.css';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.notFound}>
      <div className={styles.content}>
        {/* 404 Number */}
        <div className={styles.errorNumber}>404</div>

        {/* Title */}
        <h1 className={styles.title}>Page Not Found</h1>

        {/* Description */}
        <p className={styles.description}>
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <button
            className={styles.primaryButton}
            onClick={() => navigate('/')}
          >
            <Home size={20} />
            Back to Home
          </button>

          <button
            className={styles.secondaryButton}
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className={styles.quickLinks}>
          <h3 className={styles.quickLinksTitle}>Quick Links</h3>
          <div className={styles.linkGrid}>
            <Link to="/rooms" className={styles.quickLink}>
              <Search size={16} />
              Browse Rooms
            </Link>
            <Link to="/amenities" className={styles.quickLink}>
              <Search size={16} />
              Amenities
            </Link>
            <Link to="/contact" className={styles.quickLink}>
              <Search size={16} />
              Contact Us
            </Link>
            <Link to="/dashboard" className={styles.quickLink}>
              <Search size={16} />
              Dashboard
            </Link>
          </div>
        </div>

        {/* Help Text */}
        <p className={styles.helpText}>
          Need help? <Link to="/contact" className={styles.helpLink}>Contact our support team</Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
