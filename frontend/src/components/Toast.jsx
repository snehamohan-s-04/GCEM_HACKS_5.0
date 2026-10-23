// src/components/Toast.jsx
import { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 5000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed top-16 right-4 z-50 animate-slide-in">
      <div className="flex items-start gap-3 px-4 py-3 bg-surface-card border border-severity-critical/40 rounded-xl shadow-2xl max-w-xs">
        <div className="w-7 h-7 rounded-lg bg-severity-critical/20 flex items-center justify-center flex-shrink-0 mt-0.5">
          <AlertTriangle size={14} className="text-severity-critical" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-white">Critical Incident Detected</p>
          <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{message}</p>
        </div>
        <button onClick={onClose} className="text-slate-600 hover:text-slate-300 transition-colors flex-shrink-0 mt-0.5">
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
