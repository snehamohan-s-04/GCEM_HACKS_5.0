import { useMemo, useState } from 'react';
import {
  Activity, AlertTriangle, CheckCircle2, Clock3, Search,
  SlidersHorizontal, X,
} from 'lucide-react';
import SeverityBadge from '../components/SeverityBadge';

const STATUS_LABELS = {
  active: 'Active',
  investigating: 'Investigating',
  monitoring: 'Investigating',
  resolved: 'Resolved',
};

const STATUS_STYLES = {
  active: 'bg-severity-critical/10 text-severity-critical border-severity-critical/25',
  investigating: 'bg-severity-warning/10 text-severity-warning border-severity-warning/25',
  monitoring: 'bg-severity-warning/10 text-severity-warning border-severity-warning/25',
  resolved: 'bg-severity-normal/10 text-severity-normal border-severity-normal/25',
};

function getStatusLabel(status) {
  return STATUS_LABELS[status] || status;
}

function getSeverityLabel(severity) {
  return severity === 'normal' || severity === 'healthy' ? 'Healthy' : severity;
}

function timeAgo(value) {
  const detectedAt = new Date(value).getTime();
  if (Number.isNaN(detectedAt)) return 'Unknown';

  const seconds = Math.max(0, Math.floor((Date.now() - detectedAt) / 1000));
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

function formatLatency(latency) {
  return latency >= 1000 ? `${(latency / 1000).toFixed(1)}s` : `${latency}ms`;
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <label className="flex min-w-0 flex-col gap-1.5">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">{label}</span>
      <select
        value={value}
        onChange={event => onChange(event.target.value)}
        className="w-full rounded-lg border border-surface-border bg-surface-hover px-3 py-2.5 text-xs text-slate-200 outline-none transition-colors focus:border-brand-blue/60"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
}

function IncidentRow({ incident, onSelect }) {
  const statusStyle = STATUS_STYLES[incident.status] || STATUS_STYLES.investigating;

  return (
    <button
      type="button"
      onClick={() => onSelect(incident)}
      className="group w-full rounded-xl border border-surface-border bg-surface-card px-4 py-4 text-left transition-all hover:border-brand-blue/40 hover:bg-surface-hover/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/60 sm:px-5"
      aria-label={`Open ${incident.id}, ${incident.service}, ${getSeverityLabel(incident.severity)} severity`}
    >
      <span className="grid gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:items-center lg:gap-4">
        <span className="min-w-0 sm:col-span-2 lg:col-span-3">
          <span className="flex items-center gap-2.5">
            <span className={`h-2 w-2 shrink-0 rounded-full ${
              incident.severity === 'critical'
                ? 'bg-severity-critical'
                : incident.severity === 'warning'
                  ? 'bg-severity-warning'
                  : 'bg-severity-normal'
            }`} />
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-white group-hover:text-brand-blue">
                {incident.service}
              </span>
              <span className="mt-0.5 block text-[11px] text-slate-500">{incident.id}</span>
            </span>
          </span>
        </span>

        <span className="flex items-center gap-2 lg:col-span-2">
          <SeverityBadge
            severity={incident.severity === 'healthy' ? 'normal' : incident.severity}
            label={getSeverityLabel(incident.severity)}
            className="!text-[9px]"
          />
        </span>

        <span className="flex items-center gap-2 lg:col-span-2">
          <span className={`inline-flex rounded-md border px-2 py-1 text-[10px] font-semibold ${statusStyle}`}>
            {getStatusLabel(incident.status)}
          </span>
        </span>

        <span className="grid grid-cols-2 gap-3 sm:col-span-2 lg:col-span-2">
          <span>
            <span className="block text-[10px] text-slate-500 lg:hidden">Error rate</span>
            <span className={`font-mono text-xs font-semibold ${
              incident.errorRate >= 20 ? 'text-severity-critical' :
                incident.errorRate >= 3 ? 'text-severity-warning' : 'text-slate-300'
            }`}>{incident.errorRate}%</span>
          </span>
          <span>
            <span className="block text-[10px] text-slate-500 lg:hidden">Latency</span>
            <span className={`font-mono text-xs font-semibold ${
              incident.latency >= 3000 ? 'text-severity-critical' :
                incident.latency >= 1000 ? 'text-severity-warning' : 'text-slate-300'
            }`}>{formatLatency(incident.latency)}</span>
          </span>
        </span>

        <span className="min-w-0 lg:col-span-3">
          <span className="block truncate text-xs text-slate-300" title={incident.rootCause}>
            {incident.rootCause}
          </span>
          <span
            className="mt-1 flex items-center gap-1 text-[10px] text-slate-500"
            title={new Date(incident.detectedAt).toLocaleString()}
          >
            <Clock3 size={11} />
            Detected {timeAgo(incident.detectedAt)}
          </span>
        </span>
      </span>
    </button>
  );
}

export default function Incidents({ incidents, services, onSelectIncident }) {
  const [search, setSearch] = useState('');
  const [severity, setSeverity] = useState('all');
  const [status, setStatus] = useState('all');
  const [service, setService] = useState('all');

  const serviceOptions = useMemo(
    () => services.map(item => ({ value: item.name, label: item.name })),
    [services],
  );

  const filteredIncidents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return incidents.filter(incident => {
      const incidentSeverity = incident.severity === 'healthy' ? 'normal' : incident.severity;
      const incidentStatus = incident.status === 'monitoring' ? 'investigating' : incident.status;
      const matchesSearch = !query || [
        incident.id,
        incident.service,
        incident.rootCause,
      ].some(value => value.toLowerCase().includes(query));

      return matchesSearch
        && (severity === 'all' || incidentSeverity === severity)
        && (status === 'all' || incidentStatus === status)
        && (service === 'all' || incident.service === service);
    });
  }, [incidents, search, severity, status, service]);

  const activeCount = incidents.filter(item =>
    item.status === 'active' || item.status === 'investigating' || item.status === 'monitoring',
  ).length;
  const criticalCount = incidents.filter(item => item.severity === 'critical').length;
  const resolvedCount = incidents.filter(item => item.status === 'resolved').length;
  const hasFilters = Boolean(search || severity !== 'all' || status !== 'all' || service !== 'all');

  function clearFilters() {
    setSearch('');
    setSeverity('all');
    setStatus('all');
    setService('all');
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-blue">Operations</p>
          <h1 className="text-xl font-bold text-white">Incident management</h1>
          <p className="mt-1 text-xs text-slate-500">Monitor, investigate, and track service health across your environment.</p>
        </div>
        <div className="flex items-center gap-2 self-start rounded-lg border border-severity-normal/20 bg-severity-normal/5 px-3 py-2 sm:self-auto">
          <span className="h-2 w-2 rounded-full bg-severity-normal status-pulse" />
          <span className="text-[11px] font-medium text-severity-normal">Live mock data</span>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3" aria-label="Incident summary">
        {[
          { label: 'Total incidents', value: incidents.length, icon: Activity, color: 'text-brand-blue', detail: 'Across monitored services' },
          { label: 'Active incidents', value: activeCount, icon: AlertTriangle, color: 'text-severity-warning', detail: 'Require attention' },
          { label: 'Critical incidents', value: criticalCount, icon: CheckCircle2, color: 'text-severity-critical', detail: `${resolvedCount} resolved` },
        ].map(item => (
          <div key={item.label} className="glass-card flex items-center gap-4 p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-hover">
              <item.icon size={17} className={item.color} />
            </span>
            <span>
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-500">{item.label}</span>
              <span className="mt-0.5 block text-xl font-bold leading-none text-white">{item.value}</span>
              <span className="mt-1 block text-[10px] text-slate-500">{item.detail}</span>
            </span>
          </div>
        ))}
      </section>

      <section className="glass-card p-4 sm:p-5">
        <div className="mb-4 flex items-center gap-2">
          <SlidersHorizontal size={14} className="text-brand-blue" />
          <h2 className="text-xs font-semibold text-white">Find incidents</h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <label className="flex min-w-0 flex-col gap-1.5 xl:col-span-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Search</span>
            <span className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="search"
                value={search}
                onChange={event => setSearch(event.target.value)}
                placeholder="Search ID, service, or root cause"
                aria-label="Search incidents"
                className="w-full rounded-lg border border-surface-border bg-surface-hover py-2.5 pl-9 pr-3 text-xs text-slate-200 outline-none placeholder:text-slate-600 focus:border-brand-blue/60"
              />
            </span>
          </label>
          <FilterSelect
            label="Severity"
            value={severity}
            onChange={setSeverity}
            options={[
              { value: 'all', label: 'All severities' },
              { value: 'critical', label: 'Critical' },
              { value: 'warning', label: 'Warning' },
              { value: 'normal', label: 'Healthy' },
            ]}
          />
          <FilterSelect
            label="Status"
            value={status}
            onChange={setStatus}
            options={[
              { value: 'all', label: 'All statuses' },
              { value: 'active', label: 'Active' },
              { value: 'investigating', label: 'Investigating' },
              { value: 'resolved', label: 'Resolved' },
            ]}
          />
          <FilterSelect
            label="Service"
            value={service}
            onChange={setService}
            options={[
              { value: 'all', label: 'All services' },
              ...serviceOptions,
            ]}
          />
        </div>
      </section>

      <section className="glass-card overflow-hidden">
        <div className="flex flex-col gap-2 border-b border-surface-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div>
            <h2 className="text-sm font-semibold text-white">Incident queue</h2>
            <p className="mt-0.5 text-[11px] text-slate-500">Select an incident to view its analysis and timeline.</p>
          </div>
          <span className="self-start rounded-md border border-surface-border bg-surface-hover px-2 py-1 text-[10px] font-medium text-slate-400 sm:self-auto">
            {filteredIncidents.length} of {incidents.length} incidents
          </span>
        </div>

        {filteredIncidents.length > 0 ? (
          <div className="space-y-2 p-3 sm:p-4">
            <div className="hidden grid-cols-12 gap-4 px-5 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500 lg:grid">
              <span className="col-span-3">Incident / service</span>
              <span className="col-span-2">Severity</span>
              <span className="col-span-2">Status</span>
              <span className="col-span-2">Error / latency</span>
              <span className="col-span-3">Root cause / detected</span>
            </div>
            {filteredIncidents.map(incident => (
              <IncidentRow key={incident.id} incident={incident} onSelect={onSelectIncident} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center px-5 py-12 text-center">
            <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-surface-hover text-slate-500">
              <Search size={17} />
            </span>
            <h3 className="text-sm font-semibold text-slate-200">No incidents found</h3>
            <p className="mt-1 max-w-sm text-xs text-slate-500">Try adjusting your search or filters to find an incident.</p>
            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-surface-border px-3 py-2 text-xs font-medium text-slate-300 hover:border-brand-blue/40 hover:text-white"
              >
                <X size={13} />
                Clear filters
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
