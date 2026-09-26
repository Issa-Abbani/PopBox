import { NextResponse } from "next/server";

import { getLatestMoviesHome } from "@/lib/movies/getLatestMovies";

export async function GET() {
  try {
    const data = await getLatestMoviesHome();
    // const likes = fetch user likes from DB
    //movie = {...movie, is_Liked = true}
    //if(movie.is_Liked) (undefined)

    if (data.Response === "False") {
      return NextResponse.json(
        { error: data.Error ?? "OMDb request failed" },
        { status: 400 },
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      { status: 500 },
    );
  }
}

/*
return NextResponse.json({data, likes})
*/