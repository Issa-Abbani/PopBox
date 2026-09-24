import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export async function getLatestMoviesHome() {
  const url = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=movie&type=movie&y=${new Date().getFullYear()}`;

  try {
    const response = await fetch(url);

    console.log("OMDb status:", response.status);

    return response;
  } catch (error) {
    console.error("OMDb request failed:", error);
    throw error;
  }
}
