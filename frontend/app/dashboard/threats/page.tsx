'use client';

import { motion } from 'framer-motion';
import { ActivityCharts } from '@/components/dashboard/activity-charts';
import { AlertPanel } from '@/components/dashboard/alert-panel';
import { ResponseControls } from '@/components/dashboard/response-controls';

export default function ThreatsPage() {
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
          Threat Monitor
        </h1>
        <p className="text-gray-400">
          Monitor and analyze active threats in real-time
        </p>
      </motion.div>

      <ActivityCharts />
      <AlertPanel />
      <ResponseControls />
    </motion.div>
  );
}
