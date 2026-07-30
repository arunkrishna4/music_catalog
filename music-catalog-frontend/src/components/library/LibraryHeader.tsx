import { ChevronDown, Grid3X3, ListMusic } from "lucide-react";

import { type SortOption, type ViewMode } from "../../data/libraryCatalog";

type LibraryHeaderProps = {
  sortOption: SortOption;
  viewMode: ViewMode;
  onSortChange: (sortOption: SortOption) => void;
  onViewModeChange: (viewMode: ViewMode) => void;
};

export function LibraryHeader({
  sortOption,
  viewMode,
  onSortChange,
  onViewModeChange,
}: LibraryHeaderProps) {
  return (
    <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
      <div>
        <h1 className="text-3xl font-black text-slate-950 sm:text-4xl">
          My Library
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
          Your saved albums, listening notes, and favorite artists in one calm
          place.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
          <button
            type="button"
            onClick={() => onViewModeChange("grid")}
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
              viewMode === "grid"
                ? "bg-[#2563EB] text-white"
                : "text-slate-500 hover:bg-slate-100"
            }`}
            aria-label="Grid view"
          >
            <Grid3X3 className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange("list")}
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
              viewMode === "list"
                ? "bg-[#2563EB] text-white"
                : "text-slate-500 hover:bg-slate-100"
            }`}
            aria-label="List view"
          >
            <ListMusic className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <label className="relative">
          <span className="sr-only">Sort library</span>
          <select
            value={sortOption}
            onChange={(event) => onSortChange(event.target.value as SortOption)}
            className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm font-bold text-slate-700 shadow-sm outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 sm:w-44"
          >
            <option>Recently Added</option>

            <option>Album Title</option>
            <option>Artist</option>
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
        </label>
      </div>
    </div>
  );
}
