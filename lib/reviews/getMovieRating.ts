export async function getMovieRating(movieId: string) {
  const response = await fetch(
    `/api/reviews/ratings?movieId=${encodeURIComponent(movieId)}`,
  );

  if (!response.ok) {
    const data = await response.json();

    throw new Error(data.error || "Couldn't load movie rating");
  }

  const data: { rating: number | null } = await response.json();

  return data.rating;
}