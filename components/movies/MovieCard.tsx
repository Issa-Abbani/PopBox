"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Heart, Plus, CheckCircle2 } from "lucide-react";
import { useState } from "react";

import type { OmdbSearchResult } from "@/types/movies/movieTypes";
import type { userMovieStates } from "@/types/movies/movieTypes";

export function MovieCard({
  movie,
  state,
}: {
  movie: OmdbSearchResult;
  state?: userMovieStates;
}) {
  const resolvedState = state ?? {
    movie_id: movie.imdbID,
    is_favorite: false,
    is_watched: false,
    is_watchlisted: false,
  };
  const [favorite, setFavorite] = useState<boolean>(resolvedState.is_favorite);
  const [watchlist, setWatchlist] = useState<boolean>(
    resolvedState.is_watchlisted,
  );

  const onFavorite = async (movie: OmdbSearchResult) => {
    try {
      const response = await fetch("/api/movies/favorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movie,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Couldn't favorite movie");
      }
      setFavorite(data.is_favorite);
    } catch {
      alert("Couldn't Favorite Movie");
    }
  };

  const onWatchlist = async (movie: OmdbSearchResult) => {
    try {
      const response = await fetch("/api/movies/watchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movie,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Couldn't watchlist movie");
      }
      setWatchlist(data.is_watchlisted);
    } catch {
      alert("Couldn't Watchlist Movie");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative"
    >
      <button
        type="button"
        aria-label={`Toggle favorite for ${movie.Title}`}
        className="flex z-30 absolute bottom-5 right-5 h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-red-500/30 hover:text-primary cursor-pointer"
        onClick={() => onFavorite(movie)}
      >
        <Heart
          className={favorite ? "h-4 w-4 fill-red-500 text-red-500" : "h-4 w-4"}
        />
      </button>

      <button
        type="button"
        className="flex z-30 absolute bottom-5 left-2.5 items-center justify-between gap-2 text-[11px] text-muted-foreground sm:text-xs cursor-pointer"
        onClick={() => onWatchlist(movie)}
      >
        <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2 py-1 text-[10px] font-medium text-foreground">
          {watchlist ? (
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
          ) : (
            <Plus className="h-3.5 w-3.5" />
          )}
          {resolvedState.is_watched ? "Watched" : "Watchlist"}
        </span>
      </button>
      <Link
        href={`/movies/${movie.imdbID}`}
        className="group block overflow-hidden rounded-[28px] border border-border bg-card shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_26px_68px_rgba(124,58,237,0.14)] pb-10"
      >
        <div className="relative">
          <div className="relative h-72 w-full overflow-hidden">
            {movie.Poster && movie.Poster !== "N/A" ? (
              <Image
                src={movie.Poster ?? null}
                alt={movie.Title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                No poster
              </div>
            )}

            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(9,9,11,0.8)_100%)]" />
          </div>

          <div className="space-y-3 p-3.5 sm:p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="line-clamp-1 text-base font-semibold text-foreground sm:text-lg">
                  {movie.Title}
                </h3>
                <p className="text-sm text-muted-foreground">{movie.Year}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
