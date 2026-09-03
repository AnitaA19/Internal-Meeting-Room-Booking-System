import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "../components/layout/AppLayout";
import { BookingsPage } from "../features/bookings/BookingsPage";
import { CreateBookingPage } from "../features/bookings/CreateBookingPage";
import { EditBookingPage } from "../features/bookings/EditBookingPage";
import { DashboardPage } from "../features/dashboard/DashboardPage";
import { RoomDetailPage } from "../features/rooms/RoomDetailPage";
import { RoomsPage } from "../features/rooms/RoomsPage";
import { SchedulePage } from "../features/schedule/SchedulePage";
import { NotFoundPage } from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "rooms", element: <RoomsPage /> },
      { path: "rooms/:id", element: <RoomDetailPage /> },
      { path: "schedule", element: <SchedulePage /> },
      { path: "bookings", element: <BookingsPage /> },
      { path: "bookings/new", element: <CreateBookingPage /> },
      { path: "bookings/:id/edit", element: <EditBookingPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
