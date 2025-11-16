import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Users, Maximize2 } from 'lucide-react';
import styles from './RoomsSection.module.css';

const rooms = [
  {
    id: 1,
    name: 'Deluxe Ocean View',
    description: 'Spacious room with panoramic ocean views and private balcony',
    price: 299,
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
    aiRecommended: true,
    bestMatch: false,
    features: ['King Bed', '450 sq ft', 'Ocean View']
  },
  {
    id: 2,
    name: 'Premium Suite',
    description: 'Luxury suite with separate living area and spa bathroom',
    price: 499,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
    aiRecommended: false,
    bestMatch: true,
    features: ['King Bed', '750 sq ft', 'Suite']
  },
  {
    id: 3,
    name: 'Penthouse',
    description: 'Ultimate luxury with private terrace and butler service',
    price: 899,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    aiRecommended: true,
    bestMatch: false,
    features: ['2 Bedrooms', '1200 sq ft', 'Terrace']
  }
];

export const RoomsSection: React.FC = () => {
  return (
    <section className={styles.roomsSection}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={styles.sectionHeader}
        >
          <p className={styles.pretitle}>ACCOMMODATIONS</p>
          <h2 className={styles.title}>Rooms & Suites</h2>
          <p className={styles.subtitle}>
            AI-powered room selection ensures you get the perfect match
          </p>
        </motion.div>

        <div className={styles.roomsGrid}>
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 }
              }}
              className={styles.roomCard}
            >
              <div className={styles.roomImage}>
                <motion.img
                  src={room.image}
                  alt={room.name}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />

                {/* AI Badges */}
                {room.aiRecommended && (
                  <motion.div
                    className={styles.aiBadge}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Sparkles size={14} />
                    AI-Recommended
                  </motion.div>
                )}

                {room.bestMatch && (
                  <motion.div
                    className={styles.bestMatchBadge}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(165, 120, 101, 0.3)',
                        '0 0 40px rgba(165, 120, 101, 0.5)',
                        '0 0 20px rgba(165, 120, 101, 0.3)'
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Sparkles size={14} />
                    Best Match for You
                  </motion.div>
                )}
              </div>

              <div className={styles.roomInfo}>
                <h3>{room.name}</h3>
                <p className={styles.description}>{room.description}</p>

                <div className={styles.roomFeatures}>
                  {room.features.map((feature, i) => (
                    <span key={i} className={styles.feature}>
                      {feature}
                    </span>
                  ))}
                </div>

                <div className={styles.roomFooter}>
                  <div className={styles.priceSection}>
                    <span className={styles.priceLabel}>From</span>
                    <div className={styles.price}>
                      <span className={styles.currency}>$</span>
                      <span className={styles.amount}>{room.price}</span>
                      <span className={styles.period}>/night</span>
                    </div>
                    <span className={styles.dynamicPricing}>
                      <Sparkles size={12} />
                      AI-Optimized Rate
                    </span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={styles.bookButton}
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
