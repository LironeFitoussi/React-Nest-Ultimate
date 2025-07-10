import { useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchUserByEmail } from '@/store/slices/userSlice';
import { resetSync } from '@/store/slices/authSyncSlice';
import { setTokenGetter } from '@/services/api';
import { useAuth0 } from '@auth0/auth0-react';

export function AuthSync() {
  const { user, isAuthenticated, isLoading: isAuth0Loading } = useAuth();
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const syncAttempted = useRef(false);
  const { isInitialSyncComplete } = useAppSelector((state) => state.authSync);

  // Set up API token getter
  useEffect(() => {
    if (!getAccessTokenSilently) return;

    // Set up the token getter with proper type handling
    setTokenGetter(() => getAccessTokenSilently());
  }, [getAccessTokenSilently]);

  // Handle user sync
  useEffect(() => {
    // Reset sync state when auth state changes
    if (!isAuthenticated) {
      dispatch(resetSync());
      syncAttempted.current = false;
      return;
    }

    // Don't proceed if still loading Auth0
    if (isAuth0Loading) {
      return;
    }

    // Only sync if we haven't attempted it yet and have user data
    if (!syncAttempted.current && user?.email && !isInitialSyncComplete) {
      syncAttempted.current = true;
      
      // Pass the entire Auth0 user object to handle user creation if needed
      dispatch(fetchUserByEmail({
        email: user.email,
        auth0User: user
      }));
    }
  }, [
    isAuthenticated,
    isAuth0Loading,
    user,
    dispatch,
    isInitialSyncComplete
  ]);

  // Return a fragment instead of null to ensure proper React rendering
  return <></>;
} 