"use client";
import { BookHeart, Check, Heart, Plus, Star, X } from "lucide-react";
import type { userMovieStates } from "@/types/movies/movieTypes";
import type { OmdbSearchResult } from "@/types/movies/movieTypes";
import { Button } from "@/components/ui/button";
import { MovieDialog } from "@/components/movies/MovieDialog";
import { MovieNoteModal } from "@/components/movies/MovieNoteModal";
import { useState } from "react";

type MovieActionsProps = {
  userMovieDetails: userMovieStates;
  OmdbSearchDetails: OmdbSearchResult;
};

export function MovieActions({
  userMovieDetails,
  OmdbSearchDetails,
}: MovieActionsProps) {
  const { is_favorite, is_watchlisted, is_watched } = userMovieDetails;
  const [favorite, setFavorite] = useState<boolean>(is_favorite);
  const [watchlist, setWatchlist] = useState<boolean>(is_watchlisted);
  const [watched, setWatched] = useState<boolean>(is_watched);
  const [activeDialog, setActiveDialog] = useState<"note" | "rating" | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [savedRating, setSavedRating] = useState<number | null>(null);

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

  const onWatch = async (movie: OmdbSearchResult) => {
    try {
      const response = await fetch("/api/movies/watched", {
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
      setWatched(data.is_watched);
    } catch {
      alert("Couldn't Change Movie Watch State");
    }
  };
  return (
    <div className="flex flex-wrap gap-2.5 sm:gap-3">
      <Button
        variant="default"
        className="gap-2 rounded-full px-5 border-primary-foreground cursor-pointer transition-all duration-200"
        onClick={() => onFavorite(OmdbSearchDetails)}
      >
        <Heart
          className={`h-4 w-4 transition-all ${favorite ? "fill-current" : ""}`}
        />
        {favorite ? "Favorited" : "Favorite"}
      </Button>
      <Button
        variant="secondary"
        className={`gap-2 rounded-full px-5 cursor-pointer transition-all duration-200 ${
          watchlist
            ? "bg-accent text-accent-foreground shadow-md hover:bg-accent/90"
            : "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80"
        }`}
        onClick={() => onWatchlist(OmdbSearchDetails)}
      >
        {watchlist ? (
          <Check className="h-4 w-4" />
        ) : (
          <Plus className="h-4 w-4" />
        )}

        {watchlist ? "In Watchlist" : "Watchlist"}
      </Button>
      <Button
        variant="secondary"
        className={`gap-2 rounded-full px-5 cursor-pointer transition-all duration-200 ${
          watched
            ? "bg-emerald-500 text-white shadow-md hover:bg-emerald-500/90"
            : "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80"
        }`}
        onClick={() => onWatch(OmdbSearchDetails)}
      >
        <Check className="h-4 w-4" />
        {watched ? "Watched" : "Mark as Watched"}
      </Button>
      <Button
        variant="outline"
        className="flex-1 text-white hover:text-accent cursor-pointer gap-2 rounded-full border border-border sm:flex-none"
        onClick={() => setActiveDialog("note")}
      >
        <BookHeart className="h-4 w-4 " />
        Add note
      </Button>
      <Button
        variant="ghost"
        className="flex-1 cursor-pointer text-white hover:text-accent gap-2 rounded-full border border-border sm:flex-none"
        onClick={() => setActiveDialog("rating")}
      >
        <Star className="h-4 w-4" />
        {savedRating === null ? "Add Rating" : `Rated ${savedRating}/10`}
      </Button>

      <MovieNoteModal
        open={activeDialog === "note"}
        onClose={() => setActiveDialog(null)}
        movie={OmdbSearchDetails}
      />

      <MovieDialog
        open={activeDialog === "rating"}
        onClose={() => setActiveDialog(null)}
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
              {OmdbSearchDetails.Title} ({OmdbSearchDetails.Year})
            </p>
          </div>
          <button
            type="button"
            aria-label="Close rating dialog"
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            onClick={() => setActiveDialog(null)}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-6 px-5 py-6 sm:px-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-accent">
              <Star className="h-6 w-6 fill-current" />
              <span className="text-4xl font-semibold tabular-nums">
                {selectedRating ?? "–"}
              </span>
              <span className="mt-3 text-sm text-muted-foreground">/ 10</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {selectedRating === null ? "Choose a score" : "Your score"}
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
                onClick={() => setSelectedRating(rating)}
                className={`aspect-square min-w-0 rounded-lg text-sm font-semibold tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
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
              onClick={() => setActiveDialog(null)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={selectedRating === null}
              onClick={() => {
                if (selectedRating === null) return;
                setSavedRating(selectedRating);
                setActiveDialog(null);
              }}
            >
              Save rating
            </Button>
          </div>
        </div>
      </MovieDialog>
    </div>
  );
}
