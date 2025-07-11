import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useUser } from '../hooks/useUser';
import LoadingSpinner from './Atoms/LoadingSpinner';

interface ProtectedRouteProps {
  element: React.ReactElement | null;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ element, allowedRoles = [] }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const { user, isLoading: isUserLoading } = useUser();
  const location = useLocation();

  // Debug logging
  // console.log('ProtectedRoute Debug:', {
  //   pathname: location.pathname,
  //   isAuthenticated,
  //   isAuthLoading,
  //   isUserLoading,
  //   hasUser: !!user,
  //   userEmail: user?.email
  // });

  // Show loading state while authentication is being determined
  if (isAuthLoading) {
    return <LoadingSpinner text="Checking authentication..." />;
  }

  // If not authenticated, redirect to auth page
  if (!isAuthenticated) {
    console.log('Redirecting to /auth - not authenticated');
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If authenticated but user data is still loading, show loading
  if (isUserLoading) {
    return <LoadingSpinner text="Loading user profile..." />;
  }

  // If authenticated but no user data (and not loading), allow access
  // The user data might load in the background or might not be required
  if (!user && !isUserLoading) {
    console.warn('User authenticated but no user data available - allowing access');
  }

  // Check if user has required role (only if user data is available)
  if (user && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    console.log('Redirecting to / - insufficient role');
    return <Navigate to="/" replace />;
  }

  if (!element) {
    throw new Error('ProtectedRoute: element prop is null or undefined');
  }

  // console.log('ProtectedRoute: Rendering element');
  return element;
};

export default ProtectedRoute; 