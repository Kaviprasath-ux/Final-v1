import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface GuestInfo {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  gender?: string;
  address: {
    street: string;
    apartment?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export interface IDVerification {
  idType: 'passport' | 'drivers-license' | 'national-id' | 'other';
  idFile?: File;
  idFileUrl?: string;
  verified: boolean;
}

export interface RoomSelection {
  roomId: string;
  roomNumber: string;
  roomName: string;
  roomImage: string;
  roomCategory: string;
  floor: number;
  view: string;
  size: number;
  bedType: string;
  price: number;
  isAIRecommended: boolean;
  aiReasons?: string[];
}

export interface SpecialRequest {
  arrivalTime: string;
  flightNumber?: string;
  transportation: 'self-driving' | 'taxi' | 'shuttle' | 'hotel-transfer';
  roomPreferences: string[];
  amenities: string[];
  specialOccasion?: string;
  accessibility: string[];
  additionalNotes?: string;
}

export interface PreCheckInData {
  bookingId: string;
  step: number;
  completed: boolean;
  guestInfo: GuestInfo | null;
  idVerification: IDVerification | null;
  roomSelection: RoomSelection | null;
  specialRequests: SpecialRequest | null;
  termsAccepted: boolean;
  signature?: string;
  digitalKeyIssued: boolean;
  completedAt?: string;
}

interface PreCheckInContextType {
  preCheckInData: PreCheckInData;
  currentStep: number;
  totalSteps: number;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateGuestInfo: (info: Partial<GuestInfo>) => void;
  updateIDVerification: (verification: Partial<IDVerification>) => void;
  updateRoomSelection: (room: RoomSelection) => void;
  updateSpecialRequests: (requests: Partial<SpecialRequest>) => void;
  updateSignature: (signature: string) => void;
  completePreCheckIn: () => void;
  saveProgress: () => void;
  loadProgress: (bookingId: string) => void;
  isStepComplete: (step: number) => boolean;
}

const PreCheckInContext = createContext<PreCheckInContextType | undefined>(undefined);

export const usePreCheckIn = () => {
  const context = useContext(PreCheckInContext);
  if (!context) {
    throw new Error('usePreCheckIn must be used within a PreCheckInProvider');
  }
  return context;
};

interface PreCheckInProviderProps {
  children: ReactNode;
  bookingId: string;
}

export const PreCheckInProvider: React.FC<PreCheckInProviderProps> = ({ children, bookingId }) => {
  const [currentStep, setCurrentStepState] = useState(1);
  const totalSteps = 8;

  const [preCheckInData, setPreCheckInData] = useState<PreCheckInData>(() => {
    // Try to load saved progress
    const saved = localStorage.getItem(`preCheckIn_${bookingId}`);
    if (saved) {
      return JSON.parse(saved);
    }

    return {
      bookingId,
      step: 1,
      completed: false,
      guestInfo: null,
      idVerification: null,
      roomSelection: null,
      specialRequests: null,
      termsAccepted: false,
      digitalKeyIssued: false
    };
  });

  const saveProgress = () => {
    localStorage.setItem(`preCheckIn_${bookingId}`, JSON.stringify(preCheckInData));
  };

  const loadProgress = (id: string) => {
    const saved = localStorage.getItem(`preCheckIn_${id}`);
    if (saved) {
      const data = JSON.parse(saved);
      setPreCheckInData(data);
      setCurrentStepState(data.step);
    }
  };

  const setCurrentStep = (step: number) => {
    setCurrentStepState(step);
    setPreCheckInData(prev => ({ ...prev, step }));
    saveProgress();
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateGuestInfo = (info: Partial<GuestInfo>) => {
    setPreCheckInData(prev => ({
      ...prev,
      guestInfo: prev.guestInfo ? { ...prev.guestInfo, ...info } : info as GuestInfo
    }));
    saveProgress();
  };

  const updateIDVerification = (verification: Partial<IDVerification>) => {
    setPreCheckInData(prev => ({
      ...prev,
      idVerification: prev.idVerification
        ? { ...prev.idVerification, ...verification }
        : verification as IDVerification
    }));
    saveProgress();
  };

  const updateRoomSelection = (room: RoomSelection) => {
    setPreCheckInData(prev => ({
      ...prev,
      roomSelection: room
    }));
    saveProgress();
  };

  const updateSpecialRequests = (requests: Partial<SpecialRequest>) => {
    setPreCheckInData(prev => ({
      ...prev,
      specialRequests: prev.specialRequests
        ? { ...prev.specialRequests, ...requests }
        : requests as SpecialRequest
    }));
    saveProgress();
  };

  const updateSignature = (signature: string) => {
    setPreCheckInData(prev => ({
      ...prev,
      signature,
      termsAccepted: true
    }));
    saveProgress();
  };

  const completePreCheckIn = () => {
    setPreCheckInData(prev => ({
      ...prev,
      completed: true,
      digitalKeyIssued: true,
      completedAt: new Date().toISOString()
    }));
    saveProgress();
  };

  const isStepComplete = (step: number): boolean => {
    switch (step) {
      case 1: return true; // Welcome step
      case 2: return !!preCheckInData.guestInfo;
      case 3: return !!preCheckInData.idVerification?.verified;
      case 4: return !!preCheckInData.roomSelection;
      case 5: return !!preCheckInData.specialRequests;
      case 6: return true; // Payment confirmation (already paid)
      case 7: return preCheckInData.termsAccepted;
      case 8: return preCheckInData.completed;
      default: return false;
    }
  };

  const value: PreCheckInContextType = {
    preCheckInData,
    currentStep,
    totalSteps,
    setCurrentStep,
    nextStep,
    prevStep,
    updateGuestInfo,
    updateIDVerification,
    updateRoomSelection,
    updateSpecialRequests,
    updateSignature,
    completePreCheckIn,
    saveProgress,
    loadProgress,
    isStepComplete
  };

  return (
    <PreCheckInContext.Provider value={value}>
      {children}
    </PreCheckInContext.Provider>
  );
};
