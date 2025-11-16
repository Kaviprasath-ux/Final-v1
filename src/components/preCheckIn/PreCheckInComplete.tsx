import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Smartphone,
  Wifi,
  DoorOpen,
  Mail,
  Wallet,
  Calendar,
  Download,
  FileText,
  MessageCircle,
  Phone as PhoneIcon,
  MapPin,
  Clock
} from 'lucide-react';
import { usePreCheckIn } from '../../contexts/PreCheckInContext';
import { useDashboard } from '../../contexts/DashboardContext';
import { useAuth } from '../../contexts/AuthContext';
import styles from './PreCheckInComplete.module.css';

interface PreCheckInCompleteProps {
  bookingId: string;
}

export const PreCheckInComplete: React.FC<PreCheckInCompleteProps> = ({ bookingId }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getBookingById } = useDashboard();
  const { completePreCheckIn, preCheckInData } = usePreCheckIn();

  const booking = getBookingById(bookingId);

  useEffect(() => {
    completePreCheckIn();
  }, []);

  if (!booking) {
    return <div>Booking not found</div>;
  }

  const roomNumber = preCheckInData.roomSelection?.roomNumber || '305';
  const roomName = preCheckInData.roomSelection?.roomName || booking.roomName;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleDone = () => {
    navigate('/dashboard');
  };

  return (
    <div className={styles.complete}>
      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.6, times: [0, 0.6, 1] }}
        className={styles.successIcon}
      >
        <CheckCircle size={120} />
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={styles.header}
      >
        <h1 className={styles.title}>You're All Set! 🎉</h1>
        <p className={styles.subtitle}>Your pre-check-in is complete!</p>
      </motion.div>

      {/* Digital Key Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={styles.digitalKeyCard}
      >
        <div className={styles.keyLabel}>DIGITAL KEY</div>
        <div className={styles.roomNumber}>{roomNumber}</div>
        <div className={styles.guestName}>{user?.fullName}</div>
        <div className={styles.checkInDate}>{formatDate(booking.checkIn)}</div>
        <div className={styles.qrCode}>
          <div className={styles.qrPlaceholder}>
            <div className={styles.qrPattern}></div>
          </div>
        </div>
        <div className={styles.nfcBadge}>
          <Wifi size={12} />
          NFC ENABLED
        </div>
        <div className={styles.shimmer}></div>
      </motion.div>

      {/* How to Use */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className={styles.section}
      >
        <h2 className={styles.sectionTitle}>How to Use Your Digital Key</h2>
        <div className={styles.steps}>
          <div className={styles.stepCard}>
            <div className={styles.stepIcon}>
              <Smartphone size={40} />
            </div>
            <h3 className={styles.stepTitle}>Open the App</h3>
            <p className={styles.stepDescription}>Download Glimmora app or use web version</p>
          </div>

          <div className={styles.stepCard}>
            <div className={styles.stepIcon}>
              <Wifi size={40} />
            </div>
            <h3 className={styles.stepTitle}>Tap to Unlock</h3>
            <p className={styles.stepDescription}>Hold phone near door reader to unlock</p>
          </div>

          <div className={styles.stepCard}>
            <div className={styles.stepIcon}>
              <DoorOpen size={40} />
            </div>
            <h3 className={styles.stepTitle}>Welcome Home!</h3>
            <p className={styles.stepDescription}>Your room is ready for you</p>
          </div>
        </div>
      </motion.div>

      {/* Confirmation Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className={styles.details}
      >
        <h3 className={styles.detailsTitle}>Confirmation Details</h3>
        <div className={styles.detailsGrid}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Room:</span>
            <span className={styles.detailValue}>{roomName} - Room {roomNumber}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Check-in:</span>
            <span className={styles.detailValue}>{formatDate(booking.checkIn)} (After 3:00 PM)</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Check-out:</span>
            <span className={styles.detailValue}>{formatDate(booking.checkOut)} (Before 11:00 AM)</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Confirmation:</span>
            <span className={styles.detailValue}>{booking.bookingReference}</span>
          </div>
        </div>
      </motion.div>

      {/* Email Confirmation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className={styles.emailNotice}
      >
        <Mail size={20} />
        <span>Confirmation email with digital key sent to {user?.email}</span>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className={styles.actions}
      >
        <button className={styles.actionButton}>
          <Wallet size={18} />
          Add to Wallet
        </button>
        <button className={styles.actionButton}>
          <Calendar size={18} />
          Add to Calendar
        </button>
        <button className={styles.actionButton}>
          <Download size={18} />
          Download Receipt
        </button>
        <button className={styles.actionButton}>
          <FileText size={18} />
          View Full Details
        </button>
      </motion.div>

      {/* What's Next Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className={styles.timeline}
      >
        <h3 className={styles.timelineTitle}>What's Next</h3>
        <div className={styles.timelineItems}>
          <div className={`${styles.timelineItem} ${styles.timelineItemComplete}`}>
            <CheckCircle size={24} />
            <div>
              <div className={styles.timelineItemTitle}>Pre-check-in complete</div>
              <div className={styles.timelineItemTime}>Now</div>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <Clock size={24} />
            <div>
              <div className={styles.timelineItemTitle}>Digital key activated</div>
              <div className={styles.timelineItemTime}>24 hours before check-in</div>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <DoorOpen size={24} />
            <div>
              <div className={styles.timelineItemTitle}>Skip front desk, go to room</div>
              <div className={styles.timelineItemTime}>Check-in day</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Need Help */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className={styles.help}
      >
        <h3 className={styles.helpTitle}>Need Help?</h3>
        <div className={styles.helpButtons}>
          <button className={styles.helpButton}>
            <MessageCircle size={18} />
            Chat with AI
          </button>
          <button className={styles.helpButton}>
            <PhoneIcon size={18} />
            Call Hotel
          </button>
          <button className={styles.helpButton}>
            <MapPin size={18} />
            Get Directions
          </button>
        </div>
      </motion.div>

      {/* Done Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className={styles.doneSection}
      >
        <button className={styles.doneButton} onClick={handleDone}>
          DONE
        </button>
      </motion.div>
    </div>
  );
};
