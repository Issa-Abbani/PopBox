import { CalendarClock, Star, Tag, Ticket, UserRound } from "lucide-react";
import { notFound } from "next/navigation";

import { MediaImage } from "@/components/ui/media-image";
import { MovieActions } from "@/components/movies/MovieActions";
import { MovieCast } from "@/components/movies/MovieCast";
import { MovieRating } from "@/components/movies/MovieRating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { movies } from "@/lib/mock-data";

export default function MovieDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  // Next.js 16 uses async params; keep the design intent here without backend logic.
  return <MovieDetailsContent params={params} />;
}

async function MovieDetailsContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const movie = movies.find((item) => item.id === id);

  if (!movie) {
    notFound();
  }

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8">
      <section className="overflow-hidden rounded-[28px] border border-border bg-card sm:rounded-[34px]">
        <div className="relative">
          <div className="absolute inset-0">
            <MediaImage src={movie.backdrop} alt={movie.title} fill className="object-cover opacity-80" sizes="100vw" fallbackClassName="h-full w-full" />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,9,11,0.88),rgba(9,9,11,0.52),rgba(9,9,11,0.1))]" />

          <div className="relative grid gap-8 p-4 sm:p-5 md:p-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="relative mx-auto w-full max-w-65 overflow-hidden rounded-3xl border border-white/20 bg-black/25 p-2.5 backdrop-blur-md sm:max-w-[320px] sm:rounded-[28px] sm:p-3">
              <div className="relative h-75 overflow-hidden rounded-[20px] sm:h-105 sm:rounded-[22px]">
                <MediaImage src={movie.poster} alt={movie.title} fill className="object-cover" sizes="320px" fallbackClassName="h-full w-full" />
              </div>
            </div>

            <div className="flex flex-col justify-end min-w-0">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                {movie.genres.map((genre) => (
                  <Badge key={genre} className="border-white/10 bg-white/5 text-white/80">{genre}</Badge>
                ))}
              </div>

              <h1 className="text-2xl font-semibold tracking-[-0.08em] text-white sm:text-3xl md:text-5xl">{movie.title}</h1>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-zinc-200 sm:gap-3 sm:text-sm">
                <span>{movie.year}</span>
                <span>•</span>
                <span>{movie.releaseDate}</span>
                <span>•</span>
                <span>{movie.runtime}</span>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4">
                <MovieRating rating={movie.rating} className="border-white/10 bg-white/5 text-white" />
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white sm:text-sm">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  Critic score
                </div>
              </div>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-200 sm:text-base">{movie.summary}</p>

              <div className="mt-6">
                <MovieActions />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-[28px] border border-border bg-card p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-2 text-foreground">
              <UserRound className="h-4 w-4 text-primary" />
              <h2 className="text-xl font-semibold tracking-tighter">Cast</h2>
            </div>
            <MovieCast cast={movie.cast} />
          </div>

          <div className="rounded-[28px] border border-border bg-card p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-2 text-foreground">
              <Ticket className="h-4 w-4 text-accent" />
              <h2 className="text-xl font-semibold tracking-tighter">Your PopBox Data</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-muted p-4">
                <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Personal rating</div>
                <div className="mt-3 flex items-center gap-2 text-2xl font-semibold text-foreground">
                  <Star className="h-5 w-5 fill-accent text-accent" />
                  {movie.personalRating ?? 0}/10
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-muted p-4">
                <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Status</div>
                <div className="mt-3 space-y-2 text-sm text-foreground">
                  <div className="flex items-center justify-between"><span>Favorite</span><span>{movie.favorite ? "Yes" : "No"}</span></div>
                  <div className="flex items-center justify-between"><span>Watchlist</span><span>{movie.watchlist ? "Saved" : "Not saved"}</span></div>
                  <div className="flex items-center justify-between"><span>Watched</span><span>{movie.watched ? "Seen" : "Not seen"}</span></div>
                </div>
              </div>
              <div className="md:col-span-2 rounded-2xl border border-border bg-muted p-4">
                <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Personal notes</div>
                <p className="mt-3 text-base leading-7 text-foreground">{movie.notes ?? "No notes yet — jot down what stood out during your watch."}</p>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[28px] border border-border bg-card p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-2 text-foreground">
              <Tag className="h-4 w-4 text-primary" />
              <h2 className="text-xl font-semibold tracking-tighter">Movie info</h2>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between rounded-2xl bg-muted p-3">
                <span className="text-muted-foreground">Release</span>
                <span className="font-medium text-foreground">{movie.releaseDate}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-muted p-3">
                <span className="text-muted-foreground">Runtime</span>
                <span className="font-medium text-foreground">{movie.runtime}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-muted p-3">
                <span className="text-muted-foreground">Rating</span>
                <span className="font-medium text-foreground">{movie.rating.toFixed(1)}/10</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-muted p-3">
                <span className="text-muted-foreground">Genres</span>
                <span className="text-right font-medium text-foreground">{movie.genres.join(", ")}</span>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-border bg-card p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-2 text-foreground">
              <CalendarClock className="h-4 w-4 text-accent" />
              <h2 className="text-xl font-semibold tracking-tighter">Actions</h2>
            </div>
            <div className="space-y-3">
              <Button className="w-full justify-center rounded-full bg-primary text-white">Add note</Button>
              <Button variant="secondary" className="w-full justify-center rounded-full">Share review</Button>
              <Button variant="outline" className="w-full justify-center rounded-full">Open timeline</Button>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
