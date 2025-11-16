import React from 'react';
import styles from './Legal.module.css';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className={styles.legalPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.updated}>Last updated: November 16, 2024</p>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2>1. Information We Collect</h2>
            <p>
              At Glimmora Hotel, we collect information necessary to provide you with excellent service. This includes personal details you provide during booking, preferences you share, and data collected during your stay.
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. How We Use Your Information</h2>
            <p>
              We use your information to:
            </p>
            <ul>
              <li>Process your reservations and bookings</li>
              <li>Provide personalized service during your stay</li>
              <li>Send you booking confirmations and important updates</li>
              <li>Improve our AI-powered services</li>
              <li>Comply with legal requirements</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>3. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your personal information. All data is encrypted and stored securely. We never sell your personal information to third parties.
            </p>
          </section>

          <section className={styles.section}>
            <h2>4. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information at any time. Contact our privacy team at privacy@glimmora.com to exercise these rights.
            </p>
          </section>

          <section className={styles.section}>
            <h2>5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul>
              <li>Email: privacy@glimmora.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Ocean Drive, Paradise Bay, CA 90210</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
