# Meeting Room Booking

Internal app for browsing rooms, viewing the schedule, and managing meetings.

## What’s in here

- **Dashboard** — who’s free right now, and what’s happening today
- **Rooms** — search by name/amenity, filter by type, floor, and size
- **Schedule** — day timeline and week grid; empty slots book, existing blocks open details
- **Bookings** — create, inspect, edit, cancel; upcoming / past / all
- **URL state** — filters and the selected date live in the query string
- **Persistence** — booking changes survive a refresh (`localStorage`)

## Stack

React 19, TypeScript, Vite, Tailwind v4, React Router, Zustand, date-fns.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5173.

| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run preview` | Serve the build |
| `npm run lint` | ESLint |

## Deploy

`vercel.json` rewrites all routes to `index.html`. Connect the repo to Vercel (or run `vercel`) after `npm run build`.

## Layout

```
src/
├── app/           # Router
├── components/    # Shell + shared UI
├── data/          # Seed JSON
├── features/      # Rooms, bookings, schedule, dashboard
├── lib/           # Repositories, storage, URL helpers
└── store/         # Zustand
```

Rooms and employees always come from the JSON seeds. Bookings seed on first visit, then live under the `bookings` storage key.
