import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ChevronRight, Bed, Maximize, Users, Eye, Check,
  Sparkles, Clock, Baby, Dog, Cigarette, XCircle, Star
} from 'lucide-react';
import { FixedAIChatBubble } from '../../components/sections/FixedAIChatBubble';
import { RoomImageGallery } from '../../components/sections/RoomImageGallery';
import { BookingWidget } from '../../components/sections/BookingWidget';
import { roomsData, Room } from '../../data/roomsData';
import styles from './RoomDetailPage.module.css';

export const RoomDetailPage: React.FC = () => {
  const { roomSlug } = useParams<{ roomSlug: string }>();
  const navigate = useNavigate();
  const [room, setRoom] = useState<Room | null>(null);

  useEffect(() => {
    // Find room by slug
    const foundRoom = roomsData.find(r => r.slug === roomSlug);
    if (foundRoom) {
      setRoom(foundRoom);
      // Update page title
      document.title = `${foundRoom.name} - Glimmora Hotel`;
    } else {
      // Room not found, redirect to rooms page
      navigate('/rooms');
    }
  }, [roomSlug, navigate]);

  if (!room) {
    return null; // or loading state
  }

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: any } = { Bed, Maximize, Users, Eye };
    return icons[iconName] || Bed;
  };

  // Get 3 similar rooms (same category or similar price range)
  const similarRooms = roomsData
    .filter(r => r.id !== room.id && (r.category === room.category || Math.abs(r.price - room.price) < 200))
    .slice(0, 3);

  return (
    <div className={styles.roomDetailPage}>

      {/* Breadcrumbs */}
      <div className={styles.breadcrumbContainer}>
        <div className={styles.breadcrumbWrapper}>
          <button className={styles.backButton} onClick={() => navigate('/rooms')}>
            <ArrowLeft size={20} />
            Back to Rooms
          </button>

          <nav className={styles.breadcrumbs}>
            <Link to="/" className={styles.breadcrumbLink}>Home</Link>
            <ChevronRight size={14} />
            <Link to="/rooms" className={styles.breadcrumbLink}>Rooms</Link>
            <ChevronRight size={14} />
            <span className={styles.breadcrumbCurrent}>{room.name}</span>
          </nav>
        </div>
      </div>

      {/* Image Gallery */}
      <RoomImageGallery images={room.images} roomName={room.name} />

      {/* Two-Column Content */}
      <div className={styles.mainContainer}>
        <div className={styles.contentWrapper}>
          {/* Left Column - Room Info */}
          <div className={styles.mainContent}>
            {/* Room Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={styles.roomHeader}
            >
              <div className={styles.categoryBadge}>{room.category}</div>
              <h1 className={styles.roomName}>{room.name}</h1>

              {/* Rating */}
              <div className={styles.ratingSection}>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill="#FFA500" stroke="none" />
                  ))}
                </div>
                <span className={styles.ratingScore}>4.8</span>
                <span className={styles.reviewCount}>(124 reviews)</span>
              </div>

              {/* Quick Features */}
              <div className={styles.quickFeatures}>
                {room.features.map((feature, idx) => {
                  const Icon = getIcon(feature.icon);
                  return (
                    <div key={idx} className={styles.quickFeature}>
                      <Icon size={20} />
                      {feature.text}
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <div className={styles.divider} />

            {/* AI Recommendation Callout */}
            {room.isAIRecommended && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={styles.aiCallout}
              >
                <Sparkles size={28} className={styles.aiIcon} />
                <div>
                  <h3 className={styles.aiTitle}>AI-Recommended for You</h3>
                  <p className={styles.aiText}>
                    Based on your preferences and booking history, this room offers the perfect
                    blend of luxury and comfort. Our AI has optimized the rate to give you the
                    best value - 15% below average market price.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Room Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={styles.descriptionSection}
            >
              <h2 className={styles.sectionTitle}>About This Room</h2>
              {room.fullDescription.map((paragraph, idx) => (
                <p key={idx} className={styles.descriptionText}>{paragraph}</p>
              ))}
            </motion.div>

            <div className={styles.divider} />

            {/* Amenities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={styles.amenitiesSection}
            >
              <h2 className={styles.sectionTitle}>Room Amenities</h2>
              <div className={styles.amenitiesGrid}>
                {room.amenities.map((amenity, idx) => (
                  <div key={idx} className={styles.amenityItem}>
                    <Check size={18} className={styles.checkIcon} />
                    {amenity}
                  </div>
                ))}
              </div>
            </motion.div>

            <div className={styles.divider} />

            {/* Room Policies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className={styles.policiesSection}
            >
              <h2 className={styles.sectionTitle}>Room Policies</h2>
              <div className={styles.policiesGrid}>
                <div className={styles.policyItem}>
                  <Clock size={24} className={styles.policyIcon} />
                  <div>
                    <div className={styles.policyTitle}>Check-in</div>
                    <div className={styles.policyDetails}>After 3:00 PM</div>
                  </div>
                </div>
                <div className={styles.policyItem}>
                  <Clock size={24} className={styles.policyIcon} />
                  <div>
                    <div className={styles.policyTitle}>Check-out</div>
                    <div className={styles.policyDetails}>Before 11:00 AM</div>
                  </div>
                </div>
                <div className={styles.policyItem}>
                  <Users size={24} className={styles.policyIcon} />
                  <div>
                    <div className={styles.policyTitle}>Max Occupancy</div>
                    <div className={styles.policyDetails}>{room.maxGuests} adults</div>
                  </div>
                </div>
                <div className={styles.policyItem}>
                  <Baby size={24} className={styles.policyIcon} />
                  <div>
                    <div className={styles.policyTitle}>Children</div>
                    <div className={styles.policyDetails}>Allowed</div>
                  </div>
                </div>
                <div className={styles.policyItem}>
                  <Dog size={24} className={styles.policyIcon} />
                  <div>
                    <div className={styles.policyTitle}>Pets</div>
                    <div className={styles.policyDetails}>Not allowed</div>
                  </div>
                </div>
                <div className={styles.policyItem}>
                  <Cigarette size={24} className={styles.policyIcon} />
                  <div>
                    <div className={styles.policyTitle}>Smoking</div>
                    <div className={styles.policyDetails}>Non-smoking</div>
                  </div>
                </div>
                <div className={styles.policyItem}>
                  <XCircle size={24} className={styles.policyIcon} />
                  <div>
                    <div className={styles.policyTitle}>Cancellation</div>
                    <div className={styles.policyDetails}>Free up to 48 hours before</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Sticky Booking Widget */}
          <div className={styles.bookingColumn}>
            <BookingWidget room={room} />
          </div>
        </div>
      </div>

      {/* Similar Rooms Section */}
      {similarRooms.length > 0 && (
        <div className={styles.similarRoomsSection}>
          <div className={styles.similarRoomsContainer}>
            <h2 className={styles.similarRoomsTitle}>You Might Also Like</h2>
            <div className={styles.similarRoomsGrid}>
              {similarRooms.map(similarRoom => (
                <motion.div
                  key={similarRoom.id}
                  className={styles.similarRoomCard}
                  whileHover={{ y: -8 }}
                  onClick={() => navigate(`/rooms/${similarRoom.slug}`)}
                >
                  <div className={styles.similarRoomImage}>
                    <img src={similarRoom.images[0]} alt={similarRoom.name} />
                  </div>
                  <div className={styles.similarRoomContent}>
                    <div className={styles.similarRoomCategory}>{similarRoom.category}</div>
                    <h3 className={styles.similarRoomName}>{similarRoom.name}</h3>
                    <p className={styles.similarRoomDescription}>{similarRoom.description}</p>
                    <div className={styles.similarRoomPrice}>
                      <span className={styles.similarRoomPriceAmount}>${similarRoom.price}</span>
                      <span className={styles.similarRoomPriceLabel}>/night</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      <FixedAIChatBubble />
    </div>
  );
};
