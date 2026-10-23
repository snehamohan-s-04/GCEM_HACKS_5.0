// src/components/AiAnalysisPanel.jsx
import { Brain, CheckCircle2, Clock } from 'lucide-react';
import SeverityBadge from './SeverityBadge';

export default function AiAnalysisPanel({ incident }) {
  if (!incident) return null;

  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="glass-card border-brand-purple/30 shadow-[0_0_20px_rgba(139,92,246,0.07)] overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-surface-border bg-brand-purple/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-purple/20 border border-brand-purple/30 flex items-center justify-center">
              <Brain size={16} className="text-brand-purple" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">AI Incident Analysis</h3>
              <p className="text-[10px] text-slate-500">Gemini-powered root cause engine</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-[10px] text-severity-normal">
              <CheckCircle2 size={11} />
              Complete
            </span>
            <span className="text-[10px] text-slate-600">{now}</span>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Service + Severity */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Service</p>
            <p className="text-sm font-semibold text-white">{incident.service}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Severity</p>
            <SeverityBadge severity={incident.severity} />
          </div>
        </div>

        {/* Root cause */}
        <div>
          <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Root Cause</p>
          <div className="px-3 py-2.5 rounded-lg bg-severity-critical/10 border border-severity-critical/20">
            <p className="text-sm font-semibold text-severity-critical">{incident.rootCause}</p>
          </div>
        </div>

        {/* Explanation */}
        <div>
          <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">AI Explanation</p>
          <p className="text-sm text-slate-300 leading-relaxed">{incident.explanation}</p>
        </div>

        {/* Recommended action */}
        <div>
          <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Recommended Action</p>
          <div className="px-3 py-3 rounded-lg bg-brand-blue/8 border border-brand-blue/20">
            <p className="text-sm text-slate-300 leading-relaxed">{incident.recommendedAction}</p>
          </div>
        </div>

        {/* Confidence */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">AI Confidence</p>
            <span className="text-xs font-bold text-brand-purple">{incident.aiConfidence}%</span>
          </div>
          <div className="h-2 bg-surface-border rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-purple transition-all duration-700"
              style={{ width: `${incident.aiConfidence}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
