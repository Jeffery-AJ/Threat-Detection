'use client';

import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  activityData,
  threatDistribution,
  threatFrequency,
} from '@/lib/mock-data';

const COLORS = ['#06B6D4', '#0EA5E9', '#A855F7', '#EC4899'];

export function ActivityCharts() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
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
      className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Activity Line Chart */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -8, transition: { duration: 0.2 } }}
        className="lg:col-span-2 group relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300" />
        <div className="relative bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm hover:border-slate-600 transition-colors duration-300">
          <h3 className="text-lg font-semibold text-white mb-4">Requests & Attacks</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Line
                type="monotone"
                dataKey="requests"
                stroke="#06B6D4"
                strokeWidth={2}
                dot={false}
                isAnimationActive={true}
              />
              <Line
                type="monotone"
                dataKey="attacks"
                stroke="#EF4444"
                strokeWidth={2}
                dot={false}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Threat Distribution Pie Chart */}
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -8, transition: { duration: 0.2 } }}
        className="group relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300" />
        <div className="relative bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm hover:border-slate-600 transition-colors duration-300">
          <h3 className="text-lg font-semibold text-white mb-4">Threat Types</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={threatDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {threatDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#e2e8f0' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Threat Frequency Bar Chart - REMOVED */}
      {/* <motion.div
        variants={itemVariants}
        whileHover={{ y: -8, transition: { duration: 0.2 } }}
        className="lg:col-span-3 group relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300" />
        <div className="relative bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm hover:border-slate-600 transition-colors duration-300">
          <h3 className="text-lg font-semibold text-white mb-4">Threat Frequency by Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={threatFrequency}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Bar
                dataKey="count"
                fill="#06B6D4"
                radius={[8, 8, 0, 0]}
                isAnimationActive={true}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div> */}
    </motion.div>
  );
}
