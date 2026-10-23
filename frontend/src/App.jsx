// src/App.jsx
// Root application shell — manages global state and navigation.

import { useState, useCallback } from 'react';

import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import Toast from './components/Toast';
import IncidentModal from './components/IncidentModal';
import Overview from './pages/Overview';

import { initialIncidents, services, kpiData, simulatedIncident } from './data/mockData';

// Stub pages for non-overview routes
function StubPage({ title }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-slate-500">
      <p className="text-lg font-semibold text-slate-400">{title}</p>
      <p className="text-sm mt-1">Coming in the next sprint 🚀</p>
    </div>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState('overview');
  const [incidents, setIncidents] = useState(initialIncidents);
  const [kpis, setKpis] = useState(kpiData);
  const [simulated, setSimulated] = useState(false);
  const [toast, setToast] = useState(null);
  const [modalIncident, setModalIncident] = useState(null);

  // Notification count = number of critical incidents
  const notifCount = incidents.filter(i => i.severity === 'critical').length;

  // Simulate a new incident
  const handleSimulate = useCallback(() => {
    if (simulated) return;

    const newIncident = {
      ...simulatedIncident,
      id: `INC-SIM-${Date.now()}`,
      detectedAt: new Date().toISOString(),
      timeline: simulatedIncident.timeline.map((step, idx) => ({
        ...step,
        time: new Date(Date.now() + idx * 3000).toLocaleTimeString(),
      })),
    };

    setIncidents(prev => [newIncident, ...prev]);
    setKpis(prev => ({
      ...prev,
      activeIncidents: prev.activeIncidents + 1,
      criticalIncidents: prev.criticalIncidents + 1,
    }));
    setSimulated(true);
    setToast('Payment API critical — database connection pool exhausted. AI analysis complete.');
  }, [simulated]);

  const handleInvestigate  = useCallback((incident) => setModalIncident(incident), []);
  const handleViewAnalysis = useCallback((incident) => setModalIncident(incident), []);
  const handleCloseModal   = useCallback(() => setModalIncident(null), []);
  const handleCloseToast   = useCallback(() => setToast(null), []);

  function renderPage() {
    switch (activePage) {
      case 'overview':
        return (
          <Overview
            incidents={incidents}
            setIncidents={setIncidents}
            services={services}
            kpis={kpis}
            onInvestigate={handleInvestigate}
            onViewAnalysis={handleViewAnalysis}
            onSimulate={handleSimulate}
            simulated={simulated}
          />
        );
      case 'incidents':   return <StubPage title="Incidents" />;
      case 'services':    return <StubPage title="Services" />;
      case 'infra':       return <StubPage title="Infrastructure" />;
      case 'ai-analysis': return <StubPage title="AI Analysis" />;
      case 'history':     return <StubPage title="Incident History" />;
      case 'settings':    return <StubPage title="Settings" />;
      default:            return <StubPage title="Page Not Found" />;
    }
  }

  return (
    <div className="min-h-screen bg-surface text-slate-200">
      {/* Fixed sidebar */}
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      {/* Fixed top header */}
      <TopHeader activePage={activePage} notifCount={notifCount} />

      {/* Main content area */}
      <main className="ml-64 mt-14 p-6 min-h-[calc(100vh-56px)]">
        {renderPage()}
      </main>

      {/* Toast notification */}
      {toast && <Toast message={toast} onClose={handleCloseToast} />}

      {/* Incident detail modal */}
      {modalIncident && (
        <IncidentModal incident={modalIncident} onClose={handleCloseModal} />
      )}
    </div>
  );
}
