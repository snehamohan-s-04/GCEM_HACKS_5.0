// src/components/IncidentCard.jsx
import { Clock, Search, BarChart2, Cpu } from 'lucide-react';
import SeverityBadge from './SeverityBadge';

function timeAgo(isoString) {
  const diff = Math.floor((Date.now() - new Date(isoString)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

export default function IncidentCard({ incident, onInvestigate, onViewAnalysis }) {
  const isCritical = incident.severity === 'critical';

  return (
    <div className={`glass-card p-5 transition-all hover:border-slate-600 ${isCritical ? 'border-severity-critical/40 shadow-[0_0_16px_rgba(239,68,68,0.07)]' : ''}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${isCritical ? 'bg-severity-critical status-pulse' : 'bg-severity-warning status-pulse'}`} />
          <div>
            <h4 className="text-sm font-semibold text-white">{incident.service}</h4>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Clock size={11} className="text-slate-500" />
              <span className="text-[11px] text-slate-500">Detected {timeAgo(incident.detectedAt)}</span>
            </div>
          </div>
        </div>
        <SeverityBadge severity={incident.severity} />
      </div>

      {/* Root cause */}
      <div className="mb-4 px-3 py-2 bg-surface-hover rounded-lg border border-surface-border">
        <p className="text-xs text-slate-300 font-medium">{incident.rootCause}</p>
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center">
          <p className={`text-lg font-bold font-mono ${incident.errorRate >= 20 ? 'text-severity-critical' : 'text-severity-warning'}`}>
            {incident.errorRate}%
          </p>
          <p className="text-[10px] text-slate-500">Error Rate</p>
        </div>
        <div className="text-center">
          <p className={`text-lg font-bold font-mono ${incident.latency >= 3000 ? 'text-severity-critical' : 'text-severity-warning'}`}>
            {incident.latency >= 1000 ? `${(incident.latency / 1000).toFixed(1)}s` : `${incident.latency}ms`}
          </p>
          <p className="text-[10px] text-slate-500">Latency</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold font-mono text-slate-300">
            {incident.recentDeployment ? incident.deploymentAgo || 'Yes' : '—'}
          </p>
          <p className="text-[10px] text-slate-500">Deployment</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          id={`btn-investigate-${incident.id}`}
          onClick={() => onInvestigate(incident)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-surface-border text-xs font-medium text-slate-300 hover:bg-surface-hover hover:text-white hover:border-slate-500 transition-all"
        >
          <Search size={13} />
          Investigate
        </button>
        <button
          id={`btn-view-analysis-${incident.id}`}
          onClick={() => onViewAnalysis(incident)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-brand-blue/10 border border-brand-blue/30 text-xs font-medium text-brand-blue hover:bg-brand-blue/20 transition-all"
        >
          <BarChart2 size={13} />
          View Analysis
        </button>
      </div>
    </div>
  );
}
