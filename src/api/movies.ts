import tmdbClient from "./client";
import type {MovieDetails, MoviesResponse} from "../types/movie";

export async function getPopular(page: number = 1): Promise<MoviesResponse> {
  const response = await tmdbClient.get<MoviesResponse>("/movie/popular", {
    params: { page },
  });

  return response.data;
}

export async function searchMovies(query: string, page = 1): Promise<MoviesResponse> {
  const response = await tmdbClient.get<MoviesResponse>("/search/movie", {
    params: { page, query },
  });

  return response.data;
}

export async function getMovieDetails(id: number): Promise<MovieDetails> {
  const response = await tmdbClient.get<MovieDetails>(`/movie/${id}`);

  return response.data;
}

export async function getSimilarMovies(id: number, page = 1): Promise<MoviesResponse> {
  const response = await tmdbClient.get<MoviesResponse>(`/movie/${id}/similar`, {
    params: { page },
  });

  return response.data;
}
