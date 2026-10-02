import { z } from "zod";
import type { PoolClient } from "pg";

const movieRatingSchema = z.object({
  rating: z.number().min(0).max(10),
});

export async function postMovieRating(
  movieId: string,
  userId: string,
  rating: number,
  client: PoolClient,
) {
  const validatedRating = movieRatingSchema.parse({ rating });

  await client.query(
    `
      UPDATE user_movies
      SET personal_rating = $1,
          updated_at = NOW()
      WHERE user_id = $2
        AND movie_id = $3
    `,
    [validatedRating.rating, userId, movieId],
  );
}