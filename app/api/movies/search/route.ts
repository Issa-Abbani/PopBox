import { getMovieSearch } from "@/lib/movies/getMovieSearch";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Nothing to search for" },
      { status: 400 }
    );
  }

  const data = await getMovieSearch(query);

  return NextResponse.json(data);
}