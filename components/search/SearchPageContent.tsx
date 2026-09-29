import { ArrowRight, Clock3 } from "lucide-react";
import Link from "next/link";

import { SearchBar } from "@/components/search/SearchBar";
import { SectionHeading } from "@/components/ui/section-heading";
import { MovieGrid } from "@/components/movies/MovieGrid";
import { searchMovies } from "@/lib/movies/searchMovies";
import { Suspense } from "react";

const recentSearches = [
  "Dune",
  "Ex Machina",
  "Spider-Man: Across the Spider-Verse",
];

async function SearchResults({ query }: { query: string }) {
  if (!query.trim()) {
    return <p>Search for a movie.</p>;
  }

  const movies = await searchMovies(query);

  if (movies.length === 0) {
    return <p>No results</p>;
  }

  return <MovieGrid movies={movies} />;
}

export default async function SearchPageContent({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8">
      <section className="overflow-hidden rounded-[28px] border border-border bg-card shadow-[0_28px_80px_rgba(15,23,42,0.08)] sm:rounded-4xl">
        <div className="relative p-5 sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.2),transparent_42%),radial-gradient(circle_at_right,rgba(245,158,11,0.12),transparent_28%)]" />

          <div className="relative space-y-6">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Discover
              </p>

              <h1 className="mt-2 text-3xl font-semibold tracking-[-0.08em] text-foreground sm:text-4xl">
                Search the catalog
              </h1>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="flex-1">
                <SearchBar
                  placeholder="Search movies, actors, genres, directors..."
                  query={query ?? ""}
                />
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-[28px] border border-border bg-card p-5">
            <div className="mb-4 flex items-center gap-2 text-foreground">
              <Clock3 className="h-4 w-4 text-primary" />

              <h3 className="text-lg font-semibold tracking-tighter">
                Recent searches
              </h3>
            </div>

            <div className="space-y-2">
              {recentSearches.map((term) => (
                <Link
                  key={term}
                  href={`/search?query=${encodeURIComponent(term)}`}
                  className="flex w-full items-center justify-between rounded-2xl border border-border bg-muted px-3 py-2.5 text-left text-sm text-foreground transition-colors hover:border-primary/35 hover:bg-muted/80"
                >
                  <span>{term}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="flex w-[90%] flex-col">
        <div className="space-y-5">
          <SectionHeading eyebrow="Results" title="Matching titles" />

          {!query ? (
            <p>Search for a movie.</p>
          ) : (
            <Suspense fallback={<p>Loading...</p>}>
              <SearchResults query={query} />
            </Suspense>
          )}
        </div>
      </section>
    </div>
  );
}
