'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startValue = 0;
    const increment = value / (duration * 60); // 60fps
    let animationFrameId: NodeJS.Timeout;

    const animate = () => {
      startValue += increment;
      if (startValue < value) {
        setDisplayValue(Math.floor(startValue));
        animationFrameId = setTimeout(animate, 1000 / 60);
      } else {
        setDisplayValue(value);
      }
    };

    animate();
    return () => clearTimeout(animationFrameId);
  }, [value, duration]);

  return (
    <motion.span
      className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayValue.toLocaleString()}
    </motion.span>
  );
}
