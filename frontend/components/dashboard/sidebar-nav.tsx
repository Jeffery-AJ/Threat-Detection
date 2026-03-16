'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import {
  LayoutDashboard,
  AlertTriangle,
  FileText,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  Shield,
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { id: 'threats', label: 'Threat Monitor', icon: AlertTriangle, href: '/dashboard/threats' },
  { id: 'logs', label: 'System Logs', icon: FileText, href: '/dashboard/logs' },
  { id: 'alerts', label: 'Alerts', icon: Bell, href: '/dashboard/alerts' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/dashboard/settings' },
];

export function SidebarNav() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const sidebarVariants = {
    expanded: {
      width: '240px',
      transition: { duration: 0.3 },
    },
    collapsed: {
      width: '80px',
      transition: { duration: 0.3 },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  return (
    <motion.div
      variants={sidebarVariants}
      animate={isCollapsed ? 'collapsed' : 'expanded'}
      className="fixed left-0 top-0 h-screen bg-slate-900 border-r border-slate-800 flex flex-col shadow-2xl z-40"
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              SecurityHub
            </span>
          </motion.div>
        )}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors duration-200"
        >
          <ChevronLeft
            className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
              isCollapsed ? 'rotate-180' : ''
            }`}
          />
        </motion.button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <AnimatePresence>
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <motion.div
                key={item.id}
                custom={index}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
              >
                <Link href={item.href}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className={`relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 text-cyan-400'
                        : 'text-gray-400 hover:bg-slate-800/50'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 rounded-lg border border-cyan-400/50 bg-cyan-400/5"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <Icon className="w-5 h-5 flex-shrink-0 relative z-10" />
                    {!isCollapsed && (
                      <span className="text-sm font-medium relative z-10 whitespace-nowrap overflow-hidden text-ellipsis">
                        {item.label}
                      </span>
                    )}
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-800 p-4 space-y-2">
        {!isCollapsed && user && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 py-2 mb-2"
          >
            <p className="text-xs text-gray-500">Logged in as</p>
            <p className="text-sm font-semibold text-gray-200 truncate">{user.email}</p>
          </motion.div>
        )}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-red-400 hover:bg-slate-800/50 rounded-lg transition-colors duration-200 justify-center"
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
        </motion.button>
      </div>
    </motion.div>
  );
}
