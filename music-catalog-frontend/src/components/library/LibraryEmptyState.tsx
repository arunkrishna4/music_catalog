import { Disc3, Search, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "../ui/button";

export function LibraryEmptyState() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 text-center">
      <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-blue-50">
        <Disc3 className="h-16 w-16 text-[#2563EB]" aria-hidden="true" />
        <Sparkles
          className="absolute -right-1 -top-1 h-6 w-6 text-amber-400"
          aria-hidden="true"
        />
      </div>

      <h2 className="mt-6 text-lg font-black text-slate-950">
        Your library is waiting.
      </h2>
      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
        Save albums from search and build a collection that feels personal.
      </p>

      <Button
        className="mt-6 h-11 rounded-xl px-6"
        onClick={() => navigate("/search")}
      >
        <span className="flex items-center justify-center gap-2 whitespace-nowrap">
          <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
          Search music
        </span>
      </Button>
    </div>
  );
}
