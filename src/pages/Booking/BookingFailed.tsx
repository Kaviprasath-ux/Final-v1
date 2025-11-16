import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XCircle, Phone, Mail, MessageCircle } from 'lucide-react';
import { Navbar } from '../../components/sections/Navbar';
import { HotelFooter } from '../../components/sections/HotelFooter';
import { useBooking } from '../../contexts/BookingContext';
import styles from './BookingFailed.module.css';

export const BookingFailed: React.FC = () => {
  const navigate = useNavigate();
  const { error } = useBooking();

  return (
    <div className={styles.failedPage}>
      <Navbar />

      <div className={styles.mainContainer}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={styles.errorIcon}
        >
          <XCircle size={80} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={styles.header}
        >
          <h1 className={styles.title}>Booking Failed</h1>
          <p className={styles.subtitle}>We couldn't complete your booking</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={styles.errorCard}
        >
          <div className={styles.errorTitle}>What went wrong?</div>
          <div className={styles.errorMessage}>
            {error || 'Payment declined by your bank. Please check your card details and try again.'}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={styles.actions}
        >
          <button onClick={() => navigate('/booking/payment')} className={styles.primaryAction}>
            TRY AGAIN
          </button>
          <button onClick={() => navigate('/rooms')} className={styles.secondaryAction}>
            BROWSE ROOMS
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={styles.support}
        >
          <h3 className={styles.supportTitle}>Need help?</h3>
          <p className={styles.supportText}>Our team is here to assist you</p>

          <div className={styles.supportGrid}>
            <div className={styles.supportOption}>
              <Phone size={24} />
              <div className={styles.supportLabel}>Call Us</div>
              <div className={styles.supportValue}>+1 (555) 123-4567</div>
            </div>
            <div className={styles.supportOption}>
              <Mail size={24} />
              <div className={styles.supportLabel}>Email Us</div>
              <div className={styles.supportValue}>support@glimmora.com</div>
            </div>
            <div className={styles.supportOption}>
              <MessageCircle size={24} />
              <div className={styles.supportLabel}>Live Chat</div>
              <div className={styles.supportValue}>24/7 AI Assistant</div>
            </div>
          </div>
        </motion.div>
      </div>

      <HotelFooter />
    </div>
  );
};
