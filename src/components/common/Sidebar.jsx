import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  FolderKanban,
  ClipboardCheck,
  Users,
  Map,
  Bot,
  FileText,
  Settings,
  X,
} from "lucide-react";

const navigationItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Projects",
    icon: FolderKanban,
    path: "/projects",
  },
  {
    name: "Verification",
    icon: ClipboardCheck,
    path: "/verification",
  },
  {
    name: "Contractors",
    icon: Users,
    path: "/contractors",
  },
  {
    name: "Project Map",
    icon: Map,
    path: "/project-map",
  },
  {
    name: "AI Monitor",
    icon: Bot,
    path: "/ai-monitor",
  },
  {
    name: "Reports",
    icon: FileText,
    path: "/reports",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-[1px] lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-64 flex-col
          bg-slate-950 text-white
          shadow-2xl
          transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >

        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800 px-5">

          <div>
            <h1 className="text-lg font-bold tracking-wide">
              NIRMANSETU
            </h1>

            <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.18em] text-slate-500">
              Infrastructure Platform
            </p>
          </div>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-6">

          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500">
            Main Menu
          </p>

          <div className="space-y-1">

            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `
                    group flex items-center gap-3
                    rounded-lg px-3 py-2.5
                    text-sm font-medium
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-950/20"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    }
                    `
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={18}
                        strokeWidth={isActive ? 2.2 : 1.8}
                      />

                      <span>{item.name}</span>
                    </>
                  )}
                </NavLink>
              );
            })}

          </div>
        </nav>

        {/* Footer */}
        <div className="shrink-0 border-t border-slate-800 p-4">

          <div className="rounded-lg bg-slate-900 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Platform
            </p>

            <p className="mt-1 text-xs font-medium text-slate-300">
              Public Infrastructure
            </p>

            <p className="mt-0.5 text-[10px] text-slate-500">
              Monitoring & Accountability
            </p>
          </div>

        </div>
      </aside>
    </>
  );
}