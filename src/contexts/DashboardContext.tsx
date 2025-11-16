import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface Booking {
  id: string;
  bookingReference: string;
  roomId: string;
  roomName: string;
  roomImage: string;
  roomCategory: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  status: 'upcoming' | 'checked-in' | 'completed' | 'cancelled';
  total: number;
  preCheckInCompleted: boolean;
  createdAt: string;
  canCancel: boolean;
  canModify: boolean;
}

export interface UserStats {
  upcomingStays: number;
  loyaltyPoints: number;
  totalNights: number;
  actionsRequired: number;
}

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  gender?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

interface DashboardContextType {
  bookings: Booking[];
  upcomingBookings: Booking[];
  pastBookings: Booking[];
  cancelledBookings: Booking[];
  stats: UserStats;
  profileData: ProfileData | null;
  refreshBookings: () => Promise<void>;
  updateProfile: (data: Partial<ProfileData>) => Promise<void>;
  cancelBooking: (bookingId: string) => Promise<void>;
  getBookingById: (id: string) => Booking | undefined;
  isLoading: boolean;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize mock data
  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Load mock bookings
    const mockBookings: Booking[] = [
      {
        id: '1',
        bookingReference: 'GLM-2024-12345',
        roomId: 'deluxe-suite',
        roomName: 'Deluxe Ocean View Suite',
        roomImage: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800',
        roomCategory: 'SUITE',
        checkIn: '2024-12-20',
        checkOut: '2024-12-24',
        guests: 2,
        nights: 4,
        status: 'upcoming',
        total: 1531,
        preCheckInCompleted: false,
        createdAt: '2024-11-10T10:30:00Z',
        canCancel: true,
        canModify: true
      },
      {
        id: '2',
        bookingReference: 'GLM-2024-12346',
        roomId: 'premium-king',
        roomName: 'Premium King Room',
        roomImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
        roomCategory: 'PREMIUM',
        checkIn: '2025-01-15',
        checkOut: '2025-01-18',
        guests: 2,
        nights: 3,
        status: 'upcoming',
        total: 897,
        preCheckInCompleted: true,
        createdAt: '2024-11-12T14:20:00Z',
        canCancel: true,
        canModify: true
      },
      {
        id: '3',
        bookingReference: 'GLM-2024-11234',
        roomId: 'executive-suite',
        roomName: 'Executive Suite',
        roomImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
        roomCategory: 'SUITE',
        checkIn: '2024-10-10',
        checkOut: '2024-10-14',
        guests: 2,
        nights: 4,
        status: 'completed',
        total: 1680,
        preCheckInCompleted: true,
        createdAt: '2024-09-20T09:15:00Z',
        canCancel: false,
        canModify: false
      },
      {
        id: '4',
        bookingReference: 'GLM-2024-10123',
        roomId: 'standard-room',
        roomName: 'Standard Room',
        roomImage: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800',
        roomCategory: 'STANDARD',
        checkIn: '2024-09-05',
        checkOut: '2024-09-07',
        guests: 1,
        nights: 2,
        status: 'cancelled',
        total: 398,
        preCheckInCompleted: false,
        createdAt: '2024-08-25T16:45:00Z',
        canCancel: false,
        canModify: false
      }
    ];

    setBookings(mockBookings);

    // Load mock profile data
    const mockProfile: ProfileData = {
      fullName: user.fullName || 'John Doe',
      email: user.email,
      phone: user.phone || '+1 (555) 123-4567',
      dateOfBirth: '1990-05-15',
      gender: 'male',
      address: {
        street: '123 Main Street',
        city: 'San Francisco',
        state: 'CA',
        zip: '94102',
        country: 'United States'
      }
    };

    setProfileData(mockProfile);
    setIsLoading(false);
  };

  const refreshBookings = async () => {
    await loadDashboardData();
  };

  const updateProfile = async (data: Partial<ProfileData>) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setProfileData(prev => prev ? { ...prev, ...data } : null);
    setIsLoading(false);
  };

  const cancelBooking = async (bookingId: string) => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setBookings(prev => prev.map(booking =>
      booking.id === bookingId
        ? { ...booking, status: 'cancelled' as const, canCancel: false, canModify: false }
        : booking
    ));

    setIsLoading(false);
  };

  const getBookingById = (id: string) => {
    return bookings.find(b => b.id === id || b.bookingReference === id);
  };

  // Computed values
  const upcomingBookings = bookings.filter(b => b.status === 'upcoming');
  const pastBookings = bookings.filter(b => b.status === 'completed');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

  const stats: UserStats = {
    upcomingStays: upcomingBookings.length,
    loyaltyPoints: 1247,
    totalNights: bookings.reduce((total, b) => b.status === 'completed' ? total + b.nights : total, 0),
    actionsRequired: upcomingBookings.filter(b => !b.preCheckInCompleted).length
  };

  const value: DashboardContextType = {
    bookings,
    upcomingBookings,
    pastBookings,
    cancelledBookings,
    stats,
    profileData,
    refreshBookings,
    updateProfile,
    cancelBooking,
    getBookingById,
    isLoading
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};
