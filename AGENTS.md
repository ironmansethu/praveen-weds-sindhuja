# AGENTS.md

## Project Overview

Digital wedding invitation for Praveen Kumar & Sindhuja (Engagement 13 Dec 2026, Wedding 14 Dec 2026, Madurai). Opens with an envelope intro. Single-page application with a live countdown timer, event details, and decorative petal animations. Built on TanStack Start and deployed to Netlify.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 + custom CSS in `src/styles.css` |
| Fonts | Google Fonts via `__root.tsx` link tags |
| Language | TypeScript 5.7 (strict mode) |
| Deployment | Netlify |

## Directory Structure

```
src/
  routes/
    __root.tsx      — Root layout: loads Google Fonts, sets page title/meta
    index.tsx       — Main wedding invitation page (single page app)
  styles.css        — Global styles, Tailwind import, custom CSS classes
public/             — Static assets (favicon, images)
netlify.toml        — Netlify build/deploy config
vite.config.ts      — Vite + TanStack Start + Tailwind plugins
tsconfig.json       — TypeScript strict mode, @/* alias for src/*
```

## Key Decisions

- **Single route**: The entire invitation lives in `src/routes/index.tsx`. No navigation needed.
- **`WEDDING` config**: All names, dates, venue, families, and calendar data live in the `WEDDING` object at the top of `index.tsx`.
- **`useCountdown` hook**: In `index.tsx`. Updates every second. Change `WEDDING.countdownTarget` to retarget.
- **Petal animation**: CSS `@keyframes fall` in `styles.css`, rendered by `<Petals>` component with randomised positions, sizes, and durations.
- **No database/state**: Purely static content — no Zustand, no Netlify DB.
- **Google Fonts**: Loaded via `<link>` tags in `__root.tsx` `head()`. Fonts: Playfair Display (script), Cormorant Garamond (serif), Noto Serif Tamil.
- **Color palette**: Maroon & gold, defined as CSS variables (`--maroon-*`, `--gold-*`, `--ivory`) in `styles.css`.

## Coding Conventions

- Components: PascalCase
- Utilities/hooks: camelCase
- Tailwind utility classes preferred; custom CSS in `styles.css` only when Tailwind can't express it
- `@/` alias maps to `src/`
- TypeScript strict mode; type-only imports with `type` keyword

## Development Commands

```bash
npm run dev      # Start dev server (port 3000)
netlify dev      # Start with Netlify CLI (port 8888, full feature emulation)
npm run build    # Production build → dist/client
```
