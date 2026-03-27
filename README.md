# Portfolio + YouTube Watchlist

This app now has:

- Frontend: React + Vite (`/yt` page for watching videos)
- Backend: Express + MongoDB API (`/api/yt` endpoints)

## Environment setup

1. Copy `.env.example` to `.env`.
2. Set your values:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
FRONTEND_ORIGIN=http://localhost:5173
```

## Run locally

Use two terminals:

1. API server

```bash
npm run server
```

2. Frontend

```bash
npm run dev
```

Open `http://localhost:5173/yt`.

## API endpoints

- `GET /api/yt` - list saved YouTube links
- `POST /api/yt` - add a link (`url`, optional `title`, `section`)
- `PATCH /api/yt/:id/section` - move between `watch-now` and `watch-later`
- `DELETE /api/yt/:id` - remove a link
