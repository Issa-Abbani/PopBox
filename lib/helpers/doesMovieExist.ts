import { OmdbSearchResult } from "@/types/movies/movieTypes";

import type { movieInDB } from "@/types/movies/movieTypes";
import type { QueryResult } from "pg";
import type { PoolClient } from "pg";

//Error handling in main post router

export default async function doesMovieExist(movie: OmdbSearchResult, client: PoolClient,) {
    const movieExist: QueryResult<movieInDB> = await client.query(
      "SELECT 1 FROM movies WHERE imdb_id = $1 LIMIT 1",
      [movie.imdbID]
    );

    return movieExist.rows.length > 0;
}