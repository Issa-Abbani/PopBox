import { Suspense } from "react";
import { CollectionPage } from "@/components/collections/CollectionPage";
import { getWatchedMovies } from "@/lib/movies/getUserMovies";
import { requireSession } from "@/lib/auth/auth";
import { OmdbSearchResult } from "@/types/movies/movieTypes";
import Loader from "@/components/layout/Loader";

async function WatchedContent() {
  const session = await requireSession();

  const watchedMovies: OmdbSearchResult[] = await getWatchedMovies(
    session.user.id,
  );
  return (
    <CollectionPage
      title="Watched"
      subtitle="Your watch history all in one place. Take a look at your pop culture journey."
      movies={watchedMovies}
      emptyState={
        <div className="flex min-h-105 items-center justify-center rounded-[30px] border border-dashed border-border bg-card p-8 text-center">
          <div className="max-w-md space-y-3">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted text-2xl">
              ✅
            </div>
            <h3 className="text-2xl font-semibold tracking-[-0.06em] text-foreground">
              No movies marked watched
            </h3>
            <p className="text-muted-foreground">
              Keep track of every film you’ve seen and build your personal movie
              log over time.
            </p>
          </div>
        </div>
      }
    />
  );
}

export default function WatchedPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader />
        </div>
      }
    >
      <WatchedContent />
    </Suspense>
  );
}
