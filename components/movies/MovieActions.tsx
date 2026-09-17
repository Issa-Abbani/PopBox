import { BookHeart, Check, Heart, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export function MovieActions() {
  return (
    <div className="flex flex-wrap gap-2.5 sm:gap-3">
      <Button className="flex-1 gap-2 rounded-full bg-primary text-primary-foreground sm:flex-none">
        <Heart className="h-4 w-4" />
        Favorite
      </Button>
      <Button variant="secondary" className="flex-1 gap-2 rounded-full sm:flex-none">
        <Plus className="h-4 w-4" />
        Watchlist
      </Button>
      <Button variant="outline" className="flex-1 gap-2 rounded-full sm:flex-none">
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
