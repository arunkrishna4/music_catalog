import { SearchX } from "lucide-react";

export function NoResultsState() {
  return (
    <div className="flex min-h-[340px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-center shadow-sm">

      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
        <SearchX className="h-10 w-10 text-slate-400" />
      </div>

      <h2 className="mt-6 text-xl font-bold text-slate-950">
        No albums found
      </h2>

      <p className="mt-2 max-w-sm text-sm text-slate-500">
        Try another artist, album name, or song title.
      </p>

    </div>
  );
}