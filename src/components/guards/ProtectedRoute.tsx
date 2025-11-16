import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Loader } from 'lucide-react';

/**
 * ProtectedRoute - Requires user to be authenticated
 * If not authenticated, redirects to login with return URL
 * Used for: Dashboard, Booking flow (when auth required)
 */
const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

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

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    // Save the location they were trying to access
    const returnUrl = location.pathname + location.search;
    return <Navigate to={`/login?returnUrl=${encodeURIComponent(returnUrl)}`} replace />;
  }

  // Authenticated - render child routes
  return <Outlet />;
};

export default ProtectedRoute;
