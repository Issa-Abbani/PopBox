import { MovieCard } from "@/components/movies/MovieCard";
import type { OmdbSearchResult } from "@/types/movies/movieTypes";

export function MovieGrid({ movies }: { movies: OmdbSearchResult[] }) {
  const onFavorite = async (movie: OmdbSearchResult) => {
    try {
      await fetch("/api/movies/favorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movie,
        }),
      });
    } catch {
      alert("Couldn't Favorite Movie");
    }
  };
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} onFavorite={onFavorite} />
      ))}
    </div>
  );
}
