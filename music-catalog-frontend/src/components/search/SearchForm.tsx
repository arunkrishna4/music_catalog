import { type FormEvent } from "react";
import { Search, Disc3, Mic2, Music2 } from "lucide-react";

import { type SearchType } from "../../data/musicCatalog";
import { Button } from "../ui/button";

type SearchFormProps = {
  query: string;
  searchType: SearchType;
  loading: boolean;
  onQueryChange: (query: string) => void;
  onSearchTypeChange: (searchType: SearchType) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const SEARCH_TYPES: { value: SearchType; label: string; icon: typeof Disc3 }[] = [
  { value: "Album", label: "Album", icon: Disc3 },
  { value: "Artist", label: "Artist", icon: Mic2 },
  { value: "Song", label: "Song", icon: Music2 },
];

export function SearchForm({
  query,
  searchType,
  loading,
  onQueryChange,
  onSearchTypeChange,
  onSubmit,
}: SearchFormProps) {
  const activeIndex = SEARCH_TYPES.findIndex((t) => t.value === searchType);

  return (
    <form
      onSubmit={onSubmit}
      className="mt-8 flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm shadow-slate-200/60 md:flex-row md:items-center"
    >
      <label className="relative min-w-0 flex-1">
        <span className="sr-only">Search music catalog</span>
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search albums, artists or songs..."
          className="h-12 w-full rounded-xl border border-transparent bg-slate-50 pl-12 pr-4 text-sm font-medium text-slate-950 outline-none transition focus:border-[#2563EB] focus:bg-white focus:ring-4 focus:ring-blue-100"
        />
      </label>

      {/* Segmented control replaces the native <select> */}
      <div
        role="radiogroup"
        aria-label="Search category"
        className="relative grid h-12 shrink-0 grid-cols-3 rounded-xl bg-slate-100 p-1 md:w-[19.5rem]"
      >
        <div
          aria-hidden="true"
          className="absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/3)] rounded-lg bg-white shadow-sm shadow-slate-300/50 transition-transform duration-200 ease-out"
          style={{ transform: `translateX(${activeIndex * 100}%)` }}
        />
        {SEARCH_TYPES.map(({ value, label, icon: Icon }) => {
          const isActive = value === searchType;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onSearchTypeChange(value)}
              className={`relative z-10 flex items-center justify-center gap-1.5 rounded-lg text-xs font-bold transition-colors ${isActive ? "text-[#2563EB]" : "text-slate-500 hover:text-slate-700"
                }`}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              {label}
            </button>
          );
        })}
      </div>

      <Button
        type="submit"
        isLoading={loading}
        className="h-12 rounded-xl px-8"
      >
        Search
      </Button>
    </form>
  );
}