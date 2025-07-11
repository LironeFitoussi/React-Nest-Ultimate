import { Navigate, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useUser } from '../hooks/useUser';

interface ProtectedRouteProps {
  element: React.ReactElement | null;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ element, allowedRoles = [] }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth0();
  const { user } = useUser();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  // If no user data is loaded yet, redirect to signin
  if (!user) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  // Check if user has required role
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  if (!element) {
    throw new Error('ProtectedRoute: element prop is null or undefined');
  }

  return element;
};

export default ProtectedRoute; 