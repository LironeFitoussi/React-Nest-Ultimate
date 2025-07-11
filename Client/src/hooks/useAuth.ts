import { useAuth0 } from '@auth0/auth0-react';

export function useAuth() {
  const {
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    logout,
    loginWithRedirect,
  } = useAuth0();

  return {
    user,
    isAuthenticated,
    isLoading,
    logout,
    getAccessTokenSilently,
    loginWithRedirect,
  };
} 