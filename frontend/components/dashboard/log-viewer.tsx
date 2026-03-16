'use client';

import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { logs } from '@/lib/mock-data';

export function LogViewer() {
  const getLogColor = (log: string) => {
    if (log.includes('[INFO]')) return 'text-green-400';
    if (log.includes('[WARNING]')) return 'text-yellow-400';
    if (log.includes('[ALERT]')) return 'text-red-400';
    return 'text-cyan-300';
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut', delayChildren: 0.5 },
    },
  };

  const logVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.3 },
    }),
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300" />
      <div className="relative bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm hover:border-slate-600 transition-colors duration-300">
        <div className="flex items-center gap-2 mb-4">
          <Terminal className="w-6 h-6 text-green-400" />
          <h2 className="text-xl font-semibold text-white">System Logs</h2>
        </div>

        <div className="bg-slate-950/50 border border-slate-700 rounded-lg p-4 font-mono text-sm max-h-80 overflow-y-auto space-y-1">
          {logs.map((log, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={logVariants}
              initial="hidden"
              animate="visible"
              className={`${getLogColor(log)} whitespace-nowrap truncate text-xs md:text-sm leading-relaxed`}
            >
              <span className="text-gray-500">&gt;</span> {log}
            </motion.div>
          ))}
        </div>

        <div className="mt-4 text-xs text-gray-500 flex justify-between">
          <span>{logs.length} log entries</span>
          <span>Live streaming</span>
        </div>
      </div>
    </motion.div>
  );
}
