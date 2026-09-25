import dotenv from "dotenv";
import { cacheLife } from "next/cache";

dotenv.config({ path: ".env.local" });

export async function getLatestMoviesHome() {
  "use cache";

  cacheLife("hours");

  console.log("🔥 OMDb request:", new Date().toISOString());

  const url = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=movie`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`OMDb request failed: ${response.status}`);
  }

  return response.json();
}
