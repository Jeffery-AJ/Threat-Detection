'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Shield, AlertTriangle, Clock, MapPin, User } from 'lucide-react';
import { blockedIPs } from '@/lib/mock-data';

interface BlockedIP {
  id: string;
  ip: string;
  blockedAt: string;
  reason: string;
  attackType: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  explanation: string;
  destination: string;
  userAgent: string;
}

export function BlockedUsers() {
  const [selectedIP, setSelectedIP] = useState<BlockedIP | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'HIGH':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'MEDIUM':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'LOW':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

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
      className="lg:col-span-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -8, transition: { duration: 0.2 } }}
        className="group relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300" />
        <div className="relative bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm hover:border-slate-600 transition-colors duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-400" />
                Blocked Users/IPs
              </h3>
              <p className="text-gray-400 text-sm">
                Users and IP addresses blocked due to suspicious activity
              </p>
            </div>
            <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/50">
              {blockedIPs.length} Blocked
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blockedIPs.map((blockedIP) => (
              <motion.div
                key={blockedIP.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="bg-slate-700/30 border-slate-600 hover:border-slate-500 cursor-pointer transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="font-mono text-sm text-white">{blockedIP.ip}</span>
                          </div>
                          <Badge className={`text-xs ${getSeverityColor(blockedIP.severity)}`}>
                            {blockedIP.severity}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-3 h-3 text-orange-400" />
                            <span className="text-xs text-gray-300 truncate">{blockedIP.reason}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-400">
                              {formatDate(blockedIP.blockedAt)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <User className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-400 truncate">
                              {blockedIP.attackType}
                            </span>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-3 bg-slate-600/50 border-slate-500 hover:bg-slate-600 text-white"
                          onClick={() => setSelectedIP(blockedIP)}
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </DialogTrigger>

                  <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2 text-white">
                        <Shield className="w-5 h-5 text-red-400" />
                        Block Details: {blockedIP.ip}
                      </DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Detailed information about why this IP was blocked
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-300">IP Address</label>
                          <p className="font-mono text-white">{blockedIP.ip}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-300">Blocked At</label>
                          <p className="text-white">{formatDate(blockedIP.blockedAt)}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-300">Attack Type</label>
                          <Badge className={getSeverityColor(blockedIP.severity)}>
                            {blockedIP.attackType}
                          </Badge>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-300">Severity</label>
                          <Badge className={getSeverityColor(blockedIP.severity)}>
                            {blockedIP.severity}
                          </Badge>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-300">Reason for Blocking</label>
                        <p className="text-white mt-1">{blockedIP.reason}</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-300">Detailed Explanation</label>
                        <p className="text-gray-300 mt-1 leading-relaxed">{blockedIP.explanation}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-300">Target Destination</label>
                          <p className="font-mono text-sm text-white">{blockedIP.destination}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-300">User Agent</label>
                          <p className="font-mono text-sm text-gray-300 truncate">{blockedIP.userAgent}</p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}