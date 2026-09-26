import type { PoolClient } from "pg";


// Error handling is not done inside the helper
export async function addUserMovie(movieId: string, userId: string, client: PoolClient) {
  await client.query(
    `INSERT INTO user_movies (
      user_id,
      movie_id
    )
    VALUES ($1, $2)
    RETURNING *`,
    [userId, movieId]
  );
}