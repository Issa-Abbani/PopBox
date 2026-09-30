import { BookHeart, Check, Heart, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

type MovieActionState = {
  favorite?: boolean;
  watchlist?: boolean;
  watched?: boolean;
};

export function MovieActions({
  favorite = false,
  watchlist = false,
  watched = false,
}: MovieActionState = {}) {
  return (
    <div className="flex flex-wrap gap-2.5 sm:gap-3">
      <Button
        className={`flex-1 gap-2 rounded-full sm:flex-none cursor-pointer ${favorite ? "bg-primary text-primary-foreground" : "bg-primary/50 text-balance hover:bg-primary hover:border-white"}`}
      >
        <Heart className={`h-4 w-4 ${favorite ? "fill-red" : ""}`} />
        Favorite
      </Button>
      <Button
        variant="secondary"
        className={`flex-1 gap-2 rounded-full sm:flex-none cursor-pointer ${watchlist ? "bg-accent/10 text-accent" : ""}`}
      >
        <Plus className="h-4 w-4" />
        Watchlist
      </Button>
      <Button
        variant="secondary"
        className={`flex-1 gap-2 rounded-full sm:flex-none cursor-pointer ${watched ? "border-emerald-400/50 bg-emerald-500/10 text-emerald-300" : ""}`}
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
