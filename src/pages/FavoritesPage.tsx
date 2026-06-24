import { useQueries } from "@tanstack/react-query";
import MovieCard from "../components/MovieCard.tsx";
import Loader from "../components/Loader.tsx";
import { getMovieDetails } from "../api/movies.ts";
import { useFavoritesStore } from "../store/favorites.ts";

function FavoritesPage() {
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);

  const results = useQueries({
    queries: favoriteIds.map((id) => ({
      queryKey: ["movie", id],
      queryFn: () => getMovieDetails(id),
    })),
  });

  if (favoriteIds.length === 0) {
    return (
      <div className="p-12 text-center text-gray-500">
        Нічого не додано в обране.
      </div>
    );
  }

  const isLoading = results.some((r) => r.isLoading);
  const movies = results.map((r) => r.data).filter((m) => m !== undefined);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold">Обране</h1>

      {isLoading && <Loader />}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;
