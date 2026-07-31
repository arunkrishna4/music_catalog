import { useEffect } from "react";
import {
    Bot,
    Sparkles,
    X,
} from "lucide-react";

import { useAIRecommendations } from "../../hooks/useAIRecommendations";
import { AILoading, AIError } from "./AILoading";
import { RecommendationCard } from "./RecommendationCard";

import type { Recommendation } from "./RecommendationCard";

type AIRecommendationDialogProps = {
    open: boolean;
    onClose: () => void;
};

export function AIRecommendationDialog({
    open,
    onClose,
}: AIRecommendationDialogProps) {
    const { data, isLoading, error, refetch } = useAIRecommendations(open);

    // Lock body scroll while the dialog is open, and allow Escape to close it
    useEffect(() => {
        if (!open) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="ai-recommendation-title"
                onClick={(e) => e.stopPropagation()}
                className="flex max-h-[85vh] w-full max-w-[800px] flex-col overflow-hidden rounded-2xl bg-white shadow-xl"
            >
                <DialogHeader onClose={onClose} />

                <div className="flex-1 overflow-y-auto px-6 py-6">
                    {isLoading ? (
                        <AILoading />
                    ) : error ? (
                        <AIError onRetry={() => refetch()} />
                    ) : data ? (
                        <ResultsState
                            summary={data.summary}
                            recommendations={data.recommendations}
                        />
                    ) : null}
                </div>

                <DialogFooter onClose={onClose} />
            </div>
        </div>
    );
}

function DialogHeader({ onClose }: { onClose: () => void }) {
    return (
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-100 bg-white px-6 py-5">
            <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#4F46E5] text-white">
                    <Bot className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                    <h2
                        id="ai-recommendation-title"
                        className="text-lg font-black text-slate-950"
                    >
                        AI music recommendations
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Personalized recommendations based on your library
                    </p>
                </div>
            </div>

            <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
                <X className="h-5 w-5" aria-hidden="true" />
            </button>
        </div>
    );
}

function DialogFooter({ onClose }: { onClose: () => void }) {
    return (
        <div className="sticky bottom-0 border-t border-slate-100 bg-white px-6 py-4">
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={onClose}
                    className="h-10 rounded-xl border border-slate-200 px-5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

function ResultsState({
    summary,
    recommendations,
}: {
    summary: string;
    recommendations: Recommendation[];
}) {
    return (
        <div>
            <div className="mb-5 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#2563EB]" aria-hidden="true" />
                <p className="text-sm leading-6 text-blue-900">{summary}</p>
            </div>

            <div className="space-y-3">
                {recommendations.map((recommendation, index) => (
                    <RecommendationCard key={`${recommendation.album}-${index}`} recommendation={recommendation} />
                ))}
            </div>
        </div>
    );
}

