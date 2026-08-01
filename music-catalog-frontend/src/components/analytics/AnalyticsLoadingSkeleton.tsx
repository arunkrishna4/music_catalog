export function AnalyticsLoadingSkeleton() {
    return (
        <div className="space-y-8 animate-pulse">
            {/* Header Skeleton */}
            <div className="h-14 w-64 rounded-xl bg-slate-200" />

            {/* AI Card Skeleton */}
            <div className="h-52 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" />

            {/* Summary Cards Skeleton */}
            <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-32 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex justify-between">
                            <div className="space-y-3">
                                <div className="h-4 w-24 rounded bg-slate-200" />
                                <div className="h-8 w-16 rounded bg-slate-200" />
                            </div>
                            <div className="h-11 w-11 rounded-xl bg-slate-200" />
                        </div>
                        <div className="mt-4 h-3 w-28 rounded bg-slate-200" />
                    </div>
                ))}
            </div>

            {/* Charts Grid Skeleton */}
            <div className="grid gap-6 lg:grid-cols-2">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className={`h-80 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${i === 5 ? "lg:col-span-2" : ""
                            }`}
                    >
                        <div className="h-5 w-40 rounded bg-slate-200 mb-6" />
                        <div className="h-56 w-full rounded-xl bg-slate-100" />
                    </div>
                ))}
            </div>


        </div>
    );
}
