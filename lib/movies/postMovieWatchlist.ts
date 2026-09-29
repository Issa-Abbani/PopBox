import type { PoolClient } from "pg";

export default async function postMovieWatchlist(
  movieId: string,
  userId: string,
  client: PoolClient,
):Promise<boolean> {
  const result = await client.query(
    "UPDATE user_movies SET is_watchlisted = NOT is_watchlisted, updated_at = now() WHERE user_id = $1 AND movie_id = $2 RETURNING is_watchlisted;",
    [userId, movieId],
  );

  return result.rows[0]?.is_watchlisted;
}