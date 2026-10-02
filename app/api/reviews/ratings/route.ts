import { getSession } from "@/lib/auth/auth";
import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

import type { OmdbSearchResult } from "@/types/movies/movieTypes";
import userMovieConfig from "@/lib/helpers/userMovieConfig";
import { postMovieRating } from "@/lib/reviews/postMovieRating";

export async function POST(request: Request) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  if (!body) {
    return NextResponse.json({ error: "No movie included" }, { status: 400 });
  }

  const movie: OmdbSearchResult = body.movie;
  const rating = body.rating;

  

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await userMovieConfig(movie, session.user.id, client);

    await postMovieRating(movie.imdbID, session.user.id, rating, client);

    await client.query("COMMIT");

    return NextResponse.json(
      {
        message: "Done",
      },
      { status: 200 },
    );
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(error);

    return NextResponse.json(
      { error: "Couldn't add new rating" },
      { status: 500 },
    );
  } finally {
    client.release();
  }
}

export async function GET(request: Request) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const movieId = searchParams.get("movieId");


  if (!movieId) {
    return NextResponse.json(
      { error: "Movie ID is required" },
      { status: 400 },
    );
  }

  try {
    const result = await pool.query(
      `
        SELECT personal_rating
        FROM user_movies
        WHERE user_id = $1
          AND movie_id = $2
        LIMIT 1
      `,
      [session.user.id, movieId],
    );

    return NextResponse.json({
      rating: result.rows[0]?.personal_rating ?? "",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Couldn't get movie rating" },
      { status: 500 },
    );
  }
}
