import { getSession } from "@/lib/auth/auth";
import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

import type { OmdbSearchResult } from "@/types/movies/movieTypes";
import userMovieConfig from "@/lib/helpers/userMovieConfig";
import postMovieFavorite from "@/lib/movies/postMovieFavorite";

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

  console.log(movie);
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await userMovieConfig(movie, session.user.id, client);

    const favoriteState = await postMovieFavorite(
      movie.imdbID,
      session.user.id,
      client,
    );

    await client.query("COMMIT");

    return NextResponse.json(
      {
        message: "Done",
        is_Favorite: favoriteState,
      },
      { status: 200 },
    );
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(error);

    return NextResponse.json(
      { error: "Couldn't favorite movie" },
      { status: 500 },
    );
  } finally {
    client.release();
  }
}
