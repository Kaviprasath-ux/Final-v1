import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Loader } from 'lucide-react';

/**
 * GuestRoute - Only accessible when NOT authenticated
 * If authenticated, redirects to dashboard
 * Used for: Login, SignUp pages
 */
const GuestRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FAFAFA'
      }}>
        <Loader
          size={48}
          color="#A57865"
          style={{ animation: 'spin 1s linear infinite' }}
        />
      </div>
    );
  }

  // Already authenticated - redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Not authenticated - render child routes (login/signup page)
  return <Outlet />;
};

export default GuestRoute;
