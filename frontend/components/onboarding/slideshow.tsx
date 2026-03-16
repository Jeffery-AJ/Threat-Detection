'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Check } from 'lucide-react';
import { useAuth } from '@/lib/auth';

const slides = [
  {
    title: 'Welcome to Cyber Guard',
    description: 'Your real-time threat detection and monitoring system',
    icon: '🛡️',
  },
  {
    title: 'Real-Time Monitoring',
    description: 'Track and respond to security threats instantly across your network',
    icon: '📊',
  },
  {
    title: 'Threat Analysis',
    description: 'Intelligent threat detection with severity levels and analytics',
    icon: '🔍',
  },
  {
    title: 'Quick Response',
    description: 'Respond to threats immediately with one-click actions',
    icon: '⚡',
  },
  {
    title: 'You are all set!',
    description: 'Let\'s start protecting your infrastructure',
    icon: '✨',
  },
];

export function OnboardingSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { completeOnboarding } = useAuth();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      completeOnboarding();
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const isLastSlide = currentSlide === slides.length - 1;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
      {/* Animated background blobs */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          x: [0, -50, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      />

      <div className="relative z-10 max-w-2xl w-full mx-auto px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
              className="text-8xl mb-8"
            >
              {slides[currentSlide].icon}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl font-bold text-white mb-6"
            >
              {slides[currentSlide].title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-slate-300 mb-12 leading-relaxed"
            >
              {slides[currentSlide].description}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        {/* Progress indicators */}
        <div className="flex justify-center gap-2 mb-12">
          {slides.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-cyan-500 w-8' : 'bg-slate-600 w-2'
              }`}
              animate={{ width: index === currentSlide ? 32 : 8 }}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleSkip}
            className="text-slate-400 hover:text-slate-200 transition-colors text-sm font-medium"
          >
            Skip
          </button>

          <div className="flex gap-4">
            {isLastSlide && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-green-500/50"
              >
                <Check size={20} />
                Get Started
              </motion.button>
            )}
            {!isLastSlide && (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-cyan-500/50"
              >
                Next
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
