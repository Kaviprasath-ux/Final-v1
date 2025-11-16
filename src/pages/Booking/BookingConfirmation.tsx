import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, Copy, ClipboardCheck, FileText, MessageCircle, Download, Calendar, Phone } from 'lucide-react';
import { Navbar } from '../../components/sections/Navbar';
import { HotelFooter } from '../../components/sections/HotelFooter';
import { useAuth } from '../../contexts/AuthContext';
import styles from './BookingConfirmation.module.css';

export const BookingConfirmation: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [bookingData, setBookingData] = useState<any>(null);

  useEffect(() => {
    // Load booking data from localStorage (in real app, fetch from API)
    if (bookingId) {
      const saved = localStorage.getItem(`booking_${bookingId}`);
      if (saved) {
        setBookingData(JSON.parse(saved));
        // Clear the booking flow data
        localStorage.removeItem('bookingData');
      } else {
        navigate('/rooms');
      }
    }
  }, [bookingId, navigate]);

  if (!bookingData) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(bookingId || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.confirmationPage}>
      <Navbar />

      <div className={styles.mainContainer}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={styles.successIcon}
        >
          <CheckCircle size={80} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={styles.header}
        >
          <h1 className={styles.title}>Booking Confirmed!</h1>
          <p className={styles.subtitle}>Your reservation at Glimmora Hotel is confirmed</p>

          <button onClick={handleCopy} className={styles.bookingRef}>
            Booking Reference: {bookingId}
            <Copy size={16} />
            {copied && <span className={styles.copiedTooltip}>Copied!</span>}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={styles.emailNotice}
        >
          <Mail size={24} />
          <div>
            <div className={styles.noticeTitle}>Confirmation Email Sent</div>
            <div className={styles.noticeText}>
              We've sent a confirmation email to {user?.email || 'your email'} with all your booking details
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={styles.detailsCard}
        >
          <div className={styles.detailsGrid}>
            <div className={styles.detailsColumn}>
              <div className={styles.detailSection}>
                <div className={styles.detailLabel}>ROOM</div>
                <div className={styles.detailValue}>{bookingData.roomName}</div>
                <div className={styles.categoryBadge}>{bookingData.roomCategory}</div>
              </div>

              <div className={styles.detailSection}>
                <div className={styles.detailLabel}>CHECK-IN</div>
                <div className={styles.detailValue}>{new Date(bookingData.checkIn).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</div>
                <div className={styles.detailTime}>After 3:00 PM</div>
              </div>

              <div className={styles.detailSection}>
                <div className={styles.detailLabel}>CHECK-OUT</div>
                <div className={styles.detailValue}>{new Date(bookingData.checkOut).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</div>
                <div className={styles.detailTime}>Before 11:00 AM</div>
              </div>

              <div className={styles.detailSection}>
                <div className={styles.detailLabel}>GUESTS</div>
                <div className={styles.detailValue}>{bookingData.guests} {bookingData.guests === 1 ? 'Guest' : 'Guests'}</div>
              </div>
            </div>

            <div className={styles.detailsColumn}>
              <div className={styles.detailSection}>
                <div className={styles.detailLabel}>GUEST NAME</div>
                <div className={styles.detailValue}>{user?.fullName || 'Guest'}</div>
              </div>

              <div className={styles.detailSection}>
                <div className={styles.detailLabel}>EMAIL</div>
                <div className={styles.detailValue}>{user?.email}</div>
              </div>

              <div className={styles.detailSection}>
                <div className={styles.detailLabel}>TOTAL PAID</div>
                <div className={styles.detailValue}>${bookingData.pricing.total}</div>
              </div>

              <div className={styles.detailSection}>
                <div className={styles.detailLabel}>PAYMENT METHOD</div>
                <div className={styles.detailValue}>•••• {bookingData.paymentInfo?.last4 || '4242'}</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={styles.nextSteps}
        >
          <h2 className={styles.stepsTitle}>What's Next?</h2>
          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>1</div>
              <ClipboardCheck size={40} className={styles.stepIcon} />
              <h3 className={styles.stepTitle}>Pre-Check-In</h3>
              <p className={styles.stepDescription}>
                Complete pre-check-in 24 hours before arrival and get your digital key
              </p>
              <button className={styles.stepButton}>Start Pre-Check-In</button>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>2</div>
              <FileText size={40} className={styles.stepIcon} />
              <h3 className={styles.stepTitle}>Review Your Booking</h3>
              <p className={styles.stepDescription}>
                View your booking details, add special requests, or make changes
              </p>
              <button className={styles.stepButton}>View Booking</button>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>3</div>
              <MessageCircle size={40} className={styles.stepIcon} />
              <h3 className={styles.stepTitle}>Questions?</h3>
              <p className={styles.stepDescription}>
                Chat with our 24/7 AI assistant or contact our team
              </p>
              <button className={styles.stepButton}>Get Help</button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={styles.actions}
        >
          <button className={styles.primaryAction}>View Booking</button>
          <button className={styles.secondaryAction}>
            <Download size={18} />
            Download Receipt
          </button>
          <button className={styles.secondaryAction}>
            <Calendar size={18} />
            Add to Calendar
          </button>
        </motion.div>
      </div>

      <HotelFooter />
    </div>
  );
};
