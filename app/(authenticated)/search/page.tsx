"use client";

import { ArrowRight, Clock3, Search } from "lucide-react";
import { SearchBar } from "@/components/search/SearchBar";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { MovieGrid } from "@/components/movies/MovieGrid";
import { useState, useEffect, FormEvent } from "react";
import type {
  OmdbSearchResult,
  OmdbSearchResponse,
} from "@/types/movies/movieTypes";
import Loader from "@/components/layout/Loader";

const recentSearches = [
  "Dune",
  "Ex Machina",
  "Spider-Man: Across the Spider-Verse",
];

export default function SearchPage() {
  const [movies, setMovies] = useState<OmdbSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  async function searchMovies(query: string) {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/movies/search?query=${encodeURIComponent(query)}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data: OmdbSearchResponse = await response.json();

      if (data.Response === "False") {
        throw new Error(data.Error ?? "Failed to fetch movies");
      }

      setMovies(data.Search ?? []);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch movies",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8 p-4 sm:p-6 lg:p-8">
      <section className="overflow-hidden rounded-[28px] border border-border bg-card shadow-[0_28px_80px_rgba(15,23,42,0.08)] sm:rounded-4xl">
        <div className="relative p-5 sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.2),transparent_42%),radial-gradient(circle_at_right,rgba(245,158,11,0.12),transparent_28%)]" />

          <div className="relative space-y-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Discover
                </p>
                <h1 className="mt-2 text-3xl font-semibold tracking-[-0.08em] text-foreground sm:text-4xl">
                  Search the catalog
                </h1>
              </div>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="flex-1">
                <SearchBar
                  placeholder="Search movies, actors, genres, directors..."
                  onSearch={searchMovies}
                  query={query}
                  setQuery={setQuery}
                  loading={loading}
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
                <button
                  key={term}
                  type="button"
                  className="flex w-full items-center justify-between rounded-2xl border border-border bg-muted px-3 py-2.5 text-left text-sm text-foreground transition-colors hover:border-primary/35 hover:bg-muted/80"
                >
                  <span>{term}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="flex flex-col w-[90%]">
        <div className="space-y-5">
          <SectionHeading eyebrow="Results" title="Matching titles" />
          {loading ? (
            <Loader />
          ) : error ? (
            <p>Error</p>
          ) : movies.length <= 0 ? (
            <p>No results</p>
          ) : (
            <MovieGrid movies={movies} />
          )}

          {/* <div className="rounded-[28px] border border-border bg-card p-4 sm:p-5">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Filter className="h-4 w-4 text-primary" />
                <span className="text-sm">Filters</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {genreFilters.map((genre) => (
                  <Badge key={genre} className="border-border bg-muted text-muted-foreground">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {resultCards.map((card) => (
                <div key={`${card.title}-${card.year}`} className="group overflow-hidden rounded-3xl border border-border bg-muted/60 transition-transform duration-300 hover:-translate-y-1 hover:border-primary/35">
                  <div className="relative h-44 overflow-hidden bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.5),rgba(15,23,42,0.85))]">
                    <div className="absolute inset-0 opacity-70 [background:linear-gradient(180deg,rgba(15,23,42,0.1),rgba(15,23,42,0.66))]" />
                    <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/90">
                      {card.year}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <div className="mb-2 inline-flex rounded-full border border-white/15 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-white/75">
                        {card.label}
                      </div>
                      <p className="text-lg font-semibold tracking-tighter text-white">{card.title}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3.5 text-sm text-muted-foreground">
                    <span>Ready to watch</span>
                    <ArrowRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
}
