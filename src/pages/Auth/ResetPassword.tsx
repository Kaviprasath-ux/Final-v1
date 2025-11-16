import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { KeyRound, Eye, EyeOff, AlertCircle, Loader, CheckCircle, Circle } from 'lucide-react';
import { AuthLayout } from '../../components/auth/AuthLayout';
import styles from './Auth.module.css';

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [requirements, setRequirements] = useState([
    { regex: /.{8,}/, text: 'At least 8 characters', met: false },
    { regex: /[A-Z]/, text: 'One uppercase letter', met: false },
    { regex: /[a-z]/, text: 'One lowercase letter', met: false },
    { regex: /[0-9]/, text: 'One number', met: false },
    { regex: /[!@#$%^&*]/, text: 'One special character', met: false }
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'password') {
      setRequirements(prev => prev.map(req => ({ ...req, met: req.regex.test(value) })));
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!requirements.every(req => req.met)) {
      newErrors.password = 'Password does not meet all requirements';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    }, 1500);
  };

  const calculatePasswordStrength = () => {
    const metCount = requirements.filter(req => req.met).length;
    const percentage = (metCount / requirements.length) * 100;
    if (percentage <= 40) return { level: 'weak', percentage, className: styles.weak };
    if (percentage <= 70) return { level: 'medium', percentage, className: styles.medium };
    return { level: 'strong', percentage, className: styles.strong };
  };

  const passwordStrength = calculatePasswordStrength();

  if (isSuccess) {
    return (
      <AuthLayout>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`${styles.header} ${styles.centerHeader}`}
        >
          <div className={styles.iconContainer}>
            <CheckCircle size={64} style={{ color: '#27AE60' }} />
          </div>
          <h1 className={styles.title}>Password Reset Successful!</h1>
          <p className={styles.subtitle}>
            Your password has been reset. You can now sign in with your new password.
          </p>
          <button onClick={() => navigate('/login')} className={styles.primaryButton}>
            SIGN IN
          </button>
        </motion.div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className={styles.iconContainer}>
          <KeyRound size={36} />
        </div>

        <div className={`${styles.header} ${styles.centerHeader}`}>
          <h1 className={styles.title}>Create New Password</h1>
          <p className={styles.subtitle}>
            Your new password must be different from previously used passwords
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>New Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password"
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.passwordToggle}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {formData.password && (
              <div className={styles.passwordStrength}>
                <div className={styles.strengthBar}>
                  <div className={`${styles.strengthFill} ${passwordStrength.className}`} style={{ width: `${passwordStrength.percentage}%` }} />
                </div>
                <div className={`${styles.strengthText} ${passwordStrength.className}`}>
                  {passwordStrength.level.charAt(0).toUpperCase() + passwordStrength.level.slice(1)}
                </div>
              </div>
            )}

            <div className={styles.passwordRequirements}>
              <div className={styles.requirementsTitle}>Password must contain:</div>
              <div className={styles.requirementsList}>
                {requirements.map((req, idx) => (
                  <div key={idx} className={`${styles.requirementItem} ${req.met ? styles.requirementMet : styles.requirementUnmet}`}>
                    {req.met ? <CheckCircle size={14} /> : <Circle size={14} />}
                    {req.text}
                  </div>
                ))}
              </div>
            </div>

            {errors.password && <div className={styles.errorMessage}><AlertCircle size={14} />{errors.password}</div>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Confirm New Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter new password"
                className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className={styles.passwordToggle}>
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && <div className={styles.errorMessage}><AlertCircle size={14} />{errors.confirmPassword}</div>}
          </div>

          <button type="submit" disabled={isLoading} className={styles.primaryButton}>
            {isLoading ? (<><Loader size={20} className={styles.spinner} />Resetting...</>) : ('RESET PASSWORD')}
          </button>
        </form>
      </motion.div>
    </AuthLayout>
  );
};
