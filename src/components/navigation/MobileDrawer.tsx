import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  X,
  Home,
  Building2,
  Sparkles,
  ClipboardCheck,
  Mail,
  LayoutDashboard,
  Calendar,
  User,
  CreditCard,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './MainNavigation.module.css';

interface MenuItem {
  label: string;
  path: string;
}

interface User {
  id?: string;
  name: string;
  email: string;
  avatar?: string;
}

interface MobileDrawerProps {
  menuItems: MenuItem[];
  isAuthenticated: boolean;
  user: User | null;
  onClose: () => void;
  onSignIn: () => void;
  onBookNow: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  menuItems,
  isAuthenticated,
  user,
  onClose,
  onSignIn,
  onBookNow,
}) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    logout();
    onClose();
    navigate('/');
  };

  const handleSignInClick = () => {
    onSignIn();
    onClose();
  };

  const handleBookNowClick = () => {
    onBookNow();
    onClose();
  };

  const getInitials = (name: string | undefined | null): string => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getMenuIcon = (label: string) => {
    const iconMap: { [key: string]: any } = {
      'Home': Home,
      'Rooms': Building2,
      'Amenities': Sparkles,
      'Pre-Check-In': ClipboardCheck,
      'Contact': Mail,
    };
    const Icon = iconMap[label] || Home;
    return <Icon size={20} />;
  };

  const dashboardMenuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Calendar, label: 'My Bookings', path: '/dashboard/bookings' },
    { icon: ClipboardCheck, label: 'Pre-Check-In', path: '/dashboard/pre-check-in' },
    { icon: User, label: 'Profile', path: '/dashboard/profile' },
    { icon: CreditCard, label: 'Payments', path: '/dashboard/payments' },
    { icon: HelpCircle, label: 'Help', path: '/dashboard/help' },
  ];

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className={styles.mobileBackdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />

      {/* Drawer */}
      <motion.div
        className={styles.mobileDrawer}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
      >
        {/* Header */}
        <div className={styles.mobileHeader}>
          <div className={styles.mobileLogo}>GLIMMORA</div>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
        </div>

        {/* User Section (if authenticated) */}
        {isAuthenticated && user && (
          <div className={styles.mobileUserSection}>
            <div className={styles.mobileAvatar}>
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                <span>{getInitials(user.name)}</span>
              )}
            </div>
            <div className={styles.mobileUserInfo}>
              <div className={styles.mobileUserName}>{user.name}</div>
              <div className={styles.mobileUserEmail}>{user.email}</div>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <div className={styles.mobileNav}>
          <div className={styles.mobileNavSection}>
            <div className={styles.mobileNavTitle}>Menu</div>
            {menuItems.map((item) => (
              <button
                key={item.path}
                className={styles.mobileNavItem}
                onClick={() => handleNavigate(item.path)}
              >
                {getMenuIcon(item.label)}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Dashboard Links (if authenticated) */}
          {isAuthenticated && (
            <div className={styles.mobileNavSection}>
              <div className={styles.mobileNavTitle}>Account</div>
              {dashboardMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    className={styles.mobileNavItem}
                    onClick={() => handleNavigate(item.path)}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className={styles.mobileActions}>
          <button
            className={styles.mobileBookButton}
            onClick={handleBookNowClick}
          >
            BOOK NOW
          </button>

          {isAuthenticated ? (
            <button
              className={styles.mobileSignOutButton}
              onClick={handleLogout}
            >
              <LogOut size={20} />
              Sign Out
            </button>
          ) : (
            <button
              className={styles.mobileSignInButton}
              onClick={handleSignInClick}
            >
              Sign In
            </button>
          )}
        </div>

        {/* Footer */}
        <div className={styles.mobileFooter}>
          <p className={styles.mobileCopyright}>
            © 2024 Glimmora Hotel. All rights reserved.
          </p>
        </div>
      </motion.div>
    </>
  );
};
