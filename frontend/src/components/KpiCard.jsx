// src/components/KpiCard.jsx
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function KpiCard({ title, value, unit, icon: Icon, iconColor, trend, trendUp, trendLabel, highlight }) {
  return (
    <div className={`glass-card p-5 hover:border-slate-600 transition-all ${highlight ? 'border-severity-critical/40 shadow-[0_0_12px_rgba(239,68,68,0.08)]' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2 rounded-lg ${iconColor || 'bg-brand-blue/10'}`}>
          <Icon size={18} className={highlight ? 'text-severity-critical' : 'text-brand-blue'} />
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-medium ${trendUp ? 'text-severity-critical' : 'text-severity-normal'}`}>
            {trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trend}
          </div>
        )}
      </div>
      <div className="space-y-0.5">
        <div className="flex items-baseline gap-1">
          <span className={`text-2xl font-bold ${highlight ? 'text-severity-critical' : 'text-white'}`}>{value}</span>
          {unit && <span className="text-sm text-slate-400">{unit}</span>}
        </div>
        <p className="text-xs text-slate-400 font-medium">{title}</p>
        {trendLabel && <p className="text-[10px] text-slate-600">{trendLabel}</p>}
      </div>
    </div>
  );
}
