import React from 'react';
import { Link } from 'react-router-dom';
import styles from './About.module.css';

const AboutPage: React.FC = () => {
  return (
    <div className={styles.aboutPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>About Glimmora Hotel</h1>
        <p className={styles.subtitle}>AI-Powered Luxury Hospitality</p>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2>Our Story</h2>
            <p>
              Glimmora Hotel represents the future of hospitality, where cutting-edge AI technology meets timeless luxury.
              Founded with a vision to revolutionize the guest experience, we combine innovative technology with personalized service to create unforgettable stays.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Our Mission</h2>
            <p>
              To provide seamless, AI-powered hospitality that exceeds guest expectations while maintaining the warmth and personal touch that defines luxury accommodation.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Why Choose Glimmora</h2>
            <ul className={styles.features}>
              <li>✓ Skip the front desk with pre-check-in</li>
              <li>✓ Digital room keys on your phone</li>
              <li>✓ AI-powered room selection</li>
              <li>✓ 24/7 concierge service</li>
              <li>✓ World-class amenities</li>
              <li>✓ Eco-certified operations</li>
            </ul>
          </section>

          <div className={styles.cta}>
            <Link to="/rooms" className={styles.ctaButton}>
              Explore Our Rooms
            </Link>
            <Link to="/contact" className={styles.ctaSecondary}>
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
