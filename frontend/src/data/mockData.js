// src/data/mockData.js
// All mock data for SmartOps AI dashboard.
// Replace individual items with live API calls incrementally.

export const kpiData = {
  activeIncidents: 4,
  criticalIncidents: 1,
  servicesMonitored: 24,
  mttr: '8m 42s',
  automatedResolutions: 87,
};

export const services = [
  { id: 'api-gateway',    name: 'API Gateway',            status: 'healthy',  cpu: 42, memory: 61, errorRate: 0.1, latency: 98  },
  { id: 'payment-api',    name: 'Payment API',            status: 'critical', cpu: 94, memory: 88, errorRate: 38,  latency: 4200 },
  { id: 'auth-service',   name: 'Authentication Service', status: 'healthy',  cpu: 28, memory: 44, errorRate: 0.3, latency: 120 },
  { id: 'user-service',   name: 'User Service',           status: 'warning',  cpu: 71, memory: 78, errorRate: 6.2, latency: 1100 },
  { id: 'notif-service',  name: 'Notification Service',   status: 'healthy',  cpu: 19, memory: 33, errorRate: 0.8, latency: 210 },
  { id: 'postgres',       name: 'PostgreSQL Database',    status: 'warning',  cpu: 65, memory: 82, errorRate: 2.1, latency: 890 },
  { id: 'redis',          name: 'Redis Cache',            status: 'healthy',  cpu: 12, memory: 58, errorRate: 0.0, latency: 4   },
];

export const initialIncidents = [
  {
    id: 'INC-001',
    service: 'Payment API',
    serviceId: 'payment-api',
    severity: 'critical',
    status: 'active',
    detectedAt: new Date(Date.now() - 8 * 60 * 1000).toISOString(), // 8 min ago
    errorRate: 38,
    latency: 4200,
    recentDeployment: true,
    deploymentAgo: '8 minutes ago',
    logs: 'ERROR: database connection pool exhausted after 30s\nERROR: max_connections reached (100/100)\nWARN: connection wait timeout exceeded',
    rootCause: 'Database connection pool exhaustion',
    explanation:
      'The payment service is experiencing elevated failures because the database connection pool has reached maximum capacity. Recent deployment activity may have increased connection usage.',
    recommendedAction:
      'Increase the database connection pool size, inspect active connections, terminate leaked connections, and restart affected workers if required.',
    aiConfidence: 94,
    timeline: [
      { id: 't1', step: 'Incident detected',         time: '14:02:11', done: true  },
      { id: 't2', step: 'Metrics analyzed',           time: '14:02:14', done: true  },
      { id: 't3', step: 'Logs correlated',            time: '14:02:17', done: true  },
      { id: 't4', step: 'AI root cause identified',   time: '14:02:21', done: true  },
      { id: 't5', step: 'Resolution recommended',     time: '14:02:23', done: true  },
      { id: 't6', step: 'Resolution executed',        time: '14:02:30', done: false },
    ],
  },
  {
    id: 'INC-002',
    service: 'User Service',
    serviceId: 'user-service',
    severity: 'warning',
    status: 'investigating',
    detectedAt: new Date(Date.now() - 23 * 60 * 1000).toISOString(),
    errorRate: 6.2,
    latency: 1100,
    recentDeployment: false,
    deploymentAgo: null,
    logs: 'WARN: response time exceeding SLO threshold\nWARN: downstream user-db latency p95=1100ms',
    rootCause: 'Elevated database query latency',
    explanation:
      'The user service is returning slower-than-normal responses. Database query latency has increased, likely due to a missing index or lock contention.',
    recommendedAction:
      'Run EXPLAIN ANALYZE on the slowest queries, check for table locks, and review recent schema migrations.',
    aiConfidence: 81,
    timeline: [
      { id: 't1', step: 'Incident detected',         time: '13:47:09', done: true  },
      { id: 't2', step: 'Metrics analyzed',           time: '13:47:12', done: true  },
      { id: 't3', step: 'Logs correlated',            time: '13:47:15', done: true  },
      { id: 't4', step: 'AI root cause identified',   time: '13:47:20', done: true  },
      { id: 't5', step: 'Resolution recommended',     time: '13:47:22', done: false },
      { id: 't6', step: 'Resolution executed',        time: '-',        done: false },
    ],
  },
  {
    id: 'INC-003',
    service: 'PostgreSQL Database',
    serviceId: 'postgres',
    severity: 'warning',
    status: 'monitoring',
    detectedAt: new Date(Date.now() - 41 * 60 * 1000).toISOString(),
    errorRate: 2.1,
    latency: 890,
    recentDeployment: false,
    deploymentAgo: null,
    logs: 'WARN: checkpoint distance 2.1GB exceeds threshold\nINFO: autovacuum running on orders table',
    rootCause: 'Checkpoint pressure / autovacuum activity',
    explanation:
      'PostgreSQL is experiencing checkpoint pressure. Autovacuum is running on a large table causing temporary I/O spikes.',
    recommendedAction:
      'Tune checkpoint_completion_target and autovacuum settings. Consider scheduling maintenance during low-traffic periods.',
    aiConfidence: 76,
    timeline: [
      { id: 't1', step: 'Incident detected',         time: '13:29:44', done: true  },
      { id: 't2', step: 'Metrics analyzed',           time: '13:29:47', done: true  },
      { id: 't3', step: 'Logs correlated',            time: '13:29:50', done: true  },
      { id: 't4', step: 'AI root cause identified',   time: '13:29:55', done: true  },
      { id: 't5', step: 'Resolution recommended',     time: '13:29:58', done: true  },
      { id: 't6', step: 'Resolution executed',        time: '13:30:10', done: false },
    ],
  },
];

export const resolvedIncidents = [
  {
    id: 'INC-004',
    service: 'API Gateway',
    serviceId: 'api-gateway',
    severity: 'normal',
    status: 'resolved',
    detectedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    errorRate: 0.4,
    latency: 128,
    recentDeployment: false,
    deploymentAgo: null,
    logs: 'WARN: upstream request timeout rate exceeded threshold\nINFO: retry budget adjusted\nINFO: request latency returned to baseline',
    rootCause: 'Transient upstream timeout spike',
    explanation:
      'A short-lived increase in upstream response times caused a small number of gateway requests to exceed their timeout. The service has returned to its normal operating range.',
    recommendedAction:
      'Continue monitoring upstream latency and retain the updated retry budget. Revisit the upstream service timeout if the pattern returns.',
    aiConfidence: 88,
    timeline: [
      { id: 't1', step: 'Incident detected', time: '11:12:04', done: true },
      { id: 't2', step: 'Metrics analyzed', time: '11:12:08', done: true },
      { id: 't3', step: 'Logs correlated', time: '11:12:12', done: true },
      { id: 't4', step: 'AI root cause identified', time: '11:12:17', done: true },
      { id: 't5', step: 'Resolution recommended', time: '11:14:02', done: true },
      { id: 't6', step: 'Resolution executed', time: '11:17:36', done: true },
    ],
  },
];

// Chart time-series mock
const now = Date.now();
export const errorRateData = Array.from({ length: 20 }, (_, i) => ({
  time: new Date(now - (19 - i) * 3 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  paymentApi: i < 12 ? +(Math.random() * 2).toFixed(1) : +(28 + Math.random() * 12).toFixed(1),
  userService: +(Math.random() * 8).toFixed(1),
  apiGateway:  +(Math.random() * 1.5).toFixed(1),
}));

export const latencyData = Array.from({ length: 20 }, (_, i) => ({
  time: new Date(now - (19 - i) * 3 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  paymentApi: i < 12 ? +(200 + Math.random() * 100).toFixed(0) : +(3800 + Math.random() * 600).toFixed(0),
  userService: +(800 + Math.random() * 400).toFixed(0),
  apiGateway:  +(80 + Math.random() * 40).toFixed(0),
}));

export const incidentFreqData = [
  { day: 'Mon', incidents: 3 },
  { day: 'Tue', incidents: 1 },
  { day: 'Wed', incidents: 5 },
  { day: 'Thu', incidents: 2 },
  { day: 'Fri', incidents: 4 },
  { day: 'Sat', incidents: 1 },
  { day: 'Sun', incidents: 4 },
];

export const healthTrendData = Array.from({ length: 14 }, (_, i) => ({
  date: new Date(now - (13 - i) * 24 * 60 * 60 * 1000).toLocaleDateString([], { month: 'short', day: 'numeric' }),
  healthy: +(85 + Math.random() * 10).toFixed(0),
}));

export const cloudInfra = [
  { provider: 'AWS',   resources: 48, healthy: true,  incidents: 1, icon: '☁️', color: '#f59e0b' },
  { provider: 'Azure', resources: 23, healthy: true,  incidents: 0, icon: '🔷', color: '#3b82f6' },
  { provider: 'GCP',   resources: 15, healthy: false, incidents: 1, icon: '🌐', color: '#22c55e' },
];

// Simulated incident injected when "Simulate Incident" is clicked
export const simulatedIncident = {
  id: 'INC-SIM',
  service: 'Payment API',
  serviceId: 'payment-api',
  severity: 'critical',
  status: 'active',
  detectedAt: new Date().toISOString(),
  errorRate: 42,
  latency: 4800,
  recentDeployment: true,
  deploymentAgo: 'just now',
  logs: 'CRITICAL: database connection pool exhausted (pool_size=100)\nERROR: timeout waiting for connection from pool (30s exceeded)\nERROR: payment transaction rollback – no available connection',
  rootCause: 'Database connection pool exhaustion',
  explanation:
    'The payment service is experiencing elevated failures because the database connection pool has reached maximum capacity. Recent deployment activity may have increased connection usage significantly.',
  recommendedAction:
    'Increase the database connection pool size, inspect active connections, terminate leaked connections, and restart affected workers if required.',
  aiConfidence: 96,
  timeline: [
    { id: 't1', step: 'Incident detected',         time: new Date().toLocaleTimeString(), done: true  },
    { id: 't2', step: 'Metrics analyzed',           time: new Date(Date.now() + 3000).toLocaleTimeString(), done: true  },
    { id: 't3', step: 'Logs correlated',            time: new Date(Date.now() + 6000).toLocaleTimeString(), done: true  },
    { id: 't4', step: 'AI root cause identified',   time: new Date(Date.now() + 9000).toLocaleTimeString(), done: true  },
    { id: 't5', step: 'Resolution recommended',     time: new Date(Date.now() + 11000).toLocaleTimeString(), done: true  },
    { id: 't6', step: 'Resolution executed',        time: '-',        done: false },
  ],
};
