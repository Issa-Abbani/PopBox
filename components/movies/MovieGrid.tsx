import { MovieCard } from "@/components/movies/MovieCard";
import type { OmdbSearchResult } from "@/types/movies/movieTypes";

export function MovieGrid({ movies }: { movies: OmdbSearchResult[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}
