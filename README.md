# Movie Explorer

A small test project built to practice a production React stack on a real API (TMDB).
It is a learning exercise, not a polished product — the focus is on clean architecture
and a clear separation of state, not on visual design.

## What it does

- **Home** (`/`) — popular movies in a grid, with search and pagination.
- **Movie details** (`/movie/:id`) — poster, rating, overview, genres, runtime, similar
  movies, and an add/remove favorite button.
- **Favorites** (`/favorites`) — saved movies, persisted in client state.

## Stack

Vite · React · TypeScript · React Router · TanStack Query · Zustand · Axios ·
React Hook Form + Zod · Tailwind CSS.

## Architecture note

The core idea of the project is the separation of state:

- **TanStack Query** owns all server data (popular, search, details) — caching, loading
  and error handling go through it.
- **Zustand** owns client-only state (favorites).
- **`useState`** owns transient UI state (search query, current page).

## Getting started

```bash
npm install
npm run dev
```

Create a `.env` file in the project root with your TMDB API Read Access Token:

```
VITE_TMDB_TOKEN=your_token_here
```
