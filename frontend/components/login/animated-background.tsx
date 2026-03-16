'use client';

import { motion } from 'framer-motion';

export function AnimatedBackground() {
  const blobs = [
    {
      id: 1,
      delay: 0,
      duration: 8,
      colors: 'from-blue-500/20 to-cyan-500/20',
      size: 'w-96 h-96',
      position: 'top-10 left-10',
    },
    {
      id: 2,
      delay: 0.5,
      duration: 10,
      colors: 'from-purple-500/20 to-blue-500/20',
      size: 'w-80 h-80',
      position: 'top-1/3 right-20',
    },
    {
      id: 3,
      delay: 1,
      duration: 12,
      colors: 'from-green-500/20 to-cyan-500/20',
      size: 'w-72 h-72',
      position: 'bottom-20 left-1/3',
    },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {blobs.map((blob) => (
        <motion.div
          key={blob.id}
          className={`absolute ${blob.size} rounded-full bg-gradient-to-r ${blob.colors} blur-3xl`}
          initial={{
            x: 0,
            y: 0,
            opacity: 0.3,
          }}
          animate={{
            x: [0, 50, -50, 0],
            y: [0, 50, -50, 0],
            opacity: [0.3, 0.5, 0.3, 0.3],
          }}
          transition={{
            duration: blob.duration,
            delay: blob.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            top: blob.position.split(' ')[0],
            left: blob.position.split(' ')[1],
          }}
        />
      ))}
    </div>
  );
}
