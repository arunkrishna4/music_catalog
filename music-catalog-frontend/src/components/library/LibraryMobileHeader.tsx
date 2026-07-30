import { Disc3 } from "lucide-react";

export function LibraryMobileHeader() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm lg:hidden">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#4F46E5] text-white">
          <Disc3 className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-base font-bold leading-tight text-slate-950">
            Music Catalog
          </p>
          <p className="text-xs leading-tight text-slate-500">
            Apple Music Explorer
          </p>
        </div>
      </div>
    </div>
  );
}