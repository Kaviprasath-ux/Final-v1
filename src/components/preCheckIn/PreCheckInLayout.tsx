import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { usePreCheckIn } from '../../contexts/PreCheckInContext';
import styles from './PreCheckInLayout.module.css';

interface PreCheckInLayoutProps {
  children: React.ReactNode;
  onNext?: () => void;
  onBack?: () => void;
  nextDisabled?: boolean;
  nextText?: string;
  hideNavigation?: boolean;
}

export const PreCheckInLayout: React.FC<PreCheckInLayoutProps> = ({
  children,
  onNext,
  onBack,
  nextDisabled = false,
  nextText = 'Continue',
  hideNavigation = false
}) => {
  const navigate = useNavigate();
  const { currentStep, totalSteps, prevStep, saveProgress } = usePreCheckIn();

  const handleExit = () => {
    saveProgress();
    navigate('/dashboard');
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      prevStep();
    }
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className={styles.preCheckInLayout}>
      {/* Progress Bar */}
      <div className={styles.progressBarContainer}>
        <motion.div
          className={styles.progressBar}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>GLIMMORA</div>
          <div className={styles.stepIndicator}>
            Step {currentStep} of {totalSteps}
          </div>
          <button className={styles.exitButton} onClick={handleExit} title="Save and exit">
            <X size={24} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.contentInner}>
          {children}
        </div>
      </main>

      {/* Footer Navigation */}
      {!hideNavigation && (
        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <button
              className={styles.backButton}
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <ChevronLeft size={20} />
              Back
            </button>

            <button
              className={styles.nextButton}
              onClick={onNext}
              disabled={nextDisabled}
            >
              {nextText}
              <ChevronRight size={20} />
            </button>
          </div>
        </footer>
      )}
    </div>
  );
};
