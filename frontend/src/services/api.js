// src/services/api.js
// API service layer for SmartOps AI.
// Currently returns mock data. Swap each function to a real fetch() call
// by replacing the mock return with the commented-out fetch block.

import {
  kpiData,
  services,
  initialIncidents,
  errorRateData,
  latencyData,
  incidentFreqData,
  healthTrendData,
} from '../data/mockData';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

// ── Helpers ──────────────────────────────────────────────────────────────────

async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`);
  return res.json();
}

// ── Public API ────────────────────────────────────────────────────────────────

/** Check backend health */
export async function getHealth() {
  // return apiFetch('/health');
  return Promise.resolve({ status: 'healthy' });
}

/** Fetch all monitored services */
export async function getServices() {
  // return apiFetch('/services');
  return Promise.resolve(services);
}

/** Fetch all active incidents */
export async function getIncidents() {
  // return apiFetch('/incidents');
  return Promise.resolve(initialIncidents);
}

/**
 * Send incident telemetry to the AI analysis endpoint.
 * When the backend is ready, uncomment the real fetch and remove the mock.
 */
export async function analyzeIncident(payload) {
  return apiFetch('/analyze', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/** Chart data helpers (always mock — no backend chart endpoint yet) */
export async function getErrorRateData()     { return Promise.resolve(errorRateData); }
export async function getLatencyData()       { return Promise.resolve(latencyData); }
export async function getIncidentFreqData()  { return Promise.resolve(incidentFreqData); }
export async function getHealthTrendData()   { return Promise.resolve(healthTrendData); }
export async function getKpiData()           { return Promise.resolve(kpiData); }
