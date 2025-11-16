import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Room } from '../data/roomsData';

interface SpecialRequests {
  earlyCheckIn: boolean;
  lateCheckout: boolean;
  airportTransfer: boolean;
  highFloor: boolean;
  quietRoom: boolean;
  extraPillows: boolean;
  babyCot: boolean;
  additionalNotes: string;
}

interface PricingBreakdown {
  basePrice: number;
  nights: number;
  subtotal: number;
  cleaningFee: number;
  serviceFee: number;
  taxes: number;
  total: number;
  savings?: number;
}

interface GuestInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
}

interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  saveCard: boolean;
  billingAddress?: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface BookingData {
  roomId: string;
  roomName: string;
  roomImage: string;
  roomCategory: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  specialRequests: SpecialRequests;
  pricing: PricingBreakdown;
  guestInfo?: GuestInfo;
  agreedToTerms: boolean;
}

interface BookingResult {
  success: boolean;
  bookingId?: string;
  error?: string;
}

interface BookingContextType {
  bookingData: BookingData | null;
  setBookingData: (data: BookingData) => void;
  updateBookingData: (updates: Partial<BookingData>) => void;
  createBooking: (paymentInfo: PaymentInfo) => Promise<BookingResult>;
  clearBooking: () => void;
  isLoading: boolean;
  error: string | null;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [bookingData, setBookingDataState] = useState<BookingData | null>(() => {
    // Try to restore from localStorage
    const saved = localStorage.getItem('bookingData');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setBookingData = (data: BookingData) => {
    setBookingDataState(data);
    localStorage.setItem('bookingData', JSON.stringify(data));
  };

  const updateBookingData = (updates: Partial<BookingData>) => {
    if (bookingData) {
      const updated = { ...bookingData, ...updates };
      setBookingData(updated);
    }
  };

  const createBooking = async (paymentInfo: PaymentInfo): Promise<BookingResult> => {
    if (!bookingData) {
      return { success: false, error: 'No booking data found' };
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Simulate random failure (10% chance)
      if (Math.random() < 0.1) {
        throw new Error('Payment declined by your bank');
      }

      // Generate booking ID
      const bookingId = `GLM-${new Date().getFullYear()}-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`;

      // Store booking (in real app, this would be API call)
      const completedBooking = {
        ...bookingData,
        bookingId,
        paymentInfo: {
          last4: paymentInfo.cardNumber.slice(-4),
          cardType: 'Visa' // In real app, detect from card number
        },
        bookedAt: new Date().toISOString(),
        status: 'confirmed'
      };

      localStorage.setItem(`booking_${bookingId}`, JSON.stringify(completedBooking));

      setIsLoading(false);
      return { success: true, bookingId };
    } catch (err: any) {
      const errorMessage = err.message || 'Payment failed';
      setError(errorMessage);
      setIsLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  const clearBooking = () => {
    setBookingDataState(null);
    localStorage.removeItem('bookingData');
    setError(null);
  };

  const value: BookingContextType = {
    bookingData,
    setBookingData,
    updateBookingData,
    createBooking,
    clearBooking,
    isLoading,
    error
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

// Helper function to create booking from room
export const createBookingFromRoom = (
  room: Room,
  checkIn: string,
  checkOut: string,
  guests: number
): BookingData => {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));

  const basePrice = room.price;
  const subtotal = basePrice * nights;
  const cleaningFee = 75;
  const serviceFee = Math.round(subtotal * 0.05);
  const taxes = Math.round(subtotal * 0.15);
  const total = subtotal + cleaningFee + serviceFee + taxes;

  return {
    roomId: room.id,
    roomName: room.name,
    roomImage: room.images[0],
    roomCategory: room.category,
    checkIn,
    checkOut,
    guests,
    specialRequests: {
      earlyCheckIn: false,
      lateCheckout: false,
      airportTransfer: false,
      highFloor: false,
      quietRoom: false,
      extraPillows: false,
      babyCot: false,
      additionalNotes: ''
    },
    pricing: {
      basePrice,
      nights,
      subtotal,
      cleaningFee,
      serviceFee,
      taxes,
      total,
      savings: room.isAIRecommended ? 127 : undefined
    },
    agreedToTerms: false
  };
};
