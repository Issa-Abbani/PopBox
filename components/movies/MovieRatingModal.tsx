"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Star, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MovieDialog } from "@/components/movies/MovieDialog";
import type { OmdbSearchResult } from "@/types/movies/movieTypes";
import { getMovieRating } from "@/lib/reviews/getMovieRating";

type MovieRatingModalProps = {
  open: boolean;
  onClose: () => void;
  movie: OmdbSearchResult;
};



async function handlePostMovieRating(
  movie: OmdbSearchResult,
  rating: number,
) {
  const response = await fetch("/api/reviews/ratings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      movie,
      rating,
    }),
  });

  if (!response.ok) {
    const data = await response.json();

    throw new Error(data.error || "Couldn't save movie rating");
  }

  return response.json();
}

export function MovieRatingModal({
  open,
  onClose,
  movie,
}: MovieRatingModalProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    let cancelled = false;

    async function loadRating() {
      try {
        setLoading(true);

        const rating = await getMovieRating(movie.imdbID);

        if (!cancelled) {
          setSelectedRating(rating);
        }
      } catch (error) {
        console.error("Failed to load movie rating:", error);

        if (!cancelled) {
          setSelectedRating(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadRating();

    return () => {
      cancelled = true;
    };
  }, [open, movie.imdbID]);

  const saveRating = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedRating === null || saving) return;

    try {
      setSaving(true);

      await handlePostMovieRating(movie, selectedRating);

      onClose();
    } catch (error) {
      console.error("Failed to save movie rating:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <MovieDialog
      open={open}
      onClose={onClose}
      labelledBy="movie-rating-title"
    >
      <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-accent">
            <Star className="h-4 w-4" />
            <span>Your rating</span>
          </div>

          <h2 id="movie-rating-title" className="text-xl font-semibold">
            Rate this movie
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {movie.Title} ({movie.Year})
          </p>
        </div>

        <button
          type="button"
          aria-label="Close rating dialog"
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <form
        className="space-y-6 px-5 py-6 sm:px-6"
        onSubmit={saveRating}
      >
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-accent">
            <Star className="h-6 w-6 fill-current" />

            <span className="text-4xl font-semibold tabular-nums">
              {selectedRating ?? "–"}
            </span>

            <span className="mt-3 text-sm text-muted-foreground">
              / 10
            </span>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            {loading
              ? "Loading your rating..."
              : selectedRating === null
                ? "Choose a score"
                : "Your score"}
          </p>
        </div>

        <div
          className="grid grid-cols-6 gap-2 sm:grid-cols-11"
          role="group"
          aria-label="Choose a rating from 0 to 10"
        >
          {Array.from({ length: 11 }, (_, rating) => (
            <button
              key={rating}
              type="button"
              aria-label={`${rating} out of 10`}
              aria-pressed={selectedRating === rating}
              disabled={loading || saving}
              onClick={() => setSelectedRating(rating)}
              className={`aspect-square min-w-0 rounded-lg text-sm font-semibold tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 ${
                selectedRating === rating
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-foreground hover:bg-primary/20"
              }`}
            >
              {rating}
            </button>
          ))}
        </div>

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Not for me</span>
          <span>A favorite</span>
        </div>

        <div className="flex justify-end gap-2 border-t border-border pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={selectedRating === null || loading || saving}
          >
            {saving ? "Saving..." : "Save rating"}
          </Button>
        </div>
      </form>
    </MovieDialog>
  );
}
