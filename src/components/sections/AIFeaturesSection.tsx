import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { ClipboardCheck, MessageCircle, Sparkles, Smartphone, TrendingDown, Heart } from 'lucide-react';
import styles from './AIFeaturesSection.module.css';

const aiFeatures = [
  {
    id: 1,
    icon: ClipboardCheck,
    title: 'Pre-Check-In Online',
    description: 'Complete check-in from your phone before arrival',
    cta: 'Start Pre-Check-In',
    link: '#pre-checkin'
  },
  {
    id: 2,
    icon: MessageCircle,
    title: '24/7 AI Assistant',
    description: 'Get help anytime with our multilingual AI chatbot',
    cta: 'Chat Now',
    link: '#chat'
  },
  {
    id: 3,
    icon: Sparkles,
    title: 'Smart Room Assignment',
    description: 'AI assigns the best room based on your preferences',
    cta: null,
    link: null
  },
  {
    id: 4,
    icon: Smartphone,
    title: 'Digital Keys',
    description: 'Your phone is your room key - Apple Wallet & Google Pay',
    cta: null,
    link: null
  },
  {
    id: 5,
    icon: TrendingDown,
    title: 'Best Rate Guarantee',
    description: 'AI-optimized pricing ensures you get the best deal',
    cta: null,
    link: null
  },
  {
    id: 6,
    icon: Heart,
    title: 'Personalized Experience',
    description: 'AI remembers your preferences for future stays',
    cta: null,
    link: null
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

export const AIFeaturesSection: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section className={styles.aiFeaturesSection}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={styles.sectionHeader}
        >
          <motion.div
            className={styles.aiLogo}
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles size={32} />
          </motion.div>
          <p className={styles.sectionPretitle}>POWERED BY GLIMMORA AI</p>
          <h2 className={styles.sectionTitle}>Experience the Future of Hospitality</h2>
          <p className={styles.sectionSubtitle}>
            Cutting-edge AI technology designed to make your stay seamless and unforgettable
          </p>
        </motion.div>

        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className={styles.featuresGrid}
        >
          {aiFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                whileHover={{
                  y: -12,
                  boxShadow: '0 24px 64px rgba(165, 120, 101, 0.2)',
                  transition: { duration: 0.3 }
                }}
                className={styles.featureCard}
              >
                <motion.div
                  className={styles.iconWrapper}
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  <Icon size={28} />
                  <motion.div
                    className={styles.iconGlow}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>

                <h3>{feature.title}</h3>
                <p>{feature.description}</p>

                {feature.cta && (
                  <motion.a
                    href={feature.link || '#'}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    className={styles.featureCta}
                  >
                    {feature.cta} →
                  </motion.a>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className={styles.trustBadge}
        >
          <Sparkles size={20} />
          <span>Trusted by luxury hotels worldwide</span>
        </motion.div>
      </div>
    </section>
  );
};
