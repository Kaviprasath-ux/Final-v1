import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  ClipboardCheck,
  User,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useDashboard } from '../../contexts/DashboardContext';
import styles from './DashboardSidebar.module.css';

interface SidebarProps {
  onClose?: () => void;
}

export const DashboardSidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const { stats } = useDashboard();

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose?.();
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: '/dashboard',
      badge: null
    },
    {
      icon: Calendar,
      label: 'My Bookings',
      path: '/dashboard/bookings',
      badge: stats.upcomingStays > 0 ? stats.upcomingStays : null
    },
    {
      icon: ClipboardCheck,
      label: 'Pre-Check-In',
      path: '/dashboard/pre-check-in',
      badge: stats.actionsRequired > 0 ? '!' : null,
      badgeType: 'alert' as const
    },
    {
      icon: User,
      label: 'Profile',
      path: '/dashboard/profile',
      badge: null
    },
    {
      icon: CreditCard,
      label: 'Payment Methods',
      path: '/dashboard/payments',
      badge: null
    },
    {
      icon: Settings,
      label: 'Preferences',
      path: '/dashboard/preferences',
      badge: null
    }
  ];

  const bottomNavItems = [
    {
      icon: HelpCircle,
      label: 'Help & Support',
      path: '/dashboard/help',
      badge: null
    }
  ];

  return (
    <div className={styles.sidebar}>
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <button
            key={item.path}
            className={`${styles.navItem} ${isActive(item.path) ? styles.active : ''}`}
            onClick={() => handleNavigate(item.path)}
          >
            <item.icon size={20} />
            <span className={styles.navLabel}>{item.label}</span>
            {item.badge && (
              <span className={`${styles.badge} ${item.badgeType === 'alert' ? styles.badgeAlert : ''}`}>
                {item.badge}
              </span>
            )}
          </button>
        ))}

        <div className={styles.divider} />

        {bottomNavItems.map((item) => (
          <button
            key={item.path}
            className={`${styles.navItem} ${isActive(item.path) ? styles.active : ''}`}
            onClick={() => handleNavigate(item.path)}
          >
            <item.icon size={20} />
            <span className={styles.navLabel}>{item.label}</span>
          </button>
        ))}

        <button className={styles.navItem} onClick={handleLogout}>
          <LogOut size={20} />
          <span className={styles.navLabel}>Sign Out</span>
        </button>
      </nav>
    </div>
  );
};
