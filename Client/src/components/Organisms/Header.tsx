import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onMenuClick: () => void;
  isMenuOpen?: boolean;
}

export default function Header({ onMenuClick, isMenuOpen = false }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="lg:hidden bg-white border-b border-gray-200 px-4 py-3"
    >
      <div className="flex items-center justify-between">
        {/* Menu Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="h-10 w-10 relative"
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Menu className="h-5 w-5" />
            </motion.div>
          </Button>
        </motion.div>

        {/* Logo/Title */}
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center"
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <span className="text-white font-bold text-xs">A</span>
          </motion.div>
          <h1 className="text-lg font-semibold text-gray-900">App</h1>
        </motion.div>

        {/* Placeholder for future actions */}
        <div className="w-10" />
      </div>
    </motion.header>
  );
} 