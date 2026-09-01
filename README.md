# Meeting Room Booking System

Internal web app for managing meeting room bookings. Built as a take-home assignment using React, TypeScript, and Vite.

## Current status

Foundation is in place. Features will be built step by step.

- [x] Project setup (Vite, React, TypeScript)
- [x] Seed data (rooms, employees, bookings)
- [x] Data layer with repositories + localStorage persistence
- [x] App shell with routing and layout
- [ ] Rooms page (search, filter, details)
- [ ] Schedule page (daily / weekly views)
- [ ] Bookings CRUD (create, edit, cancel)
- [ ] URL state for filters and views
- [ ] Deploy to Vercel

## Tech stack

- **React 19** + **TypeScript**
- **Tailwind CSS** — styling
- **React Router** — routing and URL state
- **Zustand** — state management (to be wired up)
- **date-fns** — date utilities
- **localStorage** — persistence for user changes

## Getting started

```bash
npm install
npm run dev
```

## Project structure

```
src/
├── app/              # Router
├── components/       # Shared layout + UI
├── config/           # App config (navigation)
├── data/             # Seed JSON
├── features/         # Feature modules (page, components, repository)
│   ├── bookings/
│   ├── dashboard/
│   ├── employees/
│   ├── rooms/
│   └── schedule/
└── lib/              # Shared utilities
```

## Data layer

Repositories abstract the data source so JSON files can be swapped for a real API later:

- `roomRepository` — read rooms from JSON
- `employeeRepository` — read employees from JSON
- `bookingRepository` — read/write bookings (JSON seed + localStorage)
