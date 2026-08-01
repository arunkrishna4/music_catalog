import { Disc3, Sparkles } from "lucide-react";

const suggestions = [
  "Taylor Swift",
  "Coldplay",
  "Ed Sheeran",
  "The Weeknd",
  "Imagine Dragons",
];



export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white py-16 px-6 shadow-sm shadow-slate-200/50 text-center">
      <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-blue-50">
        <Disc3 className="h-16 w-16 animate-spin text-[#2563EB] [animation-duration:8s]" />
        <Sparkles className="absolute right-4 top-5 h-5 w-5 text-slate-400" />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-950">
        Start Exploring Music
      </h2>

      <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
        Search for your favorite albums, artists, or songs and build your
        personal music collection.
      </p>

      <div className="mt-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Try searching for
        </p>

        <p className="text-sm text-slate-500">
          {suggestions.join(" • ")}
        </p>
      </div>
    </div>
  );
}