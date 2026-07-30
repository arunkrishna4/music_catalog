import { ChevronDown, Search } from "lucide-react";

import { genreFilters, type RatingFilter } from "../../data/libraryCatalog";
import { Button } from "../ui/button";

const RATING_OPTIONS: RatingFilter[] = [
  "All Ratings",
  "5 Stars",
  "4+ Stars",
  "3+ Stars",
];

type LibraryFiltersProps = {
  query: string;
  genre: (typeof genreFilters)[number];
  ratingFilter: RatingFilter;
  loading: boolean;
  onQueryChange: (query: string) => void;
  onGenreChange: (genre: (typeof genreFilters)[number]) => void;
  onRatingFilterChange: (ratingFilter: RatingFilter) => void;
  onRefresh: () => void;
};

export function LibraryFilters({
  query,
  genre,
  ratingFilter,
  loading,
  onQueryChange,
  onGenreChange,
  onRatingFilterChange,
  onRefresh,
}: LibraryFiltersProps) {
  const activeRatingIndex = RATING_OPTIONS.indexOf(ratingFilter);

  return (
    <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm xl:flex-row xl:items-center">
      <label className="relative min-w-0 flex-1">
        <span className="sr-only">Search library</span>
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search albums, artists, or notes"
          className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm font-medium text-slate-950 outline-none transition focus:border-[#2563EB] focus:bg-white focus:ring-4 focus:ring-blue-100"
        />
      </label>

      <label className="relative">
        <span className="sr-only">Filter by genre</span>
        <select
          value={genre}
          onChange={(event) =>
            onGenreChange(event.target.value as (typeof genreFilters)[number])
          }
          className="h-14 w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 pr-10 text-sm font-bold text-slate-700 outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100 xl:w-44"
        >
          {genreFilters.map((genreOption) => (
            <option key={genreOption}>{genreOption}</option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
      </label>

      {/* Segmented control replaces the native rating <select> */}
      <div
        role="radiogroup"
        aria-label="Filter by rating"
        className="relative grid h-14 shrink-0 grid-cols-4 rounded-2xl bg-slate-100 p-1 xl:w-[22rem]"
      >
        <div
          aria-hidden="true"
          className="absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/4)] rounded-xl bg-white shadow-sm shadow-slate-300/50 transition-transform duration-200 ease-out"
          style={{ transform: `translateX(${activeRatingIndex * 100}%)` }}
        />
        {RATING_OPTIONS.map((option) => {
          const isActive = option === ratingFilter;
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onRatingFilterChange(option)}
              className={`relative z-10 rounded-xl px-1 text-[11px] font-bold transition-colors sm:text-xs ${isActive ? "text-[#2563EB]" : "text-slate-500 hover:text-slate-700"
                }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      <Button
        type="button"
        isLoading={loading}
        onClick={onRefresh}
        className="h-14 rounded-2xl px-8"
      >
        Refresh
      </Button>
    </div>
  );
}