import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { Sparkles, UtensilsCrossed, Heart, Calendar, Compass, Users, Car, Gift } from 'lucide-react';
import styles from './ExperienceGrid.module.css';

const experiences = [
  {
    id: 1,
    title: 'Personalized Concierge',
    description: '24/7 dedicated service tailored to your every need',
    icon: Sparkles,
    link: '#'
  },
  {
    id: 2,
    title: 'World-Class Dining',
    description: 'Michelin-starred chefs crafting exceptional culinary experiences',
    icon: UtensilsCrossed,
    link: '#'
  },
  {
    id: 3,
    title: 'Wellness & Spa',
    description: 'Rejuvenate with holistic treatments and therapies',
    icon: Heart,
    link: '#'
  },
  {
    id: 4,
    title: 'Exclusive Events',
    description: 'Private access to cultural and entertainment experiences',
    icon: Calendar,
    link: '#'
  },
  {
    id: 5,
    title: 'Adventure Activities',
    description: 'Curated outdoor experiences for the adventurous spirit',
    icon: Compass,
    link: '#'
  },
  {
    id: 6,
    title: 'Cultural Immersion',
    description: 'Authentic local experiences and heritage tours',
    icon: Users,
    link: '#'
  },
  {
    id: 7,
    title: 'Private Transportation',
    description: 'Luxury vehicles and helicopters at your disposal',
    icon: Car,
    link: '#'
  },
  {
    id: 8,
    title: 'Bespoke Experiences',
    description: 'Customized moments tailored to your preferences',
    icon: Gift,
    link: '#'
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

export const ExperienceGrid: React.FC = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section className={styles.experienceGrid}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={styles.sectionHeader}
        >
          <p className={styles.sectionPretitle}>EXPERIENCES</p>
          <h2 className={styles.sectionTitle}>Crafted Moments</h2>
          <p className={styles.sectionSubtitle}>
            Every detail designed to create unforgettable memories
          </p>
        </motion.div>

        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className={styles.grid}
        >
          {experiences.map((exp) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                whileHover={{
                  y: -12,
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                  transition: { duration: 0.3 }
                }}
                className={styles.experienceCard}
              >
                <motion.div
                  className={styles.cardIcon}
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon size={32} />
                </motion.div>
                <h3>{exp.title}</h3>
                <p>{exp.description}</p>
                <motion.a
                  href={exp.link}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  className={styles.cardLink}
                >
                  Learn more →
                </motion.a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
