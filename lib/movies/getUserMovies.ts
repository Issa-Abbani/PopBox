import type { QueryResult } from "pg";
import type { userMovieStates } from "@/types/movies/movieTypes";

import { pool } from "../db";

//Error handling in main post router

export async function getUserMovies(userId: string) {
  const userMovieList: QueryResult<userMovieStates> = await pool.query(
    `SELECT
      movie_id,
      is_favorite,
      is_watchlisted,
      is_watched
     FROM user_movies
     WHERE user_id = $1`,
    [userId],
  );
  

  return userMovieList.rows;
}

