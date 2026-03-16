'use client';

import { motion } from 'framer-motion';
import { LogViewer } from '@/components/dashboard/log-viewer';

export default function LogsPage() {
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
          System Logs
        </h1>
        <p className="text-gray-400">
          View and filter all system and security logs
        </p>
      </motion.div>

      <LogViewer />
    </motion.div>
  );
}
