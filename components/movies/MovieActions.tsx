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
        className={`flex-1 gap-2 rounded-full sm:flex-none ${favorite ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary hover:bg-primary/15"}`}
      >
        <Heart className={`h-4 w-4 ${favorite ? "fill-current" : ""}`} />
        Favorite
      </Button>
      <Button
        variant="secondary"
        className={`flex-1 gap-2 rounded-full sm:flex-none ${watchlist ? "bg-accent/10 text-accent" : ""}`}
      >
        <Plus className="h-4 w-4" />
        Watchlist
      </Button>
      <Button
        variant="outline"
        className={`flex-1 gap-2 rounded-full sm:flex-none ${watched ? "border-emerald-400/50 bg-emerald-500/10 text-emerald-300" : ""}`}
      >
        <Check className="h-4 w-4" />
        Watched
      </Button>
      <Button variant="ghost" className="flex-1 gap-2 rounded-full border border-border sm:flex-none">
        <BookHeart className="h-4 w-4" />
        Add note
      </Button>
    </div>
  );
}
