import { AlertCircle, RefreshCw } from "lucide-react";

interface AnalyticsErrorStateProps {
    message?: string;
    onRetry: () => void;
}

export function AnalyticsErrorState({ message, onRetry }: AnalyticsErrorStateProps) {
    return (
        <div className="mt-8 flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50/50 p-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
                <AlertCircle className="h-7 w-7" />
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-900">
                Failed to load analytics
            </h3>
            <p className="mt-1 max-w-md text-sm text-slate-600">
                {message || "We encountered an issue fetching your catalog statistics from the server."}
            </p>

            <button
                type="button"
                onClick={onRetry}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
                <RefreshCw className="h-4 w-4" />
                Try Again
            </button>
        </div>
    );
}
