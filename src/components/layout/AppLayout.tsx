import { Calendar, ClipboardList, DoorOpen, LayoutGrid } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

import { navigation } from "../../config/navigation";

const navIcons = {
  "/": LayoutGrid,
  "/rooms": DoorOpen,
  "/schedule": Calendar,
  "/bookings": ClipboardList,
} as const;

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-bg">
      <aside className="flex w-56 shrink-0 flex-col border-r border-white/5">
        <div className="flex items-center gap-3 px-5 py-6">
          <div className="flex size-8 items-center justify-center rounded-lg bg-brand text-xs font-semibold text-brand-dark">
            RB
          </div>
          <span className="text-sm font-semibold">Room Booking</span>
        </div>

        <nav className="flex flex-col gap-1 px-3" aria-label="Main">
          {navigation.map((item) => {
            const Icon = navIcons[item.to as keyof typeof navIcons];

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  isActive ? "nav-link-active" : "nav-link-idle"
                }
              >
                <Icon className="size-4 shrink-0" strokeWidth={1.75} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      <main className="min-w-0 flex-1 overflow-auto p-8">
        <div className="mx-auto max-w-5xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
