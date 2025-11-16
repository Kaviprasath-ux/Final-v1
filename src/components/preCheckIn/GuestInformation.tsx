import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, Globe } from 'lucide-react';
import { usePreCheckIn } from '../../contexts/PreCheckInContext';
import { useAuth } from '../../contexts/AuthContext';
import styles from './GuestInformation.module.css';

export const GuestInformation: React.FC = () => {
  const { user } = useAuth();
  const { updateGuestInfo, nextStep } = usePreCheckIn();

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: '',
    nationality: '',
    gender: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContinue = () => {
    updateGuestInfo(formData as any);
    nextStep();
  };

  const isValid = formData.fullName && formData.email && formData.phone && formData.dateOfBirth;

  return (
    <div className={styles.guestInfo}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.header}
      >
        <div className={styles.stepBadge}>Step 2 of 8</div>
        <h1 className={styles.title}>Verify Your Information</h1>
        <p className={styles.description}>Please confirm your personal details</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={styles.form}
      >
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Primary Guest</h3>

          <div className={styles.field}>
            <label className={styles.label}>
              <User size={18} />
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={styles.input}
              placeholder="John Doe"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              <Mail size={18} />
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="john.doe@email.com"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              <Phone size={18} />
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={styles.input}
              placeholder="+1 (555) 123-4567"
              required
            />
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label className={styles.label}>
                <Calendar size={18} />
                Date of Birth *
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                <Globe size={18} />
                Nationality
              </label>
              <select
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className={styles.input}
              >
                <option value="">Select country</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        <button
          className={styles.continueButton}
          onClick={handleContinue}
          disabled={!isValid}
        >
          Continue to ID Verification
        </button>
      </motion.div>
    </div>
  );
};
