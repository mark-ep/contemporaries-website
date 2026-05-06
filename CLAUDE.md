# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn run-dev    # Start Next.js dev server + backend concurrently (primary dev command)
yarn dev        # Next.js dev server only
yarn build      # Production build
yarn start      # Production server only
yarn prod       # Production server + backend concurrently
yarn lint       # ESLint (Next.js config)
```

The app depends on a companion `contemporaries-server` backend. `run-dev` starts both together.

## Environment

`API_ROOT` in `.env` sets the backend URL. `next.config.js` rewrites `/api/*` requests to that URL, defaulting to `http://127.0.0.1:8000/api/` if unset.

## Architecture

This is a historical research app that maps connections between contemporaries — people who lived in overlapping time periods.

**User flow:**
1. Homepage (`pages/index.tsx`) — search by name or advanced filters (country, occupation)
2. `SearchProvider` fetches `/api/contemporaries/search` and routes to `/[query]`
3. Query page (`pages/[query].tsx`) — shows the selected person on a map with their contemporaries

**Key pattern — two-phase data loading in `[query].tsx`:**
- `getServerSideProps` fetches initial person data and a job key from the backend
- Client side polls `/api/contemporaries` every second with that job key (via React Query) until all contemporaries stream in
- This gives a progressive loading experience as results arrive

**Map rendering:**
- Leaflet is imported dynamically with `{ ssr: false }` to avoid server-side browser API errors
- `MapContext` manages markers via a reducer (`contexts/MapContext.jsx`)
- Overlapping coordinates (same birth/death city) are detected and spread in a circle — see `helpers/group_collisions.js` and `helpers/spread.js`
- Map layers: `map/PeopleMarkers.js` renders all markers and connecting lines; `map/PersonMarker.js` handles individual markers; `map/Connection.js` draws lines between people

**State management split:**
- `SearchProvider` (`contexts/SearchProvider.jsx`) — search query and results
- `MapContext` (`contexts/MapContext.jsx`) — marker positions, bounds, collision spreading
- Jotai atoms for lightweight local state; React Query for server data fetching
- Formik for the advanced search form

**Tech stack:** Next.js 13, TypeScript (pages) + JSX (components — mixed, not yet fully migrated), Chakra UI, React Leaflet, Framer Motion, Jotai, TanStack React Query.
