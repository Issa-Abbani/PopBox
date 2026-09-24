"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Heart, Star, Plus, CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { OmdbSearchResult } from "@/types/movies/movieTypes";

export function MovieCard({ movie }: { movie: OmdbSearchResult }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Link href={`/movies/${movie.imdbID}`} className="group block overflow-hidden rounded-[28px] border border-border bg-card shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_26px_68px_rgba(124,58,237,0.14)]">
        <div className="relative">
          <div className="relative h-72 w-full overflow-hidden">
            <Image
              src={movie.Poster}
              alt={movie.Title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(9,9,11,0.8)_100%)]" />
          </div>

          <div className="space-y-3 p-3.5 sm:p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="line-clamp-1 text-base font-semibold text-foreground sm:text-lg">{movie.Title}</h3>
                <p className="text-sm text-muted-foreground">{movie.Year}</p>
              </div>
              <button
                type="button"
                aria-label={`Toggle favorite for ${movie.Title}`}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
              >
                <Heart className={movie ? "h-4 w-4 fill-red-500 text-red-500" : "h-4 w-4"} />
              </button>
            </div>


            <div className="flex items-center justify-between gap-2 text-[11px] text-muted-foreground sm:text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2 py-1 text-[10px] font-medium text-foreground">
                {movie ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> : <Plus className="h-3.5 w-3.5" />}
                {movie ? "Watched" : "Watchlist"}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
