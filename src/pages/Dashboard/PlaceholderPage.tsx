import React from 'react';
import { motion } from 'framer-motion';
import styles from './PlaceholderPage.module.css';

interface PlaceholderPageProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  message: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  subtitle,
  icon,
  message
}) => {
  return (
    <div className={styles.placeholderPage}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.header}
      >
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={styles.content}
      >
        <div className={styles.icon}>{icon}</div>
        <h2 className={styles.message}>{message}</h2>
        <p className={styles.text}>This feature is coming soon!</p>
      </motion.div>
    </div>
  );
};
