import {Link, useParams} from "react-router-dom";
import {useMoviesDetails} from "../hooks/useMovieDetails.ts";
import {useSimilarMovies} from "../hooks/useSimilarMovies.ts";
import MovieCard from "../components/MovieCard.tsx";
import Loader from "../components/Loader.tsx";
import {useFavoritesStore} from "../store/favorites.ts";
import type {Movie} from "../types/movie.ts";

const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";
const POSTER_PLACEHOLDER = "https://placehold.co/500x750?text=No+Poster";

function MovieDetailsPage() {
  const id = Number(useParams().id);
  const {data: movie, isLoading, isError} = useMoviesDetails(id);
  const {data: similar} = useSimilarMovies(id);

  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = useFavoritesStore((state) => state.isFavorite(id));

  if (isLoading) return <Loader />;
  if (isError || !movie) return <div className="p-8 text-center text-red-500">Error</div>;

  const posterUrl =
    movie.poster_path === null
      ? POSTER_PLACEHOLDER
      : `${POSTER_BASE_URL}${movie.poster_path}`;

  const year = movie.release_date ? movie.release_date.slice(0, 4) : "—";
  const runtime = movie.runtime ? `${movie.runtime} хв` : "—";

  return (
    <div className="bg-gray-100">
      {/* Фонова шапка з backdrop */}
      <div
        className="relative bg-gray-900 bg-cover bg-center"
        style={
          movie.backdrop_path
            ? {backgroundImage: `url(${BACKDROP_BASE_URL}${movie.backdrop_path})`}
            : undefined
        }
      >
        <div className="bg-black/60">
          <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 md:flex-row">
            <img
              src={posterUrl}
              alt={movie.title}
              className="w-48 shrink-0 self-center rounded-lg shadow-2xl md:self-start"
            />
            <div className="text-white">
              <h1 className="text-3xl font-bold">
                {movie.title}{" "}
                <span className="font-normal text-gray-300">({year})</span>
              </h1>
              {movie.tagline && (
                <p className="mt-1 italic text-gray-300">{movie.tagline}</p>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                <span className="rounded-full bg-amber-500 px-3 py-1 font-semibold text-black">
                  ★ {movie.vote_average.toFixed(1)}
                </span>
                <span className="rounded-full bg-white/20 px-3 py-1">{runtime}</span>
                <span className="rounded-full bg-white/20 px-3 py-1">
                  {movie.release_date || "—"}
                </span>
              </div>

              {movie.genres?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded border border-white/40 px-2 py-0.5 text-xs"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              <button
                onClick={() => toggleFavorite(id)}
                className={`mt-6 rounded-full px-5 py-2 font-semibold transition ${
                  isFavorite
                    ? "bg-white/20 text-white hover:bg-white/30"
                    : "bg-amber-500 text-black hover:bg-amber-400"
                }`}
              >
                {isFavorite ? "♥ В обраному" : "♡ Додати в обране"}
              </button>

              <h2 className="mt-6 text-lg font-semibold">Опис</h2>
              <p className="mt-2 max-w-2xl leading-relaxed text-gray-100">
                {movie.overview || "Опис відсутній."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-6">
        <Link
          to="/"
          className="inline-block rounded bg-gray-800 px-4 py-2 text-sm text-white transition hover:bg-gray-700"
        >
          ← На головну
        </Link>

        {similar && similar.results.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-4 text-xl font-bold">Схожі фільми</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {similar.results.slice(0, 10).map((m: Movie) => (
                <MovieCard key={m.id} movie={m} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default MovieDetailsPage
