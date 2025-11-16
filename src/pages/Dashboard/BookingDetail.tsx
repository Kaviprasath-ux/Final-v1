import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Users,
  Moon,
  Download,
  Edit,
  X,
  Clock,
  CheckCircle
} from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import styles from './BookingDetail.module.css';

export const BookingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getBookingById } = useDashboard();

  const booking = getBookingById(id || '');

  if (!booking) {
    return (
      <div className={styles.notFound}>
        <h2>Booking Not Found</h2>
        <button onClick={() => navigate('/dashboard/bookings')} className={styles.backButton}>
          Back to Bookings
        </button>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.bookingDetail}>
      {/* Breadcrumbs */}
      <button className={styles.breadcrumb} onClick={() => navigate('/dashboard/bookings')}>
        <ArrowLeft size={16} />
        Back to My Bookings
      </button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.header}
      >
        <div>
          <div className={styles.statusBadge}>{booking.status}</div>
          <h1 className={styles.title}>{booking.roomName}</h1>
          <div className={styles.reference}>Booking Ref: {booking.bookingReference}</div>
        </div>

        <div className={styles.headerActions}>
          {!booking.preCheckInCompleted && booking.status === 'upcoming' && (
            <button className={styles.primaryButton}>
              Pre-Check-In
            </button>
          )}
          <button className={styles.outlineButton}>
            <Download size={18} />
            Download Receipt
          </button>
          {booking.canModify && (
            <button className={styles.outlineButton}>
              <Edit size={18} />
              Modify
            </button>
          )}
          {booking.canCancel && (
            <button className={styles.dangerButton}>
              <X size={18} />
              Cancel
            </button>
          )}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Room Image and Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={styles.section}
        >
          <div className={styles.roomImage}>
            <img src={booking.roomImage} alt={booking.roomName} />
          </div>

          <div className={styles.detailsGrid}>
            <div className={styles.detailItem}>
              <Calendar size={20} />
              <div>
                <div className={styles.detailLabel}>Check-in</div>
                <div className={styles.detailValue}>{formatDate(booking.checkIn)}</div>
                <div className={styles.detailSubtext}>After 3:00 PM</div>
              </div>
            </div>

            <div className={styles.detailItem}>
              <Calendar size={20} />
              <div>
                <div className={styles.detailLabel}>Check-out</div>
                <div className={styles.detailValue}>{formatDate(booking.checkOut)}</div>
                <div className={styles.detailSubtext}>Before 11:00 AM</div>
              </div>
            </div>

            <div className={styles.detailItem}>
              <Moon size={20} />
              <div>
                <div className={styles.detailLabel}>Nights</div>
                <div className={styles.detailValue}>{booking.nights}</div>
              </div>
            </div>

            <div className={styles.detailItem}>
              <Users size={20} />
              <div>
                <div className={styles.detailLabel}>Guests</div>
                <div className={styles.detailValue}>{booking.guests}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Payment Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={styles.section}
        >
          <h2 className={styles.sectionTitle}>Payment Summary</h2>
          <div className={styles.card}>
            <div className={styles.priceRow}>
              <span>Room rate ({booking.nights} nights)</span>
              <span>${(booking.total * 0.6).toFixed(0)}</span>
            </div>
            <div className={styles.priceRow}>
              <span>Taxes & fees</span>
              <span>${(booking.total * 0.15).toFixed(0)}</span>
            </div>
            <div className={styles.priceRow}>
              <span>Service fee</span>
              <span>${(booking.total * 0.05).toFixed(0)}</span>
            </div>
            <div className={styles.divider} />
            <div className={`${styles.priceRow} ${styles.total}`}>
              <span>Total</span>
              <span>${booking.total.toLocaleString()}</span>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        {booking.status === 'upcoming' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={styles.section}
          >
            <h2 className={styles.sectionTitle}>Booking Timeline</h2>
            <div className={styles.timeline}>
              <div className={`${styles.timelineItem} ${styles.completed}`}>
                <CheckCircle size={20} />
                <div>
                  <div className={styles.timelineTitle}>Booking Confirmed</div>
                  <div className={styles.timelineDate}>{formatDate(booking.createdAt)}</div>
                </div>
              </div>
              {booking.preCheckInCompleted && (
                <div className={`${styles.timelineItem} ${styles.completed}`}>
                  <CheckCircle size={20} />
                  <div>
                    <div className={styles.timelineTitle}>Pre-Check-In Completed</div>
                    <div className={styles.timelineDate}>Completed</div>
                  </div>
                </div>
              )}
              <div className={styles.timelineItem}>
                <Clock size={20} />
                <div>
                  <div className={styles.timelineTitle}>Check-In</div>
                  <div className={styles.timelineDate}>{formatDate(booking.checkIn)}</div>
                </div>
              </div>
              <div className={styles.timelineItem}>
                <Clock size={20} />
                <div>
                  <div className={styles.timelineTitle}>Check-Out</div>
                  <div className={styles.timelineDate}>{formatDate(booking.checkOut)}</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
