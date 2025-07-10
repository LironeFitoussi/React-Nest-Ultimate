import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, LogOut } from 'lucide-react';
import { useTranslation } from "react-i18next";
import { useEffect, Suspense } from "react";
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { PageLoader } from '@/components/Atoms/LoadingSpinner';

export default function Layout() {
  const { i18n } = useTranslation();
  const dir = i18n.language === 'he' ? 'rtl' : 'ltr';
  const location = useLocation();
  const { isAuthenticated, isLoading, logout } = useAuth();
  
  const navigationItems = [
    { href: '/', label: 'Home', icon: Home },
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const handleLogout = () => {
    logout();
    // Clear auth storage
    localStorage.removeItem("auth0_token");
    localStorage.removeItem("auth0_id_token");
    localStorage.removeItem("auth0_user");
    localStorage.removeItem("auth0_expires_at");
  };

  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);

  // Public routes that don't need sidebar
  const publicRoutes = ['/', '/auth'];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  // Show full-width layout for public routes or when not authenticated
  if (isPublicRoute || (!isAuthenticated && !isLoading)) {
    return (
      <div className="min-h-screen">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </div>
    );
  }

  // Show sidebar layout for authenticated users
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 text-white flex flex-col">
        {/* Logo */}
        <div className="p-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold">App</h1>
              <p className="text-xs text-slate-400">Dashboard</p>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-slate-700 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout Section */}
        <div className="mt-auto p-4">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700 h-auto p-3"
          >
            <LogOut className="h-4 w-4 mr-3" />
            <div className="text-left">
              <div className="font-medium">Sign Out</div>
              <div className="text-xs text-slate-400">Logout safely</div>
            </div>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
