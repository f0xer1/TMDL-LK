import {Link} from "react-router-dom";
import type {MovieCardProps} from "../types/movie.ts";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const POSTER_PLACEHOLDER = "https://placehold.co/500x750?text=No+Poster";

function MovieCard({movie}: MovieCardProps) {
  const posterUrl =
    movie.poster_path === null
      ? POSTER_PLACEHOLDER
      : `${IMAGE_BASE_URL}${movie.poster_path}`;

  const year = movie.release_date.slice(0, 4);

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="overflow-hidden rounded-lg bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
        <img
          src={posterUrl}
          alt={movie.title}
          className="aspect-2/3 w-full object-cover"
        />
        <div className="p-3">
          <h3 className="truncate font-semibold text-gray-900" title={movie.title}>
            {movie.title}
          </h3>
          <div className="mt-1 flex items-center justify-between text-sm text-gray-600">
            <span>{year}</span>
            <span className="flex items-center gap-1 font-medium text-amber-600">
            ★ {movie.vote_average.toFixed(1)}
          </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
