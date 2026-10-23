// src/components/ServiceHealthTable.jsx
import SeverityBadge from './SeverityBadge';

function Bar({ value, color }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-surface-border rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
      <span className="text-[11px] text-slate-400 w-7 text-right">{value}%</span>
    </div>
  );
}

function statusColor(status) {
  return status === 'healthy' ? 'text-severity-normal' :
         status === 'warning' ? 'text-severity-warning' : 'text-severity-critical';
}

function statusDot(status) {
  return status === 'healthy' ? 'bg-severity-normal' :
         status === 'warning' ? 'bg-severity-warning' : 'bg-severity-critical';
}

export default function ServiceHealthTable({ services }) {
  return (
    <div className="glass-card overflow-hidden">
      <div className="px-5 py-4 border-b border-surface-border flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">System Health</h3>
        <span className="text-xs text-slate-500">{services.length} services</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-surface-border">
              {['Service', 'Status', 'CPU', 'Memory', 'Error Rate', 'Latency'].map(h => (
                <th key={h} className="px-4 py-2.5 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {services.map(svc => (
              <tr key={svc.id} className="hover:bg-surface-hover/50 transition-colors group">
                <td className="px-4 py-3 font-medium text-slate-200">{svc.name}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${statusDot(svc.status)} ${svc.status !== 'healthy' ? 'status-pulse' : ''}`} />
                    <span className={`capitalize font-medium ${statusColor(svc.status)}`}>{svc.status}</span>
                  </div>
                </td>
                <td className="px-4 py-3 w-28">
                  <Bar value={svc.cpu} color={svc.cpu > 85 ? 'bg-severity-critical' : svc.cpu > 65 ? 'bg-severity-warning' : 'bg-brand-blue'} />
                </td>
                <td className="px-4 py-3 w-28">
                  <Bar value={svc.memory} color={svc.memory > 85 ? 'bg-severity-critical' : svc.memory > 70 ? 'bg-severity-warning' : 'bg-brand-purple'} />
                </td>
                <td className="px-4 py-3">
                  <span className={`font-mono font-semibold ${svc.errorRate >= 10 ? 'text-severity-critical' : svc.errorRate >= 3 ? 'text-severity-warning' : 'text-severity-normal'}`}>
                    {svc.errorRate}%
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`font-mono ${svc.latency >= 3000 ? 'text-severity-critical' : svc.latency >= 1000 ? 'text-severity-warning' : 'text-slate-300'}`}>
                    {svc.latency >= 1000 ? `${(svc.latency / 1000).toFixed(1)}s` : `${svc.latency}ms`}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
