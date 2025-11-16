import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './LuxuryShowcase.module.css';

const showcaseItems = [
  {
    id: 1,
    title: 'Ocean Villas',
    description: 'Wake up to breathtaking ocean views from your private villa',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80'
  },
  {
    id: 2,
    title: 'Mountain Retreats',
    description: 'Experience serenity in our secluded mountain properties',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80'
  },
  {
    id: 3,
    title: 'City Penthouses',
    description: 'Luxury living in the heart of vibrant metropolitan cities',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80'
  }
];

export const LuxuryShowcase: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className={styles.luxuryShowcase} id="experiences">
      <div className={styles.container}>
        <motion.div style={{ opacity }} className={styles.sectionHeader}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={styles.sectionPretitle}
          >
            DISCOVER
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={styles.sectionTitle}
          >
            Unparalleled Luxury Awaits
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className={styles.sectionSubtitle}
          >
            From breathtaking ocean views to mountain retreats, experience the extraordinary
          </motion.p>
        </motion.div>

        <div className={styles.showcaseGrid}>
          {showcaseItems.map((item, index) => (
            <motion.div
              key={item.id}
              style={{ y: index % 2 === 0 ? y : useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{
                scale: 1.05,
                zIndex: 10,
                transition: { duration: 0.3 }
              }}
              className={styles.showcaseCard}
            >
              <div className={styles.cardImage}>
                <motion.img
                  src={item.image}
                  alt={item.title}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
              </div>
              <div className={styles.cardContent}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
