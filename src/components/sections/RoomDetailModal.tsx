import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ChevronLeft, ChevronRight, Bed, Maximize, Users, Eye,
  Check, Sparkles, Calendar, Minus, Plus
} from 'lucide-react';
import { Room } from '../../data/roomsData';
import styles from './RoomDetailModal.module.css';

interface RoomDetailModalProps {
  room: Room;
  onClose: () => void;
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({ room, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nights, setNights] = useState(3);
  const [guests, setGuests] = useState(2);

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: any } = { Bed, Maximize, Users, Eye };
    return icons[iconName] || Bed;
  };

  const subtotal = room.price * nights;
  const taxesAndFees = Math.round(subtotal * 0.15);
  const total = subtotal + taxesAndFees;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={styles.overlay}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25 }}
          className={styles.modal}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button className={styles.closeButton} onClick={onClose}>
            <X size={28} />
          </button>

          {/* Image Gallery Section */}
          <div className={styles.gallerySection}>
            <div className={styles.mainImageContainer}>
              <img
                src={room.images[currentImageIndex]}
                alt={`${room.name} - Image ${currentImageIndex + 1}`}
                className={styles.mainImage}
              />

              {/* Navigation Arrows */}
              <button
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={prevImage}
              >
                <ChevronLeft size={32} />
              </button>
              <button
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={nextImage}
              >
                <ChevronRight size={32} />
              </button>

              {/* Image Counter */}
              <div className={styles.imageCounter}>
                {currentImageIndex + 1} / {room.images.length}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className={styles.thumbnailGallery}>
              {room.images.map((image, index) => (
                <button
                  key={index}
                  className={`${styles.thumbnail} ${index === currentImageIndex ? styles.activeThumbnail : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Content Section */}
          <div className={styles.contentSection}>
            <div className={styles.mainContent}>
              {/* Category & Name */}
              <div className={styles.categoryBadge}>{room.category}</div>
              <h2 className={styles.roomName}>{room.name}</h2>

              {/* Quick Features */}
              <div className={styles.quickFeatures}>
                {room.features.map((feature, idx) => {
                  const Icon = getIcon(feature.icon);
                  return (
                    <div key={idx} className={styles.quickFeature}>
                      <Icon size={18} />
                      {feature.text}
                    </div>
                  );
                })}
              </div>

              {/* Full Description */}
              <div className={styles.descriptionSection}>
                {room.fullDescription.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* AI Features Callout */}
              {room.isAIRecommended && (
                <div className={styles.aiCallout}>
                  <Sparkles size={24} className={styles.aiIcon} />
                  <div>
                    <h4>AI-Recommended for You</h4>
                    <p>
                      Based on your preferences and booking history, this room is perfectly
                      suited for your stay. Our AI has optimized the rate to give you the
                      best value.
                    </p>
                  </div>
                </div>
              )}

              {/* Amenities Section */}
              <div className={styles.amenitiesSection}>
                <h3>Room Amenities</h3>
                <div className={styles.amenitiesGrid}>
                  {room.amenities.map((amenity, idx) => (
                    <div key={idx} className={styles.amenityItem}>
                      <Check size={16} className={styles.checkIcon} />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky Booking Card */}
            <div className={styles.bookingCard}>
              <div className={styles.bookingCardInner}>
                <div className={styles.priceDisplay}>
                  <div className={styles.fromLabel}>FROM</div>
                  <div className={styles.price}>
                    ${room.price}
                    <span className={styles.perNight}>/night</span>
                  </div>
                  <div className={styles.aiOptimized}>
                    <Sparkles size={14} />
                    AI-Optimized Rate
                  </div>
                </div>

                {/* Date Inputs */}
                <div className={styles.bookingInputs}>
                  <div className={styles.inputGroup}>
                    <label>Check-in</label>
                    <div className={styles.inputWrapper}>
                      <Calendar size={18} />
                      <input type="date" />
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Check-out</label>
                    <div className={styles.inputWrapper}>
                      <Calendar size={18} />
                      <input type="date" />
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Guests</label>
                    <div className={styles.guestsSelector}>
                      <button
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        disabled={guests <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span>{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                      <button
                        onClick={() => setGuests(Math.min(room.maxGuests, guests + 1))}
                        disabled={guests >= room.maxGuests}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Price Calculation */}
                <div className={styles.priceCalculation}>
                  <div className={styles.calcRow}>
                    <span>{nights} nights × ${room.price}</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className={styles.calcRow}>
                    <span>Taxes & fees</span>
                    <span>${taxesAndFees}</span>
                  </div>
                  <div className={`${styles.calcRow} ${styles.totalRow}`}>
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>

                {/* Book Button */}
                <button className={styles.bookButton}>BOOK NOW</button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
