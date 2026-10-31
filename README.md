# Wedding Invitation — Praveen Kumar & Sindhuja

A digital wedding invitation website for Praveen Kumar & Sindhuja (13 & 14 December 2026, Madurai), built with TanStack Start and deployed on Netlify.

## Features

- Envelope opening intro that starts background music
- Traditional South Indian maroon & gold theme
- Live countdown timer to the wedding
- Engagement and wedding details with directions link
- Add-to-Google-Calendar button
- Falling petal animation
- Fully responsive layout

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 + custom CSS |
| Fonts | Google Fonts (Playfair Display, Cormorant Garamond, Noto Serif Tamil) |
| Deployment | Netlify |

## Running Locally

```bash
npm install
npm run dev
```

The dev server starts at [http://localhost:3000](http://localhost:3000) (or port 8888 when using the Netlify CLI).

Using Netlify CLI (recommended for full feature emulation):

```bash
netlify dev
```

## Building for Production

```bash
npm run build
```

Output is written to `dist/client`.
