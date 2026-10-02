import { z } from "zod";
import type { PoolClient } from "pg";

const movieNotesSchema = z.object({
  notes: z.string().trim().max(2000),
});

export async function postMovieNotes(
  movieId: string,
  userId: string,
  notes: string,
  client: PoolClient,
) {
  const validatedNotes = movieNotesSchema.parse({ notes });

  await client.query(
    `
      UPDATE user_movies
      SET notes = $1,
          updated_at = NOW()
      WHERE user_id = $2
        AND movie_id = $3
    `,
    [validatedNotes.notes, userId, movieId],
  );
}