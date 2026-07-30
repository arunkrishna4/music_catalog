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
    <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 text-center">

      <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-blue-50">
        <Disc3 className="h-16 w-16 text-[#2563EB] animate-spin [animation-duration:8s]" />
        <Sparkles className="absolute right-4 top-5 h-5 w-5 text-slate-400" />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-950">
        Discover Your Next Favorite Album
      </h2>

      <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
        Search by album, artist, or song and build your personal music
        collection.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {suggestions.map((artist) => (
          <button
            key={artist}
            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-[#2563EB] hover:bg-blue-50 hover:text-[#2563EB]"
          >
            {artist}
          </button>
        ))}
      </div>

    </div>
  );
}