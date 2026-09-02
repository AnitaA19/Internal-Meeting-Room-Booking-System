import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "../components/layout/AppLayout";
import { BookingsPage } from "../features/bookings/BookingsPage";
import { CreateBookingPage } from "../features/bookings/CreateBookingPage";
import { DashboardPage } from "../features/dashboard/DashboardPage";
import { RoomsPage } from "../features/rooms/RoomsPage";
import { SchedulePage } from "../features/schedule/SchedulePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "rooms", element: <RoomsPage /> },
      { path: "schedule", element: <SchedulePage /> },
      { path: "bookings", element: <BookingsPage /> },
      { path: "bookings/new", element: <CreateBookingPage /> },
    ],
  },
]);
