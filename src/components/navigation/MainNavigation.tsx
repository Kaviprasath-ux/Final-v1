import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Menu, Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { UserDropdownMenu } from './UserDropdownMenu';
import { MobileDrawer } from './MobileDrawer';
import styles from './MainNavigation.module.css';

const MainNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);
  const [notificationCount] = useState(2); // Mock notification count

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      // Check initial scroll position
      handleScroll();
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setShowUserDropdown(false);
    setShowMobileDrawer(false);
  }, [location.pathname]);

  const isHomePage = location.pathname === '/';
  const isTransparent = isHomePage && !isScrolled;

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Rooms', path: '/rooms' },
    { label: 'Amenities', path: '/amenities' },
    {
      label: 'Pre-Check-In',
      path: '/dashboard/pre-check-in'
    },
    { label: 'Contact', path: '/contact' },
  ];

  const handleSignIn = () => {
    const currentPath = location.pathname;
    const returnUrl = currentPath !== '/' ? currentPath : '/dashboard';
    navigate(`/login?returnUrl=${encodeURIComponent(returnUrl)}`);
  };

  const handleBookNow = () => {
    navigate('/rooms');
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
    <>
      <nav
        className={`${styles.navigation} ${isTransparent ? styles.transparent : styles.solid}`}
      >
        <div className={styles.container}>
          {/* Logo */}
          <div
            className={styles.logo}
            onClick={() => navigate('/')}
          >
            GLIMMORA
          </div>

          {/* Center Menu - Desktop Only */}
          <div className={styles.menuItems}>
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${styles.menuItem} ${
                  location.pathname === item.path ? styles.active : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className={styles.actions}>
            {isAuthenticated ? (
              <>
                {/* Notifications Icon */}
                <button
                  className={styles.notificationButton}
                  onClick={() => navigate('/dashboard')}
                  aria-label="Notifications"
                >
                  <Bell size={20} />
                  {notificationCount > 0 && (
                    <span className={styles.notificationBadge} />
                  )}
                </button>

                {/* User Avatar Dropdown */}
                <div className={styles.userMenuContainer}>
                  <button
                    className={styles.avatarButton}
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    aria-label="User menu"
                  >
                    <div className={styles.avatar}>
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          onError={(e) => {
                            // Fallback to initials if image fails
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove(styles.hidden);
                          }}
                        />
                      ) : null}
                      <span className={user?.avatar ? styles.hidden : ''}>
                        {user ? getInitials(user.name) : 'U'}
                      </span>
                    </div>
                    <span className={styles.userName}>
                      {user?.name || 'User'}
                    </span>
                  </button>

                  {showUserDropdown && (
                    <UserDropdownMenu
                      user={user}
                      onClose={() => setShowUserDropdown(false)}
                    />
                  )}
                </div>

                {/* Book Now Button */}
                <button
                  className={styles.bookNowButton}
                  onClick={handleBookNow}
                >
                  BOOK NOW
                </button>

                {/* Mobile Hamburger */}
                <button
                  className={styles.hamburger}
                  onClick={() => setShowMobileDrawer(true)}
                  aria-label="Open menu"
                >
                  <Menu size={24} />
                </button>
              </>
            ) : (
              <>
                {/* Sign In Button - Desktop */}
                <button
                  className={styles.signInButton}
                  onClick={handleSignIn}
                >
                  Sign In
                </button>

                {/* Book Now Button */}
                <button
                  className={styles.bookNowButton}
                  onClick={handleBookNow}
                >
                  BOOK NOW
                </button>

                {/* Mobile Hamburger */}
                <button
                  className={styles.hamburger}
                  onClick={() => setShowMobileDrawer(true)}
                  aria-label="Open menu"
                >
                  <Menu size={24} />
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {showMobileDrawer && (
        <MobileDrawer
          menuItems={menuItems}
          isAuthenticated={isAuthenticated}
          user={user}
          onClose={() => setShowMobileDrawer(false)}
          onSignIn={handleSignIn}
          onBookNow={handleBookNow}
        />
      )}

      {/* Dropdown Backdrop */}
      {showUserDropdown && (
        <div
          className={styles.dropdownBackdrop}
          onClick={() => setShowUserDropdown(false)}
        />
      )}
    </>
  );
};

export default MainNavigation;
