# Moon Kitty

A whimsical web app that displays the current moon phase with cat-themed phrasing and a celestial dark aesthetic.

## Tech Stack

- **Frontend**: React + TypeScript (Vite) + Tailwind CSS
- **Backend**: Ruby on Rails (API-only)
- **Dev Environment**: Docker Compose
- **Task Tracking**: [Beads](https://github.com/steveyegge/beads)

## Getting Started

### Prerequisites

- Docker & Docker Compose
- Git

### Development

```bash
docker compose up
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## Architecture

```
┌──────────────┐         HTTPS          ┌──────────────────┐
│   Vercel     │ ──────────────────────> │   Render         │
│  (React)     │ <────────────────────── │   (Rails API)    │
└──────────────┘         JSON           └───────┬──────────┘
                                                │
                                                v
                                        ┌──────────────────┐
                                        │  USNO Moon API   │
                                        └──────────────────┘
```
