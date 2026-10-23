import { useEffect, useMemo, useState } from 'react';
import {
  Activity, AlertTriangle, CheckCircle2, Clock3, Cpu, Database,
  MemoryStick, Search, Server, X,
} from 'lucide-react';

const STATUS_STYLES = {
  healthy: {
    label: 'Healthy',
    text: 'text-severity-normal',
    dot: 'bg-severity-normal',
    border: 'border-severity-normal/25',
    background: 'bg-severity-normal/10',
  },
  warning: {
    label: 'Warning',
    text: 'text-severity-warning',
    dot: 'bg-severity-warning',
    border: 'border-severity-warning/25',
    background: 'bg-severity-warning/10',
  },
  critical: {
    label: 'Critical',
    text: 'text-severity-critical',
    dot: 'bg-severity-critical',
    border: 'border-severity-critical/25',
    background: 'bg-severity-critical/10',
  },
};

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'healthy', label: 'Healthy' },
  { value: 'warning', label: 'Warning' },
  { value: 'critical', label: 'Critical' },
];

function formatLatency(latency) {
  return latency >= 1000 ? `${(latency / 1000).toFixed(1)}s` : `${latency}ms`;
}

function getMetricColor(value, warningThreshold, criticalThreshold) {
  if (value >= criticalThreshold) return 'text-severity-critical';
  if (value >= warningThreshold) return 'text-severity-warning';
  return 'text-slate-200';
}

function MetricBar({ label, value, color }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[10px] text-slate-500">{label}</span>
        <span className="font-mono text-[10px] font-semibold text-slate-300">{value}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-surface-border">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        />
      </div>
    </div>
  );
}

function ServiceCard({ service, incidentCount, onSelect }) {
  const style = STATUS_STYLES[service.status] || STATUS_STYLES.healthy;
  const cpuColor = service.cpu >= 85 ? 'bg-severity-critical' : service.cpu >= 65 ? 'bg-severity-warning' : 'bg-brand-blue';
  const memoryColor = service.memory >= 85 ? 'bg-severity-critical' : service.memory >= 70 ? 'bg-severity-warning' : 'bg-brand-purple';

  return (
    <button
      type="button"
      onClick={() => onSelect(service)}
      className={`group w-full rounded-xl border bg-surface-card p-4 text-left transition-all hover:-translate-y-0.5 hover:bg-surface-hover/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/60 sm:p-5 ${
        service.status === 'critical' ? 'border-severity-critical/30 hover:border-severity-critical/50' :
          service.status === 'warning' ? 'border-severity-warning/20 hover:border-severity-warning/40' :
            'border-surface-border hover:border-brand-blue/40'
      }`}
      aria-label={`View ${service.name} service details`}
    >
      <span className="mb-4 flex items-start justify-between gap-3">
        <span className="flex min-w-0 items-center gap-3">
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${style.background} ${style.border}`}>
            <Server size={17} className={style.text} />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-white group-hover:text-brand-blue">{service.name}</span>
            <span className="mt-0.5 block truncate text-[10px] text-slate-500">{service.id}</span>
          </span>
        </span>
        <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-md border px-2 py-1 text-[10px] font-semibold ${style.background} ${style.text} ${style.border}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${style.dot} ${service.status !== 'healthy' ? 'status-pulse' : ''}`} />
          {style.label}
        </span>
      </span>

      <span className="mb-4 grid grid-cols-2 gap-4">
        <MetricBar label="CPU usage" value={service.cpu} color={cpuColor} />
        <MetricBar label="Memory usage" value={service.memory} color={memoryColor} />
      </span>

      <span className="grid grid-cols-3 divide-x divide-surface-border border-t border-surface-border pt-3">
        <span className="pr-2">
          <span className="block text-[9px] font-medium uppercase tracking-wider text-slate-500">Error rate</span>
          <span className={`mt-1 block font-mono text-xs font-semibold ${getMetricColor(service.errorRate, 3, 10)}`}>
            {service.errorRate}%
          </span>
        </span>
        <span className="px-2">
          <span className="block text-[9px] font-medium uppercase tracking-wider text-slate-500">Latency</span>
          <span className={`mt-1 block font-mono text-xs font-semibold ${getMetricColor(service.latency, 1000, 3000)}`}>
            {formatLatency(service.latency)}
          </span>
        </span>
        <span className="pl-2">
          <span className="block text-[9px] font-medium uppercase tracking-wider text-slate-500">Incidents</span>
          <span className={`mt-1 block font-mono text-xs font-semibold ${incidentCount ? 'text-severity-warning' : 'text-slate-300'}`}>
            {incidentCount}
          </span>
        </span>
      </span>
    </button>
  );
}

function ServiceDetailsModal({ service, incidents, onClose }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const style = STATUS_STYLES[service.status] || STATUS_STYLES.healthy;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onMouseDown={event => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-details-title"
        className="glass-card max-h-[90vh] w-full max-w-xl overflow-y-auto border-slate-700 shadow-2xl"
      >
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-surface-border bg-surface-card/95 px-5 py-4 backdrop-blur-sm sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${style.background} ${style.border}`}>
              <Server size={16} className={style.text} />
            </span>
            <div className="min-w-0">
              <h2 id="service-details-title" className="truncate text-sm font-bold text-white">{service.name}</h2>
              <p className="truncate text-[10px] text-slate-500">{service.id}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close service details"
            className="rounded-lg p-1.5 text-slate-500 hover:bg-surface-hover hover:text-white"
          >
            <X size={16} />
          </button>
        </header>

        <div className="space-y-5 p-5 sm:p-6">
          <div className={`flex items-center justify-between rounded-lg border px-4 py-3 ${style.background} ${style.border}`}>
            <span className="text-xs font-medium text-slate-300">Current health</span>
            <span className={`flex items-center gap-2 text-xs font-semibold ${style.text}`}>
              <span className={`h-2 w-2 rounded-full ${style.dot}`} />
              {style.label}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'CPU usage', value: `${service.cpu}%`, icon: Cpu, color: getMetricColor(service.cpu, 65, 85) },
              { label: 'Memory usage', value: `${service.memory}%`, icon: MemoryStick, color: getMetricColor(service.memory, 70, 85) },
              { label: 'Error rate', value: `${service.errorRate}%`, icon: AlertTriangle, color: getMetricColor(service.errorRate, 3, 10) },
              { label: 'Latency', value: formatLatency(service.latency), icon: Clock3, color: getMetricColor(service.latency, 1000, 3000) },
              { label: 'Incidents', value: incidents.length, icon: Activity, color: incidents.length ? 'text-severity-warning' : 'text-severity-normal' },
              { label: 'Resource profile', value: 'Monitored', icon: Database, color: 'text-brand-blue' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3 rounded-lg border border-surface-border bg-surface-hover px-3 py-3">
                <item.icon size={15} className="shrink-0 text-slate-500" />
                <span className="min-w-0">
                  <span className="block text-[10px] text-slate-500">{item.label}</span>
                  <span className={`mt-0.5 block truncate text-xs font-semibold ${item.color}`}>{item.value}</span>
                </span>
              </div>
            ))}
          </div>

          <div>
            <h3 className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">Related incidents</h3>
            {incidents.length ? (
              <div className="space-y-2">
                {incidents.map(incident => (
                  <div key={incident.id} className="rounded-lg border border-surface-border bg-surface-hover px-3 py-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-slate-200">{incident.id}</span>
                      <span className="text-[10px] capitalize text-slate-400">{incident.status}</span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400">{incident.rootCause}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="rounded-lg border border-surface-border bg-surface-hover px-3 py-3 text-xs text-slate-500">
                No incidents recorded for this service.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function Services({ services, incidents }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedService, setSelectedService] = useState(null);

  const incidentCounts = useMemo(() => {
    const counts = new Map();
    incidents.forEach(incident => {
      const serviceId = incident.serviceId;
      if (serviceId) counts.set(serviceId, (counts.get(serviceId) || 0) + 1);
    });
    return counts;
  }, [incidents]);

  const serviceIncidents = useMemo(() => {
    if (!selectedService) return [];
    return incidents.filter(incident => incident.serviceId === selectedService.id);
  }, [incidents, selectedService]);

  const filteredServices = useMemo(() => {
    const query = search.trim().toLowerCase();
    return services.filter(service => (
      (statusFilter === 'all' || service.status === statusFilter)
      && (!query || service.name.toLowerCase().includes(query) || service.id.toLowerCase().includes(query))
    ));
  }, [services, search, statusFilter]);

  const counts = useMemo(() => services.reduce((result, service) => {
    result[service.status] = (result[service.status] || 0) + 1;
    return result;
  }, { healthy: 0, warning: 0, critical: 0 }), [services]);

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-blue">Operations</p>
          <h1 className="text-xl font-bold text-white">Services</h1>
          <p className="mt-1 text-xs text-slate-500">Health and performance of monitored services across your environment.</p>
        </div>
        <div className="flex items-center gap-2 self-start rounded-lg border border-severity-normal/20 bg-severity-normal/5 px-3 py-2 sm:self-auto">
          <span className="h-2 w-2 rounded-full bg-severity-normal status-pulse" />
          <span className="text-[11px] font-medium text-severity-normal">Monitoring active</span>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3" aria-label="Service health summary">
        {[
          { label: 'Healthy', value: counts.healthy, icon: CheckCircle2, color: 'text-severity-normal' },
          { label: 'Warning', value: counts.warning, icon: Activity, color: 'text-severity-warning' },
          { label: 'Critical', value: counts.critical, icon: AlertTriangle, color: 'text-severity-critical' },
        ].map(item => (
          <div key={item.label} className="glass-card flex items-center gap-4 p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-hover">
              <item.icon size={17} className={item.color} />
            </span>
            <span>
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-500">{item.label} services</span>
              <span className="mt-0.5 block text-xl font-bold leading-none text-white">{item.value}</span>
            </span>
          </div>
        ))}
      </section>

      <section className="glass-card p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <label className="flex min-w-0 flex-col gap-1.5 lg:w-80">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Search services</span>
            <span className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="search"
                value={search}
                onChange={event => setSearch(event.target.value)}
                placeholder="Search by name or service ID"
                aria-label="Search services"
                className="w-full rounded-lg border border-surface-border bg-surface-hover py-2.5 pl-9 pr-3 text-xs text-slate-200 outline-none placeholder:text-slate-600 focus:border-brand-blue/60"
              />
            </span>
          </label>
          <div className="flex flex-wrap items-center gap-2" aria-label="Filter services by status">
            {FILTERS.map(filter => {
              const selected = statusFilter === filter.value;
              return (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setStatusFilter(filter.value)}
                  aria-pressed={selected}
                  className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                    selected
                      ? 'border-brand-blue/40 bg-brand-blue/10 text-brand-blue'
                      : 'border-surface-border bg-surface-hover text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {filter.label}
                  {filter.value !== 'all' && (
                    <span className="ml-1.5 text-[10px] opacity-70">{counts[filter.value]}</span>
                  )}
                  {filter.value === 'all' && (
                    <span className="ml-1.5 text-[10px] opacity-70">{services.length}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-white">Monitored services</h2>
            <p className="mt-0.5 text-[11px] text-slate-500">Select a service for health details and related incidents.</p>
          </div>
          <span className="rounded-md border border-surface-border bg-surface-hover px-2 py-1 text-[10px] font-medium text-slate-400">
            {filteredServices.length} of {services.length}
          </span>
        </div>
        {filteredServices.length ? (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 2xl:grid-cols-3">
            {filteredServices.map(service => (
              <ServiceCard
                key={service.id}
                service={service}
                incidentCount={incidentCounts.get(service.id) || 0}
                onSelect={setSelectedService}
              />
            ))}
          </div>
        ) : (
          <div className="glass-card flex flex-col items-center px-5 py-12 text-center">
            <Search size={18} className="mb-3 text-slate-500" />
            <h3 className="text-sm font-semibold text-slate-200">No services found</h3>
            <p className="mt-1 text-xs text-slate-500">Try another search or select a different status filter.</p>
          </div>
        )}
      </section>

      {selectedService && (
        <ServiceDetailsModal
          service={selectedService}
          incidents={serviceIncidents}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}
