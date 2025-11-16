import React from 'react';
import { motion } from 'framer-motion';
import styles from './NewsletterSection.module.css';

export const NewsletterSection: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section className={styles.newsletter}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={styles.newsletterCard}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={styles.newsletterPretitle}
          >
            STAY UPDATED
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className={styles.newsletterTitle}
          >
            Get Exclusive Offers
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className={styles.newsletterSubtitle}
          >
            Subscribe to receive special offers, travel inspiration, and insider tips
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className={styles.newsletterForm}
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className={styles.newsletterInput}
              required
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05, backgroundColor: '#1A1A1A' }}
              whileTap={{ scale: 0.95 }}
              className={styles.newsletterButton}
            >
              Subscribe
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};
