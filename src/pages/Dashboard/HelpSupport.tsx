import React from 'react';
import { HelpCircle } from 'lucide-react';
import { PlaceholderPage } from './PlaceholderPage';

export const HelpSupport: React.FC = () => {
  return (
    <PlaceholderPage
      title="Help & Support"
      subtitle="Get help with your bookings and account"
      icon={<HelpCircle size={64} />}
      message="Help & Support"
    />
  );
};
