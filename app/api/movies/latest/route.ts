import { NextResponse } from "next/server";
import { getLatestMoviesHome } from "@/lib/movies/getLatestMovies";

export async function GET() {
  console.log("Request Received")
  const response = await getLatestMoviesHome();

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      { status: response.status }
    );
  }

  const data = await response.json();

  return NextResponse.json(data);
}