import { NextResponse } from "next/server";

import { getLatestMoviesHome } from "@/lib/movies/getLatestMovies";

export async function GET() {
  try {
    const data = await getLatestMoviesHome();

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