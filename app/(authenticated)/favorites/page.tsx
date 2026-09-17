import { CollectionPage } from "@/components/collections/CollectionPage";
import { movies } from "@/lib/mock-data";

const favoriteMovies = movies.filter((movie) => movie.favorite);

export default function FavoritesPage() {
  return (
    <CollectionPage
      title="Favorites"
      subtitle="Your top picks"
      movies={favoriteMovies}
      emptyState={
        <div className="flex min-h-105 items-center justify-center rounded-[30px] border border-dashed border-border bg-card p-8 text-center">
          <div className="max-w-md space-y-3">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted text-2xl">💜</div>
            <h3 className="text-2xl font-semibold tracking-[-0.06em] text-foreground">No favorites yet</h3>
            <p className="text-muted-foreground">Tap the heart on any movie to keep your most-loved picks close at hand.</p>
          </div>
        </div>
      }
    />
  );
}
