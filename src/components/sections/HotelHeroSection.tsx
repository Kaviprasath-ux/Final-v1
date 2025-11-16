import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Sparkles, ArrowRight, Check } from 'lucide-react';
import styles from './HotelHeroSection.module.css';

export const HotelHeroSection: React.FC = () => {
  const { scrollY } = useScroll();
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  // Parallax effect for background
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  // Hide scroll indicator after scrolling 100px
  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setShowScrollIndicator(latest < 100);
    });
  }, [scrollY]);

  return (
    <section className={styles.hero}>
      {/* Animated Background with Parallax */}
      <motion.div
        className={styles.heroBackground}
        style={{ y }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      {/* Enhanced Gradient Overlay */}
      <div className={styles.heroOverlay} />

      {/* Hero Content */}
      <div className={styles.heroContent}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={styles.aiPoweredBadge}
        >
          <Sparkles size={16} />
          <span>Powered by Glimmora AI</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className={styles.heroTitle}
        >
          Experience AI-Powered Hospitality
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className={styles.heroSubtitle}
        >
          Skip the front desk, unlock with your phone, experience seamless AI service
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className={styles.heroCta}
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={styles.ctaPrimary}
          >
            Check Availability
            <ArrowRight size={18} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={styles.ctaSecondary}
          >
            <Check size={18} />
            Start Pre-Check-In
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showScrollIndicator ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className={styles.scrollIndicator}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <ChevronDown size={28} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
