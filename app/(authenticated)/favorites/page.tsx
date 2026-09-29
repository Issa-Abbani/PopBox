import { Suspense } from "react";
import { CollectionPage } from "@/components/collections/CollectionPage";
import { getFavoriteMovies } from "@/lib/movies/getUserMovies";
import { requireSession } from "@/lib/auth/auth";
import { OmdbSearchResult } from "@/types/movies/movieTypes";
import Loader from "@/components/layout/Loader";

async function FavoritesContent() {
  const session = await requireSession();

  const favoriteMovies: OmdbSearchResult[] =
    await getFavoriteMovies(session.user.id);

  return (
    <CollectionPage
      title="Favorites"
      subtitle="Your most memorable picks. This space is reserved for the special pieces of media that resonate the most with you."
      movies={favoriteMovies}
      emptyState={
        <div className="flex min-h-105 items-center justify-center rounded-[30px] border border-dashed border-border bg-card p-8 text-center">
          <div className="max-w-md space-y-3">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted text-2xl">
              💜
            </div>

            <h3 className="text-2xl font-semibold tracking-[-0.06em] text-foreground">
              No favorites yet
            </h3>

            <p className="text-muted-foreground">
              Tap the heart on any movie to keep your most-loved picks close at
              hand.
            </p>
          </div>
        </div>
      }
    />
  );
}

export default function FavoritesPage() {
  return (
    <Suspense fallback={<Loader/>}>
      <FavoritesContent />
    </Suspense>
  );
}
