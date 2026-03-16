'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Zap, Users, CheckCircle } from 'lucide-react';

export function ResponseControls() {
  const [executed, setExecuted] = useState<string | null>(null);

  const actions = [
    {
      id: 'block-ip',
      label: 'Block IP Address',
      description: 'Add selected IP to permanent blocklist',
      icon: Zap,
      color: 'from-red-500 to-red-600',
      textColor: 'text-red-400',
    },
    {
      id: 'disable-user',
      label: 'Disable User Account',
      description: 'Temporarily disable account',
      icon: Users,
      color: 'from-orange-500 to-orange-600',
      textColor: 'text-orange-400',
    },
    {
      id: 'resolve-alert',
      label: 'Mark Alert Resolved',
      description: 'Close and archive alert',
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      textColor: 'text-green-400',
    },
  ];

  const handleAction = (id: string) => {
    setExecuted(id);
    setTimeout(() => setExecuted(null), 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
        delayChildren: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-8"
    >
      <h2 className="text-xl font-semibold text-white mb-6">Admin Response Controls</h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        variants={containerVariants}
      >
        {actions.map((action) => {
          const Icon = action.icon;
          const isExecuted = executed === action.id;

          return (
            <motion.div key={action.id} variants={buttonVariants}>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full group relative overflow-hidden rounded-lg"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                    />
                    <div className={`relative bg-slate-800/50 border ${isExecuted ? 'border-green-500' : 'border-slate-700'} rounded-lg p-4 text-left transition-all duration-300 group-hover:border-slate-600`}>
                      <div className="flex items-start justify-between mb-2">
                        <Icon className={`w-6 h-6 ${action.textColor}`} />
                        <AnimatePresence>
                          {isExecuted && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className="text-green-400"
                            >
                              ✓
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <h3 className="font-semibold text-white mb-1">{action.label}</h3>
                      <p className="text-xs text-gray-400">{action.description}</p>
                    </div>
                  </motion.button>
                </AlertDialogTrigger>
                <AlertDialogContent className="border-slate-700 bg-slate-900">
                  <AlertDialogTitle className="text-white">
                    Confirm {action.label}
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-400">
                    Are you sure you want to {action.label.toLowerCase()}? This action
                    cannot be easily undone.
                  </AlertDialogDescription>
                  <div className="flex gap-3 justify-end">
                    <AlertDialogCancel className="bg-slate-700 text-white hover:bg-slate-600">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleAction(action.id)}
                      className={`bg-gradient-to-r ${action.color} text-white hover:opacity-90`}
                    >
                      Execute
                    </AlertDialogAction>
                  </div>
                </AlertDialogContent>
              </AlertDialog>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
