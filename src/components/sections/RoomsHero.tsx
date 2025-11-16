import React from 'react';
import { motion } from 'framer-motion';
import styles from './RoomsHero.module.css';

export const RoomsHero: React.FC = () => {
  return (
    <section className={styles.hero}>
      {/* Background Image */}
      <div className={styles.heroBackground} />

      {/* Overlay */}
      <div className={styles.heroOverlay} />

      {/* Content */}
      <div className={styles.heroContent}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={styles.preTitle}
        >
          FIND YOUR PERFECT ROOM
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className={styles.title}
        >
          Rooms & Suites
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className={styles.subtitle}
        >
          AI-powered room selection for your perfect stay
        </motion.p>
      </div>
    </section>
  );
};
