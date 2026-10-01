"use client"
import { BookHeart, Check, Heart, Plus } from "lucide-react";
import type { userMovieStates } from "@/types/movies/movieTypes";
import { Button } from "@/components/ui/button";

type MovieActionsProps = {
  userMovieDetails: userMovieStates;
};


export function MovieActions({
  userMovieDetails,
}: MovieActionsProps) {
  const { is_favorite, is_watchlisted, is_watched } = userMovieDetails;
  return (
    <div className="flex flex-wrap gap-2.5 sm:gap-3">
      <Button
        className={`flex-1 gap-2 rounded-full sm:flex-none cursor-pointer ${is_favorite ? "bg-primary text-primary-foreground" : "bg-primary/50 text-balance hover:bg-primary hover:border-white"}`}
      >
        <Heart className={`h-4 w-4 ${is_favorite ? "fill-red" : ""}`} />
        Favorite
      </Button>
      <Button
        variant="secondary"
        className={`flex-1 gap-2 rounded-full sm:flex-none cursor-pointer ${is_watchlisted ? "bg-accent/10 text-accent" : ""}`}
      >
        <Plus className="h-4 w-4" />
        Watchlist
      </Button>
      <Button
        variant="secondary"
        className={`flex-1 gap-2 rounded-full sm:flex-none cursor-pointer ${is_watched ? "border-emerald-400/50 bg-emerald-500/10 text-emerald-300" : ""}`}
      >
        <Check className="h-4 w-4" />
        Watched
      </Button>
      <Button
        variant="outline"
        className="flex-1 text-white hover:text-accent cursor-pointer gap-2 rounded-full border border-border sm:flex-none"
      >
        <BookHeart className="h-4 w-4" />
        Add note
      </Button>
      <Button
        variant="ghost"
        className="flex-1 cursor-pointer text-white hover:text-accent gap-2 rounded-full border border-border sm:flex-none"
      >
        <BookHeart className="h-4 w-4" />
        Add Rating
      </Button>
    </div>
  );
}
