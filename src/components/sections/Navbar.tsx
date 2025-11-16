import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../../utils/animations';
import styles from './Navbar.module.css';

const menuItems = [
  { label: 'Home', path: '/' },
  { label: 'Rooms', path: '/rooms' },
  { label: 'Amenities', path: '/#amenities' },
  { label: 'Pre-Check-In', path: '/#pre-checkin' },
  { label: 'Contact', path: '/#contact' }
];

export const Navbar: React.FC = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
    >
      <div className={styles.navContainer}>
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className={styles.logo}
        >
          GLIMMORA
        </motion.div>

        {/* Desktop Menu */}
        <motion.ul
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className={styles.navMenu}
        >
          {menuItems.map((item) => (
            <motion.li
              key={item.label}
              variants={fadeInUp}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              {item.path.startsWith('/#') ? (
                <a href={item.path}>{item.label}</a>
              ) : (
                <Link to={item.path}>{item.label}</Link>
              )}
            </motion.li>
          ))}
        </motion.ul>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className={styles.navActions}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.bookNowBtn}
          >
            Book Now
          </motion.button>
        </motion.div>
      </div>
    </motion.nav>
  );
};
