import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './BookingProgressStepper.module.css';

interface Step {
  number: number;
  label: string;
  status: 'completed' | 'active' | 'upcoming';
}

interface BookingProgressStepperProps {
  currentStep: number; // 1 = Review, 2 = Payment, 3 = Confirmation
}

export const BookingProgressStepper: React.FC<BookingProgressStepperProps> = ({ currentStep }) => {
  const steps: Step[] = [
    { number: 1, label: 'Review', status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'active' : 'upcoming' },
    { number: 2, label: 'Payment', status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'active' : 'upcoming' },
    { number: 3, label: 'Confirmation', status: currentStep >= 3 ? 'active' : 'upcoming' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.stepper}>
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            {/* Step Circle */}
            <div className={styles.stepWrapper}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`${styles.stepCircle} ${styles[step.status]}`}
              >
                {step.status === 'completed' ? (
                  <Check size={20} />
                ) : (
                  <span>{step.number}</span>
                )}
              </motion.div>
              <div className={`${styles.stepLabel} ${step.status === 'active' ? styles.activeLabel : ''}`}>
                {step.label}
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className={`${styles.connector} ${step.status === 'completed' ? styles.connectorCompleted : ''}`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
