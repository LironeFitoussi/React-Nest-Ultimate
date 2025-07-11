import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

interface AuthState {
  auth0IsAuthenticated: boolean;
  hasCheckedStorage: boolean;
  hasLocalToken: boolean;
  finalIsAuthenticated: boolean;
}

export function useAuth() {
  const {
    user,
    isAuthenticated: auth0IsAuthenticated,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();

  const [authState, setAuthState] = useState<AuthState>({
    auth0IsAuthenticated: false,
    hasCheckedStorage: false,
    hasLocalToken: false,
    finalIsAuthenticated: false,
  });

  useEffect(() => {
    setAuthState(prev => ({
      ...prev,
      auth0IsAuthenticated,
      finalIsAuthenticated: auth0IsAuthenticated,
    }));
  }, [auth0IsAuthenticated]);

  return {
    user,
    isAuthenticated: authState.finalIsAuthenticated,
    isLoading,
    getAccessTokenSilently,
  };
} 