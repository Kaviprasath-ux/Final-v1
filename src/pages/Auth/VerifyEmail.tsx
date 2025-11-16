import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Loader, CheckCircle } from 'lucide-react';
import { AuthLayout } from '../../components/auth/AuthLayout';
import styles from './Auth.module.css';

export const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Auto-submit when all 6 digits entered
    if (code.every(digit => digit !== '')) {
      handleVerify();
    }
  }, [code]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1); // Take only last character
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const digits = pastedData.split('').filter(char => /\d/.test(char));

    const newCode = [...code];
    digits.forEach((digit, index) => {
      if (index < 6) {
        newCode[index] = digit;
      }
    });
    setCode(newCode);

    // Focus last filled input or next empty
    const nextIndex = Math.min(digits.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerify = async () => {
    const verificationCode = code.join('');
    if (verificationCode.length !== 6) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => navigate('/'), 2000);
    }, 1500);
  };

  const handleResend = () => {
    if (!canResend) return;

    console.log('Resending code...');
    setCountdown(30);
    setCanResend(false);
    setCode(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();

    // Restart timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  if (isSuccess) {
    return (
      <AuthLayout>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`${styles.header} ${styles.centerHeader}`}>
          <div className={styles.iconContainer}>
            <CheckCircle size={64} style={{ color: '#27AE60' }} />
          </div>
          <h1 className={styles.title}>Email Verified!</h1>
          <p className={styles.subtitle}>Your email has been verified successfully. Redirecting...</p>
        </motion.div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className={styles.iconContainer}>
          <Mail size={36} />
        </div>

        <div className={`${styles.header} ${styles.centerHeader}`}>
          <h1 className={styles.title}>Verify Your Email</h1>
          <p className={styles.subtitle}>
            We've sent a 6-digit verification code to your email
          </p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleVerify(); }} className={styles.form}>
          {/* OTP Input */}
          <div className={styles.otpContainer} onPaste={handlePaste}>
            {code.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={styles.otpInput}
              />
            ))}
          </div>

          {/* Verify Button */}
          <button type="submit" disabled={isLoading || code.some(d => !d)} className={styles.primaryButton}>
            {isLoading ? (<><Loader size={20} className={styles.spinner} />Verifying...</>) : ('VERIFY EMAIL')}
          </button>

          {/* Resend Section */}
          <div className={styles.resendSection}>
            <p className={styles.resendText}>Didn't receive the code?</p>
            {canResend ? (
              <button type="button" onClick={handleResend} className={styles.resendLink}>
                Resend Code
              </button>
            ) : (
              <span className={`${styles.resendLink} ${styles.countdown}`}>
                Resend in 0:{countdown.toString().padStart(2, '0')}
              </span>
            )}
          </div>

          {/* Change Email */}
          <div className={styles.footer}>
            <a href="/signup" className={styles.footerLink}>Change email address</a>
          </div>
        </form>
      </motion.div>
    </AuthLayout>
  );
};
