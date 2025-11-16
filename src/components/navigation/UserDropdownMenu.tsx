import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Calendar,
  ClipboardCheck,
  User,
  CreditCard,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './MainNavigation.module.css';

interface User {
  id?: string;
  name: string;
  email: string;
  avatar?: string;
  upcomingBookingsCount?: number;
  hasActivePreCheckIn?: boolean;
}

interface UserDropdownMenuProps {
  user: User | null;
  onClose: () => void;
}

export const UserDropdownMenu: React.FC<UserDropdownMenuProps> = ({ user, onClose }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

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

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: '/dashboard',
      badge: null,
    },
    {
      icon: Calendar,
      label: 'My Bookings',
      path: '/dashboard/bookings',
      badge: user?.upcomingBookingsCount || null,
    },
    {
      icon: ClipboardCheck,
      label: 'Pre-Check-In',
      path: '/dashboard',
      badge: user?.hasActivePreCheckIn ? '!' : null,
      badgeColor: 'alert',
    },
    { divider: true },
    {
      icon: User,
      label: 'Profile',
      path: '/dashboard/profile',
      badge: null,
    },
    {
      icon: CreditCard,
      label: 'Payments',
      path: '/dashboard/payments',
      badge: null,
    },
    { divider: true },
    {
      icon: HelpCircle,
      label: 'Help',
      path: '/dashboard/help',
      badge: null,
    },
  ];

  return (
    <motion.div
      ref={dropdownRef}
      className={styles.userDropdown}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      {/* User Info Header */}
      <div className={styles.dropdownHeader}>
        <div className={styles.dropdownUserName}>{user?.name || 'User'}</div>
        <div className={styles.dropdownUserEmail}>{user?.email || ''}</div>
      </div>

      {/* Menu Items */}
      <div className={styles.dropdownMenu}>
        {menuItems.map((item, index) => {
          if ('divider' in item && item.divider) {
            return <div key={`divider-${index}`} className={styles.dropdownDivider} />;
          }

          const Icon = item.icon!;
          return (
            <button
              key={item.path}
              className={styles.dropdownItem}
              onClick={() => handleNavigate(item.path!)}
            >
              <Icon size={18} />
              <span className={styles.dropdownItemLabel}>{item.label}</span>
              {item.badge && (
                <span
                  className={`${styles.dropdownBadge} ${
                    item.badgeColor === 'alert' ? styles.dropdownBadgeAlert : ''
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Sign Out */}
        <button
          className={`${styles.dropdownItem} ${styles.dropdownItemDanger}`}
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span className={styles.dropdownItemLabel}>Sign Out</span>
        </button>
      </div>
    </motion.div>
  );
};
