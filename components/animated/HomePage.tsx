"use client";

import { motion } from "motion/react";
import { Flame } from "lucide-react";

import { MediaImage } from "@/components/ui/media-image";
import { Button } from "@/components/ui/button";
import type {
  OmdbSearchResult,
} from "@/types/movies/movieTypes";

export default function HomePage({movies}: {movies: OmdbSearchResult[]}) {
  return (
    <>
      {/*featured movie*/}
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
    </>
  );
}
