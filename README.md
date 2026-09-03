# Meeting Room Booking

Internal app for browsing rooms, viewing the schedule, and managing meeting bookings.

## Features

- **Dashboard** — live room availability, today's meetings
- **Rooms** — search and filter by type/floor, room detail pages
- **Schedule** — daily timeline and weekly overview, click a slot to book
- **Bookings** — create, edit, cancel upcoming meetings with conflict checks
- **URL state** — filters and dates persist in query params
- **Persistence** — booking changes saved to localStorage

## Tech stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- React Router
- Zustand (bookings + UI notifications)
- date-fns
- lucide-react

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Deploy

The project includes a `vercel.json` for SPA routing. Deploy with:

```bash
npm run build
```

Then push to Vercel, or run `vercel` if you have the CLI installed.

## Project structure

```
src/
├── app/           # Router
├── components/    # Layout + shared UI
├── config/        # Navigation
├── data/          # Seed JSON
├── features/      # Domain modules
├── lib/           # Utilities
├── pages/         # Standalone pages (404)
└── store/         # Zustand stores
```

## Data

Rooms and employees are read from JSON seed files. Bookings load from seed data on first visit, then persist to `localStorage` under the key `bookings`.
