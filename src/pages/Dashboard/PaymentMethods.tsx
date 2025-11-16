import React from 'react';
import { CreditCard } from 'lucide-react';
import { PlaceholderPage } from './PlaceholderPage';

export const PaymentMethods: React.FC = () => {
  return (
    <PlaceholderPage
      title="Payment Methods"
      subtitle="Manage your saved payment methods"
      icon={<CreditCard size={64} />}
      message="Payment Methods"
    />
  );
};
