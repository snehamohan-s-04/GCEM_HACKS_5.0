// src/components/IncidentModal.jsx
import { X, Clock, AlertTriangle, Server, Activity, Database } from 'lucide-react';
import SeverityBadge from './SeverityBadge';
import IncidentTimeline from './IncidentTimeline';

function timeAgo(isoString) {
  const diff = Math.floor((Date.now() - new Date(isoString)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ${Math.floor((diff % 3600) / 60)}m ago`;
}

export default function IncidentModal({ incident, onClose }) {
  if (!incident) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-card border-slate-700 shadow-2xl animate-slide-in">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between px-6 py-4 border-b border-surface-border bg-surface-card/95 backdrop-blur-sm z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-severity-critical/15 flex items-center justify-center">
              <AlertTriangle size={15} className="text-severity-critical" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-white">{incident.id}</h2>
                <SeverityBadge severity={incident.severity} />
              </div>
              <p className="text-[10px] text-slate-500">Detected {timeAgo(incident.detectedAt)}</p>
            </div>
          </div>
          <button id="btn-close-modal" onClick={onClose} className="p-1.5 text-slate-500 hover:text-white hover:bg-surface-hover rounded-lg transition-all">
            <X size={16} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Key info grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Service',     value: incident.service,    icon: Server    },
              { label: 'Status',      value: incident.status,     icon: Activity  },
              { label: 'Error Rate',  value: `${incident.errorRate}%`, icon: AlertTriangle },
              { label: 'Latency',     value: `${incident.latency}ms`,  icon: Clock },
              { label: 'Recent Deploy', value: incident.recentDeployment ? incident.deploymentAgo || 'Yes' : 'No', icon: Database },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-3 px-3 py-2.5 rounded-lg bg-surface-hover border border-surface-border">
                <item.icon size={14} className="text-slate-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500">{item.label}</p>
                  <p className="text-xs font-semibold text-slate-200 capitalize">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Logs */}
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">System Logs</p>
            <pre className="px-4 py-3 bg-black/40 border border-surface-border rounded-lg text-[11px] font-mono text-slate-300 whitespace-pre-wrap leading-relaxed overflow-auto max-h-32">
              {incident.logs}
            </pre>
          </div>

          {/* AI Analysis */}
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">AI Root Cause</p>
            <div className="px-3 py-2.5 bg-severity-critical/10 border border-severity-critical/20 rounded-lg">
              <p className="text-sm font-semibold text-severity-critical">{incident.rootCause}</p>
            </div>
          </div>

          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">AI Explanation</p>
            <p className="text-sm text-slate-300 leading-relaxed">{incident.explanation}</p>
          </div>

          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Recommended Action</p>
            <div className="px-3 py-3 bg-brand-blue/8 border border-brand-blue/20 rounded-lg">
              <p className="text-sm text-slate-300 leading-relaxed">{incident.recommendedAction}</p>
            </div>
          </div>

          {/* Timeline */}
          <IncidentTimeline timeline={incident.timeline} />

          {/* Resolution status */}
          <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-surface-hover border border-surface-border">
            <p className="text-xs font-medium text-slate-300">Resolution Status</p>
            <span className={`text-xs font-semibold capitalize ${
              incident.status === 'active' ? 'text-severity-critical' :
              incident.status === 'investigating' ? 'text-severity-warning' :
              'text-severity-normal'
            }`}>
              {incident.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
