import {
  Award,
  Building2,
  CalendarClock,
  Film,
  Globe2,
  Languages,
  Star,
  Tag,
  Ticket,
  UserRound,
} from "lucide-react";
import { notFound } from "next/navigation";

import { MovieActions } from "@/components/movies/MovieActions";
import { MovieCast } from "@/components/movies/MovieCast";
import { MovieRating } from "@/components/movies/MovieRating";
import { Badge } from "@/components/ui/badge";
import { MediaImage } from "@/components/ui/media-image";
import { getMovieDetails } from "@/lib/movies/getMovieDetails";
import type { OmdbMovieDetails } from "@/types/movies/movieTypes";
import { Suspense } from "react";
import Loader from "@/components/layout/Loader";
import type { OmdbSearchResult } from "@/types/movies/movieTypes";
import { searchUserMovie } from "@/lib/movies/getUserMovies";
import { requireSession } from "@/lib/auth/auth";

function formatOmdbValue(value?: string) {
  return value && value.trim() !== "N/A" ? value : "Not available";
}

function getPosterUrl(poster?: string) {
  return poster && poster !== "N/A" ? poster : undefined;
}

export default function MovieDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader />
        </div>
      }
    >
      <MovieDetailsContent params={params} />
    </Suspense>
  );
}

async function MovieDetailsContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await requireSession();
  const movie: OmdbMovieDetails = await getMovieDetails(id);

  if (!movie || movie.Response === "False") {
    notFound();
  }

  const userMovieDetails = (await searchUserMovie(
    session.user.id,
    movie.imdbID,
  )) ?? {
    movie_id: movie.imdbID,
    is_favorite: false,
    is_watchlisted: false,
    is_watched: false,
    notes: null,
    personal_rating: null
  };

  const OmdbFormatMovie: OmdbSearchResult = {
    Title: movie.Title,
    Year: movie.Year,
    imdbID: movie.imdbID,
    Type: movie.Type,
    Poster: movie.Poster,
  };

  const poster = getPosterUrl(movie.Poster);
  const genres =
    movie.Genre && movie.Genre !== "N/A"
      ? movie.Genre.split(",")
          .map((genre) => genre.trim())
          .filter(Boolean)
      : ["Unknown"];
  const runtime = formatOmdbValue(movie.Runtime);
  const ratingValue = Number.parseFloat(movie.imdbRating ?? "0");
  const metascoreValue = Number.parseInt(movie.Metascore ?? "0", 10);
  const directorValue = formatOmdbValue(movie.Director);
  const writerValue = formatOmdbValue(movie.Writer);
  const languageValue = formatOmdbValue(movie.Language);
  const countryValue = formatOmdbValue(movie.Country);
  const boxOfficeValue = formatOmdbValue(movie.BoxOffice);

  return (
    <div className="min-w-0 max-w-full space-y-8 overflow-x-hidden p-4 sm:p-6 lg:p-8">
      {/* <Suspense fallback={<Loader />}> */}
      <section className="overflow-hidden rounded-[28px] border border-border bg-card sm:rounded-[34px]">
        <div className="relative">
          <div className="absolute inset-0">
            <MediaImage
              src={poster}
              alt={movie.Title}
              fill
              className="object-cover opacity-80"
              sizes="100vw"
              fallbackClassName="h-full w-full"
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,9,11,0.9),rgba(9,9,11,0.58),rgba(9,9,11,0.12))]" />

          <div className="relative grid min-w-0 gap-8 p-4 sm:p-5 md:p-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className="relative mx-auto h-fit w-full max-w-65 overflow-hidden rounded-3xl border border-white/20 bg-black/25 p-2.5 backdrop-blur-md sm:max-w-[320px] sm:rounded-[28px] sm:p-3">
              <div className="relative h-75 overflow-hidden rounded-[20px] sm:h-105 sm:rounded-[22px]">
                <MediaImage
                  src={poster}
                  alt={movie.Title}
                  fill
                  className="object-cover"
                  sizes="320px"
                  fallbackClassName="h-full w-full"
                />
              </div>
            </div>

            <div className="flex min-w-0 flex-col justify-end">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                {genres.map((genre) => (
                  <Badge
                    key={genre}
                    className="border-white/10 bg-white/6 text-white/90"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>

              <h1 className="text-2xl font-semibold tracking-[-0.08em] text-white sm:text-3xl md:text-5xl">
                {movie.Title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-zinc-200 sm:gap-3 sm:text-sm">
                <span>{movie.Year}</span>
                <span>•</span>
                <span>{movie.Rated}</span>
                <span>•</span>
                <span>{runtime}</span>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
                <MovieRating
                  rating={Number.isFinite(ratingValue) ? ratingValue : 0}
                  className="border-white/10 bg-white/5 text-white"
                />
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white sm:text-sm">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  {Number.isFinite(metascoreValue) && metascoreValue > 0
                    ? `${metascoreValue}/100 critic score`
                    : "Critic score unavailable"}
                </div>
              </div>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-200 sm:text-base">
                {formatOmdbValue(movie.Plot)}
              </p>

              <div className="mt-6">
                <MovieActions userMovieDetails={userMovieDetails} OmdbSearchDetails={OmdbFormatMovie} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid min-w-0 gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="space-y-6 min-w-0">
          <div className="rounded-[28px] border border-border bg-card p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-2 text-foreground">
              <UserRound className="h-4 w-4 text-primary" />
              <h2 className="text-xl font-semibold tracking-tighter">Cast</h2>
            </div>
            <MovieCast actors={movie.Actors} />
          </div>

          <div className="rounded-[28px] border border-border bg-card p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-2 text-foreground">
              <Ticket className="h-4 w-4 text-accent" />
              <h2 className="text-xl font-semibold tracking-tighter">
                Your PopBox Data
              </h2>
            </div>

            <div className="grid min-w-0 gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-muted p-4">
                <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Personal rating
                </div>
                <div className="mt-3 flex items-center gap-2 text-2xl font-semibold text-foreground">
                  <Star className="h-5 w-5 fill-accent text-accent" />
                  <span className="text-base text-muted-foreground">
                    {userMovieDetails.personal_rating === null ? "Not set yet" : userMovieDetails.personal_rating?.toString()}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-muted p-4">
                <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Status
                </div>
                <div className="mt-3 space-y-2 text-sm text-foreground">
                  <div className="flex items-center justify-between">
                    <span>Favorite</span>
                    <span className="text-muted-foreground">
                      {userMovieDetails.is_favorite ? "Yes" : "No"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Watchlist</span>
                    <span className="text-muted-foreground">
                      {userMovieDetails.is_watchlisted ? "Saved" : "Not Saved"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Watched</span>
                    <span className="text-muted-foreground">
                      {userMovieDetails.is_watched ? "Yes" : "Not Yet"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 rounded-2xl border border-border bg-muted p-4">
                <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Personal notes
                </div>
                <p className="mt-3 text-base leading-7 text-foreground">
                  {userMovieDetails.notes === null ? "No notes yet — jot down what stood out during your watch." : userMovieDetails.notes}
                </p>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-6 min-w-0">
          <div className="rounded-[28px] border border-border bg-card p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-2 text-foreground">
              <Tag className="h-4 w-4 text-primary" />
              <h2 className="text-xl font-semibold tracking-tighter">
                Movie info
              </h2>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex min-w-0 items-center justify-between gap-3 rounded-2xl bg-muted p-3">
                <span className="shrink-0 text-muted-foreground">Release</span>
                <span className="min-w-0 truncate text-right font-medium text-foreground">
                  {formatOmdbValue(movie.Released)}
                </span>
              </div>
              <div className="flex min-w-0 items-center justify-between gap-3 rounded-2xl bg-muted p-3">
                <span className="shrink-0 text-muted-foreground">Runtime</span>
                <span className="min-w-0 truncate text-right font-medium text-foreground">
                  {runtime}
                </span>
              </div>
              <div className="flex min-w-0 items-center justify-between gap-3 rounded-2xl bg-muted p-3">
                <span className="shrink-0 text-muted-foreground">Imdb</span>
                <span className="min-w-0 truncate text-right font-medium text-foreground">
                  {Number.isFinite(ratingValue)
                    ? `${ratingValue.toFixed(1)}/10`
                    : "Not rated"}
                </span>
              </div>
              <div className="flex min-w-0 items-start justify-between gap-3 rounded-2xl bg-muted p-3">
                <span className="shrink-0 text-muted-foreground">Genres</span>
                <span className="min-w-0 wrap-break-word text-right font-medium text-foreground">
                  {genres.join(", ")}
                </span>
              </div>
              <div className="flex min-w-0 items-center justify-between gap-3 rounded-2xl bg-muted p-3">
                <span className="shrink-0 text-muted-foreground">Director</span>
                <span className="min-w-0 truncate text-right font-medium text-foreground">
                  {directorValue}
                </span>
              </div>
              <div className="flex min-w-0 items-center justify-between gap-3 rounded-2xl bg-muted p-3">
                <span className="shrink-0 text-muted-foreground">Writer</span>
                <span className="min-w-0 truncate text-right font-medium text-foreground">
                  {writerValue}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-border bg-card p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-2 text-foreground">
              <CalendarClock className="h-4 w-4 text-accent" />
              <h2 className="text-xl font-semibold tracking-tighter">
                More details
              </h2>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-muted p-3">
                <Globe2 className="h-4 w-4 text-primary" />
                <div className="min-w-0 flex-1">
                  <div className="text-muted-foreground">Country</div>
                  <div className="truncate font-medium text-foreground">
                    {countryValue}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-muted p-3">
                <Languages className="h-4 w-4 text-primary" />
                <div className="min-w-0 flex-1">
                  <div className="text-muted-foreground">Language</div>
                  <div className="truncate font-medium text-foreground">
                    {languageValue}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-muted p-3">
                <Building2 className="h-4 w-4 text-primary" />
                <div className="min-w-0 flex-1">
                  <div className="text-muted-foreground">Production</div>
                  <div className="truncate font-medium text-foreground">
                    {formatOmdbValue(movie.Production)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-muted p-3">
                <Award className="h-4 w-4 text-primary" />
                <div className="min-w-0 flex-1">
                  <div className="text-muted-foreground">Awards</div>
                  <div className="truncate font-medium text-foreground">
                    {formatOmdbValue(movie.Awards)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-muted p-3">
                <Film className="h-4 w-4 text-primary" />
                <div className="min-w-0 flex-1">
                  <div className="text-muted-foreground">Box office</div>
                  <div className="truncate font-medium text-foreground">
                    {boxOfficeValue}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>
      {/* </Suspense> */}
    </div>
  );
}
