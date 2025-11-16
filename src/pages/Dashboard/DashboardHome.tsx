import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  Hotel,
  ClipboardCheck,
  CreditCard,
  Users,
  BedDouble,
  Clock,
  MoreVertical,
  Star,
  Award,
  Crown,
  TrendingUp,
  Activity as ActivityIcon,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './DashboardHome.module.css';

// Mock Data
const mockUpcomingBookings = [
  {
    id: '1',
    reference: 'GLM-2024-12345',
    roomName: 'Deluxe Ocean View Suite',
    checkIn: '2024-12-25',
    checkOut: '2024-12-28',
    guests: 2,
    bedType: 'King Bed',
    status: 'confirmed' as const,
    daysAway: 3,
    preCheckInEligible: true,
    nights: 3,
  },
  {
    id: '2',
    reference: 'GLM-2024-12346',
    roomName: 'Standard Room',
    checkIn: '2025-01-15',
    checkOut: '2025-01-18',
    guests: 1,
    bedType: 'Queen Bed',
    status: 'confirmed' as const,
    daysAway: 45,
    preCheckInEligible: false,
    nights: 3,
  },
];

const mockRecentActivity = [
  {
    id: '1',
    type: 'booking' as const,
    title: 'Booking confirmed for Dec 25-28',
    details: 'Deluxe Ocean View Suite • Booking #GLM-12345',
    timestamp: '2 hours ago',
    link: '/dashboard/bookings/1',
  },
  {
    id: '2',
    type: 'payment' as const,
    title: 'Payment processed successfully',
    details: '$1,299.00 • Visa ending in 4242',
    timestamp: 'Yesterday at 3:45 PM',
    link: '/dashboard/payments',
  },
  {
    id: '3',
    type: 'checkin' as const,
    title: 'Pre-check-in completed',
    details: 'Digital key ready • Room 305',
    timestamp: 'Dec 10, 2024',
    link: '/dashboard/pre-check-in',
  },
  {
    id: '4',
    type: 'modification' as const,
    title: 'Room upgraded to suite',
    details: 'Standard Room → Ocean View Suite',
    timestamp: 'Dec 8, 2024',
  },
  {
    id: '5',
    type: 'booking' as const,
    title: 'New booking created',
    details: 'Standard Room • Jan 15-18, 2025',
    timestamp: 'Dec 5, 2024',
    link: '/dashboard/bookings/2',
  },
];

const mockStats = {
  totalBookings: 12,
  rewardPoints: 2450,
  memberSince: 'Jan 2023',
  loyaltyTier: 'Gold',
};

export const DashboardHome: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activityFilter, setActivityFilter] = useState<'all' | 'bookings' | 'payments'>('all');

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const quickActions = [
    {
      icon: Hotel,
      title: 'Book a Room',
      description: 'Find your perfect stay',
      onClick: () => navigate('/rooms'),
      badge: null,
    },
    {
      icon: Calendar,
      title: 'My Bookings',
      description: 'Manage reservations',
      onClick: () => navigate('/dashboard/bookings'),
      badge: mockUpcomingBookings.length > 0 ? mockUpcomingBookings.length : null,
    },
    {
      icon: ClipboardCheck,
      title: 'Pre Check-In',
      description: 'Complete online check-in',
      onClick: () => navigate('/dashboard/pre-check-in'),
      badge: mockUpcomingBookings.filter(b => b.preCheckInEligible).length > 0 ? '!' : null,
    },
    {
      icon: CreditCard,
      title: 'Payments',
      description: 'Manage payment methods',
      onClick: () => navigate('/dashboard/payments'),
      badge: null,
    },
  ];

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'booking':
        return '#27AE60';
      case 'payment':
        return '#2196F3';
      case 'checkin':
        return '#A57865';
      case 'modification':
        return '#FFA500';
      default:
        return '#808080';
    }
  };

  const filteredActivity = activityFilter === 'all'
    ? mockRecentActivity
    : mockRecentActivity.filter(activity => {
        if (activityFilter === 'bookings') return activity.type === 'booking' || activity.type === 'checkin';
        if (activityFilter === 'payments') return activity.type === 'payment';
        return true;
      });

  return (
    <div className={styles.dashboardHome}>
      {/* Welcome Section */}
      <motion.div
        className={styles.welcomeSection}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.welcomeLeft}>
          <h1 className={styles.welcomeTitle}>Welcome back, {user?.name || 'Guest'}!</h1>
          <p className={styles.welcomeSubtitle}>Here's what's happening with your stays today</p>
        </div>
        <div className={styles.welcomeRight}>
          <div className={styles.dateDisplay}>
            <Calendar size={18} />
            <span>{currentDate}</span>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <section className={styles.quickActionsSection}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <div className={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              className={styles.actionCard}
              onClick={action.onClick}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              {action.badge !== null && (
                <div className={`${styles.actionBadge} ${action.badge === '!' ? styles.actionBadgeAlert : styles.actionBadgeCount}`}>
                  {action.badge}
                </div>
              )}
              <div className={styles.actionIcon}>
                <action.icon size={24} />
              </div>
              <div className={styles.actionContent}>
                <h3 className={styles.actionTitle}>{action.title}</h3>
                <p className={styles.actionDescription}>{action.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Upcoming Stays */}
      <section className={styles.upcomingStaysSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Your Upcoming Stays</h2>
          <button className={styles.viewAllLink} onClick={() => navigate('/dashboard/bookings')}>
            View All →
          </button>
        </div>

        {mockUpcomingBookings.length === 0 ? (
          <motion.div
            className={styles.emptyState}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Calendar size={48} color="#E8E4E0" />
            <h3 className={styles.emptyTitle}>No upcoming stays</h3>
            <p className={styles.emptyDescription}>Book a room to see your reservations here</p>
            <button className={styles.browseRoomsButton} onClick={() => navigate('/rooms')}>
              BROWSE ROOMS
            </button>
          </motion.div>
        ) : (
          <div className={styles.bookingsContainer}>
            {mockUpcomingBookings.slice(0, 2).map((booking, index) => (
              <motion.div
                key={booking.id}
                className={styles.bookingCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className={styles.bookingLeft}>
                  <div className={styles.bookingHeader}>
                    <span className={styles.bookingReference}>Booking #{booking.reference}</span>
                    <div className={`${styles.statusBadge} ${styles.statusConfirmed}`}>
                      <div className={styles.statusDot} />
                      <span>Confirmed</span>
                    </div>
                  </div>
                  <h3 className={styles.roomName}>{booking.roomName}</h3>
                  <div className={styles.bookingDetails}>
                    <div className={styles.detailItem}>
                      <Calendar size={16} />
                      <span>
                        {new Date(booking.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(booking.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} ({booking.nights} nights)
                      </span>
                    </div>
                    <div className={styles.detailItem}>
                      <Users size={16} />
                      <span>{booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <BedDouble size={16} />
                      <span>{booking.bedType}</span>
                    </div>
                  </div>
                </div>

                <div className={styles.bookingRight}>
                  <div className={styles.countdownBadge}>
                    <div className={styles.daysAway}>{booking.daysAway} days away</div>
                    <div className={styles.checkInDate}>
                      Check-in: {new Date(booking.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                  <div className={styles.actionButtons}>
                    {booking.preCheckInEligible && (
                      <button
                        className={styles.preCheckInButton}
                        onClick={() => navigate('/dashboard/pre-check-in')}
                      >
                        Pre Check-In
                      </button>
                    )}
                    <button
                      className={styles.viewDetailsButton}
                      onClick={() => navigate(`/dashboard/bookings/${booking.id}`)}
                    >
                      Details
                    </button>
                    <button className={styles.manageButton}>
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Two-Column Layout */}
      <div className={styles.twoColumnLayout}>
        {/* Recent Activity */}
        <motion.div
          className={styles.recentActivitySection}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className={styles.activityHeader}>
            <h2 className={styles.sectionTitle}>Recent Activity</h2>
            <div className={styles.filterTabs}>
              <button
                className={`${styles.filterTab} ${activityFilter === 'all' ? styles.filterTabActive : ''}`}
                onClick={() => setActivityFilter('all')}
              >
                All
              </button>
              <button
                className={`${styles.filterTab} ${activityFilter === 'bookings' ? styles.filterTabActive : ''}`}
                onClick={() => setActivityFilter('bookings')}
              >
                Bookings
              </button>
              <button
                className={`${styles.filterTab} ${activityFilter === 'payments' ? styles.filterTabActive : ''}`}
                onClick={() => setActivityFilter('payments')}
              >
                Payments
              </button>
            </div>
          </div>

          {filteredActivity.length === 0 ? (
            <div className={styles.activityEmpty}>
              <ActivityIcon size={40} color="#E8E4E0" />
              <p className={styles.emptyText}>No recent activity</p>
              <p className={styles.emptySubtext}>Your activity will appear here</p>
            </div>
          ) : (
            <>
              <div className={styles.activityTimeline}>
                {filteredActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    className={styles.activityItem}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <div
                      className={styles.timelineDot}
                      style={{ background: getActivityColor(activity.type) }}
                    />
                    <div className={styles.activityContent}>
                      <div className={styles.activityTitle}>{activity.title}</div>
                      <div className={styles.activityDetails}>{activity.details}</div>
                      <div className={styles.activityTimestamp}>
                        <Clock size={12} />
                        <span>{activity.timestamp}</span>
                      </div>
                      {activity.link && (
                        <button
                          className={styles.activityLink}
                          onClick={() => navigate(activity.link)}
                        >
                          View booking →
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              <button className={styles.showMoreButton}>Show More</button>
            </>
          )}
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className={styles.quickStatsSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <h2 className={styles.sectionTitle}>Your Stats</h2>

          <div className={styles.statsCards}>
            {/* Total Bookings */}
            <div className={styles.statCard}>
              <Calendar size={32} />
              <div className={styles.statLabel}>Total Bookings</div>
              <div className={styles.statValue}>{mockStats.totalBookings}</div>
              <div className={styles.statChange}>
                <TrendingUp size={14} />
                <span>+2 this year</span>
              </div>
            </div>

            {/* Reward Points */}
            <div className={styles.statCard}>
              <Star size={32} />
              <div className={styles.statLabel}>Reward Points</div>
              <div className={styles.statValue}>{mockStats.rewardPoints.toLocaleString()}</div>
              <div className={styles.statChange}>
                <TrendingUp size={14} />
                <span>+150 this month</span>
              </div>
            </div>

            {/* Member Since */}
            <div className={styles.statCard}>
              <Award size={32} />
              <div className={styles.statLabel}>Member Since</div>
              <div className={styles.statValue}>{mockStats.memberSince}</div>
              <div className={styles.statSubtext}>2 years with us</div>
            </div>
          </div>

          {/* Loyalty Badge */}
          <div className={styles.loyaltyBadge}>
            <Crown size={24} />
            <div className={styles.badgeText}>GOLD MEMBER</div>
            <div className={styles.badgeSubtext}>Enjoy exclusive benefits</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardHome;
