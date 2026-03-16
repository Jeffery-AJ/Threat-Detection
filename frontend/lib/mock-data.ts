export const threatMetrics = {
  totalThreats: 2341,
  highRiskAlerts: 47,
  blockedIPs: 156,
  systemHealth: 94,
};

export const activityData = [
  { time: '00:00', requests: 400, attacks: 24 },
  { time: '04:00', requests: 300, attacks: 13 },
  { time: '08:00', requests: 200, attacks: 9 },
  { time: '12:00', requests: 278, attacks: 39 },
  { time: '16:00', requests: 189, attacks: 26 },
  { time: '20:00', requests: 239, attacks: 44 },
  { time: '23:59', requests: 349, attacks: 35 },
];

export const threatDistribution = [
  { name: 'SQL Injection', value: 35 },
  { name: 'XSS Attacks', value: 28 },
  { name: 'DDoS', value: 22 },
  { name: 'Brute Force', value: 15 },
];

export const threatFrequency = [
  { type: 'SQL Injection', count: 156 },
  { type: 'XSS', count: 124 },
  { type: 'DDoS', count: 98 },
  { type: 'Brute Force', count: 67 },
  { type: 'Malware', count: 45 },
];

export const alerts = [
  {
    id: '1',
    time: '2 minutes ago',
    ip: '192.168.1.145',
    threatType: 'SQL Injection Attempt',
    severity: 'HIGH',
    action: 'Blocked',
  },
  {
    id: '2',
    time: '5 minutes ago',
    ip: '10.0.0.52',
    threatType: 'XSS Payload Detected',
    severity: 'MEDIUM',
    action: 'Flagged',
  },
  {
    id: '3',
    time: '12 minutes ago',
    ip: '172.16.0.89',
    threatType: 'Brute Force Attack',
    severity: 'HIGH',
    action: 'Blocked',
  },
  {
    id: '4',
    time: '23 minutes ago',
    ip: '203.0.113.45',
    threatType: 'Suspicious Login',
    severity: 'LOW',
    action: 'Monitored',
  },
  {
    id: '5',
    time: '1 hour ago',
    ip: '198.51.100.67',
    threatType: 'Port Scan Activity',
    severity: 'MEDIUM',
    action: 'Blocked',
  },
];

export const logs = [
  '[INFO] System initialized - Security monitoring active',
  '[INFO] Database connection established - 5 connections pooled',
  '[ALERT] Suspicious activity detected from IP 192.168.1.145',
  '[WARNING] High number of failed login attempts from 10.0.0.52',
  '[ALERT] SQL Injection attempt blocked - Payload: SELECT * FROM users WHERE id=1 OR 1=1',
  '[INFO] DDoS mitigation activated - Rate limiting enabled',
  '[WARNING] Certificate expiration in 30 days - Action required',
  '[INFO] Backup completed successfully - 2.4 GB backed up',
  '[ALERT] Unauthorized access attempt - Account locked for security',
  '[INFO] Firewall rules updated - 12 new rules added',
  '[WARNING] Unusual data export detected from user account',
  '[INFO] Threat intelligence feed updated - 1,234 new signatures loaded',
];

export const responseActions = [
  {
    id: 'block-ip',
    label: 'Block IP Address',
    description: 'Add IP to permanent blocklist',
    color: 'bg-red-500 hover:bg-red-600',
  },
  {
    id: 'disable-user',
    label: 'Disable User Account',
    description: 'Temporarily disable account',
    color: 'bg-orange-500 hover:bg-orange-600',
  },
  {
    id: 'resolve-alert',
    label: 'Mark Alert Resolved',
    description: 'Close and archive alert',
    color: 'bg-green-500 hover:bg-green-600',
  },
];
