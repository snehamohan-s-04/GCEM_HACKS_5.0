// src/pages/Overview.jsx
// Main operations dashboard — the primary view judges will see.

import { useState } from 'react';
import {
  AlertTriangle, CheckCircle2, Server, Clock, Zap, Cpu,
} from 'lucide-react';

import KpiCard from '../components/KpiCard';
import ServiceHealthTable from '../components/ServiceHealthTable';
import IncidentCard from '../components/IncidentCard';
import AiAnalysisPanel from '../components/AiAnalysisPanel';
import IncidentTimeline from '../components/IncidentTimeline';
import CloudInfraPanel from '../components/CloudInfraPanel';
import { ErrorRateChart, LatencyChart, IncidentFreqChart, HealthTrendChart } from '../components/MetricCharts';
import { cloudInfra, errorRateData, latencyData, incidentFreqData, healthTrendData, simulatedIncident } from '../data/mockData';

export default function Overview({ incidents, setIncidents, services, kpis, onInvestigate, onViewAnalysis, onSimulate, simulated }) {
  // Primary AI analysis target = first critical incident or first incident
  const primaryIncident = incidents.find(i => i.severity === 'critical') || incidents[0];

  return (
    <div className="space-y-6">

      {/* ── Simulate button ───────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Operations Center</h2>
          <p className="text-xs text-slate-500 mt-0.5">Real-time infrastructure intelligence · SmartOps AI</p>
        </div>
        <button
          id="btn-simulate-incident"
          onClick={onSimulate}
          disabled={simulated}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg ${
            simulated
              ? 'bg-severity-critical/30 border border-severity-critical/40 text-severity-critical cursor-default shadow-[0_0_16px_rgba(239,68,68,0.2)]'
              : 'bg-severity-critical hover:bg-red-600 text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]'
          }`}
        >
          <AlertTriangle size={15} />
          {simulated ? 'Incident Active' : 'Simulate Incident'}
        </button>
      </div>

      {/* ── KPI Cards ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard
          title="Active Incidents"
          value={kpis.activeIncidents}
          icon={AlertTriangle}
          iconColor="bg-severity-critical/10"
          trend="+1"
          trendUp
          trendLabel="vs last hour"
          highlight
        />
        <KpiCard
          title="Critical Incidents"
          value={kpis.criticalIncidents}
          icon={Zap}
          iconColor="bg-severity-critical/10"
          highlight
        />
        <KpiCard
          title="Services Monitored"
          value={kpis.servicesMonitored}
          icon={Server}
          iconColor="bg-brand-blue/10"
          trend="+2"
          trendLabel="this week"
        />
        <KpiCard
          title="Mean Time To Recovery"
          value={kpis.mttr}
          icon={Clock}
          iconColor="bg-brand-purple/10"
          trend="-14%"
          trendUp={false}
          trendLabel="vs last week"
        />
        <KpiCard
          title="Automated Resolutions"
          value={kpis.automatedResolutions}
          unit="%"
          icon={CheckCircle2}
          iconColor="bg-severity-normal/10"
          trend="+5%"
          trendUp={false}
          trendLabel="vs last month"
        />
      </div>

      {/* ── System Health ──────────────────────────────────────────── */}
      <ServiceHealthTable services={services} />

      {/* ── Active Incidents + AI Analysis ────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Incidents list */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Active Incidents</h3>
            <span className="px-2 py-0.5 bg-severity-critical/15 border border-severity-critical/30 rounded text-[10px] font-bold text-severity-critical">
              {incidents.length} active
            </span>
          </div>
          {incidents.map(inc => (
            <IncidentCard
              key={inc.id}
              incident={inc}
              onInvestigate={onInvestigate}
              onViewAnalysis={onViewAnalysis}
            />
          ))}
        </div>

        {/* AI Analysis + Timeline */}
        <div className="space-y-4">
          <AiAnalysisPanel incident={primaryIncident} />
          {primaryIncident && <IncidentTimeline timeline={primaryIncident.timeline} />}
        </div>
      </div>

      {/* ── Charts ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ErrorRateChart data={errorRateData} />
        <LatencyChart data={latencyData} />
        <IncidentFreqChart data={incidentFreqData} />
        <HealthTrendChart data={healthTrendData} />
      </div>

      {/* ── Cloud Infra ───────────────────────────────────────────── */}
      <CloudInfraPanel clouds={cloudInfra} />
    </div>
  );
}
