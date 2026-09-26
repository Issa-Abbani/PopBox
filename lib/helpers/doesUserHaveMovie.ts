import { OmdbSearchResult } from "@/types/movies/movieTypes";

import type { movieInDB } from "@/types/movies/movieTypes";
import type { QueryResult } from "pg";
import type { PoolClient } from "pg";

//Error handling in main post router

export default async function doesUserHaveMovie(movie: OmdbSearchResult, userId: string, client: PoolClient) {
    const movieExist: QueryResult<movieInDB> = await client.query(
      "SELECT 1 FROM user_movies WHERE movie_id = $1 AND user_id = $2  LIMIT 1",
      [movie.imdbID, userId]
    );
    

    return movieExist.rows.length > 0;
}