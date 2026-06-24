import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { searchMovies } from "../api/movies";

export function useSearch(query: string, page = 1) {
  return useQuery({
    queryKey: ["search", query, page],
    queryFn: () => searchMovies(query, page),
    enabled: query.trim().length > 0,
    placeholderData: keepPreviousData,
  });
}
