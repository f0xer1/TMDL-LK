import {useQuery} from "@tanstack/react-query";
import {getSimilarMovies} from "../api/movies";

export function useSimilarMovies(id: number) {
  return useQuery({
    queryKey: ["similar", id],
    queryFn: () => getSimilarMovies(id),
    enabled: !Number.isNaN(id),
  });
}
