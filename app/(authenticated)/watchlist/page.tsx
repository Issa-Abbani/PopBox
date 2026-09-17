import { CollectionPage } from "@/components/collections/CollectionPage";
import { movies } from "@/lib/mock-data";

const watchlistMovies = movies.filter((movie) => movie.watchlist);

export default function WatchlistPage() {
  return (
    <CollectionPage
      title="Watchlist"
      subtitle="Saved for later"
      movies={watchlistMovies}
      emptyState={
        <div className="flex min-h-105 items-center justify-center rounded-[30px] border border-dashed border-border bg-card p-8 text-center">
          <div className="max-w-md space-y-3">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-muted text-2xl">🎬</div>
            <h3 className="text-2xl font-semibold tracking-[-0.06em] text-foreground">Your watchlist is empty</h3>
            <p className="text-muted-foreground">Save movies you want to revisit later and keep your plans ready for the next movie night.</p>
          </div>
        </div>
      }
    />
  );
}
