import { Music2, Menu } from "lucide-react";

export function MobileHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm lg:hidden">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="mr-2 text-slate-500 hover:text-slate-700">
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB] text-white">
          <Music2 className="h-5 w-5" aria-hidden="true" />
        </div>
        <p className="text-base font-bold text-slate-950">Music Catalog</p>
      </div>
    </div>
  );
}
