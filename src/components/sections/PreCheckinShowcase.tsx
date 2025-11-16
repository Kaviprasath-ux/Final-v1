import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Smartphone, CreditCard, Key, Shield } from 'lucide-react';
import styles from './PreCheckinShowcase.module.css';

const preCheckinSteps = [
  {
    id: 1,
    title: 'Booking Confirmed',
    description: 'Reservation #12345',
    icon: Check,
    color: '#27AE60'
  },
  {
    id: 2,
    title: 'ID Verification',
    description: 'Scan or upload your ID',
    icon: Shield,
    color: '#2196F3'
  },
  {
    id: 3,
    title: 'Choose Your Room',
    description: 'Ocean view, Floor 12',
    icon: Smartphone,
    color: '#A57865'
  },
  {
    id: 4,
    title: 'Payment Confirmed',
    description: 'Card ending in 4242',
    icon: CreditCard,
    color: '#27AE60'
  },
  {
    id: 5,
    title: 'Digital Key Ready',
    description: 'Added to Apple Wallet',
    icon: Key,
    color: '#FFA500'
  }
];

const features = [
  'ID verification (OCR scan or manual)',
  'Choose your preferred room',
  'Add special requests',
  'Digital key to your phone',
  'Skip the front desk entirely'
];

export const PreCheckinShowcase: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % preCheckinSteps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = preCheckinSteps[currentStep].icon;

  return (
    <section className={styles.preCheckinShowcase} id="pre-checkin">
      <div className={styles.container}>
        {/* Left: Phone Mockup */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={styles.phoneContainer}
        >
          <div className={styles.phoneMockup}>
            <div className={styles.phoneNotch} />
            <div className={styles.phoneScreen}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className={styles.screenContent}
                >
                  <motion.div
                    className={styles.stepIcon}
                    style={{ backgroundColor: `${preCheckinSteps[currentStep].color}15` }}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CurrentIcon size={32} color={preCheckinSteps[currentStep].color} />
                  </motion.div>
                  <h4>{preCheckinSteps[currentStep].title}</h4>
                  <p>{preCheckinSteps[currentStep].description}</p>

                  {/* Progress Dots */}
                  <div className={styles.progressDots}>
                    {preCheckinSteps.map((_, index) => (
                      <motion.div
                        key={index}
                        className={`${styles.dot} ${index === currentStep ? styles.activeDot : ''}`}
                        animate={{
                          scale: index === currentStep ? 1.2 : 1,
                          backgroundColor: index === currentStep ? '#A57865' : '#E8E4E0'
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Floating Elements */}
          <motion.div
            className={styles.floatingBadge}
            animate={{
              y: [0, -10, 0],
              rotate: [-5, 5, -5]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Check size={16} />
            <span>100% Contactless</span>
          </motion.div>
        </motion.div>

        {/* Right: Feature Explanation */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.content}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className={styles.pretitle}
          >
            PRE-CHECK-IN
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className={styles.title}
          >
            Check-In From Anywhere
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className={styles.subtitle}
          >
            Complete your check-in 24 hours before arrival. No lines, no waiting.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className={styles.featuresList}
          >
            {features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
              >
                <Check size={20} />
                <span>{feature}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 0.6 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={styles.ctaButton}
          >
            Start Pre-Check-In Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
