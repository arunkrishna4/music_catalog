export function SkeletonCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="aspect-square animate-pulse rounded-2xl bg-slate-200" />

          <div className="mt-5 flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-4 w-36 animate-pulse rounded bg-slate-200" />
              <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
            </div>

            <div className="h-6 w-16 animate-pulse rounded-full bg-slate-200" />
          </div>

          <div className="mt-5 flex justify-between">
            <div className="h-3 w-12 animate-pulse rounded bg-slate-200" />
            <div className="h-3 w-16 animate-pulse rounded bg-slate-200" />
          </div>

          <div className="mt-6 h-11 animate-pulse rounded-xl bg-slate-200" />
        </div>
      ))}
    </div>
  );
}