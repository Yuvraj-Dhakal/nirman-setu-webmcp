import { Menu, Bell } from "lucide-react";

export default function MobileHeader({ onMenuClick }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="
            rounded-lg p-2
            text-slate-600
            transition
            hover:bg-slate-100
            hover:text-slate-900
          "
        >
          <Menu size={21} strokeWidth={1.8} />
        </button>

        <div>
          <h1 className="text-sm font-bold tracking-wide text-slate-900">
            NIRMANSETU
          </h1>

          <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.14em] text-slate-400">
            Infrastructure Platform
          </p>
        </div>
      </div>

      <button
        type="button"
        aria-label="Notifications"
        className="
          relative rounded-lg p-2
          text-slate-600
          transition
          hover:bg-slate-100
        "
      >
        <Bell size={19} strokeWidth={1.8} />

        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500" />
      </button>
    </header>
  );
}