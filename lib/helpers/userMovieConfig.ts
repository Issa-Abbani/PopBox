import doesMovieExist from "./doesMovieExist";
import doesUserHaveMovie from "./doesUserHaveMovie";
import { addMovieToDB } from "./addMovieToDB";
import { addUserMovie } from "./addUserMovie";

import type { OmdbSearchResult } from "@/types/movies/movieTypes";
import type { PoolClient } from "pg";

export default async function userMovieConfig(
  movie: OmdbSearchResult,
  userId: string,
  client: PoolClient,
): Promise<boolean> {
  const exists = await doesMovieExist(movie, client);

  if (!exists) {
    await addMovieToDB(movie, client);
    await addUserMovie(movie.imdbID, userId, client);
    return true;
  }

  const userHas = await doesUserHaveMovie(movie, userId, client);

  if (!userHas) {
    await addUserMovie(movie.imdbID, userId, client);
  }

  return true;
}
