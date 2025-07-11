import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, HelpCircle, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  onItemClick?: () => void;
  className?: string;
}

export default function Sidebar({ onItemClick, className = '' }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navigationItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/test', label: 'Test', icon: HelpCircle },
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

  const handleItemClick = (callback?: () => void) => {
    if (onItemClick) onItemClick();
    if (callback) callback();
  };

  return (
    <div className={`w-64 bg-slate-800 text-white flex flex-col h-full lg:h-screen ${className}`}>
      {/* Logo */}
      <div className="p-4">
        <motion.div 
          className="flex items-center gap-3 mb-8 cursor-pointer" 
          onClick={() => handleItemClick(() => navigate('/'))}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div 
            className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center"
            whileHover={{ rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <span className="text-white font-bold text-sm">A</span>
          </motion.div>
          <div>
            <h1 className="text-lg font-semibold">App</h1>
            <p className="text-xs text-slate-400">Dashboard</p>
          </div>
        </motion.div>
        
        {/* Navigation */}
        <nav className="space-y-2">
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.href}
                  onClick={() => handleItemClick()}
                  className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative overflow-hidden ${
                    active
                      ? 'bg-slate-700 text-white shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {/* Active indicator */}
                  {active && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-slate-700 rounded-lg"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  
                  {/* Content */}
                  <motion.div
                    className="relative z-10 flex items-center gap-3"
                    whileHover={{ x: 2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </div>

      {/* Logout Section */}
      <div className="mt-auto p-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={() => handleItemClick(handleLogout)}
            variant="ghost"
            className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700 h-auto p-3 transition-all duration-200"
          >
            <LogOut className="h-4 w-4 mr-3" />
            <div className="text-left">
              <div className="font-medium">Sign Out</div>
              <div className="text-xs text-slate-400">Logout safely</div>
            </div>
          </Button>
        </motion.div>
      </div>
    </div>
  );
} 