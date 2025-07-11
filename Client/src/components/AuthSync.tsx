import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useAppDispatch } from '@/store/hooks';
import { fetchUserByEmail } from '@/store/slices/userSlice';
import { setTokenGetter } from '@/services/api';

export function AuthSync() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth();
  const dispatch = useAppDispatch();

  // Set up token getter for API calls
  useEffect(() => {
    if (isAuthenticated) {
      setTokenGetter(getAccessTokenSilently);
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  // Sync user data with backend
  useEffect(() => {
    if (isAuthenticated && !isLoading && user?.email) {
      dispatch(fetchUserByEmail({ email: user.email, auth0User: user }));
    }
  }, [dispatch, isAuthenticated, isLoading, user]);

  return null;
} 