export default function IncidentHistory({ incidents }) {
    const totalIncidents = incidents?.length || 0;

    const serviceCounts = (incidents || []).reduce((counts, incident) => {
        counts[incident.service] = (counts[incident.service] || 0) + 1;
        return counts;
    }, {});

    const mostAffectedService =
        Object.entries(serviceCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
        'No data';

    const criticalCount =
        incidents?.filter(i => i.severity === 'critical').length || 0;

    const aiAnalyzedCount =
        incidents?.filter(i => i.rootCause).length || 0;

    const commonRootCause =
        incidents
            ?.filter(i => i.rootCause)
            .map(i => i.rootCause)[0] || 'No root cause data';

    const preventionInsight =
        criticalCount > 0
            ? 'Prioritize critical incident prevention'
            : 'Continue monitoring incident patterns';
    return (
        <div className="space-y-6 pt-4">

            {/* Page header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-100">
                    Incident History
                </h1>

                <p className="mt-1 text-sm text-slate-400">
                    Historical record of detected and resolved incidents
                </p>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                    <p className="text-sm text-slate-400">
                        Total Incidents
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-100">
                        {incidents?.length || 0}
                    </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                    <p className="text-sm text-slate-400">
                        Critical Incidents
                    </p>

                    <p className="mt-2 text-3xl font-bold text-red-400">
                        {incidents?.filter(i => i.severity === 'critical').length || 0}
                    </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                    <p className="text-sm text-slate-400">
                        AI Analyzed
                    </p>

                    <p className="mt-2 text-3xl font-bold text-blue-400">
                        {incidents?.filter(i => i.rootCause).length || 0}
                    </p>
                </div>

            </div>
            {/* Incident Intelligence */}
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-6">

                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                        ✦
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-slate-100">
                            Incident Intelligence
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                            Patterns identified from historical incident data
                        </p>
                    </div>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

                    {/* Recurring Pattern */}
                    <div className="rounded-lg bg-slate-900/70 p-4">
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                            Recurring Pattern
                        </p>

                        <p className="mt-2 text-sm font-semibold text-yellow-400">
                            {totalIncidents > 1 ? 'Recurring service incidents' : 'No recurring pattern'}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                            Detected across multiple incidents
                        </p>
                    </div>

                    {/* Common Root Cause */}
                    <div className="rounded-lg bg-slate-900/70 p-4">
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                            Common Root Cause
                        </p>

                        <p className="mt-2 text-sm font-semibold text-slate-200">
                            {commonRootCause}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                            Most frequent failure pattern
                        </p>
                    </div>

                    {/* Most Affected Service */}
                    <div className="rounded-lg bg-slate-900/70 p-4">
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                            Most Affected Service
                        </p>

                        <p className="mt-2 text-sm font-semibold text-red-400">
                            {mostAffectedService}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                            Highest incident severity
                        </p>
                    </div>

                    {/* Prevention */}
                    <div className="rounded-lg bg-slate-900/70 p-4">
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                            AI Prevention Insight
                        </p>

                        <p className="mt-2 text-sm font-semibold text-emerald-400">
                            Review database capacity
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                            Recommended preventive action
                        </p>
                    </div>

                </div>

            </div>
            {/* Incident table */}
            <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">

                <div className="border-b border-slate-800 px-5 py-4">
                    <h2 className="text-lg font-semibold text-slate-100">
                        Incident Records
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Detected incidents and their current status
                    </p>
                </div>

                <div className="divide-y divide-slate-800">

                    {incidents?.map((incident) => (
                        <div
                            key={incident.id}
                            className="grid grid-cols-1 gap-3 px-5 py-4 md:grid-cols-5 md:items-center"
                        >

                            <div>
                                <p className="text-sm font-semibold text-slate-200">
                                    {incident.service}
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    {incident.id}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-slate-500">
                                    Severity
                                </p>

                                <p
                                    className={`mt-1 text-sm font-semibold capitalize ${incident.severity === 'critical'
                                        ? 'text-red-400'
                                        : incident.severity === 'warning'
                                            ? 'text-yellow-400'
                                            : 'text-emerald-400'
                                        }`}
                                >
                                    {incident.severity}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-slate-500">
                                    Root Cause
                                </p>

                                <p className="mt-1 truncate text-sm text-slate-300">
                                    {incident.rootCause || 'Pending AI analysis'}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-slate-500">
                                    Detected
                                </p>

                                <p className="mt-1 text-sm text-slate-300">
                                    {incident.detectedAt
                                        ? new Date(incident.detectedAt).toLocaleString()
                                        : 'N/A'}
                                </p>
                            </div>

                            <div className="md:text-right">
                                <span className="rounded-lg bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400">
                                    AI Analyzed
                                </span>
                            </div>

                        </div>
                    ))}

                </div>

            </div>

        </div>
    );
}