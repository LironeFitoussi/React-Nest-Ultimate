import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useEffect, Suspense, useState } from "react";
import { useAuth } from '@/hooks/useAuth';
import { PageLoader } from '@/components/Atoms/LoadingSpinner';
import Sidebar from '@/components/Organisms/Sidebar';
import MobileDrawer from '@/components/Organisms/MobileDrawer';
import Header from '@/components/Organisms/Header';

export default function Layout() {
  const { i18n } = useTranslation();
  const dir = i18n.language === 'he' ? 'rtl' : 'ltr';
  const location = useLocation();
  const { isLoading } = useAuth();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const toggleMobileDrawer = () => {
    setIsMobileDrawerOpen(!isMobileDrawerOpen);
  };

  const closeMobileDrawer = () => {
    setIsMobileDrawerOpen(false);
  };

  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);

  // Close mobile drawer when route changes
  useEffect(() => {
    setIsMobileDrawerOpen(false);
  }, [location.pathname]);

  // Public routes that don't need sidebar
  const publicRoutes = ['/', '/auth'];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  // Show loading state while authentication is being checked
  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <PageLoader text="Loading your session..." />
      </div>
    );
  }

  // Show full-width layout for public routes
  if (isPublicRoute) {
    return (
      <div className="min-h-screen">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </div>
    );
  }

  // For protected routes, show responsive layout
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar - Hidden on mobile */}
      <aside className="hidden lg:block">
        <Sidebar />
      </aside>

      {/* Mobile Drawer */}
      <MobileDrawer 
        isOpen={isMobileDrawerOpen} 
        onClose={closeMobileDrawer} 
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <Header 
          onMenuClick={toggleMobileDrawer}
          isMenuOpen={isMobileDrawerOpen}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
