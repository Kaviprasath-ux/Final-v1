import React from 'react';
import { useParams } from 'react-router-dom';
import { PreCheckInProvider, usePreCheckIn } from '../../contexts/PreCheckInContext';
import { PreCheckInLayout } from './PreCheckInLayout';
import { PreCheckInWelcome } from './PreCheckInWelcome';
import { GuestInformation } from './GuestInformation';
import { AIRoomSelection } from './AIRoomSelection';
import { PreCheckInComplete } from './PreCheckInComplete';

const PreCheckInSteps: React.FC<{ bookingId: string }> = ({ bookingId }) => {
  const { currentStep, nextStep } = usePreCheckIn();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PreCheckInWelcome bookingId={bookingId} />;
      case 2:
        return <GuestInformation />;
      case 3:
        // ID Verification - simplified placeholder
        return (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <h2>ID Verification</h2>
            <p>Upload your government-issued ID</p>
            <button
              onClick={nextStep}
              style={{
                marginTop: '32px',
                padding: '16px 32px',
                background: '#A57865',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Skip for Now (Continue)
            </button>
          </div>
        );
      case 4:
        return <AIRoomSelection />;
      case 5:
        // Special Requests - simplified placeholder
        return (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <h2>Special Requests</h2>
            <p>Add any special preferences for your stay</p>
            <button
              onClick={nextStep}
              style={{
                marginTop: '32px',
                padding: '16px 32px',
                background: '#A57865',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Continue
            </button>
          </div>
        );
      case 6:
        // Payment Confirmation - simplified placeholder
        return (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <h2>Payment Confirmation</h2>
            <p>Your payment method is already on file</p>
            <button
              onClick={nextStep}
              style={{
                marginTop: '32px',
                padding: '16px 32px',
                background: '#A57865',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Confirm Payment
            </button>
          </div>
        );
      case 7:
        // Terms & Signature - simplified placeholder
        return (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <h2>Terms & Signature</h2>
            <p>Review and sign the guest agreement</p>
            <button
              onClick={nextStep}
              style={{
                marginTop: '32px',
                padding: '16px 32px',
                background: '#A57865',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Sign & Complete
            </button>
          </div>
        );
      case 8:
        return <PreCheckInComplete bookingId={bookingId} />;
      default:
        return <PreCheckInWelcome bookingId={bookingId} />;
    }
  };

  const hideNavigation = currentStep === 1 || currentStep === 8;

  return (
    <PreCheckInLayout hideNavigation={hideNavigation}>
      {renderStep()}
    </PreCheckInLayout>
  );
};

interface GuestSession {
  token: string;
  bookingId: string;
  email: string;
  guestName: string;
  expiresAt: string;
}

interface PreCheckInFlowProps {
  guestSession?: GuestSession | null;
}

export const PreCheckInFlow: React.FC<PreCheckInFlowProps> = ({ guestSession }) => {
  const { bookingId } = useParams<{ bookingId: string }>();

  if (!bookingId) {
    return <div>Booking ID not found</div>;
  }

  return (
    <PreCheckInProvider bookingId={bookingId}>
      <PreCheckInSteps bookingId={bookingId} />
    </PreCheckInProvider>
  );
};
