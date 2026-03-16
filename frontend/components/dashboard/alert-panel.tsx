'use client';

import { motion } from 'framer-motion';
import { AlertCircle, Check, Clock } from 'lucide-react';
import { alerts } from '@/lib/mock-data';

export function AlertPanel() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'HIGH':
        return 'bg-red-500/20 text-red-300 border-red-500/50';
      case 'MEDIUM':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50';
      case 'LOW':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/50';
    }
  };

  const getActionColor = (action: string) => {
    if (action === 'Blocked') return 'text-red-400';
    if (action === 'Flagged') return 'text-yellow-400';
    return 'text-green-400';
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.4 + i * 0.1,
        duration: 0.4,
      },
    }),
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="group relative mb-8"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300" />
      <div className="relative bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm hover:border-slate-600 transition-colors duration-300">
        <div className="flex items-center gap-2 mb-6">
          <AlertCircle className="w-6 h-6 text-cyan-400" />
          <h2 className="text-xl font-semibold text-white">Recent Alerts</h2>
          <span className="ml-auto text-sm text-gray-400">{alerts.length} alerts</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Time</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">IP Address</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Threat Type</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Severity</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((alert, index) => (
                <motion.tr
                  key={alert.id}
                  custom={index}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors duration-200"
                >
                  <td className="px-4 py-3 text-gray-300">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      {alert.time}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-300 font-mono">{alert.ip}</td>
                  <td className="px-4 py-3 text-gray-300">{alert.threatType}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full border text-xs font-semibold ${getSeverityColor(
                        alert.severity
                      )}`}
                    >
                      {alert.severity}
                    </span>
                  </td>
                  <td className={`px-4 py-3 font-semibold ${getActionColor(alert.action)}`}>
                    {alert.action}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
