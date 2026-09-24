"use client";

import { motion } from "motion/react";
import { ArrowRight, Flame, Sparkles } from "lucide-react";

import { MediaImage } from "@/components/ui/media-image";
import { SearchBar } from "@/components/search/SearchBar";
import { FilterMenu } from "@/components/filters/FilterMenu";
import { SortMenu } from "@/components/filters/SortMenu";
import { MovieGrid } from "@/components/movies/MovieGrid";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import type {
  OmdbSearchResult,
  OmdbSearchResponse,
} from "@/types/movies/movieTypes";
import Loader from "@/components/layout/Loader";

export default function HomePage() {
  const [movies, setMovies] = useState<OmdbSearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getMovies() {
      try {
        const response = await fetch("/api/movies/latest");

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data: OmdbSearchResponse = await response.json();

        console.log(data);

        if (data.Response === "False") {
          throw new Error(data.Error ?? "Failed to fetch movies");
        }

        setMovies(data.Search?.slice(0, 6) ?? []);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch movies",
        );
      } finally {
        setLoading(false);
      }
    }

    getMovies();
  }, []);

  return (
    <div
      className={`space-y-8  ${loading ? "flex justify-center md:p-[25%] p-[50%]" : "p-4 sm:p-6 lg:p-8"}`}
    >
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : error !== null ? (
        <div>
          <h1 className="text-error text-4xl font-bold">ERROR</h1>
          <p className="font-semibold italic">{error}</p>
        </div>
      ) : (
        <>
          {/*fratured movie*/}
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="overflow-hidden rounded-[28px] border border-border bg-card shadow-[0_28px_80px_rgba(15,23,42,0.12)] sm:rounded-4xl"
          >
            <div className="relative grid gap-6 p-4 sm:p-5 md:min-h-90 md:grid-cols-[1.2fr_0.8fr] md:p-8">
              <div className="absolute inset-0 opacity-90">
                <MediaImage
                  src={movies[0].Poster}
                  alt={movies[0].Title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  fallbackClassName="h-full w-full"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,9,11,0.86),rgba(9,9,11,0.55),rgba(9,9,11,0.18))]" />

              <div className="relative flex flex-col justify-end">
                <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/6 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/85 backdrop-blur-md">
                  <Flame className="h-3.5 w-3.5 text-accent" />
                  Featured tonight
                </div>
                <h1 className="max-w-xl text-2xl font-semibold tracking-[-0.08em] text-white sm:text-3xl md:text-5xl">
                  {/* {featuredMovie.title} */}
                </h1>
                <p className="mt-4 max-w-lg text-sm text-zinc-200 md:text-base">
                  {movies[0].Title}
                </p>
                <div className="mt-5 flex flex-wrap gap-2 text-xs text-zinc-100 sm:gap-3 sm:text-sm">
                  <span>{movies[0].Year}</span>
                  {/* <span>•</span> */}
                  <span className="wrap-break-word">
                    {/* {movies[0].averageRating} / 10 */}
                  </span>
                </div>
                <div className="mt-6 flex flex-wrap gap-2.5 sm:gap-3">
                  <Button
                    variant="secondary"
                    className="rounded-full border cursor-pointer border-white/20 bg-primary/80 text-white hover:bg-white/20"
                  >
                    Add to watchlist
                  </Button>
                </div>
              </div>

              <div className="relative flex items-end justify-end">
                <div className="w-full max-w-55 rounded-3xl border border-white/15 bg-black/25 p-2.5 shadow-[0_18px_48px_rgba(0,0,0,0.34)] backdrop-blur-md sm:max-w-70 sm:p-3">
                  <div className="relative h-55 overflow-hidden rounded-[18px] sm:h-68.75 sm:rounded-[20px]">
                    <MediaImage
                      src={movies[0].Poster}
                      alt={movies[0].Title ?? ""}
                      fill
                      className="object-cover"
                      sizes="280px"
                      fallbackClassName="h-full w-full"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/*latest movies*/}
          <section className="space-y-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="w-full lg:max-w-xl">
                <SearchBar />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <FilterMenu />
                <SortMenu />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <SectionHeading eyebrow="Discover" title="Most Popular" />
              <Button
                variant="ghost"
                className="hidden gap-2 rounded-full md:inline-flex"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <MovieGrid movies={movies} />
          </section>

          {/*mood board*/}
          <section className="rounded-[28px] border border-border bg-card p-5 shadow-[0_18px_40px_rgba(15,23,42,0.04)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Mood board
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tighter text-foreground">
                  Tonight{"'"}s picks
                </h3>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Sparkles className="h-4 w-4 text-accent" />
                Curated for you
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
