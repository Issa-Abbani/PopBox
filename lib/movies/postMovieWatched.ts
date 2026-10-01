import type { PoolClient } from "pg";

export default async function postMovieWatched(
  movieId: string,
  userId: string,
  client: PoolClient,
):Promise<boolean> {
  const result = await client.query(
    "UPDATE user_movies SET is_watched = NOT is_watched, updated_at = now() WHERE user_id = $1 AND movie_id = $2 RETURNING is_watched;",
    [userId, movieId],
  );

  return result.rows[0]?.is_watched;
}