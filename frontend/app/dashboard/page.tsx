'use client';

import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth';
import { OnboardingSlideshow } from '@/components/onboarding/slideshow';
import { TrafficSimulation } from '@/components/dashboard/traffic-simulation';
import { ThreatCards } from '@/components/dashboard/threat-cards';
import { ActivityCharts } from '@/components/dashboard/activity-charts';
import { AlertPanel } from '@/components/dashboard/alert-panel';
import { LogViewer } from '@/components/dashboard/log-viewer';
import { ResponseControls } from '@/components/dashboard/response-controls';
import { BlockedUsers } from '@/components/dashboard/blocked-users';

export default function DashboardPage() {
  const { user } = useAuth();

  // Show onboarding for first-time users
  if (user?.isFirstTime) {
    return <OnboardingSlideshow />;
  }

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          Security Overview
        </h1>
        <p className="text-gray-400">
          Real-time threat detection and monitoring dashboard
        </p>
      </motion.div>

      {/* Threat Cards */}
      <ThreatCards />

      {/* Traffic Simulation */}
      <TrafficSimulation />

      {/* Activity Charts */}
      <ActivityCharts />

      {/* Blocked Users */}
      <BlockedUsers />

      {/* Alert Panel */}
      <AlertPanel />

      {/* Log Viewer */}
      <LogViewer />

      {/* Response Controls */}
      <ResponseControls />
    </motion.div>
  );
}
