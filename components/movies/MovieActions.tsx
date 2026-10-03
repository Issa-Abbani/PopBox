"use client";
import { BookHeart, Check, Heart, Plus, Star } from "lucide-react";
import type { userMovieStates } from "@/types/movies/movieTypes";
import type { OmdbSearchResult } from "@/types/movies/movieTypes";
import { Button } from "@/components/ui/button";
import { MovieNoteModal } from "@/components/movies/MovieNoteModal";
import { MovieRatingModal } from "./MovieRatingModal";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
  const [activeDialog, setActiveDialog] = useState<"note" | "rating" | null>(
    null,
  );
  const router = useRouter();

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
      router.refresh();
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
      router.refresh();
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
      router.refresh();
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
        Add Rating
      </Button>

      <MovieNoteModal
        open={activeDialog === "note"}
        onClose={() => {
          setActiveDialog(null);
          router.refresh();
        }}
        movie={OmdbSearchDetails}
      />

      <MovieRatingModal
        open={activeDialog === "rating"}
        onClose={() => {
          setActiveDialog(null);
          router.refresh();
        }}
        movie={OmdbSearchDetails}
      />
    </div>
  );
}
