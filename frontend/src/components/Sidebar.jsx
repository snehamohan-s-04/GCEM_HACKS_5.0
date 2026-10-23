// src/components/Sidebar.jsx
import { useState } from 'react';
import {
  LayoutDashboard, AlertTriangle, Server, Cloud,
  Brain, History, Settings, Zap, CheckCircle2, ChevronRight,
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'overview',    label: 'Overview',         icon: LayoutDashboard },
  { id: 'incidents',   label: 'Incidents',        icon: AlertTriangle   },
  { id: 'services',    label: 'Services',         icon: Server          },
  { id: 'infra',       label: 'Infrastructure',   icon: Cloud           },
  { id: 'ai-analysis', label: 'AI Analysis',      icon: Brain           },
  { id: 'history',     label: 'Incident History', icon: History         },
  { id: 'settings',    label: 'Settings',         icon: Settings        },
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-surface-card border-r border-surface-border flex flex-col z-40">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-surface-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center shadow-lg">
            <Zap size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-wide leading-tight">SMARTOPS AI</h1>
            <p className="text-[10px] text-slate-400 leading-tight">Autonomous Resolution Engine</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const active = activePage === id;
          return (
            <button
              key={id}
              id={`nav-${id}`}
              onClick={() => onNavigate(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                active
                  ? 'bg-brand-blue/10 text-brand-blue border border-brand-blue/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-surface-hover'
              }`}
            >
              <Icon size={16} className={active ? 'text-brand-blue' : 'text-slate-500 group-hover:text-slate-300'} />
              {label}
              {active && <ChevronRight size={12} className="ml-auto text-brand-blue" />}
            </button>
          );
        })}
      </nav>

      {/* Status footer */}
      <div className="px-4 py-4 border-t border-surface-border space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-severity-normal status-pulse" />
          <span className="text-xs text-slate-400">System Operational</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-purple status-pulse" />
          <span className="text-xs text-slate-400">AI Engine Online</span>
        </div>
      </div>
    </aside>
  );
}
