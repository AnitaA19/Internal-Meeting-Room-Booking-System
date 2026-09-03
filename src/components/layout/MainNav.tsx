import { Calendar, ClipboardList, DoorOpen, LayoutGrid } from "lucide-react";
import { NavLink } from "react-router-dom";

import { navigation } from "../../config/navigation";

const navIcons = {
  "/": LayoutGrid,
  "/rooms": DoorOpen,
  "/schedule": Calendar,
  "/bookings": ClipboardList,
} as const;

type MainNavProps = {
  compact?: boolean;
};

export function MainNav({ compact = false }: MainNavProps) {
  return (
    <nav
      aria-label="Main"
      className={
        compact
          ? "fixed inset-x-0 bottom-0 z-40 flex border-t border-white/5 bg-bg/95 backdrop-blur-md lg:hidden"
          : "flex flex-col gap-1 px-3"
      }
      style={compact ? { paddingBottom: "env(safe-area-inset-bottom)" } : undefined}
    >
      {navigation.map((item) => {
        const Icon = navIcons[item.to as keyof typeof navIcons];

        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              compact
                ? isActive
                  ? "nav-tab-active"
                  : "nav-tab-idle"
                : isActive
                  ? "nav-link-active"
                  : "nav-link-idle"
            }
          >
            <Icon className="size-4 shrink-0" strokeWidth={1.75} />
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );
}
