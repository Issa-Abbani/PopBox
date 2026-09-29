import type { OmdbSearchResponse } from "@/types/movies/movieTypes";
export async function searchMovies(query: string) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${encodeURIComponent(query)}&type=movie&page=1`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data: OmdbSearchResponse = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error ?? "Failed to fetch movies");
  }

  return data.Search ?? [];
}