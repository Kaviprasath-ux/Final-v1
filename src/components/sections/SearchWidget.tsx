import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Calendar, Users, Search } from 'lucide-react';
import styles from './SearchWidget.module.css';

export const SearchWidget: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const searchFields = [
    { id: 'destination', label: 'Destination', placeholder: 'Where to?', icon: MapPin },
    { id: 'checkin', label: 'Check-in', type: 'date', icon: Calendar },
    { id: 'checkout', label: 'Check-out', type: 'date', icon: Calendar },
    { id: 'guests', label: 'Guests', placeholder: '2 guests', icon: Users },
  ];

  return (
    <div className={styles.searchWidgetContainer}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 80, scale: 0.9 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        className={styles.searchWidget}
      >
        <motion.div
          className={styles.searchCard}
          whileHover={{ y: -4, boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)' }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.searchForm}>
            {searchFields.map((field, index) => {
              const Icon = field.icon;
              return (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                  className={styles.searchField}
                >
                  <label htmlFor={field.id}>{field.label}</label>
                  <div className={styles.inputWrapper}>
                    <Icon size={20} className={styles.fieldIcon} />
                    <input
                      id={field.id}
                      type={field.type || 'text'}
                      placeholder={field.placeholder}
                      className={styles.input}
                    />
                  </div>
                </motion.div>
              );
            })}

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.5 }}
              whileHover={{ scale: 1.05, backgroundColor: '#8B6450' }}
              whileTap={{ scale: 0.98 }}
              className={styles.searchButton}
            >
              <Search size={20} />
              SEARCH
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
