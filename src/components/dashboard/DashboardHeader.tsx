import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, ChevronDown, User, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './DashboardHeader.module.css';

export const DashboardHeader: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
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

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        {/* Logo */}
        <div className={styles.logo} onClick={() => navigate('/')}>
          GLIMMORA
        </div>

        {/* Right Side */}
        <div className={styles.rightSide}>
          {/* Search Icon */}
          <button className={styles.iconButton} title="Search">
            <Search size={20} />
          </button>

          {/* Notifications */}
          <div className={styles.dropdown}>
            <button
              className={styles.iconButton}
              onClick={() => setShowNotifications(!showNotifications)}
              title="Notifications"
            >
              <Bell size={20} />
              <span className={styles.badge} />
            </button>

            {showNotifications && (
              <div className={styles.dropdownMenu}>
                <div className={styles.dropdownHeader}>Notifications</div>
                <div className={styles.notificationItem}>
                  <div className={styles.notificationTitle}>Pre-check-in Available</div>
                  <div className={styles.notificationText}>
                    Complete pre-check-in for your upcoming stay
                  </div>
                  <div className={styles.notificationTime}>2 hours ago</div>
                </div>
                <div className={styles.notificationItem}>
                  <div className={styles.notificationTitle}>Booking Confirmed</div>
                  <div className={styles.notificationText}>
                    Your reservation GLM-2024-12346 is confirmed
                  </div>
                  <div className={styles.notificationTime}>1 day ago</div>
                </div>
                <div className={styles.dropdownFooter}>View all notifications</div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className={styles.dropdown}>
            <button
              className={styles.userButton}
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className={styles.avatar}>
                {getInitials(user?.fullName || 'User')}
              </div>
              <span className={styles.userName}>{user?.fullName || 'User'}</span>
              <ChevronDown size={16} />
            </button>

            {showUserMenu && (
              <div className={styles.dropdownMenu}>
                <div
                  className={styles.menuItem}
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/dashboard/profile');
                  }}
                >
                  <User size={18} />
                  View Profile
                </div>
                <div
                  className={styles.menuItem}
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/dashboard/preferences');
                  }}
                >
                  <Settings size={18} />
                  Settings
                </div>
                <div
                  className={styles.menuItem}
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/dashboard/help');
                  }}
                >
                  <HelpCircle size={18} />
                  Help & Support
                </div>
                <div className={styles.menuDivider} />
                <div className={styles.menuItem} onClick={handleLogout}>
                  <LogOut size={18} />
                  Sign Out
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
