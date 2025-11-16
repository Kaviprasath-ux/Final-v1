import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff, AlertCircle, Loader, Circle, CheckCircle } from 'lucide-react';
import { AuthLayout } from '../../components/auth/AuthLayout';
import styles from './Auth.module.css';

interface PasswordRequirement {
  regex: RegExp;
  text: string;
  met: boolean;
}

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  // Password requirements
  const [requirements, setRequirements] = useState<PasswordRequirement[]>([
    { regex: /.{8,}/, text: 'At least 8 characters', met: false },
    { regex: /[A-Z]/, text: 'One uppercase letter', met: false },
    { regex: /[a-z]/, text: 'One lowercase letter', met: false },
    { regex: /[0-9]/, text: 'One number', met: false },
    { regex: /[!@#$%^&*]/, text: 'One special character (!@#$%^&*)', met: false }
  ]);

  const calculatePasswordStrength = (password: string) => {
    const metRequirements = requirements.filter(req => req.regex.test(password)).length;
    const percentage = (metRequirements / requirements.length) * 100;

    if (percentage <= 40) return { level: 'weak', percentage, className: styles.weak };
    if (percentage <= 70) return { level: 'medium', percentage, className: styles.medium };
    return { level: 'strong', percentage, className: styles.strong };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Update password requirements
    if (name === 'password') {
      setRequirements(prev => prev.map(req => ({
        ...req,
        met: req.regex.test(value)
      })));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Full name validation
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!requirements.every(req => req.met)) {
      newErrors.password = 'Password does not meet all requirements';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms validation
    if (!agreeToTerms) {
      newErrors.terms = 'You must agree to the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Sign up with:', formData, 'Marketing:', marketingOptIn);
      setIsLoading(false);
      // Navigate to email verification
      navigate('/verify-email');
    }, 1500);
  };

  const handleSocialSignup = (provider: string) => {
    console.log(`Sign up with ${provider}`);
  };

  const passwordStrength = calculatePasswordStrength(formData.password);

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Back Link */}
        <Link to="/" className={styles.backLink}>
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>Start your journey with Glimmora</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Full Name Field */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`${styles.input} ${errors.fullName ? styles.inputError : ''}`}
            />
            {errors.fullName && (
              <div className={styles.errorMessage}>
                <AlertCircle size={14} />
                {errors.fullName}
              </div>
            )}
          </div>

          {/* Email Field */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            />
            {errors.email && (
              <div className={styles.errorMessage}>
                <AlertCircle size={14} />
                {errors.email}
              </div>
            )}
          </div>

          {/* Phone Number Field (Optional) */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Phone Number (Optional)</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              className={styles.input}
            />
          </div>

          {/* Password Field */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.passwordToggle}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className={styles.passwordStrength}>
                <div className={styles.strengthBar}>
                  <div
                    className={`${styles.strengthFill} ${passwordStrength.className}`}
                    style={{ width: `${passwordStrength.percentage}%` }}
                  />
                </div>
                <div className={`${styles.strengthText} ${passwordStrength.className}`}>
                  {passwordStrength.level.charAt(0).toUpperCase() + passwordStrength.level.slice(1)}
                </div>
              </div>
            )}

            {/* Password Requirements */}
            <div className={styles.passwordRequirements}>
              <div className={styles.requirementsTitle}>Password must contain:</div>
              <div className={styles.requirementsList}>
                {requirements.map((req, index) => (
                  <div
                    key={index}
                    className={`${styles.requirementItem} ${req.met ? styles.requirementMet : styles.requirementUnmet}`}
                  >
                    {req.met ? (
                      <CheckCircle size={14} />
                    ) : (
                      <Circle size={14} />
                    )}
                    {req.text}
                  </div>
                ))}
              </div>
            </div>

            {errors.password && (
              <div className={styles.errorMessage}>
                <AlertCircle size={14} />
                {errors.password}
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Confirm Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={styles.passwordToggle}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <div className={styles.errorMessage}>
                <AlertCircle size={14} />
                {errors.confirmPassword}
              </div>
            )}
          </div>

          {/* Terms & Conditions */}
          <div className={styles.inputGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className={styles.hiddenCheckbox}
              />
              <span className={`${styles.customCheckbox} ${agreeToTerms ? styles.checked : ''}`}>
                {agreeToTerms && <span className={styles.checkmark}>✓</span>}
              </span>
              <span className={styles.checkboxText}>
                I agree to the{' '}
                <a href="/terms" className={styles.forgotLink}>Terms of Service</a>
                {' '}and{' '}
                <a href="/privacy" className={styles.forgotLink}>Privacy Policy</a>
              </span>
            </label>
            {errors.terms && (
              <div className={styles.errorMessage}>
                <AlertCircle size={14} />
                {errors.terms}
              </div>
            )}
          </div>

          {/* Marketing Checkbox */}
          <div className={styles.inputGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={marketingOptIn}
                onChange={(e) => setMarketingOptIn(e.target.checked)}
                className={styles.hiddenCheckbox}
              />
              <span className={`${styles.customCheckbox} ${marketingOptIn ? styles.checked : ''}`}>
                {marketingOptIn && <span className={styles.checkmark}>✓</span>}
              </span>
              <span className={styles.checkboxText}>
                Send me exclusive offers and travel tips via email
              </span>
            </label>
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={styles.primaryButton}
          >
            {isLoading ? (
              <>
                <Loader size={20} className={styles.spinner} />
                Creating account...
              </>
            ) : (
              'CREATE ACCOUNT'
            )}
          </button>

          {/* Divider */}
          <div className={styles.divider}>
            <span className={styles.dividerLine} />
            <span className={styles.dividerText}>or sign up with</span>
            <span className={styles.dividerLine} />
          </div>

          {/* Social Signup Buttons */}
          <div className={styles.socialButtons}>
            <button
              type="button"
              onClick={() => handleSocialSignup('google')}
              className={styles.socialButton}
            >
              <svg width="20" height="20" viewBox="0 0 20 20">
                <path d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z" fill="#4285F4"/>
                <path d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z" fill="#34A853"/>
                <path d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z" fill="#FBBC05"/>
                <path d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z" fill="#EA4335"/>
              </svg>
              Google
            </button>

            <button
              type="button"
              onClick={() => handleSocialSignup('facebook')}
              className={styles.socialButton}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="#1877F2">
                <path d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"/>
              </svg>
              Facebook
            </button>
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <span className={styles.footerText}>Already have an account?</span>
            <Link to="/login" className={styles.footerLink}>Sign In</Link>
          </div>
        </form>
      </motion.div>
    </AuthLayout>
  );
};
