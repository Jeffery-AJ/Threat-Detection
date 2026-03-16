'use client';

import { motion } from 'framer-motion';
import { AlertPanel } from '@/components/dashboard/alert-panel';
import { ResponseControls } from '@/components/dashboard/response-controls';

export default function AlertsPage() {
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
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
          Security Alerts
        </h1>
        <p className="text-gray-400">
          Manage and respond to security alerts
        </p>
      </motion.div>

      <AlertPanel />
      <ResponseControls />
    </motion.div>
  );
}
