'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { Save, Bell, Shield, LogOut } from 'lucide-react';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    threatAlerts: true,
    dailyReports: false,
    autoResponse: true,
  });

  const [saved, setSaved] = useState(false);

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const settingItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          Settings
        </h1>
        <p className="text-gray-400">
          Manage your account and system preferences
        </p>
      </motion.div>

      {/* Account Settings */}
      <motion.div
        variants={settingItemVariants}
        custom={0}
        initial="hidden"
        animate="visible"
        className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm"
      >
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-cyan-400" />
          Account Information
        </h2>
        <div className="space-y-4">
          <div>
            <p className="text-gray-400 text-sm mb-1">Email</p>
            <p className="text-white font-medium">{user?.email || 'Not set'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm mb-1">User ID</p>
            <p className="text-white font-medium font-mono text-sm">{user?.id || 'N/A'}</p>
          </div>
        </div>
      </motion.div>

      {/* Notification Settings */}
      <motion.div
        variants={settingItemVariants}
        custom={1}
        initial="hidden"
        animate="visible"
        className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm"
      >
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-yellow-400" />
          Notifications
        </h2>
        <div className="space-y-3">
          {Object.entries(settings).map(([key, value], index) => (
            <motion.label
              key={key}
              custom={index}
              variants={settingItemVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700/50 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={value}
                onChange={() => handleToggle(key as keyof typeof settings)}
                className="w-5 h-5 rounded border-slate-600 accent-cyan-500 cursor-pointer"
              />
              <span className="text-gray-300 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
            </motion.label>
          ))}
        </div>
      </motion.div>

      {/* Save and Logout */}
      <motion.div
        variants={settingItemVariants}
        custom={2}
        initial="hidden"
        animate="visible"
        className="flex gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200"
        >
          <Save className="w-5 h-5" />
          {saved ? 'Saved!' : 'Save Settings'}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={logout}
          className="flex items-center gap-2 px-6 py-3 bg-red-600/20 border border-red-600/50 hover:bg-red-600/30 text-red-400 font-semibold rounded-lg transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
