# Moon Kitty

A whimsical web app that displays the current moon phase with cat-themed phrasing and a celestial dark aesthetic.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS, React Router |
| Backend | Ruby on Rails 8.1 (API-only) |
| Testing | RSpec (backend), Vitest + Testing Library (frontend) |
| Dev Environment | Docker Compose |
| Task Tracking | [Beads](https://github.com/steveyegge/beads) |
| Deployment | Vercel (frontend), Render (backend) |

## Architecture

```
┌──────────────────┐                    ┌──────────────────┐
│                  │   GET /api/v1/     │                  │
│   React + Vite   │ ────────────────>  │   Rails API      │
│   (Vercel)       │ <────────────────  │   (Render)       │
│                  │       JSON         │                  │
└──────────────────┘                    └────────┬─────────┘
                                                 │
                                                 │ HTTPS
                                                 v
                                        ┌──────────────────┐
                                        │  US Naval Obs.   │
                                        │  Astronomy API   │
                                        └──────────────────┘
```

The Rails backend fetches moon phase data from the USNO API, adds cat-themed descriptions, and caches the response for 1 hour. The React frontend displays the data with a celestial dark theme.

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) & Docker Compose
- Git

### Setup

```bash
git clone https://github.com/adamwolfers/moon-kitty.git
cd moon-kitty
docker compose up
```

- **Frontend**: http://localhost:5173
- **Phase Gallery**: http://localhost:5173/gallery
- **Backend API**: http://localhost:3000/api/v1/moon_phase

### Running Tests

```bash
# Backend (RSpec)
docker compose run --rm backend bundle exec rspec

# Frontend (Vitest)
cd frontend && npm test
```

## API

### `GET /api/v1/moon_phase`

Returns the current moon phase with cat-themed commentary.

```json
{
  "phase_name": "Waning Gibbous",
  "illumination": 96,
  "phase_emoji": "🌖",
  "cat_description": "The moon is winding down, like a cat after a long play session"
}
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Live moon phase display with cat-themed commentary |
| `/gallery` | All 8 moon phases, loading skeleton, and error state for visual QA |

## Project Structure

```
moon-kitty/
├── backend/                     # Rails API
│   ├── app/
│   │   ├── controllers/api/v1/    # API endpoints
│   │   └── services/              # MoonPhaseService
│   └── spec/                      # RSpec tests
├── frontend/                    # React app
│   ├── src/
│   │   ├── __tests__/             # App and routing tests
│   │   ├── api/                   # API client
│   │   ├── components/            # UI components + tests
│   │   ├── hooks/                 # Custom hooks + tests
│   │   └── types/                 # TypeScript interfaces
│   └── Dockerfile
└── docker-compose.yml           # Dev environment
```

## Environment Variables

### Backend

| Variable | Description | Default |
|----------|-------------|---------|
| `ALLOWED_ORIGINS` | CORS allowed origins (comma-separated) | `http://localhost:5173` |
| `USNO_COORDS` | Coordinates for USNO API (phase data is location-independent) | `40.7,-74.0` |

### Frontend

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:3000` |
