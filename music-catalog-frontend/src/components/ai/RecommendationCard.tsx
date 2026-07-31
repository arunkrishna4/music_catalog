import { Lightbulb, Music2, User } from "lucide-react";

export type Recommendation = {
    album: string;
    artist: string;
    reason: string;
};

type RecommendationCardProps = {
    recommendation: Recommendation;
};

export function RecommendationCard({
    recommendation,
}: RecommendationCardProps) {
    return (
        <article className="rounded-xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start gap-4">
                <div className="rounded-xl bg-blue-100 p-3">
                    <Music2 className="h-6 w-6 text-blue-600" />
                </div>

                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">
                        {recommendation.album}
                    </h3>

                    <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                        <User className="h-4 w-4" />
                        <span>{recommendation.artist}</span>
                    </div>

                    <div className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 p-3">
                        <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />

                        <p className="text-sm leading-6 text-amber-900">
                            {recommendation.reason}
                        </p>
                    </div>
                </div>
            </div>
        </article>
    );
}