import { MovieCard } from "@/components/movies/MovieCard";

import { getUserMovies } from "@/lib/movies/getUserMovies";
import { requireSession } from "@/lib/auth/auth";

import type { OmdbSearchResult } from "@/types/movies/movieTypes";
import type { userMovieStates } from "@/types/movies/movieTypes";

export async function MovieGrid({ movies }: { movies: OmdbSearchResult[] }) {
  const session = await requireSession();

  const userMovies: userMovieStates[] = await getUserMovies(session?.user.id);

  const userMovieMap = new Map(
    userMovies.map((movie) => [movie.movie_id, movie]),
  );

  return movies.length <= 0 ? (
    <div className="mx-auto mt-auto text-2xl text-accent-foreground">
      There are No Movies at This Time
    </div>
  ) : (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {movies.map((movie) => {
        const state = userMovieMap.get(movie.imdbID);
        return (
        <MovieCard key={movie.imdbID} movie={movie} state={state} />
      )})}
    </div>
  );
}
