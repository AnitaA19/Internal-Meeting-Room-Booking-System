export type NavItem = {
  to: string;
  label: string;
  end?: boolean;
};

export const navigation: NavItem[] = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/rooms", label: "Rooms" },
  { to: "/schedule", label: "Schedule" },
  { to: "/bookings", label: "Bookings" },
];
