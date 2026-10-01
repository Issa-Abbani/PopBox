import type { QueryResult } from "pg";
import type { userMovieStates } from "@/types/movies/movieTypes";
import type { OmdbSearchResult } from "@/types/movies/movieTypes";

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

export async function searchUserMovie(userId: string, movieId: string) {
  const userMovieDetails: QueryResult<userMovieStates> = await pool.query(
    `SELECT
      movie_id,
      is_favorite,
      is_watchlisted,
      is_watched
     FROM user_movies
     WHERE user_id = $1 AND movie_id = $2`,
    [userId, movieId],
  );

  return userMovieDetails.rows[0] ?? null;
}

export async function getFavoriteMovies(userId: string) {
  const userMovieList: QueryResult<OmdbSearchResult> = await pool.query(
    `
      SELECT
        m.imdb_id AS "imdbID",
        m.title AS "Title",
        m.year AS "Year",
        m.type AS "Type",
        m.poster_url AS "Poster"
      FROM user_movies AS u
      JOIN movies AS m
        ON u.movie_id = m.imdb_id
      WHERE u.user_id = $1
        AND u.is_favorite = TRUE
    `,
    [userId],
  );

  return userMovieList.rows;
}

export async function getWatchlistedMovies(userId: string) {
  const userMovieList: QueryResult<OmdbSearchResult> = await pool.query(
    `
      SELECT
        m.imdb_id AS "imdbID",
        m.title AS "Title",
        m.year AS "Year",
        m.type AS "Type",
        m.poster_url AS "Poster"
      FROM user_movies AS u
      JOIN movies AS m
        ON u.movie_id = m.imdb_id
      WHERE u.user_id = $1
        AND u.is_watchlisted = TRUE
    `,
    [userId],
  );

  return userMovieList.rows;
}

export async function getWatchedMovies(userId: string) {
  const userMovieList: QueryResult<OmdbSearchResult> = await pool.query(
    `
      SELECT
        m.imdb_id AS "imdbID",
        m.title AS "Title",
        m.year AS "Year",
        m.type AS "Type",
        m.poster_url AS "Poster"
      FROM user_movies AS u
      JOIN movies AS m
        ON u.movie_id = m.imdb_id
      WHERE u.user_id = $1
        AND u.is_watched = TRUE
    `,
    [userId],
  );

  return userMovieList.rows;
}

