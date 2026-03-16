'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Lock, Heart } from 'lucide-react';
import { threatMetrics } from '@/lib/mock-data';
import { AnimatedCounter } from './animated-counter';

export function ThreatCards() {
  const cards = [
    {
      id: 1,
      label: 'Total Threats',
      value: threatMetrics.totalThreats,
      icon: AlertTriangle,
      gradient: 'from-red-500 to-pink-500',
      textGradient: 'from-red-400 to-pink-400',
      delay: 0,
    },
    {
      id: 2,
      label: 'High Risk Alerts',
      value: threatMetrics.highRiskAlerts,
      icon: Lock,
      gradient: 'from-orange-500 to-red-500',
      textGradient: 'from-orange-400 to-red-400',
      delay: 0.1,
    },
    {
      id: 3,
      label: 'Blocked IPs',
      value: threatMetrics.blockedIPs,
      icon: Shield,
      gradient: 'from-purple-500 to-blue-500',
      textGradient: 'from-purple-400 to-blue-400',
      delay: 0.2,
    },
    {
      id: 4,
      label: 'System Health',
      value: threatMetrics.systemHealth,
      icon: Heart,
      gradient: 'from-green-500 to-emerald-500',
      textGradient: 'from-green-400 to-emerald-400',
      delay: 0.3,
      suffix: '%',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.id}
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="group relative"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}
            />
            <div className="relative bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm hover:border-slate-600 transition-colors duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-gradient-to-br ${card.gradient} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-xs font-semibold bg-gradient-to-r ${card.textGradient} bg-clip-text text-transparent`}>
                  {card.id <= 2 ? 'ALERT' : card.id === 3 ? 'BLOCKED' : 'OK'}
                </span>
              </div>

              <h3 className="text-gray-400 text-sm font-medium mb-2">{card.label}</h3>
              <div className="flex items-baseline gap-1">
                <AnimatedCounter value={card.value} />
                {card.suffix && <span className="text-xl font-semibold text-gray-300">{card.suffix}</span>}
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
