// src/components/SeverityBadge.jsx
const CONFIG = {
  critical: 'bg-severity-critical/15 text-severity-critical border-severity-critical/30',
  warning:  'bg-severity-warning/15  text-severity-warning  border-severity-warning/30',
  normal:   'bg-severity-normal/15   text-severity-normal   border-severity-normal/30',
  info:     'bg-brand-blue/15        text-brand-blue        border-brand-blue/30',
};

export default function SeverityBadge({ severity, className = '' }) {
  const style = CONFIG[severity] || CONFIG.info;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-wider ${style} ${className}`}>
      {severity === 'critical' && <span className="w-1.5 h-1.5 rounded-full bg-severity-critical mr-1 status-pulse" />}
      {severity}
    </span>
  );
}
