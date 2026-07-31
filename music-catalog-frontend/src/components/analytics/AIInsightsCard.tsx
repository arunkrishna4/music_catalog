import { Disc, Music, Sparkles, User, Wand2 } from "lucide-react";
import type { AnalyticsResponse } from "../../hooks/useAnalytics";

interface AIInsightsCardProps {
    analytics: AnalyticsResponse;
    onGenerate: () => void;
}

export function AIInsightsCard({ analytics, onGenerate }: AIInsightsCardProps) {

    const favoriteGenre = analytics.favoriteGenre || "Pop / Rock";
    const topArtistName = analytics.topArtists?.[0]?.artist || "Featured Artists";

    return (
        <div className="mt-8 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/80 via-indigo-50/40 to-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2563EB] text-white shadow-md shadow-blue-500/20">
                        <Sparkles className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">AI Music Recommendations</h2>
                        <p className="text-xs text-slate-500">Personalized taste summary & recommendations</p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onGenerate}
                    disabled={false}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 hover:shadow-md disabled:opacity-60"
                >
                    <Wand2 className="h-4 w-4" />

                    Generate AI Insights
                </button>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
                {/* Music Taste Summary */}
                <div className="rounded-xl border border-slate-200/80 bg-white/90 p-5 shadow-sm">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <Music className="h-4 w-4 text-[#2563EB]" />
                        Music Taste Summary
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-slate-600">
                        Deeply curated collection of {analytics.totalAlbums} albums spanning{" "}
                        {analytics.uniqueArtists} unique artists with a preference for{" "}
                        {favoriteGenre}.
                    </p>
                </div>

                {/* Recommended Genres / Artists */}
                <div className="rounded-xl border border-slate-200/80 bg-white/90 p-5 shadow-sm">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <User className="h-4 w-4 text-[#2563EB]" />
                        Recommended Genres & Artists
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                        <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                            {favoriteGenre}
                        </span>
                        <span className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
                            Alternative
                        </span>
                        <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                            {topArtistName}
                        </span>
                    </div>
                </div>

                {/* Suggested Albums */}
                <div className="rounded-xl border border-slate-200/80 bg-white/90 p-5 shadow-sm">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                        <Disc className="h-4 w-4 text-[#2563EB]" />
                        Suggested Albums
                    </div>
                    <ul className="mt-3 space-y-1 text-xs text-slate-600">
                        <li className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
                            Discover weekly essentials matching {favoriteGenre}
                        </li>
                        <li className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                            Critically acclaimed releases by {topArtistName}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
