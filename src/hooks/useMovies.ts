import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {getPopular} from "../api/movies";

export function useMovies(page: number = 1) {
  return useQuery({
    queryKey: ["popular", page],
    queryFn: () => getPopular(page),
    placeholderData: keepPreviousData,
  });
}