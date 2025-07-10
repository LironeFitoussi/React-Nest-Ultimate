import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { useAuth0 } from "@auth0/auth0-react";

export default function HomeRoute() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  const { logout } = useAuth0();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <h1 className="text-lg font-semibold">App</h1>
            </div>
            <div>
              {!isAuthenticated ? (
                <Button onClick={() => navigate('/auth')}>
                  Sign In
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={() => navigate('/example')}>
                    Dashboard
                  </Button>
                  <Button onClick={() => navigate('/test')} variant="outline">
                    Test API
                  </Button>
                </div>
              )}
            </div>
            {/* LOGOUT BUTTON */}
            {isAuthenticated && (
              <Button
                onClick={() => {
                  console.log("Logging out");
                  // Programmatically logout
                  localStorage.removeItem("auth0_token");
                  localStorage.removeItem("auth0_id_token");
                  localStorage.removeItem("auth0_user");
                  localStorage.removeItem("auth0_expires_at");
                  logout({ logoutParams: { returnTo: window.location.origin } });
                  
                }}
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-4xl font-bold mb-6">
            Welcome to <span className="text-blue-600">App</span>
          </h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            A simple and modern application to help you stay organized.
          </p>
          {!isAuthenticated ? (
            <Button 
              size="lg"
              onClick={() => navigate('/auth')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Get Started
            </Button>
          ) : (
            <Button 
              size="lg"
              onClick={() => navigate('/example')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Go to Dashboard
            </Button>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container mx-auto px-6">
          <p className="text-center text-sm text-gray-600">
            &copy; 2024 App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
