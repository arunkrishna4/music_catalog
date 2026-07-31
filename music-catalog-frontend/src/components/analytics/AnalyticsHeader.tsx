import { RefreshCw } from "lucide-react";

interface AnalyticsHeaderProps {
    onRefresh?: () => void;
    loading?: boolean;
}

export function AnalyticsHeader({ onRefresh, loading }: AnalyticsHeaderProps) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-3xl font-black text-slate-950 sm:text-4xl">
                    Catalog Analytics
                </h1>
                <p className="mt-2 text-base text-slate-500">
                    Visual insights, genre breakdown, and ratings breakdown across your music library.
                </p>
            </div>

            {onRefresh && (
                <button
                    type="button"
                    onClick={onRefresh}
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-60"
                >
                    <RefreshCw className={`h-4 w-4 text-slate-500 ${loading ? "animate-spin" : ""}`} />
                    Refresh Stats
                </button>
            )}
        </div>
    );
}
