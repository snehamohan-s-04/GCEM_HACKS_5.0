import { useEffect, useState } from 'react';

const infrastructureData = {
    aws: {
        name: 'AWS',
        resources: 48,
        healthy: 43,
        warning: 3,
        critical: 2,
        cpu: 68,
        memory: 61,
        latency: 184,
        errorRate: 1.8,
    },
    azure: {
        name: 'Azure',
        resources: 23,
        healthy: 21,
        warning: 2,
        critical: 0,
        cpu: 54,
        memory: 57,
        latency: 142,
        errorRate: 0.9,
    },
    gcp: {
        name: 'GCP',
        resources: 15,
        healthy: 14,
        warning: 1,
        critical: 0,
        cpu: 47,
        memory: 52,
        latency: 118,
        errorRate: 0.6,
    },
};

const recentEvents = [
    {
        time: '2 min ago',
        resource: 'payment-api-prod',
        event: 'High CPU utilization detected',
        status: 'warning',
    },
    {
        time: '8 min ago',
        resource: 'api-gateway-prod',
        event: 'Latency threshold exceeded',
        status: 'warning',
    },
    {
        time: '14 min ago',
        resource: 'auth-service-prod',
        event: 'Health check passed',
        status: 'healthy',
    },
    {
        time: '21 min ago',
        resource: 'postgres-primary',
        event: 'Connection pool normalized',
        status: 'healthy',
    },
];

function MetricBar({ value, label }) {
    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400">{label}</span>
                <span className="text-xs font-semibold text-slate-200">
                    {value}%
                </span>
            </div>

            <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                    className={`h-full rounded-full ${value >= 85
                        ? 'bg-red-500'
                        : value >= 70
                            ? 'bg-yellow-500'
                            : 'bg-blue-500'
                        }`}
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}

function StatusBadge({ status }) {
    const styles = {
        healthy: 'bg-emerald-500/10 text-emerald-400',
        warning: 'bg-yellow-500/10 text-yellow-400',
        critical: 'bg-red-500/10 text-red-400',
    };

    return (
        <span
            className={`px-2 py-1 rounded-md text-xs font-medium ${styles[status]
                }`}
        >
            {status}
        </span>
    );
}

export default function Infrastructure() {
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [selectedCloud, setSelectedCloud] = useState(null);
    useEffect(() => {
        const interval = setInterval(() => {
            setLastUpdated(new Date());
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6 pt-4">

            {/* Page header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-100">
                        Infrastructure
                    </h1>

                    <p className="mt-1 text-sm text-slate-400">
                        Cloud infrastructure health and resource monitoring
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-400">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        LIVE MONITORING
                    </span>

                    <span className="text-xs text-slate-500">
                        Updated {lastUpdated.toLocaleTimeString()}
                    </span>
                </div>
            </div>

            {/* Overall health */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">

                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                    <p className="text-sm text-slate-400">
                        Total Resources
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-100">
                        86
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                        Across all cloud providers
                    </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                    <p className="text-sm text-slate-400">
                        Healthy
                    </p>

                    <p className="mt-2 text-3xl font-bold text-emerald-400">
                        78
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                        90.7% of resources
                    </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                    <p className="text-sm text-slate-400">
                        Warnings
                    </p>

                    <p className="mt-2 text-3xl font-bold text-yellow-400">
                        6
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                        Require attention
                    </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                    <p className="text-sm text-slate-400">
                        Critical
                    </p>

                    <p className="mt-2 text-3xl font-bold text-red-400">
                        2
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                        Active incidents
                    </p>
                </div>
            </div>

            {/* Cloud providers */}
            <div>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-slate-100">
                        Cloud Infrastructure
                    </h2>

                    <p className="text-sm text-slate-500">
                        Resource health across connected environments
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

                    {Object.values(infrastructureData).map((cloud) => (
                        <div
                            key={cloud.name}
                            onClick={() => setSelectedCloud(cloud.name)}
                            className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 cursor-pointer transition-all hover:border-blue-500/50 hover:bg-slate-900"
                        >

                            {/* Provider header */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-100">
                                        {cloud.name}
                                    </h3>

                                    <p className="text-xs text-slate-500">
                                        {cloud.resources} resources
                                    </p>
                                </div>

                                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-sm font-bold text-blue-400">
                                    {cloud.name[0]}
                                </span>
                            </div>

                            {/* Resource health */}
                            <div className="mt-5 grid grid-cols-3 gap-2">

                                <div className="rounded-lg bg-slate-800/60 p-3">
                                    <p className="text-xs text-slate-500">
                                        Healthy
                                    </p>

                                    <p className="mt-1 font-semibold text-emerald-400">
                                        {cloud.healthy}
                                    </p>
                                </div>

                                <div className="rounded-lg bg-slate-800/60 p-3">
                                    <p className="text-xs text-slate-500">
                                        Warning
                                    </p>

                                    <p className="mt-1 font-semibold text-yellow-400">
                                        {cloud.warning}
                                    </p>
                                </div>

                                <div className="rounded-lg bg-slate-800/60 p-3">
                                    <p className="text-xs text-slate-500">
                                        Critical
                                    </p>

                                    <p className="mt-1 font-semibold text-red-400">
                                        {cloud.critical}
                                    </p>
                                </div>

                            </div>

                            {/* Metrics */}
                            <div className="mt-5 space-y-4">

                                <MetricBar
                                    value={cloud.cpu}
                                    label="CPU Utilization"
                                />

                                <MetricBar
                                    value={cloud.memory}
                                    label="Memory Utilization"
                                />

                            </div>

                            {/* Application metrics */}
                            <div className="mt-5 grid grid-cols-2 gap-3">

                                <div>
                                    <p className="text-xs text-slate-500">
                                        Avg Latency
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-200">
                                        {cloud.latency} ms
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-slate-500">
                                        Error Rate
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-200">
                                        {cloud.errorRate}%
                                    </p>
                                </div>

                            </div>

                        </div>
                    ))}

                </div>
            </div>
            {selectedCloud && (
                <div className="rounded-xl border border-blue-500/30 bg-slate-900/70 p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-100">
                                {selectedCloud} Infrastructure
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Detailed resource health and performance metrics
                            </p>
                        </div>

                        <button
                            onClick={() => setSelectedCloud(null)}
                            className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                        >
                            Close
                        </button>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-4">
                        <div className="rounded-lg bg-slate-800/60 p-4">
                            <p className="text-xs text-slate-500">Status</p>
                            <p className="mt-1 font-semibold text-emerald-400">
                                Operational
                            </p>
                        </div>

                        <div className="rounded-lg bg-slate-800/60 p-4">
                            <p className="text-xs text-slate-500">Resources</p>
                            <p className="mt-1 font-semibold text-slate-100">
                                {infrastructureData[selectedCloud.toLowerCase()].resources}
                            </p>
                        </div>

                        <div className="rounded-lg bg-slate-800/60 p-4">
                            <p className="text-xs text-slate-500">Avg Latency</p>
                            <p className="mt-1 font-semibold text-slate-100">
                                {infrastructureData[selectedCloud.toLowerCase()].latency} ms
                            </p>
                        </div>

                        <div className="rounded-lg bg-slate-800/60 p-4">
                            <p className="text-xs text-slate-500">Error Rate</p>
                            <p className="mt-1 font-semibold text-slate-100">
                                {infrastructureData[selectedCloud.toLowerCase()].errorRate}%
                            </p>
                        </div>
                    </div>
                </div>
            )}
            {/* Recent infrastructure events */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60">

                <div className="border-b border-slate-800 px-5 py-4">
                    <h2 className="text-lg font-semibold text-slate-100">
                        Recent Infrastructure Events
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Latest events detected across monitored resources
                    </p>
                </div>

                <div className="divide-y divide-slate-800">

                    {recentEvents.map((event, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between px-5 py-4"
                        >

                            <div className="flex items-center gap-4">

                                <div
                                    className={`h-2 w-2 rounded-full ${event.status === 'healthy'
                                        ? 'bg-emerald-400'
                                        : event.status === 'warning'
                                            ? 'bg-yellow-400'
                                            : 'bg-red-400'
                                        }`}
                                />

                                <div>
                                    <p className="text-sm font-medium text-slate-200">
                                        {event.event}
                                    </p>

                                    <p className="mt-1 text-xs text-slate-500">
                                        {event.resource}
                                    </p>
                                </div>

                            </div>

                            <div className="flex items-center gap-4">
                                <StatusBadge status={event.status} />

                                <span className="text-xs text-slate-500">
                                    {event.time}
                                </span>
                            </div>

                        </div>
                    ))}

                </div>
            </div>

        </div>
    );
}