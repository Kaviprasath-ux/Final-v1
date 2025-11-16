import React from 'react';

interface MinimalLayoutProps {
  children: React.ReactNode;
}

/**
 * MinimalLayout - Used for flows that need no navigation/footer
 * Just the page content, nothing else
 * Used by: Booking flow, Pre-check-in flow (when they have their own internal navigation)
 */
const MinimalLayout: React.FC<MinimalLayoutProps> = ({ children }) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'white'
    }}>
      {children}
    </div>
  );
};

export default MinimalLayout;
