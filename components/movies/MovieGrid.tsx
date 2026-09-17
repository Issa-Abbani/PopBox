import { MovieCard } from "@/components/movies/MovieCard";
import type { Movie } from "@/lib/mock-data";

export function MovieGrid({ movies }: { movies: Movie[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
