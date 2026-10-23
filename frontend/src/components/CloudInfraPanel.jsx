// src/components/CloudInfraPanel.jsx
export default function CloudInfraPanel({ clouds }) {
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-white mb-4">Multi-Cloud Infrastructure</h3>
      <div className="space-y-3">
        {clouds.map(cloud => (
          <div key={cloud.provider} className="flex items-center justify-between px-3 py-3 bg-surface-hover rounded-lg border border-surface-border hover:border-slate-600 transition-all">
            <div className="flex items-center gap-3">
              <span className="text-xl">{cloud.icon}</span>
              <div>
                <p className="text-xs font-semibold text-white">{cloud.provider}</p>
                <p className="text-[10px] text-slate-500">{cloud.resources} resources</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {cloud.incidents > 0 && (
                <span className="px-2 py-0.5 bg-severity-critical/15 border border-severity-critical/30 rounded text-[10px] font-semibold text-severity-critical">
                  {cloud.incidents} incident{cloud.incidents > 1 ? 's' : ''}
                </span>
              )}
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${cloud.healthy ? 'bg-severity-normal' : 'bg-severity-warning status-pulse'}`} />
                <span className={`text-[11px] font-medium ${cloud.healthy ? 'text-severity-normal' : 'text-severity-warning'}`}>
                  {cloud.healthy ? 'Healthy' : 'Degraded'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
