import { Outlet } from "react-router-dom";

import { ConfirmDialog } from "../ui/ConfirmDialog";
import { Toast } from "../ui/Toast";
import { MainNav } from "./MainNav";

export function AppLayout() {
  return (
    <div className="flex min-h-screen bg-bg">
      <aside className="hidden w-56 shrink-0 flex-col border-r border-white/5 lg:flex">
        <div className="flex items-center gap-3 px-5 py-6">
          <div className="flex size-8 items-center justify-center rounded-lg bg-brand text-xs font-semibold text-brand-dark">
            RB
          </div>
          <span className="text-sm font-semibold">Room Booking</span>
        </div>
        <MainNav />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-white/5 px-4 py-3 lg:hidden">
          <div className="flex size-7 items-center justify-center rounded-md bg-brand text-[10px] font-semibold text-brand-dark">
            RB
          </div>
          <span className="text-sm font-semibold">Room Booking</span>
        </header>

        <main className="min-w-0 flex-1 overflow-auto p-4 pb-24 lg:p-8 lg:pb-8">
          <div className="mx-auto max-w-5xl">
            <Outlet />
          </div>
        </main>
      </div>

      <MainNav compact />
      <Toast />
      <ConfirmDialog />
    </div>
  );
}
