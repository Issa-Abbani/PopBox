import type { OmdbSearchResult } from "@/types/movies/movieTypes";

export default function debounceUserMovie(callback: (movie: OmdbSearchResult) => void, delay: number) {
  let timeout: ReturnType<typeof setTimeout>;

  return (movie: OmdbSearchResult) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      callback(movie);
    }, delay);
  };
}