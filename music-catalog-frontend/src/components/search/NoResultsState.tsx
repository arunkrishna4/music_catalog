import { SearchX } from "lucide-react";
import { type SearchType } from "../../data/musicCatalog";

type NoResultsStateProps = {
  searchType: SearchType;
};

export function NoResultsState({ searchType }: NoResultsStateProps) {
  const normalizedType = searchType.toLowerCase() as "album" | "artist" | "song";

  const labels = {
    album: "albums",
    artist: "artists",
    song: "songs",
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white py-16 px-6 shadow-sm shadow-slate-200/50 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
        <SearchX className="h-10 w-10 text-slate-400" />
      </div>

      <h2 className="mt-6 text-xl font-bold text-slate-950">
        No {labels[normalizedType]} found
      </h2>

      <p className="mt-2 max-w-sm text-center text-sm text-slate-500">
        Try another artist, album name, or song title.
      </p>
    </div>
  );
}