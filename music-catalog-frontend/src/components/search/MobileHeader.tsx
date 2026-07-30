import { Music2 } from "lucide-react";

export function MobileHeader() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm lg:hidden">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB] text-white">
          <Music2 className="h-5 w-5" aria-hidden="true" />
        </div>
        <p className="text-base font-bold text-slate-950">Music Catalog</p>
      </div>
    </div>
  );
}
