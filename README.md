# Internal Meeting Room Booking System

A front-end take-home: an internal web app for company employees to browse meeting rooms, check availability, and manage bookings — no backend required.

## Features

| Area | What you can do |
|---|---|
| **Dashboard** | See free rooms right now, today’s meetings, and active booking counts |
| **Rooms** | Browse rooms with capacity, floor, location, and amenities; search and filter by type, floor, and size |
| **Schedule** | Daily timeline and weekly grid; open a booking for details, or tap an empty slot to book |
| **Bookings** | Create, view, edit upcoming, and cancel; search and filter by status / upcoming / past / all |

Relevant filters and the schedule date/view are reflected in the URL so links are shareable.

## Tech stack

- **React 19** + **TypeScript**
- **Vite**
- **Tailwind CSS v4**
- **React Router**
- **Zustand** (booking state)
- **date-fns**
- **localStorage** for persistence after refresh

## Design

The visual design (layout, color system, and overall UI direction) was produced with **[Lovable](https://lovable.dev)** and then implemented by hand in this React/TypeScript codebase. Lovable was used for design exploration only — application logic, data layer, routing, and persistence were built in code.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Architecture

UI components do not import JSON directly. Seed data is loaded through repository classes so a real API can replace the local source later without rewriting pages.

```
src/
├── app/           # Router
├── components/    # Shell + shared UI
├── data/          # Seed JSON (rooms, employees, bookings)
├── features/      # Dashboard, rooms, schedule, bookings
├── lib/           # Repositories, storage, URL helpers
└── store/         # Zustand booking store
```

- **Rooms & employees** — always read from seed JSON
- **Bookings** — seeded on first visit, then saved under the `bookings` key in `localStorage`

## Assumptions & trade-offs

- **No authentication.** Anyone can book as any employee by selecting an organizer. Suitable for a demo without a backend auth flow.
- **Bookings are the only mutable data.** Clear the `bookings` localStorage key (or site data) to reload seed bookings.
- **Soft cancel.** Cancel sets `status: "cancelled"`; rows are not hard-deleted so history remains visible.
- **Edit vs cancel.** Edit is allowed only before a meeting starts. Cancel is allowed until it ends (so a room can still be freed mid-meeting). New bookings must start in the future.
- **Conflict & capacity checks.** Overlapping confirmed/pending bookings on the same room are rejected. Attendee count cannot exceed room capacity. Rooms in maintenance cannot be newly booked.
- **Timezone.** Times use the browser’s local timezone. Seed data is set in early September 2026 so the calendar looks populated for that week.

## Deploy

The app is a static SPA. `vercel.json` rewrites all routes to `index.html`.

1. Push the repo to GitHub
2. Import the project in [Vercel](https://vercel.com) (or run `npx vercel`)
3. Build command: `npm run build` · Output: `dist`
