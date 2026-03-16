'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { History, Clock, Shield, AlertTriangle, CheckCircle, Eye } from 'lucide-react';

interface CaptureSession {
  session_id: string;
  start_time: string;
  end_time: string | null;
  duration: number | null;
  total_traffic: number;
  attacks_detected: number;
  benign_traffic: number;
  blocked_ips_count: number;
  blocked_ips: any[];
}

export function CaptureHistory() {
  const [sessions, setSessions] = useState<CaptureSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<CaptureSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/capture-sessions/');
      const data = await response.json();
      setSessions(data);
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return 'N/A';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}m ${remainingSeconds}s`;
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <Card className="border-slate-700 bg-slate-800/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
              <span className="ml-2 text-gray-400">Loading capture history...</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card className="border-slate-700 bg-slate-800/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <History className="w-5 h-5 text-blue-400" />
            Capture Session History
          </CardTitle>
          <CardDescription className="text-gray-400">
            View historical network capture sessions and their threat detection results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sessions.length === 0 ? (
              <div className="text-center py-8">
                <History className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No capture sessions found</p>
                <p className="text-sm text-gray-500">Start a network capture to see session history</p>
              </div>
            ) : (
              sessions.map((session, index) => (
                <motion.div
                  key={session.session_id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-slate-600 bg-slate-700/30 hover:border-slate-500 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-mono text-white">{session.session_id.slice(0, 8)}...</span>
                            <span className="text-xs text-gray-400">
                              {new Date(session.start_time).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-300">
                              {formatDuration(session.duration)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex gap-3">
                            <div className="text-center">
                              <div className="text-lg font-bold text-blue-400">{session.total_traffic}</div>
                              <div className="text-xs text-gray-400">Traffic</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-red-400">{session.attacks_detected}</div>
                              <div className="text-xs text-gray-400">Attacks</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-green-400">{session.benign_traffic}</div>
                              <div className="text-xs text-gray-400">Benign</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-orange-400">{session.blocked_ips_count}</div>
                              <div className="text-xs text-gray-400">Blocked</div>
                            </div>
                          </div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-slate-600/50 border-slate-500 hover:bg-slate-600 text-white"
                                onClick={() => setSelectedSession(session)}
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-slate-800 border-slate-700 max-w-4xl">
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2 text-white">
                                  <History className="w-5 h-5 text-blue-400" />
                                  Session Details: {session.session_id.slice(0, 8)}...
                                </DialogTitle>
                                <DialogDescription className="text-gray-400">
                                  Detailed information about this capture session
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium text-gray-300">Start Time</label>
                                    <p className="text-white">{new Date(session.start_time).toLocaleString()}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-300">End Time</label>
                                    <p className="text-white">
                                      {session.end_time ? new Date(session.end_time).toLocaleString() : 'Ongoing'}
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-300">Duration</label>
                                    <p className="text-white">{formatDuration(session.duration)}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-300">Session ID</label>
                                    <p className="font-mono text-sm text-white">{session.session_id}</p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-4 gap-4">
                                  <Card className="border-slate-600 bg-slate-700/30">
                                    <CardContent className="p-3">
                                      <div className="text-center">
                                        <Shield className="w-6 h-6 text-blue-400 mx-auto mb-1" />
                                        <div className="text-xl font-bold text-blue-400">{session.total_traffic}</div>
                                        <div className="text-xs text-gray-400">Total Traffic</div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                  <Card className="border-slate-600 bg-slate-700/30">
                                    <CardContent className="p-3">
                                      <div className="text-center">
                                        <AlertTriangle className="w-6 h-6 text-red-400 mx-auto mb-1" />
                                        <div className="text-xl font-bold text-red-400">{session.attacks_detected}</div>
                                        <div className="text-xs text-gray-400">Attacks Detected</div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                  <Card className="border-slate-600 bg-slate-700/30">
                                    <CardContent className="p-3">
                                      <div className="text-center">
                                        <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-1" />
                                        <div className="text-xl font-bold text-green-400">{session.benign_traffic}</div>
                                        <div className="text-xs text-gray-400">Benign Traffic</div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                  <Card className="border-slate-600 bg-slate-700/30">
                                    <CardContent className="p-3">
                                      <div className="text-center">
                                        <Shield className="w-6 h-6 text-orange-400 mx-auto mb-1" />
                                        <div className="text-xl font-bold text-orange-400">{session.blocked_ips_count}</div>
                                        <div className="text-xs text-gray-400">IPs Blocked</div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>

                                {session.blocked_ips.length > 0 && (
                                  <div>
                                    <label className="text-sm font-medium text-gray-300 mb-2 block">Blocked IPs</label>
                                    <div className="grid gap-2 max-h-40 overflow-y-auto">
                                      {session.blocked_ips.map((ip: any, idx: number) => (
                                        <Card key={idx} className="border-red-700/50 bg-red-900/10">
                                          <CardContent className="p-3">
                                            <div className="flex items-center justify-between">
                                              <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                                <div>
                                                  <p className="font-mono text-white">{ip.ip}</p>
                                                  <p className="text-xs text-gray-400">
                                                    {new Date(ip.timestamp * 1000).toLocaleString()}
                                                  </p>
                                                </div>
                                              </div>
                                              <Badge className="bg-red-500/20 text-red-400 border-red-500/50">
                                                {ip.attack_type}
                                              </Badge>
                                            </div>
                                          </CardContent>
                                        </Card>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}