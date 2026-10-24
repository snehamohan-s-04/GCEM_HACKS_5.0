export default function Settings() {
    return (
        <div className="space-y-6 pt-4">

            {/* Page header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-100">
                    Settings
                </h1>

                <p className="mt-1 text-sm text-slate-400">
                    Configure SmartOps AI monitoring and incident response
                </p>
            </div>

            {/* Environment */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
                <h2 className="text-lg font-semibold text-slate-100">
                    Environment
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Current SmartOps deployment configuration
                </p>

                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">

                    <div className="rounded-lg bg-slate-800/60 p-4">
                        <p className="text-xs text-slate-500">
                            Environment
                        </p>

                        <p className="mt-1 font-semibold text-emerald-400">
                            Production
                        </p>
                    </div>

                    <div className="rounded-lg bg-slate-800/60 p-4">
                        <p className="text-xs text-slate-500">
                            Monitoring Mode
                        </p>

                        <p className="mt-1 font-semibold text-blue-400">
                            Simulated Monitoring
                        </p>
                    </div>

                </div>
            </div>

            {/* AI Engine */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
                <h2 className="text-lg font-semibold text-slate-100">
                    AI Engine
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    SmartOps incident analysis configuration
                </p>

                <div className="mt-5 space-y-4">

                    <div className="flex items-center justify-between rounded-lg bg-slate-800/60 p-4">
                        <div>
                            <p className="text-sm font-medium text-slate-200">
                                Gemini AI Analysis
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                                Analyze incidents and generate root-cause insights
                            </p>
                        </div>

                        <span className="rounded-md bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
                            ENABLED
                        </span>
                    </div>

                    <div className="flex items-center justify-between rounded-lg bg-slate-800/60 p-4">
                        <div>
                            <p className="text-sm font-medium text-slate-200">
                                Automatic Remediation
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                                Execute recommended fixes automatically
                            </p>
                        </div>

                        <span className="rounded-md bg-yellow-500/10 px-3 py-1.5 text-xs font-medium text-yellow-400">
                            APPROVAL REQUIRED
                        </span>
                    </div>

                </div>
            </div>

            {/* Incident Response */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
                <h2 className="text-lg font-semibold text-slate-100">
                    Incident Response
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Control how SmartOps handles detected incidents
                </p>

                <div className="mt-5 space-y-4">

                    <div className="rounded-lg bg-slate-800/60 p-4">
                        <p className="text-sm font-medium text-slate-200">
                            Critical Incident Handling
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                            AI analysis is generated automatically for critical incidents.
                        </p>
                    </div>

                    <div className="rounded-lg bg-slate-800/60 p-4">
                        <p className="text-sm font-medium text-slate-200">
                            Remediation Safety
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                            Human approval is required before executing recommended actions.
                        </p>
                    </div>

                </div>
            </div>

        </div>
    );
}