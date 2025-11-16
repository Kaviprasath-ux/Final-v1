import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Bed, Key, AlertCircle, CheckCircle } from 'lucide-react';
import styles from './PreCheckInPortal.module.css';

interface Booking {
  id: string;
  bookingReference: string;
  roomName: string;
  roomType: string;
  checkIn: string; // ISO date string
  checkOut: string;
  guests: number;
  bedType: string;
  assignedRoom?: string;
  preCheckInStatus: 'not_eligible' | 'eligible' | 'completed';
  preCheckInOpenDate?: string; // ISO date string - when pre-check-in becomes available
  digitalKey?: {
    qrCode: string;
    nfcEnabled: boolean;
  };
}

// Mock booking data
const MOCK_BOOKINGS: Booking[] = [
  {
    id: '1',
    bookingReference: 'GLM-2024-12345',
    roomName: 'Ocean View Suite',
    roomType: 'SUITE',
    checkIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    checkOut: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    guests: 2,
    bedType: 'King Bed',
    assignedRoom: '504',
    preCheckInStatus: 'eligible',
    preCheckInOpenDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    bookingReference: 'GLM-2024-67890',
    roomName: 'Deluxe Garden Room',
    roomType: 'DELUXE',
    checkIn: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
    checkOut: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    guests: 2,
    bedType: 'Queen Bed',
    preCheckInStatus: 'not_eligible',
    preCheckInOpenDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(), // Opens in 8 days
  },
  {
    id: '3',
    bookingReference: 'GLM-2024-11111',
    roomName: 'Presidential Penthouse',
    roomType: 'PENTHOUSE',
    checkIn: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
    checkOut: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    guests: 4,
    bedType: 'King Bed',
    assignedRoom: '1201',
    preCheckInStatus: 'completed',
    preCheckInOpenDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    digitalKey: {
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=GLM-KEY-1201',
      nfcEnabled: true,
    },
  },
];

interface EligibleCardProps {
  booking: Booking;
  onStartPreCheckIn: () => void;
}

const EligibleCard: React.FC<EligibleCardProps> = ({ booking, onStartPreCheckIn }) => {
  const checkInDate = new Date(booking.checkIn);
  const formattedCheckIn = checkInDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const formattedTime = checkInDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <motion.div
      className={styles.eligibleCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.cardHeader}>
        <div className={styles.statusBadge}>
          <CheckCircle size={16} />
          <span>Ready for Pre-Check-In</span>
        </div>
        <div className={styles.bookingRef}>{booking.bookingReference}</div>
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.roomName}>{booking.roomName}</h3>
        <div className={styles.roomType}>{booking.roomType}</div>

        <div className={styles.bookingDetails}>
          <div className={styles.detailItem}>
            <Calendar size={18} />
            <div>
              <div className={styles.detailLabel}>Check-In</div>
              <div className={styles.detailValue}>{formattedCheckIn}</div>
              <div className={styles.detailSubValue}>After {formattedTime}</div>
            </div>
          </div>

          <div className={styles.detailItem}>
            <Users size={18} />
            <div>
              <div className={styles.detailLabel}>Guests</div>
              <div className={styles.detailValue}>{booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}</div>
            </div>
          </div>

          <div className={styles.detailItem}>
            <Bed size={18} />
            <div>
              <div className={styles.detailLabel}>Bed Type</div>
              <div className={styles.detailValue}>{booking.bedType}</div>
            </div>
          </div>

          {booking.assignedRoom && (
            <div className={styles.detailItem}>
              <Key size={18} />
              <div>
                <div className={styles.detailLabel}>Room Number</div>
                <div className={styles.detailValue}>Room {booking.assignedRoom}</div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.benefitsSection}>
          <div className={styles.benefitsTitle}>Pre-Check-In Benefits:</div>
          <ul className={styles.benefitsList}>
            <li><CheckCircle size={14} /> Skip the front desk on arrival</li>
            <li><CheckCircle size={14} /> Digital room key delivered to your phone</li>
            <li><CheckCircle size={14} /> Customize room preferences</li>
            <li><CheckCircle size={14} /> Estimated time: 3-5 minutes</li>
          </ul>
        </div>

        <button className={styles.startButton} onClick={onStartPreCheckIn}>
          START PRE-CHECK-IN
        </button>
      </div>
    </motion.div>
  );
};

interface NotYetEligibleCardProps {
  booking: Booking;
}

const NotYetEligibleCard: React.FC<NotYetEligibleCardProps> = ({ booking }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (!booking.preCheckInOpenDate) return '';

      const now = new Date().getTime();
      const openDate = new Date(booking.preCheckInOpenDate).getTime();
      const diff = openDate - now;

      if (diff <= 0) return 'Available now';

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        return `${days}d ${hours}h`;
      } else if (hours > 0) {
        return `${hours}h ${minutes}m`;
      } else {
        return `${minutes}m`;
      }
    };

    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [booking.preCheckInOpenDate]);

  const checkInDate = new Date(booking.checkIn);
  const openDate = booking.preCheckInOpenDate ? new Date(booking.preCheckInOpenDate) : null;

  return (
    <motion.div
      className={styles.notEligibleCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.cardHeader}>
        <div className={`${styles.statusBadge} ${styles.pendingBadge}`}>
          <Clock size={16} />
          <span>Pre-Check-In Opens Soon</span>
        </div>
        <div className={styles.bookingRef}>{booking.bookingReference}</div>
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.roomName}>{booking.roomName}</h3>
        <div className={styles.roomType}>{booking.roomType}</div>

        <div className={styles.countdownSection}>
          <div className={styles.countdownLabel}>Available in:</div>
          <div className={styles.countdownTimer}>
            <Clock size={32} />
            <span className={styles.countdownValue}>{timeLeft}</span>
          </div>
          {openDate && (
            <div className={styles.openDate}>
              Opens on {openDate.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
              })} at {openDate.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
              })}
            </div>
          )}
        </div>

        <div className={styles.bookingDetails}>
          <div className={styles.detailItem}>
            <Calendar size={18} />
            <div>
              <div className={styles.detailLabel}>Check-In</div>
              <div className={styles.detailValue}>
                {checkInDate.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
            </div>
          </div>

          <div className={styles.detailItem}>
            <Users size={18} />
            <div>
              <div className={styles.detailLabel}>Guests</div>
              <div className={styles.detailValue}>{booking.guests}</div>
            </div>
          </div>

          <div className={styles.detailItem}>
            <Bed size={18} />
            <div>
              <div className={styles.detailLabel}>Bed Type</div>
              <div className={styles.detailValue}>{booking.bedType}</div>
            </div>
          </div>
        </div>

        <div className={styles.notificationToggle}>
          <input
            type="checkbox"
            id={`notify-${booking.id}`}
            checked={notificationsEnabled}
            onChange={(e) => setNotificationsEnabled(e.target.checked)}
          />
          <label htmlFor={`notify-${booking.id}`}>
            Notify me when pre-check-in is available
          </label>
        </div>

        <div className={styles.infoBox}>
          <AlertCircle size={18} />
          <div>
            <strong>Pre-check-in opens 24-48 hours before your arrival.</strong>
            <p>You'll receive an email and SMS notification when it's ready.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface CompletedCardProps {
  booking: Booking;
}

const CompletedCard: React.FC<CompletedCardProps> = ({ booking }) => {
  const checkInDate = new Date(booking.checkIn);

  return (
    <motion.div
      className={styles.completedCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.cardHeader}>
        <div className={`${styles.statusBadge} ${styles.completedBadge}`}>
          <CheckCircle size={16} />
          <span>Pre-Check-In Complete</span>
        </div>
        <div className={styles.bookingRef}>{booking.bookingReference}</div>
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.roomName}>{booking.roomName}</h3>
        <div className={styles.roomType}>{booking.roomType}</div>

        <div className={styles.digitalKeyCard}>
          <div className={styles.keyCardHeader}>
            <Key size={24} />
            <div>
              <div className={styles.keyCardTitle}>Digital Room Key</div>
              <div className={styles.keyCardSubtitle}>Room {booking.assignedRoom}</div>
            </div>
          </div>

          {booking.digitalKey && (
            <div className={styles.keyCardBody}>
              <div className={styles.qrCodeSection}>
                <img
                  src={booking.digitalKey.qrCode}
                  alt="Digital Room Key QR Code"
                  className={styles.qrCode}
                />
                <div className={styles.qrLabel}>Scan at door to unlock</div>
              </div>

              {booking.digitalKey.nfcEnabled && (
                <div className={styles.nfcBadge}>
                  <div className={styles.nfcIcon}>NFC</div>
                  <div className={styles.nfcText}>Tap phone on door lock to unlock</div>
                </div>
              )}
            </div>
          )}

          <div className={styles.keyCardFooter}>
            <div className={styles.validityInfo}>
              <strong>Active from:</strong> {checkInDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })} at {checkInDate.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
              })}
            </div>
          </div>
        </div>

        <div className={styles.howToUse}>
          <div className={styles.howToTitle}>How to use your digital key:</div>
          <ol className={styles.howToSteps}>
            <li>Open this page on your phone when you arrive</li>
            <li>Scan the QR code at your room door OR tap your phone on the NFC reader</li>
            <li>Door will unlock automatically - no check-in desk needed!</li>
          </ol>
        </div>

        <div className={styles.bookingDetails}>
          <div className={styles.detailItem}>
            <Calendar size={18} />
            <div>
              <div className={styles.detailLabel}>Check-In</div>
              <div className={styles.detailValue}>
                {checkInDate.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </div>
            </div>
          </div>

          <div className={styles.detailItem}>
            <Users size={18} />
            <div>
              <div className={styles.detailLabel}>Guests</div>
              <div className={styles.detailValue}>{booking.guests}</div>
            </div>
          </div>

          <div className={styles.detailItem}>
            <Bed size={18} />
            <div>
              <div className={styles.detailLabel}>Bed Type</div>
              <div className={styles.detailValue}>{booking.bedType}</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const EmptyState: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className={styles.emptyState}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.emptyIcon}>
        <Calendar size={64} />
      </div>
      <h3 className={styles.emptyTitle}>No Upcoming Bookings</h3>
      <p className={styles.emptyDescription}>
        You don't have any upcoming reservations. Pre-check-in is available 24-48 hours before your check-in date for confirmed bookings.
      </p>
      <button className={styles.browseRoomsButton} onClick={() => navigate('/rooms')}>
        BROWSE ROOMS
      </button>
    </motion.div>
  );
};

const PreCheckInPortal: React.FC = () => {
  const navigate = useNavigate();
  const [bookings] = useState<Booking[]>(MOCK_BOOKINGS);

  // Categorize bookings by status
  const eligibleBookings = bookings.filter(b => b.preCheckInStatus === 'eligible');
  const notEligibleBookings = bookings.filter(b => b.preCheckInStatus === 'not_eligible');
  const completedBookings = bookings.filter(b => b.preCheckInStatus === 'completed');

  const handleStartPreCheckIn = (bookingId: string) => {
    navigate(`/pre-check-in/${bookingId}`);
  };

  return (
    <div className={styles.preCheckInPortal}>
      <div className={styles.pageHeader}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.headerBadge}>
            <Key size={20} />
            <span>PRE-CHECK-IN</span>
          </div>
          <h1 className={styles.pageTitle}>Pre-Check-In Portal</h1>
          <p className={styles.pageSubtitle}>
            Complete your check-in online and skip the front desk. Get your digital room key delivered instantly.
          </p>
        </motion.div>
      </div>

      {bookings.length === 0 ? (
        <EmptyState />
      ) : (
        <div className={styles.bookingsContainer}>
          {/* Eligible Bookings Section */}
          {eligibleBookings.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Ready for Pre-Check-In</h2>
                <div className={styles.sectionCount}>{eligibleBookings.length}</div>
              </div>
              <div className={styles.bookingsGrid}>
                {eligibleBookings.map(booking => (
                  <EligibleCard
                    key={booking.id}
                    booking={booking}
                    onStartPreCheckIn={() => handleStartPreCheckIn(booking.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Completed Bookings Section */}
          {completedBookings.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Pre-Check-In Complete</h2>
                <div className={styles.sectionCount}>{completedBookings.length}</div>
              </div>
              <div className={styles.bookingsGrid}>
                {completedBookings.map(booking => (
                  <CompletedCard key={booking.id} booking={booking} />
                ))}
              </div>
            </div>
          )}

          {/* Not Yet Eligible Bookings Section */}
          {notEligibleBookings.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Upcoming Bookings</h2>
                <div className={styles.sectionCount}>{notEligibleBookings.length}</div>
              </div>
              <div className={styles.bookingsGrid}>
                {notEligibleBookings.map(booking => (
                  <NotYetEligibleCard key={booking.id} booking={booking} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PreCheckInPortal;
