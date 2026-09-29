import type { ReactNode } from "react";

import { CollectionHeader } from "@/components/collections/CollectionHeader";
import { MovieGrid } from "@/components/movies/MovieGrid";
import type { OmdbSearchResult } from "@/types/movies/movieTypes";

export function CollectionPage({
  title,
  subtitle,
  movies,
  emptyState,
}: {
  title: string;
  subtitle: string;
  movies: OmdbSearchResult[];
  emptyState: ReactNode;
}) {


  return (
    <div className="space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <CollectionHeader title={title} subtitle={subtitle} />
      {movies.length === 0 ? (
        emptyState
      ) : (
        <MovieGrid movies={movies} />
      )}
    </div>
  );
}
