import React from 'react';
import { Bed, Maximize, Users, TrendingDown, ShieldCheck, MessageCircle, Phone } from 'lucide-react';
import { BookingData } from '../../contexts/BookingContext';
import styles from './BookingSummaryWidget.module.css';

interface BookingSummaryWidgetProps {
  bookingData: BookingData;
  showEditButton?: boolean;
  onEdit?: () => void;
}

export const BookingSummaryWidget: React.FC<BookingSummaryWidgetProps> = ({
  bookingData,
  showEditButton = false,
  onEdit
}) => {
  const { roomName, roomImage, roomCategory, checkIn, checkOut, guests, pricing } = bookingData;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className={styles.widget}>
      <div className={styles.widgetInner}>
        {/* Room Image */}
        <div className={styles.roomImage}>
          <img src={roomImage} alt={roomName} />
        </div>

        {/* Room Info */}
        <div className={styles.roomInfo}>
          <div className={styles.roomCategory}>{roomCategory}</div>
          <h3 className={styles.roomName}>{roomName}</h3>

          <div className={styles.quickFeatures}>
            <div className={styles.feature}>
              <Bed size={14} />
              King Bed
            </div>
            <div className={styles.feature}>
              <Maximize size={14} />
              450 sq ft
            </div>
            <div className={styles.feature}>
              <Users size={14} />
              {guests} Guests
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        {/* Booking Details */}
        <div className={styles.bookingDetails}>
          <div className={styles.detailRow}>
            <div>
              <div className={styles.detailLabel}>Check-in</div>
              <div className={styles.detailValue}>{formatDate(checkIn)}</div>
              <div className={styles.detailTime}>After 3:00 PM</div>
            </div>
            {showEditButton && onEdit && (
              <button onClick={onEdit} className={styles.editButton}>Edit</button>
            )}
          </div>

          <div className={styles.detailRow}>
            <div>
              <div className={styles.detailLabel}>Check-out</div>
              <div className={styles.detailValue}>{formatDate(checkOut)}</div>
              <div className={styles.detailTime}>Before 11:00 AM</div>
            </div>
          </div>

          <div className={styles.nightsGuests}>
            <div>{nights} {nights === 1 ? 'night' : 'nights'}</div>
            <div>{guests} {guests === 1 ? 'Guest' : 'Guests'}</div>
          </div>
        </div>

        <div className={styles.divider} />

        {/* Price Breakdown */}
        <div className={styles.priceBreakdown}>
          <div className={styles.priceRow}>
            <span>${pricing.basePrice} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
            <span>${pricing.subtotal}</span>
          </div>
          <div className={styles.priceRow}>
            <span>Cleaning fee</span>
            <span>${pricing.cleaningFee}</span>
          </div>
          <div className={styles.priceRow}>
            <span>Service fee</span>
            <span>${pricing.serviceFee}</span>
          </div>
          <div className={styles.priceRow}>
            <span>Taxes</span>
            <span>${pricing.taxes}</span>
          </div>
          <div className={styles.totalRow}>
            <span>Total</span>
            <span>${pricing.total}</span>
          </div>

          {pricing.savings && (
            <div className={styles.savingsBadge}>
              <TrendingDown size={14} />
              Save ${pricing.savings} vs OTAs
            </div>
          )}
        </div>

        <div className={styles.divider} />

        {/* Policies */}
        <div className={styles.policies}>
          <div className={styles.policyItem}>
            <ShieldCheck size={14} />
            <span>Free cancellation before {formatDate(new Date(checkInDate.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString())}</span>
          </div>
          <div className={styles.policyItem}>
            <ShieldCheck size={14} />
            <span>Secure payment via Stripe</span>
          </div>
        </div>

        <div className={styles.divider} />

        {/* Need Help */}
        <div className={styles.helpSection}>
          <div className={styles.helpTitle}>Need help?</div>
          <button className={styles.helpButton}>
            <MessageCircle size={18} />
            Chat with AI
          </button>
          <button className={styles.helpButton}>
            <Phone size={18} />
            Call +1 (555) 123-4567
          </button>
        </div>
      </div>
    </div>
  );
};
