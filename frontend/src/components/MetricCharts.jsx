// src/components/MetricCharts.jsx
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const TOOLTIP_STYLE = {
  contentStyle: { background: '#161b27', border: '1px solid #1e2d40', borderRadius: '8px', fontSize: '11px' },
  labelStyle: { color: '#94a3b8', marginBottom: '4px' },
};

export function ErrorRateChart({ data }) {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Error Rate Over Time</h3>
        <span className="text-[10px] text-slate-500">Last 60 min</span>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data} margin={{ top: 2, right: 8, bottom: 0, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2d40" />
          <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} />
          <YAxis tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} axisLine={false} unit="%" />
          <Tooltip {...TOOLTIP_STYLE} />
          <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8', paddingTop: '8px' }} />
          <Line type="monotone" dataKey="paymentApi"  stroke="#ef4444" strokeWidth={2} dot={false} name="Payment API" />
          <Line type="monotone" dataKey="userService" stroke="#f59e0b" strokeWidth={1.5} dot={false} name="User Service" />
          <Line type="monotone" dataKey="apiGateway"  stroke="#3b82f6" strokeWidth={1.5} dot={false} name="API Gateway" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function LatencyChart({ data }) {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">API Latency (ms)</h3>
        <span className="text-[10px] text-slate-500">p95 • Last 60 min</span>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={data} margin={{ top: 2, right: 8, bottom: 0, left: -10 }}>
          <defs>
            <linearGradient id="latPayment" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2d40" />
          <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} />
          <YAxis tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} axisLine={false} />
          <Tooltip {...TOOLTIP_STYLE} />
          <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8', paddingTop: '8px' }} />
          <Area type="monotone" dataKey="paymentApi"  stroke="#ef4444" fill="url(#latPayment)" strokeWidth={2} dot={false} name="Payment API" />
          <Line type="monotone" dataKey="userService" stroke="#f59e0b" strokeWidth={1.5} dot={false} name="User Service" />
          <Line type="monotone" dataKey="apiGateway"  stroke="#3b82f6" strokeWidth={1.5} dot={false} name="API Gateway" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function IncidentFreqChart({ data }) {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Incident Frequency</h3>
        <span className="text-[10px] text-slate-500">Last 7 days</span>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 2, right: 8, bottom: 0, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2d40" vertical={false} />
          <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} />
          <YAxis tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} axisLine={false} />
          <Tooltip {...TOOLTIP_STYLE} />
          <Bar dataKey="incidents" fill="#3b82f6" radius={[3, 3, 0, 0]} name="Incidents" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function HealthTrendChart({ data }) {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">System Health Trend</h3>
        <span className="text-[10px] text-slate-500">Last 14 days</span>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={data} margin={{ top: 2, right: 8, bottom: 0, left: -20 }}>
          <defs>
            <linearGradient id="gradHealthy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2d40" />
          <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} />
          <YAxis tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} axisLine={false} unit="%" domain={[70, 100]} />
          <Tooltip {...TOOLTIP_STYLE} />
          <Area type="monotone" dataKey="healthy" stroke="#22c55e" fill="url(#gradHealthy)" strokeWidth={2} dot={false} name="Healthy %" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
