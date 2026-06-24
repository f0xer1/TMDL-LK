import {useQuery} from "@tanstack/react-query";
import {getMovieDetails} from "../api/movies";

export function useMoviesDetails(id: number) {
  return useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieDetails(id),
  });
}