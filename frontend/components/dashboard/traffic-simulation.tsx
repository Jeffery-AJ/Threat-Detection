'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Square, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

interface BlockedIP {
  ip: string;
  timestamp: string;
  attack_type: string;
  destination?: string;
}

export function TrafficSimulation() {
  const [isRunning, setIsRunning] = useState(false);
  const [blockedIPs, setBlockedIPs] = useState<BlockedIP[]>([]);
  const [stats, setStats] = useState({
    totalTraffic: 0,
    attacksDetected: 0,
    benignTraffic: 0,
  });

  const runTrafficSimulation = async () => {
    setIsRunning(true);
    setBlockedIPs([]);
    setStats({ totalTraffic: 0, attacksDetected: 0, benignTraffic: 0 });

    try {
      // For demonstration, simulate the traffic generation
      // In production, this would call the backend API
      console.log('Starting traffic simulation...');

      // Simulate some processing time
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock results - in real implementation, this would come from backend
      const mockStats = {
        totalTraffic: 200,
        attacksDetected: 45,
        benignTraffic: 155,
      };

      const mockBlockedIPs: BlockedIP[] = [
        { ip: '192.168.1.100', timestamp: new Date().toISOString(), attack_type: 'DDoS', destination: '10.0.0.1' },
        { ip: '10.0.0.50', timestamp: new Date().toISOString(), attack_type: 'Port_Scan', destination: '192.168.1.1' },
        { ip: '172.16.0.25', timestamp: new Date().toISOString(), attack_type: 'Brute_Force', destination: '10.0.0.5' },
        { ip: '203.0.113.45', timestamp: new Date().toISOString(), attack_type: 'DDoS', destination: '192.168.1.10' },
        { ip: '198.51.100.78', timestamp: new Date().toISOString(), attack_type: 'Port_Scan', destination: '172.16.0.1' },
      ];

      setStats(mockStats);
      setBlockedIPs(mockBlockedIPs);

      console.log('Traffic simulation completed');
    } catch (error) {
      console.error('Simulation failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Simulation Control Card */}
      <Card className="border-slate-700 bg-slate-800/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Play className="w-5 h-5 text-blue-400" />
            Traffic Simulation
          </CardTitle>
          <CardDescription className="text-gray-400">
            Generate synthetic network traffic and detect cyber threats in real-time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-gray-400">
                Simulate network traffic with various attack types including DDoS, Port Scanning, and Brute Force attacks.
              </p>
              <div className="flex gap-4 text-xs text-gray-500">
                <span>• Real-time threat detection</span>
                <span>• Automatic IP blocking</span>
                <span>• Detailed logging</span>
              </div>
            </div>
            <Button
              onClick={runTrafficSimulation}
              disabled={isRunning}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            >
              {isRunning ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                  Running Simulation...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start Traffic Simulation
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      {(stats.totalTraffic > 0 || stats.attacksDetected > 0) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Card className="border-slate-700 bg-slate-800/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Shield className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.totalTraffic}</p>
                  <p className="text-sm text-gray-400">Total Traffic</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-slate-800/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.attacksDetected}</p>
                  <p className="text-sm text-gray-400">Attacks Detected</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-700 bg-slate-800/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Shield className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stats.benignTraffic}</p>
                  <p className="text-sm text-gray-400">Benign Traffic</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Blocked IPs Section */}
      {blockedIPs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-400" />
            Blocked IPs ({blockedIPs.length})
          </h3>
          <div className="grid gap-3">
            {blockedIPs.map((blockedIP, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-red-700/50 bg-red-900/10">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div>
                          <p className="font-mono text-white">{blockedIP.ip}</p>
                          <p className="text-sm text-gray-400">
                            {new Date(blockedIP.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-medium">
                        {blockedIP.attack_type}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}