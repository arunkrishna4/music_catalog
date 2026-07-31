import { Bot, RefreshCcw } from "lucide-react";

export function AILoading() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <Bot className="h-6 w-6 animate-pulse text-blue-600" />

                <div>
                    <h3 className="font-semibold text-slate-900">
                        Gemini is analyzing your music taste...
                    </h3>

                    <p className="text-sm text-slate-500">
                        This usually takes just a few seconds.
                    </p>
                </div>
            </div>

            <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                    <SkeletonCard key={index} />
                ))}
            </div>
        </div>
    );
}

function SkeletonCard() {
    return (
        <div className="animate-pulse rounded-xl border border-slate-200 p-5">
            <div className="mb-4 h-5 w-2/5 rounded bg-slate-200" />

            <div className="mb-5 h-4 w-1/3 rounded bg-slate-200" />

            <div className="space-y-2">
                <div className="h-3 rounded bg-slate-200" />
                <div className="h-3 w-5/6 rounded bg-slate-200" />
            </div>
        </div>
    );
}

type AIErrorProps = {
    onRetry: () => void;
};

export function AIError({ onRetry }: AIErrorProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-red-100 p-4">
                <RefreshCcw className="h-8 w-8 text-red-500" />
            </div>

            <h3 className="mt-5 text-xl font-semibold text-slate-900">
                Couldn't generate recommendations
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                Something went wrong while contacting Gemini AI. Please try again.
            </p>

            <button
                onClick={onRetry}
                className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
            >
                Retry
            </button>
        </div>
    );
}