import { Disc3, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export function AnalyticsEmptyState() {
    return (
        <div className="mt-8 flex min-h-[450px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-[#2563EB]">
                <Disc3 className="h-8 w-8" />
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900">
                Save some albums to unlock analytics
            </h3>
            <p className="mt-2 max-w-md text-sm text-slate-500">
                Your music collection insights, genre charts, release trends, and AI recommendations will appear right here once you add albums to your library.
            </p>

            <Link
                to="/search"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
                <Plus className="h-4 w-4" />
                Explore & Add Music
            </Link>
        </div>
    );
}
