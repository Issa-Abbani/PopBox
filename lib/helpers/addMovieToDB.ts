import type { OmdbSearchResult } from "@/types/movies/movieTypes";
import type { PoolClient } from "pg";

// Error handling is not done inside the helper
export async function addMovieToDB(movie: OmdbSearchResult, client: PoolClient,) {
  await client.query(
    `INSERT INTO movies (
      title,
      year,
      imdb_id,
      type,
      poster_url
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
    [
      movie.Title,
      movie.Year,
      movie.imdbID,
      movie.Type,
      movie.Poster,
    ]
  );
}