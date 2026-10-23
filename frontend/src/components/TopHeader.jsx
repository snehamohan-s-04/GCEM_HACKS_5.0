// src/components/TopHeader.jsx
import { Bell, Search, ChevronDown, User, Shield } from 'lucide-react';

const PAGE_TITLES = {
  overview:    'Overview',
  incidents:   'Incidents',
  services:    'Services',
  infra:       'Infrastructure',
  'ai-analysis': 'AI Analysis',
  history:     'Incident History',
  settings:    'Settings',
};

export default function TopHeader({ activePage, notifCount }) {
  return (
    <header className="fixed top-0 right-0 left-64 h-14 bg-surface-card border-b border-surface-border flex items-center px-6 gap-4 z-30">
      {/* Page title */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <Shield size={14} className="text-brand-blue" />
          <h2 className="text-sm font-semibold text-white">{PAGE_TITLES[activePage] || 'Dashboard'}</h2>
          <span className="text-slate-600 text-xs">/ SmartOps AI</span>
        </div>
      </div>

      {/* Search */}
      <div className="relative hidden md:block">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          id="search-input"
          type="text"
          placeholder="Search incidents, services..."
          className="w-56 pl-8 pr-3 py-1.5 bg-surface-hover border border-surface-border rounded-lg text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-brand-blue/50 transition-colors"
        />
      </div>

      {/* Notifications */}
      <button id="btn-notifications" className="relative p-1.5 text-slate-400 hover:text-white hover:bg-surface-hover rounded-lg">
        <Bell size={16} />
        {notifCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-severity-critical text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            {notifCount}
          </span>
        )}
      </button>

      {/* Environment */}
      <button id="btn-environment" className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-hover border border-surface-border rounded-lg text-xs font-medium text-slate-300 hover:border-brand-blue/30 transition-colors">
        <span className="w-1.5 h-1.5 rounded-full bg-severity-normal" />
        Production
        <ChevronDown size={12} className="text-slate-500" />
      </button>

      {/* User */}
      <button id="btn-user-profile" className="flex items-center gap-2 px-2 py-1 hover:bg-surface-hover rounded-lg transition-colors">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center">
          <User size={13} className="text-white" />
        </div>
        <div className="hidden md:block text-left">
          <p className="text-xs font-medium text-white leading-tight">SRE Admin</p>
          <p className="text-[10px] text-slate-500 leading-tight">Platform Team</p>
        </div>
      </button>
    </header>
  );
}
