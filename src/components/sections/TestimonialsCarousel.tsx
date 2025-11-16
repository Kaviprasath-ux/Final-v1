import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { slideVariants } from '../../utils/animations';
import styles from './TestimonialsCarousel.module.css';

const testimonials = [
  {
    id: 1,
    text: 'Our stay at Glimmora was absolutely spectacular. From the moment we arrived, every detail was perfect. The staff anticipated our every need, and the villa was beyond our wildest dreams.',
    name: 'Sarah & Michael Thompson',
    location: 'New York, USA',
    avatar: 'https://i.pravatar.cc/150?img=1'
  },
  {
    id: 2,
    text: 'Exceptional service and breathtaking views. This was our honeymoon, and Glimmora made it truly unforgettable. The personalized touches and attention to detail were remarkable.',
    name: 'Emily Chen',
    location: 'Singapore',
    avatar: 'https://i.pravatar.cc/150?img=5'
  },
  {
    id: 3,
    text: 'I have stayed at luxury hotels around the world, but Glimmora sets a new standard. The combination of stunning architecture, impeccable service, and genuine warmth is unmatched.',
    name: 'James Harrison',
    location: 'London, UK',
    avatar: 'https://i.pravatar.cc/150?img=12'
  }
];

export const TestimonialsCarousel: React.FC = () => {
  const [[currentIndex, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    const newIndex = (currentIndex + newDirection + testimonials.length) % testimonials.length;
    setPage([newIndex, newDirection]);
  };

  return (
    <section className={styles.testimonials}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.sectionHeader}
        >
          <p className={styles.sectionPretitle}>TESTIMONIALS</p>
          <h2 className={styles.sectionTitle}>Guest Stories</h2>
        </motion.div>

        <div className={styles.carouselContainer}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className={styles.testimonialCard}
            >
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Star size={20} fill="#FFA500" color="#FFA500" />
                  </motion.div>
                ))}
              </div>

              <p className={styles.testimonialText}>
                "{testimonials[currentIndex].text}"
              </p>

              <div className={styles.testimonialAuthor}>
                <motion.div
                  className={styles.authorAvatar}
                  whileHover={{ scale: 1.1 }}
                >
                  <img src={testimonials[currentIndex].avatar} alt="Guest" />
                </motion.div>
                <div>
                  <p className={styles.authorName}>{testimonials[currentIndex].name}</p>
                  <p className={styles.authorLocation}>{testimonials[currentIndex].location}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className={styles.carouselNav}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(-1)}
              className={styles.navButton}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(1)}
              className={styles.navButton}
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>

          {/* Indicators */}
          <div className={styles.indicators}>
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setPage([index, index > currentIndex ? 1 : -1])}
                className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                whileHover={{ scale: 1.2 }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
