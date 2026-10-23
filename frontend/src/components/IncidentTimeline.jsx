// src/components/IncidentTimeline.jsx
import { CheckCircle2, Circle, Clock } from 'lucide-react';

export default function IncidentTimeline({ timeline }) {
  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-white mb-4">Incident Timeline</h3>
      <div className="relative space-y-0">
        {timeline.map((item, idx) => {
          const isLast = idx === timeline.length - 1;
          return (
            <div key={item.id} className="relative flex gap-3">
              {/* Connector line */}
              {!isLast && (
                <div className="absolute left-[10px] top-6 bottom-0 w-px bg-surface-border" />
              )}

              {/* Icon */}
              <div className="relative z-10 mt-0.5 flex-shrink-0">
                {item.done
                  ? <CheckCircle2 size={20} className="text-severity-normal" />
                  : <Circle size={20} className="text-slate-600" />
                }
              </div>

              {/* Content */}
              <div className={`flex-1 pb-5 ${isLast ? 'pb-0' : ''}`}>
                <div className="flex items-center justify-between">
                  <p className={`text-xs font-medium ${item.done ? 'text-slate-200' : 'text-slate-600'}`}>
                    {item.step}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-slate-600">
                    <Clock size={9} />
                    {item.time}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
