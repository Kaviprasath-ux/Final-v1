import React from 'react';
import styles from './Legal.module.css';

const TermsOfService: React.FC = () => {
  return (
    <div className={styles.legalPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Terms of Service</h1>
        <p className={styles.updated}>Last updated: November 16, 2024</p>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using Glimmora Hotel's services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. Booking and Reservations</h2>
            <p>
              All bookings are subject to availability and confirmation. We reserve the right to refuse service to anyone for any reason at any time.
            </p>
            <ul>
              <li>Bookings must be made by guests 18 years or older</li>
              <li>Valid payment information is required at time of booking</li>
              <li>Cancellation policies vary by rate and room type</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>3. Payment Terms</h2>
            <p>
              Payment is required at the time of booking unless otherwise specified. We accept major credit cards, debit cards, and digital payment methods. All prices are in USD and subject to applicable taxes.
            </p>
          </section>

          <section className={styles.section}>
            <h2>4. Cancellation Policy</h2>
            <p>
              Standard cancellation policy allows free cancellation up to 48 hours before check-in. Late cancellations and no-shows may be charged the full amount of the reservation.
            </p>
          </section>

          <section className={styles.section}>
            <h2>5. Guest Conduct</h2>
            <p>
              Guests are expected to conduct themselves in a manner that does not disturb other guests or damage hotel property. We reserve the right to remove guests who violate our conduct policies.
            </p>
          </section>

          <section className={styles.section}>
            <h2>6. Limitation of Liability</h2>
            <p>
              Glimmora Hotel is not liable for any indirect, incidental, or consequential damages arising from your use of our services.
            </p>
          </section>

          <section className={styles.section}>
            <h2>7. Contact Information</h2>
            <p>
              For questions about these Terms of Service, contact us:
            </p>
            <ul>
              <li>Email: legal@glimmora.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Ocean Drive, Paradise Bay, CA 90210</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
