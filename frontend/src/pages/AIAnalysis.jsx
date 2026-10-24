import { useState } from 'react';

export default function AIAnalysis({ incidents }) {
    const [remediationStatus, setRemediationStatus] = useState('pending');
    const incident = incidents && incidents.length > 0 ? incidents[0] : null;

    return (
        <div className="space-y-6 pt-4">

            {/* Page header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-100">
                    AI Analysis
                </h1>

                <p className="mt-1 text-sm text-slate-400">
                    AI-powered incident investigation and root cause analysis
                </p>
            </div>

            {/* AI status */}
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5">
                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                        ✦
                    </div>

                    <div>
                        <p className="font-semibold text-slate-100">
                            SmartOps AI Engine
                        </p>

                        <p className="text-sm text-slate-400">
                            Gemini-powered incident analysis is ready
                        </p>
                    </div>

                    <span className="ml-auto rounded-lg bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-400">
                        ONLINE
                    </span>

                </div>
            </div>

            {/* Latest AI analysis */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">

                {incident ? (
                    <div className="space-y-6">

                        {/* Incident header */}
                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-xs uppercase tracking-wide text-slate-500">
                                    Latest Incident
                                </p>

                                <h2 className="mt-1 text-xl font-semibold text-slate-100">
                                    {incident.service}
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    {incident.id}
                                </p>
                            </div>

                            <span className="rounded-lg bg-red-500/10 px-3 py-2 text-xs font-semibold uppercase text-red-400">
                                {incident.severity}
                            </span>

                        </div>

                        {/* AI analysis cards */}
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

                            {/* Root Cause */}
                            <div className="rounded-lg bg-slate-800/60 p-5">

                                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                    Root Cause
                                </p>

                                <p className="mt-2 text-sm leading-6 text-slate-200">
                                    {incident.rootCause || 'AI root cause analysis not available yet.'}
                                </p>

                            </div>

                            {/* Explanation */}
                            <div className="rounded-lg bg-slate-800/60 p-5">

                                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                    Explanation
                                </p>

                                <p className="mt-2 text-sm leading-6 text-slate-200">
                                    {incident.explanation || 'AI explanation not available yet.'}
                                </p>

                            </div>

                            {/* Recommended Action */}
                            <div className="rounded-lg bg-blue-500/5 p-5 lg:col-span-2">

                                <p className="text-xs font-medium uppercase tracking-wide text-blue-400">
                                    Recommended Action
                                </p>

                                <p className="mt-2 text-sm leading-6 text-slate-200">
                                    {incident.recommendedAction || 'No recommendation available yet.'}
                                </p>
                                <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4">

                                    <div>
                                        <p className="text-xs text-slate-500">
                                            Remediation
                                        </p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            Review the AI recommendation before execution
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => setRemediationStatus('approved')}
                                        disabled={remediationStatus !== 'pending'}
                                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {remediationStatus === 'pending'
                                            ? 'Approve & Remediate'
                                            : 'Remediation Approved'}
                                    </button>

                                </div>
                            </div>

                        </div>

                    </div>
                ) : (
                    <div className="py-10 text-center">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-slate-800 text-2xl">
                            ✦
                        </div>

                        <h2 className="mt-4 text-lg font-semibold text-slate-200">
                            No incident selected
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                            Simulate an incident from the Overview page to generate AI-powered
                            root cause analysis.
                        </p>

                    </div>
                )}

            </div>

        </div>
    );
}