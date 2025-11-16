import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import styles from './AuthLayout.module.css';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const features = [
    'AI-powered pre-check-in',
    'Digital room keys',
    '24/7 AI assistant',
    'Personalized experience'
  ];

  return (
    <div className={styles.authContainer}>
      {/* Left Side - Brand */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className={styles.brandSide}
      >
        <div className={styles.brandContent}>
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={styles.logo}
          >
            GLIMMORA
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className={styles.headline}
          >
            Welcome to Glimmora
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className={styles.subtext}
          >
            Experience AI-powered hospitality. Skip the front desk, unlock with your phone,
            enjoy seamless service.
          </motion.p>

          {/* Features List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className={styles.featuresList}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                className={styles.featureItem}
              >
                <Check size={20} className={styles.checkIcon} />
                <span>{feature}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Decorative Shapes */}
          <div className={styles.decorativeShapes}>
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={styles.shape1}
            />
            <motion.div
              animate={{
                y: [0, 15, 0],
                rotate: [0, -5, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={styles.shape2}
            />
          </div>
        </div>
      </motion.div>

      {/* Right Side - Form */}
      <div className={styles.formSide}>
        <div className={styles.formContainer}>
          {children}
        </div>
      </div>
    </div>
  );
};
