import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check, Bed, Maximize, Eye, Wifi, Coffee, Waves, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePreCheckIn } from '../../contexts/PreCheckInContext';
import type { RoomSelection } from '../../contexts/PreCheckInContext';
import styles from './AIRoomSelection.module.css';

export const AIRoomSelection: React.FC = () => {
  const { updateRoomSelection, nextStep } = usePreCheckIn();
  const [selectedRoom, setSelectedRoom] = useState<string | null>('recommended');
  const [imageIndex, setImageIndex] = useState(0);

  const recommendedRoom: RoomSelection = {
    roomId: 'deluxe-305',
    roomNumber: '305',
    roomName: 'Deluxe Ocean View',
    roomImage: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800',
    roomCategory: 'DELUXE',
    floor: 3,
    view: 'Ocean',
    size: 450,
    bedType: 'King Bed',
    price: 279,
    isAIRecommended: true,
    aiReasons: [
      'High floor (you prefer quiet locations)',
      'Ocean view (based on past bookings)',
      'King bed (matches your preference)',
      'Recently renovated',
      'Away from elevators for privacy'
    ]
  };

  const alternativeRooms: RoomSelection[] = [
    {
      roomId: 'suite-412',
      roomNumber: '412',
      roomName: 'Executive Suite',
      roomImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400',
      roomCategory: 'SUITE',
      floor: 4,
      view: 'City & Ocean',
      size: 650,
      bedType: 'King Bed',
      price: 349,
      isAIRecommended: false
    },
    {
      roomId: 'premium-208',
      roomNumber: '208',
      roomName: 'Premium Garden View',
      roomImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400',
      roomCategory: 'PREMIUM',
      floor: 2,
      view: 'Garden',
      size: 380,
      bedType: 'Queen Bed',
      price: 229,
      isAIRecommended: false
    }
  ];

  const images = [
    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'
  ];

  const handleSelectRoom = (room: RoomSelection) => {
    setSelectedRoom(room.roomId);
    updateRoomSelection(room);
  };

  const handleContinue = () => {
    if (selectedRoom === 'recommended') {
      updateRoomSelection(recommendedRoom);
    }
    nextStep();
  };

  return (
    <div className={styles.aiRoomSelection}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.header}
      >
        <div className={styles.stepBadge}>Step 4 of 8</div>
        <h1 className={styles.title}>Choose Your Perfect Room</h1>
        <p className={styles.description}>Based on your preferences, we've selected the best room for you</p>
      </motion.div>

      {/* AI Recommended Room */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className={styles.recommendedCard}
      >
        <div className={styles.imageGallery}>
          <img src={images[imageIndex]} alt="Room" className={styles.roomImage} />
          <div className={styles.aiBadge}>
            <Sparkles size={14} />
            AI RECOMMENDED FOR YOU
          </div>

          <button className={styles.galleryNav} onClick={() => setImageIndex((imageIndex - 1 + images.length) % images.length)}>
            <ChevronLeft size={20} />
          </button>
          <button className={`${styles.galleryNav} ${styles.galleryNavRight}`} onClick={() => setImageIndex((imageIndex + 1) % images.length)}>
            <ChevronRight size={20} />
          </button>

          <div className={styles.imageDots}>
            {images.map((_, i) => (
              <div key={i} className={`${styles.dot} ${i === imageIndex ? styles.dotActive : ''}`} onClick={() => setImageIndex(i)} />
            ))}
          </div>
        </div>

        <div className={styles.cardContent}>
          <h2 className={styles.roomName}>{recommendedRoom.roomName} - Room {recommendedRoom.roomNumber}</h2>
          <div className={styles.categoryBadge}>{recommendedRoom.roomCategory}</div>

          {/* AI Reasoning */}
          <div className={styles.aiReasoning}>
            <div className={styles.reasoningHeader}>
              <Sparkles size={24} />
              <span>Why we chose this room for you</span>
            </div>
            <div className={styles.reasons}>
              {recommendedRoom.aiReasons?.map((reason, index) => (
                <div key={index} className={styles.reason}>
                  <Check size={16} />
                  {reason}
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className={styles.features}>
            <div className={styles.feature}>
              <Bed size={20} />
              <span>{recommendedRoom.bedType}</span>
            </div>
            <div className={styles.feature}>
              <Maximize size={20} />
              <span>{recommendedRoom.size} sq ft</span>
            </div>
            <div className={styles.feature}>
              <Eye size={20} />
              <span>{recommendedRoom.view} View</span>
            </div>
            <div className={styles.feature}>
              <Wifi size={20} />
              <span>High-speed WiFi</span>
            </div>
            <div className={styles.feature}>
              <Coffee size={20} />
              <span>Nespresso Machine</span>
            </div>
            <div className={styles.feature}>
              <Waves size={20} />
              <span>Balcony</span>
            </div>
          </div>

          {/* Price */}
          <div className={styles.priceSection}>
            <div className={styles.originalPrice}>$299/night</div>
            <div className={styles.aiPrice}>
              ${recommendedRoom.price}/night
              <span className={styles.savings}>Save $20/night</span>
            </div>
            <div className={styles.aiOptimized}>
              <Sparkles size={12} />
              AI-Optimized Rate
            </div>
          </div>

          <button
            className={`${styles.selectButton} ${selectedRoom === 'recommended' ? styles.selected : ''}`}
            onClick={() => handleSelectRoom(recommendedRoom)}
          >
            {selectedRoom === 'recommended' ? <><Check size={20} /> Selected</> : 'SELECT THIS ROOM'}
          </button>
        </div>
      </motion.div>

      {/* Alternative Rooms */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={styles.alternatives}
      >
        <h3 className={styles.alternativesTitle}>Or Choose Another Room</h3>
        <div className={styles.alternativesGrid}>
          {alternativeRooms.map((room, index) => (
            <motion.div
              key={room.roomId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={`${styles.altCard} ${selectedRoom === room.roomId ? styles.altCardSelected : ''}`}
              onClick={() => handleSelectRoom(room)}
            >
              <div className={styles.altImage}>
                <img src={room.roomImage} alt={room.roomName} />
                <div className={styles.altBadge}>{room.roomCategory}</div>
              </div>
              <div className={styles.altContent}>
                <h4 className={styles.altTitle}>{room.roomName}</h4>
                <div className={styles.altFeatures}>
                  <div className={styles.altFeature}>
                    <Bed size={14} />
                    {room.bedType}
                  </div>
                  <div className={styles.altFeature}>
                    <Maximize size={14} />
                    {room.size} sq ft
                  </div>
                  <div className={styles.altFeature}>
                    <Eye size={14} />
                    {room.view}
                  </div>
                </div>
                <div className={styles.altPrice}>${room.price}/night</div>
                <button className={`${styles.altButton} ${selectedRoom === room.roomId ? styles.altButtonSelected : ''}`}>
                  {selectedRoom === room.roomId ? <><Check size={16} /> Selected</> : 'Select Room'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <button
        className={styles.continueButton}
        onClick={handleContinue}
        disabled={!selectedRoom}
      >
        Continue to Special Requests
      </button>
    </div>
  );
};
