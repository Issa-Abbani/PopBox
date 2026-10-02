export async function getMovieNotesClient(movieId: string) {
  const response = await fetch(
    `/api/reviews/notes?movieId=${encodeURIComponent(movieId)}`,
  );

  if (!response.ok) {
    const data = await response.json();

    throw new Error(data.error || "Couldn't get movie notes");
  }

  const data: { notes: string } = await response.json();

  console.log(data);

  return data.notes;
}