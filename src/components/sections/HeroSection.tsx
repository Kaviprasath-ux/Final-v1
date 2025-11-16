import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Play } from 'lucide-react';
import styles from './HeroSection.module.css';

export const HeroSection: React.FC = () => {
  return (
    <section className={styles.hero}>
      {/* Animated Background */}
      <motion.div
        className={styles.heroBackground}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      {/* Gradient Overlay */}
      <div className={styles.heroOverlay} />

      {/* Hero Content */}
      <div className={styles.heroContent}>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className={styles.heroPretitle}
        >
          REDEFINING LUXURY
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className={styles.heroTitle}
        >
          Where Every Stay
          <br />
          Becomes a Story
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className={styles.heroSubtitle}
        >
          Curated luxury experiences at the world's most extraordinary destinations
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className={styles.heroCta}
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className={styles.ctaPrimary}
          >
            Explore Properties
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={styles.ctaSecondary}
          >
            <Play size={16} fill="white" />
            Watch Film
          </motion.button>
        </motion.div>

        {/* Animated Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className={styles.scrollIndicator}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <ChevronDown size={24} />
          </motion.div>
          <span>Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  );
};
