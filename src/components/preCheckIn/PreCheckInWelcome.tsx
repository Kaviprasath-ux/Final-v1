import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Award, Check, Clock, Key, Heart, Shield } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import { usePreCheckIn } from '../../contexts/PreCheckInContext';
import { useAuth } from '../../contexts/AuthContext';
import styles from './PreCheckInWelcome.module.css';

interface PreCheckInWelcomeProps {
  bookingId: string;
}

export const PreCheckInWelcome: React.FC<PreCheckInWelcomeProps> = ({ bookingId }) => {
  const { user } = useAuth();
  const { getBookingById } = useDashboard();
  const { nextStep } = usePreCheckIn();

  const booking = getBookingById(bookingId);

  if (!booking) {
    return <div>Booking not found</div>;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const steps = [
    {
      number: 1,
      title: 'Verify Information',
      description: 'Confirm your personal details and upload ID',
      time: '2 min'
    },
    {
      number: 2,
      title: 'Choose Your Perfect Room',
      description: 'Our AI will recommend the best room for you',
      time: '3 min'
    },
    {
      number: 3,
      title: 'Add Special Requests',
      description: 'Let us know your preferences',
      time: '1 min'
    },
    {
      number: 4,
      title: 'Confirm Payment',
      description: 'Review and confirm payment details',
      time: '1 min'
    },
    {
      number: 5,
      title: 'Get Digital Key',
      description: 'Receive your digital room key instantly',
      time: 'Instant'
    }
  ];

  const benefits = [
    'Skip the front desk line',
    'Choose your preferred room',
    'Get digital room key',
    'Faster check-in (under 60 seconds)',
    'AI-personalized experience',
    'Contactless and safe'
  ];

  return (
    <div className={styles.welcome}>
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.header}
      >
        <div className={styles.icon}>
          <Sparkles size={64} />
        </div>
        <h1 className={styles.title}>Welcome to Pre-Check-In!</h1>
        <p className={styles.subtitle}>Skip the front desk and go straight to your room</p>
      </motion.div>

      {/* Booking Summary */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={styles.bookingSummary}
      >
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Booking Reference:</span>
          <span className={styles.summaryValue}>{booking.bookingReference}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Guest Name:</span>
          <span className={styles.summaryValue}>{user?.fullName}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Check-in:</span>
          <span className={styles.summaryValue}>{formatDate(booking.checkIn)}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Room:</span>
          <span className={styles.summaryValue}>{booking.roomName}</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Nights:</span>
          <span className={styles.summaryValue}>{booking.nights} {booking.nights === 1 ? 'night' : 'nights'}</span>
        </div>
      </motion.div>

      {/* What to Expect */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={styles.section}
      >
        <h2 className={styles.sectionTitle}>What to Expect</h2>
        <div className={styles.steps}>
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={styles.step}
            >
              <div className={styles.stepNumber}>{step.number}</div>
              <div className={styles.stepContent}>
                <div className={styles.stepTitle}>{step.title}</div>
                <div className={styles.stepDescription}>{step.description}</div>
              </div>
              <div className={styles.stepTime}>
                <Clock size={14} />
                {step.time}
              </div>
            </motion.div>
          ))}
        </div>
        <div className={styles.totalTime}>Total time: ~5-8 minutes</div>
      </motion.div>

      {/* Benefits Callout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className={styles.benefitsCard}
      >
        <div className={styles.benefitsHeader}>
          <Award size={32} />
          <h3 className={styles.benefitsTitle}>Why Pre-Check-In?</h3>
        </div>
        <div className={styles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <div key={index} className={styles.benefit}>
              <Check size={18} />
              {benefit}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Start Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className={styles.actions}
      >
        <button className={styles.startButton} onClick={nextStep}>
          <Key size={20} />
          START PRE-CHECK-IN
        </button>
        <button className={styles.laterLink}>I'll do this later</button>
      </motion.div>

      {/* Trust Indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className={styles.trustIndicators}
      >
        <div className={styles.indicator}>
          <Shield size={16} />
          <span>Secure & Encrypted</span>
        </div>
        <div className={styles.indicator}>
          <Heart size={16} />
          <span>Used by 10,000+ guests</span>
        </div>
      </motion.div>
    </div>
  );
};
