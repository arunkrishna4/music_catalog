import { type ViewMode } from "../../data/libraryCatalog";

type LibrarySkeletonProps = {
  viewMode: ViewMode;
};

export function LibrarySkeleton({ viewMode }: LibrarySkeletonProps) {
  const cards = Array.from({ length: viewMode === "grid" ? 8 : 5 });

  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        {cards.map((_, index) => (
          <div
            key={index}
            className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="h-24 w-24 shrink-0 animate-pulse rounded-xl bg-slate-200" />
            <div className="flex-1">
              <div className="h-5 w-1/3 animate-pulse rounded bg-slate-200" />
              <div className="mt-3 h-4 w-1/4 animate-pulse rounded bg-slate-200" />
              <div className="mt-5 h-4 w-2/3 animate-pulse rounded bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {cards.map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="aspect-square animate-pulse rounded-xl bg-slate-200" />
          <div className="mt-5 h-4 w-3/4 animate-pulse rounded bg-slate-200" />
          <div className="mt-3 h-3 w-1/2 animate-pulse rounded bg-slate-200" />
          <div className="mt-5 h-16 animate-pulse rounded-xl bg-slate-100" />
        </div>
      ))}
    </div>
  );
}
