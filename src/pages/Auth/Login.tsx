import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff, AlertCircle, Loader } from 'lucide-react';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Auth.module.css';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
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
      console.log('Login with:', formData, 'Remember:', rememberMe);

      // Call login from AuthContext
      login(formData.email, formData.password);

      setIsLoading(false);

      // Get returnUrl from query params, default to home
      const returnUrl = searchParams.get('returnUrl') || '/';
      navigate(returnUrl);
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Implement social login
  };

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
          <h1 className={styles.title}>Sign In</h1>
          <p className={styles.subtitle}>Welcome back to Glimmora</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
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

          {/* Password Field */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
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
            {errors.password && (
              <div className={styles.errorMessage}>
                <AlertCircle size={14} />
                {errors.password}
              </div>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className={styles.optionsRow}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className={styles.hiddenCheckbox}
              />
              <span className={`${styles.customCheckbox} ${rememberMe ? styles.checked : ''}`}>
                {rememberMe && <span className={styles.checkmark}>✓</span>}
              </span>
              <span className={styles.checkboxText}>Remember me</span>
            </label>

            <Link to="/forgot-password" className={styles.forgotLink}>
              Forgot Password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={styles.primaryButton}
          >
            {isLoading ? (
              <>
                <Loader size={20} className={styles.spinner} />
                Signing in...
              </>
            ) : (
              'SIGN IN'
            )}
          </button>

          {/* Divider */}
          <div className={styles.divider}>
            <span className={styles.dividerLine} />
            <span className={styles.dividerText}>or continue with</span>
            <span className={styles.dividerLine} />
          </div>

          {/* Social Login Buttons */}
          <div className={styles.socialButtons}>
            <button
              type="button"
              onClick={() => handleSocialLogin('google')}
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
              onClick={() => handleSocialLogin('facebook')}
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
            <span className={styles.footerText}>Don't have an account?</span>
            <Link to="/signup" className={styles.footerLink}>Sign Up</Link>
          </div>
        </form>
      </motion.div>
    </AuthLayout>
  );
};
