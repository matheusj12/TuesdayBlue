# TuesdayBlue — Frontend

Enterprise project-management "OS" frontend. React 19 + TypeScript + Vite + Tailwind CSS + shadcn/ui + Framer Motion + TanStack Table + DnD Kit + Recharts + React Hook Form + Zod. Every screen runs on mocked data (`src/mock/`) — there is no backend, API or auth in this phase. It is designed to plug into a Rails 8 API later.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # tsc -b && vite build
npm run preview # serve the production build locally
```

## Deploy on Vercel

This app lives in the `frontend/` subdirectory of the repository.

1. Import the GitHub repo in Vercel.
2. Set **Root Directory** to `frontend`.
3. Framework preset: **Vite**. Build command `npm run build`, output directory `dist` (Vercel auto-detects both).
4. `vercel.json` already includes the SPA rewrite needed for React Router client-side routes.

## Structure

```
src/
  app/            # (reserved) app-level providers
  components/     # design system + shadcn/ui primitives (components/ui)
  features/       # one folder per domain: dashboard, projects, boards, tasks, calendar...
  layouts/        # AppShell, sidebar, topbar, command palette, AI assistant
  hooks/          # useDisclosure, useMediaQuery
  types/          # domain types (Project, Task, User, Board...)
  utils/          # formatters, status/priority style maps
  mock/           # mocked data for every domain entity
  routes/         # React Router route table
```

## Design reference

The original Google Stitch design exports live in `stitch_tuesdayblue_enterprise_os_interface/` (HTML mockups + `DESIGN.md` token source). The Tailwind theme in `src/index.css` is mapped directly from that `DESIGN.md`.
