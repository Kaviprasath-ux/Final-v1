import React from 'react';
import { Settings } from 'lucide-react';
import { PlaceholderPage } from './PlaceholderPage';

export const Preferences: React.FC = () => {
  return (
    <PlaceholderPage
      title="Preferences"
      subtitle="Customize your experience"
      icon={<Settings size={64} />}
      message="Preferences"
    />
  );
};
