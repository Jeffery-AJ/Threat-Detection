'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true);
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (isComplete) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center z-50"
    >
      {/* Animated logo/text */}
      <div className="relative">
        {/* Outer glow circle */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ width: 200, height: 200, margin: 'auto' }}
        />

        {/* Inner rotating circle */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-border"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          style={{ width: 200, height: 200, margin: 'auto' }}
        />

        {/* Center content */}
        <motion.div
          className="relative w-52 h-52 flex flex-col items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.div
            className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-4"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🛡️
          </motion.div>
          <motion.h1
            className="text-2xl font-bold text-white text-center"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Cyber Guard
          </motion.h1>
        </motion.div>
      </div>

      {/* Loading text */}
      <motion.div
        className="absolute bottom-20 text-slate-400 text-sm tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Initializing...
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
