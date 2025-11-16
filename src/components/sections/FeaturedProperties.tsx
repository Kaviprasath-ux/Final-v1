import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin } from 'lucide-react';
import styles from './FeaturedProperties.module.css';

const properties = [
  {
    id: 1,
    name: 'Sunset Villa Maldives',
    location: 'Maldives',
    description: 'Overwater villa with private infinity pool and direct ocean access',
    price: 1299,
    badge: 'Exclusive',
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80'
  },
  {
    id: 2,
    name: 'Alpine Chalet Switzerland',
    location: 'Swiss Alps',
    description: 'Luxury mountain retreat with panoramic views and private ski access',
    price: 1899,
    badge: 'Premium',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80'
  },
  {
    id: 3,
    name: 'Santorini Cave Suite',
    location: 'Santorini, Greece',
    description: 'Cliffside luxury suite with caldera views and private jacuzzi',
    price: 899,
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80'
  },
  {
    id: 4,
    name: 'Dubai Sky Penthouse',
    location: 'Dubai, UAE',
    description: 'Ultra-modern penthouse with 360° city views and private helipad',
    price: 2499,
    badge: 'Luxury',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'
  }
];

export const FeaturedProperties: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -300]);

  return (
    <section ref={containerRef} className={styles.featuredProperties} id="properties">
      <div className={styles.containerFluid}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={styles.sectionHeader}
        >
          <p className={styles.sectionPretitle}>SIGNATURE COLLECTION</p>
          <h2 className={styles.sectionTitle}>Featured Properties</h2>
          <p className={styles.sectionSubtitle}>
            Hand-picked destinations that define luxury
          </p>
        </motion.div>

        <motion.div style={{ x }} className={styles.propertiesScroll}>
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{
                y: -16,
                transition: { duration: 0.4 }
              }}
              className={styles.propertyCard}
            >
              <div className={styles.propertyImage}>
                <motion.img
                  src={property.image}
                  alt={property.name}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                <motion.div
                  className={styles.propertyBadge}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {property.badge}
                </motion.div>
              </div>

              <div className={styles.propertyInfo}>
                <div className={styles.propertyLocation}>
                  <MapPin size={14} />
                  {property.location}
                </div>
                <h3 className={styles.propertyName}>{property.name}</h3>
                <p className={styles.propertyDescription}>{property.description}</p>
                <div className={styles.propertyFooter}>
                  <span className={styles.propertyPrice}>From ${property.price}/night</span>
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: '#8B6450' }}
                    whileTap={{ scale: 0.95 }}
                    className={styles.viewBtn}
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
