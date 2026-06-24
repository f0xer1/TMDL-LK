import { useState } from "react";
import MovieCard from "../components/MovieCard.tsx";
import SearchBar from "../components/SearchBar.tsx";
import Loader from "../components/Loader.tsx";
import { useMovies } from "../hooks/useMovies.ts";
import { useSearch } from "../hooks/useSearch.ts";

function HomePage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const isSearching = query.trim().length > 0;

  const popular = useMovies(page);
  const search = useSearch(query, page);

  const { data, isLoading, isError, isPlaceholderData } = isSearching
    ? search
    : popular;

  const handleSearch = (q: string) => {
    setQuery(q);
    setPage(1);
  };

  const handleClear = () => {
    setQuery("");
    setPage(1);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold">
        {isSearching ? `Результати: «${query}»` : "Популярні фільми"}
      </h1>

      <SearchBar onSearch={handleSearch} onClear={handleClear} />

      {isLoading && <Loader />}
      {isError && (
        <div className="p-8 text-center text-red-500">Сталася помилка</div>
      )}

      {data && data.results.length === 0 && (
        <div className="p-8 text-center text-gray-500">Нічого не знайдено</div>
      )}

      {data && data.results.length > 0 && (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {data.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page <= 1 || isPlaceholderData}
              className="rounded-md bg-gray-800 px-4 py-2 text-sm text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Назад
            </button>

            <span className="text-sm text-gray-600">
              Сторінка {data.page} з {data.total_pages}
            </span>

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= data.total_pages || isPlaceholderData}
              className="rounded-md bg-gray-800 px-4 py-2 text-sm text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Вперед →
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
