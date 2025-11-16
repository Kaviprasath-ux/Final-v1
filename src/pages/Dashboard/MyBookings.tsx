import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Search,
  SlidersHorizontal,
  CalendarCheck,
  CalendarX,
  Moon,
  Users,
  BedDouble,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Check,
  ClipboardCheck,
  Edit,
  MoreHorizontal,
  Trash,
  Download,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './MyBookings.module.css';

// Mock booking data
const mockBookings = [
  {
    id: '1',
    reference: 'GLM-2024-12345',
    status: 'confirmed',
    roomName: 'Deluxe Ocean View Suite',
    roomType: 'Suite',
    checkIn: '2024-12-25',
    checkOut: '2024-12-28',
    nights: 3,
    guests: 2,
    bedType: 'King Bed',
    totalPrice: 1299.00,
    imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400',
    preCheckInEligible: true,
    canCancel: true,
    cancellationFee: 0,
    cancellationDeadline: '2024-12-20',
  },
  {
    id: '2',
    reference: 'GLM-2024-12346',
    status: 'completed',
    roomName: 'Standard Room',
    roomType: 'Standard',
    checkIn: '2024-11-01',
    checkOut: '2024-11-05',
    nights: 4,
    guests: 1,
    bedType: 'Queen Bed',
    totalPrice: 899.00,
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400',
    preCheckInEligible: false,
    canCancel: false,
  },
  {
    id: '3',
    reference: 'GLM-2024-12347',
    status: 'cancelled',
    roomName: 'Junior Suite',
    roomType: 'Suite',
    checkIn: '2024-10-15',
    checkOut: '2024-10-18',
    nights: 3,
    guests: 2,
    bedType: 'King Bed',
    totalPrice: 1099.00,
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400',
    cancellationDate: '2024-10-10',
    refundAmount: 1049.00,
    canCancel: false,
  },
  {
    id: '4',
    reference: 'GLM-2025-00001',
    status: 'confirmed',
    roomName: 'Presidential Penthouse',
    roomType: 'Penthouse',
    checkIn: '2025-01-15',
    checkOut: '2025-01-20',
    nights: 5,
    guests: 4,
    bedType: '2 King Beds',
    totalPrice: 3499.00,
    imageUrl: 'https://images.unsplash.com/photo-1596178060810-9a65a34c3b11?w=400',
    preCheckInEligible: false,
    canCancel: true,
    cancellationFee: 50,
    cancellationDeadline: '2025-01-10',
  },
];

type FilterTab = 'all' | 'upcoming' | 'past' | 'cancelled';
type SortOption = 'newest' | 'oldest' | 'checkin-asc' | 'checkin-desc' | 'price-high' | 'price-low';

interface CancelModalProps {
  booking: typeof mockBookings[0];
  onClose: () => void;
  onConfirm: () => void;
}

const CancelModal: React.FC<CancelModalProps> = ({ booking, onClose, onConfirm }) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <motion.div
      className={styles.modalOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.modal}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalIcon}>
          <AlertTriangle size={48} color="#FFA500" />
        </div>
        <h2 className={styles.modalTitle}>Cancel Booking?</h2>
        <p className={styles.modalMessage}>
          Are you sure you want to cancel this booking?
        </p>

        <div className={styles.bookingSummary}>
          <div className={styles.summaryItem}>
            <strong>{booking.roomName}</strong>
          </div>
          <div className={styles.summaryItem}>
            {new Date(booking.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(booking.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
          <div className={styles.summaryItem}>Booking #{booking.reference}</div>
        </div>

        <div className={styles.cancellationPolicy}>
          <Info size={16} />
          <div>
            {booking.cancellationFee === 0 ? (
              <span>Free cancellation until {new Date(booking.cancellationDeadline || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            ) : (
              <span>Cancellation fee: ${booking.cancellationFee.toFixed(2)} (non-refundable)</span>
            )}
          </div>
        </div>

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <label htmlFor="agree">I understand the cancellation policy</label>
        </div>

        <div className={styles.modalButtons}>
          <button className={styles.keepButton} onClick={onClose}>
            Keep Booking
          </button>
          <button
            className={styles.cancelButton}
            onClick={onConfirm}
            disabled={!agreed}
          >
            Yes, Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const MyBookings: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<typeof mockBookings[0] | null>(null);

  const tabs: { key: FilterTab; label: string }[] = [
    { key: 'all', label: 'All Bookings' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'past', label: 'Past' },
    { key: 'cancelled', label: 'Cancelled' },
  ];

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'checkin-asc', label: 'Check-in Date (Ascending)' },
    { value: 'checkin-desc', label: 'Check-in Date (Descending)' },
    { value: 'price-high', label: 'Price (High to Low)' },
    { value: 'price-low', label: 'Price (Low to High)' },
  ];

  const getFilteredBookings = () => {
    let filtered = mockBookings;

    // Filter by tab
    if (activeTab === 'upcoming') {
      filtered = filtered.filter(b => b.status === 'confirmed' && new Date(b.checkIn) > new Date());
    } else if (activeTab === 'past') {
      filtered = filtered.filter(b => b.status === 'completed');
    } else if (activeTab === 'cancelled') {
      filtered = filtered.filter(b => b.status === 'cancelled');
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(b =>
        b.reference.toLowerCase().includes(query) ||
        b.roomName.toLowerCase().includes(query) ||
        b.checkIn.includes(query) ||
        b.checkOut.includes(query)
      );
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime();
        case 'oldest':
          return new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime();
        case 'checkin-asc':
          return new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime();
        case 'checkin-desc':
          return new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime();
        case 'price-high':
          return b.totalPrice - a.totalPrice;
        case 'price-low':
          return a.totalPrice - b.totalPrice;
        default:
          return 0;
      }
    });

    return sorted;
  };

  const filteredBookings = getFilteredBookings();

  const getTabCount = (tab: FilterTab) => {
    if (tab === 'all') return mockBookings.length;
    if (tab === 'upcoming') return mockBookings.filter(b => b.status === 'confirmed' && new Date(b.checkIn) > new Date()).length;
    if (tab === 'past') return mockBookings.filter(b => b.status === 'completed').length;
    if (tab === 'cancelled') return mockBookings.filter(b => b.status === 'cancelled').length;
    return 0;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <div className={`${styles.statusBadge} ${styles.statusConfirmed}`}>
            <CheckCircle size={14} />
            <span>CONFIRMED</span>
          </div>
        );
      case 'completed':
        return (
          <div className={`${styles.statusBadge} ${styles.statusCompleted}`}>
            <Check size={14} />
            <span>COMPLETED</span>
          </div>
        );
      case 'cancelled':
        return (
          <div className={`${styles.statusBadge} ${styles.statusCancelled}`}>
            <XCircle size={14} />
            <span>CANCELLED</span>
          </div>
        );
      default:
        return null;
    }
  };

  const handleCancelBooking = (booking: typeof mockBookings[0]) => {
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };

  const confirmCancellation = () => {
    console.log('Booking cancelled:', selectedBooking?.id);
    setShowCancelModal(false);
    setSelectedBooking(null);
  };

  return (
    <div className={styles.myBookings}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>My Bookings</h1>
        <p className={styles.pageSubtitle}>Manage all your reservations</p>
      </div>

      {/* Filter Tabs */}
      <div className={styles.filterTabsContainer}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`${styles.filterTab} ${activeTab === tab.key ? styles.filterTabActive : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
            <span className={`${styles.tabBadge} ${activeTab === tab.key ? styles.tabBadgeActive : ''}`}>
              {getTabCount(tab.key)}
            </span>
          </button>
        ))}
      </div>

      {/* Search & Sort Bar */}
      <div className={styles.searchSortBar}>
        <div className={styles.searchInputContainer}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search by booking reference, room, or date..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.sortDropdown}>
          <SlidersHorizontal size={18} />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className={styles.sortSelect}
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <motion.div
          className={styles.emptyState}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Calendar size={80} color="#E8E4E0" />
          <h3 className={styles.emptyTitle}>No bookings found</h3>
          <p className={styles.emptyDescription}>
            {searchQuery
              ? 'Try adjusting your search criteria'
              : activeTab === 'upcoming'
              ? 'No upcoming stays'
              : activeTab === 'past'
              ? 'No past bookings'
              : activeTab === 'cancelled'
              ? 'No cancelled bookings'
              : 'You haven\'t made any reservations yet'}
          </p>
          {!searchQuery && activeTab === 'all' && (
            <button className={styles.browseButton} onClick={() => navigate('/rooms')}>
              BROWSE ROOMS
            </button>
          )}
        </motion.div>
      ) : (
        <div className={styles.bookingsList}>
          {filteredBookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              className={styles.bookingCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {/* Room Image */}
              <div className={styles.cardImage}>
                <img src={booking.imageUrl} alt={booking.roomName} />
                {getStatusBadge(booking.status)}
              </div>

              {/* Booking Details */}
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <span className={styles.bookingRef}>Booking #{booking.reference}</span>
                </div>

                <h3 className={styles.roomName}>{booking.roomName}</h3>

                <div className={styles.detailsGrid}>
                  <div className={styles.detailRow}>
                    <div className={styles.detailLabel}>CHECK-IN</div>
                    <div className={styles.detailValue}>
                      <CalendarCheck size={16} />
                      {new Date(booking.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>

                  <div className={styles.detailRow}>
                    <div className={styles.detailLabel}>CHECK-OUT</div>
                    <div className={styles.detailValue}>
                      <CalendarX size={16} />
                      {new Date(booking.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>

                  <div className={styles.detailRow}>
                    <div className={styles.detailLabel}>NIGHTS</div>
                    <div className={styles.detailValue}>
                      <Moon size={16} />
                      {booking.nights} nights
                    </div>
                  </div>

                  <div className={styles.detailRow}>
                    <div className={styles.detailLabel}>GUESTS</div>
                    <div className={styles.detailValue}>
                      <Users size={16} />
                      {booking.guests} {booking.guests === 1 ? 'Adult' : 'Adults'}
                    </div>
                  </div>

                  <div className={styles.detailRow}>
                    <div className={styles.detailLabel}>BED TYPE</div>
                    <div className={styles.detailValue}>
                      <BedDouble size={16} />
                      {booking.bedType}
                    </div>
                  </div>

                  <div className={styles.detailRow}>
                    <div className={styles.detailLabel}>TOTAL</div>
                    <div className={styles.detailValue}>
                      <DollarSign size={16} />
                      ${booking.totalPrice.toFixed(2)}
                    </div>
                  </div>
                </div>

                {booking.status === 'confirmed' && new Date(booking.checkIn) > new Date() && (
                  <div className={styles.countdownBanner}>
                    <Clock size={18} color="#FFA500" />
                    <span>Check-in in {Math.ceil((new Date(booking.checkIn).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className={styles.cardActions}>
                {booking.status === 'confirmed' && booking.preCheckInEligible && (
                  <button
                    className={styles.primaryAction}
                    onClick={() => navigate('/dashboard/pre-check-in')}
                  >
                    <ClipboardCheck size={16} />
                    Pre Check-In
                  </button>
                )}

                <button
                  className={styles.secondaryAction}
                  onClick={() => navigate(`/dashboard/bookings/${booking.id}`)}
                >
                  View Details
                </button>

                {booking.canCancel && (
                  <button className={styles.modifyAction}>
                    <Edit size={16} />
                    Modify
                  </button>
                )}

                <div className={styles.moreMenu}>
                  <button className={styles.moreButton}>
                    <MoreHorizontal size={16} />
                    More Options
                  </button>
                </div>

                {booking.canCancel && (
                  <button
                    className={styles.cancelAction}
                    onClick={() => handleCancelBooking(booking)}
                  >
                    <Trash size={14} />
                    Cancel Booking
                  </button>
                )}

                {booking.status === 'completed' && (
                  <button className={styles.downloadAction}>
                    <Download size={14} />
                    Download Receipt
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Cancel Modal */}
      <AnimatePresence>
        {showCancelModal && selectedBooking && (
          <CancelModal
            booking={selectedBooking}
            onClose={() => {
              setShowCancelModal(false);
              setSelectedBooking(null);
            }}
            onConfirm={confirmCancellation}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyBookings;
