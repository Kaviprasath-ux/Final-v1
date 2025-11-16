import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, Minus, Plus, Sparkles, Check, ShieldCheck, MessageCircle, Phone, TrendingDown } from 'lucide-react';
import { Room } from '../../data/roomsData';
import { useBooking, createBookingFromRoom } from '../../contexts/BookingContext';
import { useAuth } from '../../contexts/AuthContext';
import styles from './BookingWidget.module.css';

interface BookingWidgetProps {
  room: Room;
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({ room }) => {
  const navigate = useNavigate();
  const { setBookingData } = useBooking();
  const { isAuthenticated } = useAuth();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);

  // Calculate number of nights
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 3; // default
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 1;
  };

  const nights = calculateNights();
  const subtotal = room.price * nights;
  const cleaningFee = 50;
  const serviceFee = Math.round(subtotal * 0.05);
  const taxes = Math.round(subtotal * 0.15);
  const total = subtotal + cleaningFee + serviceFee + taxes;

  // Get tomorrow's date for min check-in
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minCheckIn = tomorrow.toISOString().split('T')[0];

  // Get min check-out (day after check-in)
  const minCheckOut = checkIn
    ? new Date(new Date(checkIn).getTime() + 86400000).toISOString().split('T')[0]
    : minCheckIn;

  const handleBookNow = () => {
    // Ensure dates are selected
    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }

    // Create booking data from current room and selections
    const bookingData = createBookingFromRoom(room, checkIn, checkOut, guests);
    setBookingData(bookingData);

    // Check authentication - redirect to login if needed, otherwise go to booking review
    if (!isAuthenticated) {
      navigate('/login?returnUrl=/booking/review');
    } else {
      navigate('/booking/review');
    }
  };

  return (
    <div className={styles.bookingWidget}>
      <div className={styles.bookingWidgetInner}>
        {/* Price Section */}
        <div className={styles.priceSection}>
          <div className={styles.priceMain}>
            <div className={styles.priceLabel}>FROM</div>
            <div className={styles.priceAmount}>
              ${room.price}
              <span className={styles.priceNight}>/night</span>
            </div>
          </div>
          <div className={styles.aiBadge}>
            <Sparkles size={12} />
            BEST RATE
          </div>
        </div>

        <div className={styles.savingsIndicator}>
          <TrendingDown size={14} />
          Save 15% vs OTAs
        </div>

        <div className={styles.divider} />

        {/* Date Inputs */}
        <div className={styles.dateInputs}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>CHECK-IN</label>
            <div className={styles.inputWrapper}>
              <Calendar size={18} className={styles.inputIcon} />
              <input
                type="date"
                value={checkIn}
                min={minCheckIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>CHECK-OUT</label>
            <div className={styles.inputWrapper}>
              <Calendar size={18} className={styles.inputIcon} />
              <input
                type="date"
                value={checkOut}
                min={minCheckOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>
        </div>

        {checkIn && checkOut && (
          <div className={styles.nightsCount}>{nights} {nights === 1 ? 'night' : 'nights'}</div>
        )}

        {/* Guests Selection */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>GUESTS</label>
          <div className={styles.guestsControl}>
            <button
              className={styles.guestButton}
              onClick={() => setGuests(Math.max(1, guests - 1))}
              disabled={guests <= 1}
            >
              <Minus size={16} />
            </button>
            <span className={styles.guestsValue}>
              {guests} {guests === 1 ? 'Guest' : 'Guests'}
            </span>
            <button
              className={styles.guestButton}
              onClick={() => setGuests(Math.min(room.maxGuests, guests + 1))}
              disabled={guests >= room.maxGuests}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        <div className={styles.divider} />

        {/* Price Breakdown */}
        <div className={styles.priceBreakdown}>
          <div className={styles.breakdownRow}>
            <span>${room.price} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
            <span>${subtotal}</span>
          </div>
          <div className={styles.breakdownRow}>
            <span>Cleaning fee</span>
            <span>${cleaningFee}</span>
          </div>
          <div className={styles.breakdownRow}>
            <span>Service fee</span>
            <span>${serviceFee}</span>
          </div>
          <div className={styles.breakdownRow}>
            <span>Taxes</span>
            <span>${taxes}</span>
          </div>
          <div className={styles.totalRow}>
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>

        {/* Book Now Button */}
        <button className={styles.bookButton} onClick={handleBookNow}>BOOK NOW</button>

        {/* Additional Info */}
        <div className={styles.bookingInfo}>
          <div className={styles.infoItem}>
            <ShieldCheck size={16} />
            You won't be charged yet
          </div>
          <div className={`${styles.infoItem} ${styles.successInfo}`}>
            <Check size={14} />
            Free cancellation before {checkIn || 'check-in'}
          </div>
        </div>

        <div className={styles.divider} />

        {/* Contact Options */}
        <div className={styles.contactSection}>
          <div className={styles.contactTitle}>Questions?</div>
          <button className={styles.contactButton}>
            <MessageCircle size={18} />
            Chat with AI Assistant
          </button>
          <button className={styles.contactButton}>
            <Phone size={18} />
            Call Front Desk
          </button>
        </div>
      </div>
    </div>
  );
};
