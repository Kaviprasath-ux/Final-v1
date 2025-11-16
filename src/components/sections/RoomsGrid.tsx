import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bed,
  Maximize,
  Eye,
  Users,
  Sparkles,
  Heart,
  Share2,
  Camera,
  Star,
  ArrowRight,
  Wifi,
  Tv,
  Coffee,
  Bath,
  Wind,
  BedDouble,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Room } from '../../data/roomsData';
import styles from './RoomsGrid.module.css';

interface RoomsGridProps {
  rooms: Room[];
}

export const RoomsGrid: React.FC<RoomsGridProps> = ({ rooms }) => {
  const navigate = useNavigate();
  const [wishlisted, setWishlisted] = useState<Set<string>>(new Set());
  const [galleryRoom, setGalleryRoom] = useState<Room | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (rooms.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyContent}>
          <div className={styles.emptyIcon}>🏨</div>
          <h3>No rooms available</h3>
          <p>Try adjusting your filters or dates to see more options</p>
        </div>
      </div>
    );
  }

  const toggleWishlist = (roomId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlisted(prev => {
      const newSet = new Set(prev);
      if (newSet.has(roomId)) {
        newSet.delete(roomId);
      } else {
        newSet.add(roomId);
      }
      return newSet;
    });
  };

  const openGallery = (room: Room, e: React.MouseEvent) => {
    e.stopPropagation();
    setGalleryRoom(room);
    setCurrentImageIndex(0);
  };

  const closeGallery = () => {
    setGalleryRoom(null);
    setCurrentImageIndex(0);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (galleryRoom) {
      setCurrentImageIndex((prev) => (prev + 1) % galleryRoom.images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (galleryRoom) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? galleryRoom.images.length - 1 : prev - 1
      );
    }
  };

  const getIconForAmenity = (amenity: string) => {
    const lower = amenity.toLowerCase();
    if (lower.includes('wifi')) return <Wifi size={20} />;
    if (lower.includes('tv')) return <Tv size={20} />;
    if (lower.includes('coffee') || lower.includes('nespresso')) return <Coffee size={20} />;
    if (lower.includes('bath') || lower.includes('shower')) return <Bath size={20} />;
    if (lower.includes('air conditioning') || lower.includes('ac')) return <Wind size={20} />;
    return null;
  };

  const getAvailabilityColor = (availability: Room['availability']) => {
    switch (availability) {
      case 'HIGH':
        return '#27AE60';
      case 'MEDIUM':
        return '#FFA500';
      case 'LOW':
        return '#DC3545';
      default:
        return '#808080';
    }
  };

  const calculateSavings = (original: number, current: number) => {
    const savings = ((original - current) / original) * 100;
    return Math.round(savings);
  };

  return (
    <div className={styles.gridContainer}>
      <div className={styles.grid}>
        {rooms.map((room, index) => {
          const isWishlisted = wishlisted.has(room.id);
          const hasDiscount = room.originalPrice && room.originalPrice > room.price;
          const savings = hasDiscount ? calculateSavings(room.originalPrice!, room.price) : 0;

          return (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={styles.roomCard}
            >
              {/* Image Section */}
              <div className={styles.imageSection}>
                <div className={styles.imageContainer}>
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className={styles.roomImage}
                    onClick={() => navigate(`/rooms/${room.slug}`)}
                  />

                  {/* Image Overlay on Hover */}
                  <div className={styles.imageOverlay} />
                </div>

                {/* Top-Left Badges */}
                <div className={styles.topLeftBadges}>
                  {room.isAIRecommended && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className={styles.aiRecommendedBadge}
                    >
                      <Sparkles size={14} />
                      AI-Recommended
                    </motion.div>
                  )}

                  {room.specialOffer?.type === 'BEST_VALUE' && (
                    <div className={styles.bestValueBadge}>
                      BEST VALUE
                    </div>
                  )}

                  {room.availability === 'LOW' && (
                    <div className={styles.availabilityBadge}>
                      Only 2 left!
                    </div>
                  )}
                </div>

                {/* Top-Right Actions */}
                <div className={styles.topRightActions}>
                  <button
                    className={`${styles.iconButton} ${isWishlisted ? styles.wishlisted : ''}`}
                    onClick={(e) => toggleWishlist(room.id, e)}
                    aria-label="Add to wishlist"
                  >
                    <Heart
                      size={18}
                      fill={isWishlisted ? '#DC3545' : 'transparent'}
                      color={isWishlisted ? '#DC3545' : '#5C5C5C'}
                    />
                  </button>

                  <button
                    className={styles.iconButton}
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Share"
                  >
                    <Share2 size={18} />
                  </button>
                </div>

                {/* Bottom-Left Image Counter */}
                <div className={styles.imageCounter}>
                  <Camera size={14} />
                  <span>1 / {room.images.length}</span>
                </div>

                {/* Bottom-Right Gallery Button */}
                <button
                  className={styles.viewGalleryButton}
                  onClick={(e) => openGallery(room, e)}
                >
                  <Camera size={14} />
                  View Gallery
                </button>
              </div>

              {/* Content Section */}
              <div className={styles.contentSection}>
                {/* Header Row */}
                <div className={styles.headerRow}>
                  <div className={styles.categoryBadge}>{room.category}</div>

                  {room.rating && (
                    <div className={styles.ratingSection}>
                      <div className={styles.stars}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill={i < Math.round(room.rating!.score) ? '#FFA500' : 'none'}
                            color="#FFA500"
                          />
                        ))}
                      </div>
                      <span className={styles.ratingScore}>{room.rating.score}</span>
                      <span className={styles.reviewCount}>({room.rating.count})</span>
                    </div>
                  )}
                </div>

                {/* Room Name */}
                <h3
                  className={styles.roomName}
                  onClick={() => navigate(`/rooms/${room.slug}`)}
                >
                  {room.name}
                </h3>

                {/* Description */}
                <p className={styles.roomDescription}>{room.description}</p>

                {/* Amenities Row */}
                <div className={styles.amenitiesRow}>
                  {room.amenities.slice(0, 5).map((amenity, idx) => {
                    const icon = getIconForAmenity(amenity);
                    if (!icon) return null;

                    return (
                      <div key={idx} className={styles.amenityIcon} title={amenity}>
                        {icon}
                        <span className={styles.amenityLabel}>
                          {amenity.split(' ')[0]}
                        </span>
                      </div>
                    );
                  }).filter(Boolean).slice(0, 5)}

                  {room.amenities.length > 5 && (
                    <div className={styles.moreAmenities}>
                      +{room.amenities.length - 5}
                    </div>
                  )}
                </div>

                {/* Features Grid */}
                <div className={styles.featuresGrid}>
                  <div className={styles.featureItem}>
                    <BedDouble size={16} />
                    <span>{room.bedType}</span>
                  </div>
                  <div className={styles.featureItem}>
                    <Maximize size={16} />
                    <span>{room.size} sq ft</span>
                  </div>
                  <div className={styles.featureItem}>
                    <Eye size={16} />
                    <span>{room.viewType}</span>
                  </div>
                </div>

                {/* Divider */}
                <div className={styles.divider} />

                {/* Footer (Price + Actions) */}
                <div className={styles.footer}>
                  <div className={styles.priceSection}>
                    {hasDiscount && (
                      <div className={styles.originalPrice}>${room.originalPrice}</div>
                    )}

                    <div className={styles.priceRow}>
                      <div className={styles.currentPrice}>${room.price}</div>
                      <div className={styles.availabilityDot}>
                        <div
                          className={styles.dot}
                          style={{ backgroundColor: getAvailabilityColor(room.availability) }}
                        />
                      </div>
                    </div>

                    <div className={styles.perNightLabel}>per night</div>

                    {hasDiscount && (
                      <div className={styles.savingsBadge}>Save {savings}%</div>
                    )}
                  </div>

                  <div className={styles.actionButtons}>
                    <button
                      className={styles.viewDetailsButton}
                      onClick={() => navigate(`/rooms/${room.slug}`)}
                    >
                      View Details
                    </button>

                    <button
                      className={styles.bookNowButton}
                      onClick={() => navigate(`/rooms/${room.slug}`)}
                    >
                      BOOK NOW
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Image Gallery Modal */}
      <AnimatePresence>
        {galleryRoom && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeGallery}
          >
            <motion.div
              className={styles.galleryModal}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button className={styles.closeButton} onClick={closeGallery}>
                <X size={24} />
              </button>

              {/* Image Display */}
              <div className={styles.galleryImageContainer}>
                <img
                  src={galleryRoom.images[currentImageIndex]}
                  alt={`${galleryRoom.name} - Image ${currentImageIndex + 1}`}
                  className={styles.galleryImage}
                />

                {/* Navigation Buttons */}
                <button className={styles.prevButton} onClick={prevImage}>
                  <ChevronLeft size={32} />
                </button>

                <button className={styles.nextButton} onClick={nextImage}>
                  <ChevronRight size={32} />
                </button>

                {/* Image Counter */}
                <div className={styles.galleryCounter}>
                  {currentImageIndex + 1} / {galleryRoom.images.length}
                </div>
              </div>

              {/* Thumbnails */}
              <div className={styles.thumbnailsContainer}>
                {galleryRoom.images.map((image, idx) => (
                  <div
                    key={idx}
                    className={`${styles.thumbnail} ${idx === currentImageIndex ? styles.activeThumbnail : ''}`}
                    onClick={() => setCurrentImageIndex(idx)}
                  >
                    <img src={image} alt={`Thumbnail ${idx + 1}`} />
                  </div>
                ))}
              </div>

              {/* Room Info */}
              <div className={styles.galleryRoomInfo}>
                <h2>{galleryRoom.name}</h2>
                <p>{galleryRoom.description}</p>
                <button
                  className={styles.galleryBookButton}
                  onClick={() => {
                    closeGallery();
                    navigate(`/rooms/${galleryRoom.slug}`);
                  }}
                >
                  View Details & Book
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
