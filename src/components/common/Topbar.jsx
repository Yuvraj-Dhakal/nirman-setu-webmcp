import {
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";

export default function Topbar() {
  return (
    <header className="hidden h-16 items-center justify-between border-b border-slate-200 bg-white px-6 lg:flex xl:px-8">

   
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-blue-600">
          Government Infrastructure
        </p>

        <h2 className="mt-0.5 text-sm font-semibold text-slate-800">
          Project Monitoring
        </h2>
      </div>

   
      <div className="flex items-center gap-3">

      
        <button
          type="button"
          className="
            flex items-center gap-2
            rounded-lg border border-slate-200
            bg-slate-50 px-3 py-2
            text-xs text-slate-500
            transition
            hover:border-slate-300
            hover:bg-white
          "
        >
          <Search size={16} />

          <span className="hidden xl:inline">
            Search projects...
          </span>
        </button>

  
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
        >
          <Bell size={18} />

          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
        </button>

        <div className="h-7 w-px bg-slate-200" />

   
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-slate-50"
        >

          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
            AO
          </div>

          <div className="hidden text-left xl:block">
            <p className="text-xs font-semibold text-slate-800">
              Admin Officer
            </p>

            <p className="text-[10px] text-slate-400">
              Municipality Admin
            </p>
          </div>

          <ChevronDown
            size={15}
            className="hidden text-slate-400 xl:block"
          />

        </button>

      </div>
    </header>
  );
}